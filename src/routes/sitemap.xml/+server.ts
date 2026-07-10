import type { RequestHandler } from './$types';
import { resolveBase } from '$lib/seo';
import { getPublicListings } from '$lib/db/listings';
import { getPublishedArticles } from '$lib/db/articles';
import { miasta } from '$lib/data/lokalizacje';

const STATIC_PATHS = [
	'/',
	'/oferty',
	'/blog',
	'/o-nas',
	'/kontakt',
	'/sprzedaz-nieruchomosci',
	'/kupno-nieruchomosci',
	'/wycena-nieruchomosci',
	'/marketing-nieruchomosci',
	'/doradztwo-kredytowe',
	'/polityka-prywatnosci'
];

type Entry = { loc: string; lastmod?: string };

export const GET: RequestHandler = async ({ url }) => {
	const base = resolveBase(url.origin);
	const [listings, articles] = await Promise.all([getPublicListings(), getPublishedArticles()]);

	const entries: Entry[] = [
		...STATIC_PATHS.map((p) => ({ loc: `${base}${p}` })),
		...miasta.map((m) => ({ loc: `${base}/lokalizacje/${m.slug}` })),
		...listings.map((l) => ({ loc: `${base}/oferty/${l.slug}`, lastmod: l.updatedAt.toISOString() })),
		...articles.map((a) => ({ loc: `${base}/blog/${a.slug}`, lastmod: a.updatedAt.toISOString() }))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(e) =>
			`  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
	});
};
