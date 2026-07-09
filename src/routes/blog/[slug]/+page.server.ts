import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getArticleBySlug } from '$lib/data/blog-artykuly';

export const load: PageServerLoad = async ({ params }) => {
	const article = getArticleBySlug(params.slug);
	if (!article) throw error(404, 'Nie znaleziono artykułu');
	return { article };
};
