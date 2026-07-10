import { env } from '$env/dynamic/public';
import { dane, godziny, social } from '$lib/data/kontakt-strona';
import { CATEGORY_LABELS } from '$lib/utils';
import type { Article, Listing, ListingImage } from '@prisma/client';

// Bazowy URL: preferuj PUBLIC_SITE_URL (ustawisz na własnej domenie po przejściu
// na VPS), a w razie braku — origin bieżącego żądania (działa i na Netlify, i na VPS).
export function resolveBase(reqOrigin: string): string {
	const override = (env.PUBLIC_SITE_URL || '').replace(/\/+$/, '');
	return override || reqOrigin;
}

export function abs(base: string, path: string): string {
	if (/^https?:\/\//.test(path)) return path;
	return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

const DEFAULT_OG = '/karkonosze-panorama.png';
export const defaultOgImage = (base: string) => abs(base, DEFAULT_OG);

// Bezpieczny <script type="application/ld+json"> (escape „<" chroni przed zamknięciem tagu).
export function jsonLdScript(obj: unknown): string {
	return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
}

// ── Firma (RealEstateAgent / LocalBusiness) — strona główna ──
export function organizationLd(base: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'RealEstateAgent',
		'@id': `${base}/#organization`,
		name: 'LW Nieruchomości',
		url: base,
		image: defaultOgImage(base),
		logo: abs(base, '/lw-logo.png'),
		telephone: dane.telefon.replace(/\s/g, ''),
		email: dane.email,
		address: {
			'@type': 'PostalAddress',
			postalCode: '58-506',
			addressLocality: 'Jelenia Góra',
			addressRegion: 'dolnośląskie',
			addressCountry: 'PL'
		},
		areaServed: ['Jelenia Góra', 'Kotlina Jeleniogórska', 'Karkonosze'],
		sameAs: social.map((s) => s.href),
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '09:00',
				closes: '17:00'
			}
		],
		description:
			'Lokalne biuro nieruchomości z Jeleniej Góry. Sprzedaż, kupno i wynajem nieruchomości w Kotlinie Jeleniogórskiej i Karkonoszach.'
	};
}

function breadcrumbLd(base: string, items: { name: string; path?: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((it, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: it.name,
			...(it.path ? { item: abs(base, it.path) } : {})
		}))
	};
}

// ── Oferta (Product + Offer) + okruszki ──
export function listingLd(
	base: string,
	listing: Listing & { images?: ListingImage[] }
) {
	const images = (listing.images ?? [])
		.slice()
		.sort((a, b) => Number(b.isMain) - Number(a.isMain) || a.order - b.order)
		.map((i) => abs(base, i.url));

	const product = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: listing.title,
		description: listing.description?.slice(0, 500),
		category: CATEGORY_LABELS[listing.category] ?? 'Nieruchomość',
		...(images.length ? { image: images } : {}),
		offers: {
			'@type': 'Offer',
			price: Math.round(listing.price),
			priceCurrency: 'PLN',
			availability:
				listing.status === 'SOLD'
					? 'https://schema.org/SoldOut'
					: 'https://schema.org/InStock',
			url: abs(base, `/oferty/${listing.slug}`)
		}
	};

	return [
		product,
		breadcrumbLd(base, [
			{ name: 'Strona główna', path: '/' },
			{ name: 'Oferty', path: '/oferty' },
			{ name: listing.title, path: `/oferty/${listing.slug}` }
		])
	];
}

// ── Artykuł (BlogPosting) + okruszki ──
export function articleLd(base: string, article: Article) {
	const posting = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: article.title,
		description: article.excerpt,
		image: abs(base, article.coverImage),
		datePublished: (article.publishedAt ?? article.createdAt).toISOString(),
		dateModified: article.updatedAt.toISOString(),
		author: { '@type': 'Person', name: article.authorName },
		publisher: {
			'@type': 'Organization',
			name: 'LW Nieruchomości',
			logo: { '@type': 'ImageObject', url: abs(base, '/lw-logo.png') }
		},
		mainEntityOfPage: abs(base, `/blog/${article.slug}`),
		articleSection: article.category,
		keywords: article.tags.join(', ')
	};

	return [
		posting,
		breadcrumbLd(base, [
			{ name: 'Strona główna', path: '/' },
			{ name: 'Blog', path: '/blog' },
			{ name: article.title, path: `/blog/${article.slug}` }
		])
	];
}
