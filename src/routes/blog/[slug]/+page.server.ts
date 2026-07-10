import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPublishedArticleBySlug, getRelatedArticles, toArticleView } from '$lib/db/articles';

export const load: PageServerLoad = async ({ params }) => {
	const row = await getPublishedArticleBySlug(params.slug);
	if (!row) throw error(404, 'Nie znaleziono artykułu');

	const related = await getRelatedArticles(row.slug, 3);
	return { article: toArticleView(row, related) };
};
