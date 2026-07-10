import type { RequestHandler } from './$types';
import { resolveBase } from '$lib/seo';

export const GET: RequestHandler = ({ url }) => {
	const base = resolveBase(url.origin);
	const body = `User-agent: *
Allow: /
Disallow: /panel

Sitemap: ${base}/sitemap.xml
`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
	});
};
