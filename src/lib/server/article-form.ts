import { fail, type ActionFailure } from '@sveltejs/kit';
import { slugify, initials } from '$lib/utils';
import type { Prisma, ArticleStatus } from '@prisma/client';
import type { Blok } from '$lib/blog/types';

export type ParsedArticle =
	| { ok: true; data: Prisma.ArticleCreateInput }
	| { ok: false; fail: ActionFailure<{ error: string }> };

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();
const strOrNull = (v: FormDataEntryValue | null) => str(v) || null;

// Normalizacja bloków z formularza + nadanie stabilnych, unikalnych id sekcjom
// (kotwice spisu treści). Odrzuca bloki niepełne/nieznane.
function normalizeBlocks(raw: unknown): Blok[] {
	if (!Array.isArray(raw)) return [];
	const usedIds = new Set<string>();
	const out: Blok[] = [];

	for (const b of raw) {
		if (!b || typeof b !== 'object') continue;
		const typ = (b as { typ?: string }).typ;

		if (typ === 'sekcja') {
			const naglowek2 = str((b as { naglowek2?: string }).naglowek2 ?? '');
			if (!naglowek2) continue;
			let id = slugify(naglowek2) || 'sekcja';
			let n = 2;
			while (usedIds.has(id)) id = `${slugify(naglowek2) || 'sekcja'}-${n++}`;
			usedIds.add(id);
			out.push({ typ: 'sekcja', id, naglowek2 });
		} else if (typ === 'akapit') {
			const html = str((b as { html?: string }).html ?? '');
			if (!html) continue;
			out.push({ typ: 'akapit', html, dropCap: !!(b as { dropCap?: boolean }).dropCap });
		} else if (typ === 'cytat') {
			const tekst = str((b as { tekst?: string }).tekst ?? '');
			if (!tekst) continue;
			out.push({ typ: 'cytat', tekst, autor: str((b as { autor?: string }).autor ?? '') });
		} else if (typ === 'lista') {
			const pozycje = (Array.isArray((b as { pozycje?: unknown[] }).pozycje)
				? (b as { pozycje: unknown[] }).pozycje
				: []
			)
				.map((p) => ({
					mocne: str((p as { mocne?: string }).mocne ?? ''),
					reszta: str((p as { reszta?: string }).reszta ?? '')
				}))
				.filter((p) => p.mocne || p.reszta);
			if (!pozycje.length) continue;
			out.push({ typ: 'lista', pozycje });
		} else if (typ === 'zdjecie') {
			const src = str((b as { src?: string }).src ?? '');
			if (!src) continue;
			out.push({
				typ: 'zdjecie',
				src,
				alt: str((b as { alt?: string }).alt ?? ''),
				podpis: str((b as { podpis?: string }).podpis ?? '')
			});
		} else if (typ === 'statystyki') {
			const pozycje = (Array.isArray((b as { pozycje?: unknown[] }).pozycje)
				? (b as { pozycje: unknown[] }).pozycje
				: []
			)
				.map((p) => ({
					wartosc: str((p as { wartosc?: string }).wartosc ?? ''),
					opis: str((p as { opis?: string }).opis ?? '')
				}))
				.filter((p) => p.wartosc || p.opis);
			if (!pozycje.length) continue;
			out.push({ typ: 'statystyki', uwaga: str((b as { uwaga?: string }).uwaga ?? ''), pozycje });
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
