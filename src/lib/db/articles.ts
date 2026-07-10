import { prisma } from './prisma';
import type { Article, Prisma } from '@prisma/client';
import { formatPlDate } from '$lib/utils';
import type { Blok, ArticleCard, ArticleView } from '$lib/blog/types';

// ── Zapytania publiczne ──

export function getPublishedArticles() {
	return prisma.article.findMany({
		where: { status: 'PUBLISHED' },
		orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }]
	});
}

export function getPublishedArticleBySlug(slug: string) {
	return prisma.article.findFirst({ where: { slug, status: 'PUBLISHED' } });
}

export function getRelatedArticles(slug: string, take = 3) {
	return prisma.article.findMany({
		where: { status: 'PUBLISHED', slug: { not: slug } },
		orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
		take
	});
}

// ── Zapytania CMS ──

export function getAllArticles() {
	return prisma.article.findMany({ orderBy: [{ createdAt: 'desc' }] });
}

export function getArticleById(id: number) {
	return prisma.article.findUnique({ where: { id } });
}

export function createArticle(data: Prisma.ArticleCreateInput) {
	return prisma.article.create({ data });
}

export function updateArticle(id: number, data: Prisma.ArticleCreateInput) {
	return prisma.article.update({ where: { id }, data });
}

export function deleteArticle(id: number) {
	return prisma.article.delete({ where: { id } });
}

export async function getArticleStats() {
	const [total, published, draft] = await Promise.all([
		prisma.article.count(),
		prisma.article.count({ where: { status: 'PUBLISHED' } }),
		prisma.article.count({ where: { status: 'DRAFT' } })
	]);
	return { total, published, draft };
}

// ── Mapowanie rekordu → widok ──

export function blocksOf(a: Article): Blok[] {
	return Array.isArray(a.content) ? (a.content as unknown as Blok[]) : [];
}

export function toCard(a: Article): ArticleCard {
	return {
		slug: a.slug,
		cat: a.category,
		title: a.title,
		excerpt: a.excerpt,
		date: formatPlDate(a.publishedAt),
		img: a.coverImage,
		featured: a.featured
	};
}

export function toArticleView(a: Article, related: Article[]): ArticleView {
	const bloki = blocksOf(a);
	const pozycje = bloki
		.filter((b): b is Extract<Blok, { typ: 'sekcja' }> => b.typ === 'sekcja')
		.map((s) => ({ id: s.id, label: s.naglowek2 }));

	return {
		slug: a.slug,
		seo: {
			title: a.seoTitle || `${a.title} — LW Nieruchomości`,
			description: a.seoDescription || a.excerpt,
			ogImage: a.ogImage || a.coverImage
		},
		breadcrumbs: [
			{ label: 'Strona główna', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: a.title }
		],
		naglowek: {
			kategoria: a.category,
			czasCzytania: a.readTime || '',
			tytul: a.title,
			tytulEmfaza: a.titleEmphasis || '',
			lead: a.lead || a.excerpt,
			autor: { imie: a.authorName, rola: a.authorRole || '', inicjaly: a.authorInitials || '' },
			data: formatPlDate(a.publishedAt)
		},
		zdjecieGlowne: {
			src: a.coverImage,
			alt: a.coverAlt || a.title,
			podpis: a.coverCaption || ''
		},
		spisTresci: { tytul: 'Na tej stronie', pozycje },
		tresc: { bloki },
		tagi: a.tags,
		autor: {
			imie: a.authorName,
			rola: a.authorRole || '',
			inicjaly: a.authorInitials || '',
			bio: a.authorBio || '',
			cta: { label: 'Skontaktuj się', href: '/kontakt' }
		},
		powiazane: {
			tytul: 'Więcej z bloga',
			linkWszystkie: { label: 'Wszystkie wpisy →', href: '/blog' },
			wpisy: related.map((r) => ({
				cat: r.category,
				title: r.title,
				excerpt: r.excerpt,
				date: formatPlDate(r.publishedAt),
				img: r.coverImage,
				slug: r.slug
			}))
		}
	};
}
