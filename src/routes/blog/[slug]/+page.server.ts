import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getPublishedArticleBySlug, getRelatedArticles, toArticleView } from '$lib/db/articles';
import { submitNewsletter } from '$lib/server/lead-form';
import { resolveBase, articleLd, jsonLdScript } from '$lib/seo';

export const load: PageServerLoad = async ({ params, url }) => {
	const row = await getPublishedArticleBySlug(params.slug);
	if (!row) throw error(404, 'Nie znaleziono artykułu');

	const related = await getRelatedArticles(row.slug, 3);
	const base = resolveBase(url.origin);
	return { article: toArticleView(row, related), jsonLd: jsonLdScript(articleLd(base, row)) };
};

export const actions: Actions = {
	newsletter: async ({ request, params }) =>
		submitNewsletter(await request.formData(), `Artykuł: ${params.slug}`)
};
