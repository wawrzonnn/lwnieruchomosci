import { fail, type ActionFailure } from '@sveltejs/kit';
import { slugify, initials } from '$lib/utils';
import type { Prisma, ArticleStatus } from '@prisma/client';
import type { Blok } from '$lib/blog/types';

export type ParsedArticle =
	| { ok: true; data: Prisma.ArticleCreateInput }
	| { ok: false; fail: ActionFailure<{ error: string }> };

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();
const strOrNull = (v: FormDataEntryValue | null) => str(v) || null;

// Normalizacja bloków z formularza + nadanie stabilnych, unikalnych id blokom
// z kotwicą (spis treści). Odrzuca bloki niepełne/nieznane. Model wg refinement 23.
function normalizeBlocks(raw: unknown): Blok[] {
	if (!Array.isArray(raw)) return [];
	const usedIds = new Set<string>();
	const out: Blok[] = [];

	// Nadaje unikalne id (preferuje istniejące z bloku, w razie braku slug z nagłówka).
	const takeId = (provided: string, naglowek: string, fallback: string) => {
		const base = slugify(provided) || slugify(naglowek) || fallback;
		let id = base;
		let n = 2;
		while (usedIds.has(id)) id = `${base}-${n++}`;
		usedIds.add(id);
		return id;
	};
	const akapityOf = (b: object) =>
		(Array.isArray((b as { akapity?: unknown[] }).akapity) ? (b as { akapity: unknown[] }).akapity : [])
			.map((p) => str(p as FormDataEntryValue))
			.filter(Boolean);
	const punktyOf = (b: object) =>
		(Array.isArray((b as { punkty?: unknown[] }).punkty) ? (b as { punkty: unknown[] }).punkty : [])
			.map((p) => str(p as FormDataEntryValue))
			.filter(Boolean);

	for (const b of raw) {
		if (!b || typeof b !== 'object') continue;
		const typ = (b as { typ?: string }).typ;

		if (typ === 'sekcja') {
			const naglowek = str((b as { naglowek?: string }).naglowek ?? '');
			if (!naglowek) continue;
			const akapity = akapityOf(b);
			if (!akapity.length) continue;
			const id = takeId(str((b as { id?: string }).id ?? ''), naglowek, 'sekcja');
			const numer = str((b as { numer?: string }).numer ?? '');
			out.push({
				typ: 'sekcja',
				id,
				tocLabel: str((b as { tocLabel?: string }).tocLabel ?? '') || naglowek,
				...(numer ? { numer } : {}),
				naglowek,
				akapity,
				...((b as { dropCap?: boolean }).dropCap ? { dropCap: true } : {})
			});
		} else if (typ === 'cytat') {
			const tekst = str((b as { tekst?: string }).tekst ?? '');
			if (!tekst) continue;
			out.push({ typ: 'cytat', tekst, autor: str((b as { autor?: string }).autor ?? '') });
		} else if (typ === 'lista') {
			const naglowek = str((b as { naglowek?: string }).naglowek ?? '');
			const punkty = punktyOf(b);
			if (!naglowek || !punkty.length) continue;
			const wstep = str((b as { wstep?: string }).wstep ?? '');
			out.push({
				typ: 'lista',
				id: takeId(str((b as { id?: string }).id ?? ''), naglowek, 'lista'),
				tocLabel: str((b as { tocLabel?: string }).tocLabel ?? '') || naglowek,
				naglowek,
				...(wstep ? { wstep } : {}),
				punkty
			});
		} else if (typ === 'bledy') {
			const naglowek = str((b as { naglowek?: string }).naglowek ?? '');
			const punkty = punktyOf(b);
			if (!naglowek || !punkty.length) continue;
			out.push({
				typ: 'bledy',
				id: takeId(str((b as { id?: string }).id ?? ''), naglowek, 'bledy'),
				tocLabel: str((b as { tocLabel?: string }).tocLabel ?? '') || naglowek,
				naglowek,
				punkty
			});
		} else if (typ === 'podsumowanie') {
			const naglowek = str((b as { naglowek?: string }).naglowek ?? '');
			const akapity = akapityOf(b);
			if (!naglowek || !akapity.length) continue;
			out.push({
				typ: 'podsumowanie',
				id: takeId(str((b as { id?: string }).id ?? ''), naglowek, 'podsumowanie'),
				tocLabel: str((b as { tocLabel?: string }).tocLabel ?? '') || naglowek,
				naglowek,
				akapity
			});
		}
	}
	return out;
}

export function parseArticleForm(data: FormData, existingSlug?: string): ParsedArticle {
	const title = str(data.get('title'));
	const excerpt = str(data.get('excerpt'));
	const category = str(data.get('category')) || 'Rynek';
	const coverImage = str(data.get('coverImage'));

	if (!title || !excerpt) {
		return { ok: false, fail: fail(400, { error: 'Uzupełnij tytuł i zajawkę.' }) };
	}

	// Status: przycisk „Zapisz szkic" ustawia intent=draft; „Opublikuj" → PUBLISHED.
	const intent = str(data.get('intent')) || 'publish';
	let status: ArticleStatus = (strOrNull(data.get('status')) as ArticleStatus) ?? 'DRAFT';
	if (intent === 'draft') status = 'DRAFT';
	else if (intent === 'publish') status = 'PUBLISHED';

	let content: Blok[] = [];
	try {
		content = normalizeBlocks(JSON.parse(str(data.get('content')) || '[]'));
	} catch {
		content = [];
	}

	let tags: string[] = [];
	try {
		const raw = JSON.parse(str(data.get('tags')) || '[]');
		if (Array.isArray(raw)) tags = raw.map((t) => String(t).trim()).filter(Boolean);
	} catch {
		tags = str(data.get('tags'))
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean);
	}

	// Box „W skrócie" — punkty z pola tekstowego (jeden na linię).
	const summaryPoints = str(data.get('summaryPoints'))
		.split('\n')
		.map((p) => p.trim())
		.filter(Boolean);

	const publishedRaw = str(data.get('publishedAt'));
	const publishedAt = publishedRaw ? new Date(publishedRaw) : status === 'PUBLISHED' ? new Date() : null;

	const authorName = str(data.get('authorName')) || 'Zespół LW Nieruchomości';

	const parsed: Prisma.ArticleCreateInput = {
		title,
		slug: existingSlug ?? `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`,
		status,
		featured: data.get('featured') != null,
		category,
		titleEmphasis: strOrNull(data.get('titleEmphasis')),
		excerpt,
		lead: strOrNull(data.get('lead')),
		readTime: strOrNull(data.get('readTime')),
		publishedAt,
		coverImage: coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
		coverAlt: strOrNull(data.get('coverAlt')),
		coverCaption: strOrNull(data.get('coverCaption')),
		content: content as unknown as Prisma.InputJsonValue,
		tags,
		summaryPoints,
		authorName,
		authorRole: strOrNull(data.get('authorRole')),
		authorInitials: strOrNull(data.get('authorInitials')) || initials(authorName),
		authorBio: strOrNull(data.get('authorBio')),
		seoTitle: strOrNull(data.get('seoTitle')),
		seoDescription: strOrNull(data.get('seoDescription')),
		ogImage: strOrNull(data.get('ogImage'))
	};

	return { ok: true, data: parsed };
}
