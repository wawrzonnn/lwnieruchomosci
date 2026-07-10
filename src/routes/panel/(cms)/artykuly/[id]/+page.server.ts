import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getArticleById, updateArticle } from '$lib/db/articles';
import { parseArticleForm } from '$lib/server/article-form';

export const load: PageServerLoad = async ({ params }) => {
	const article = await getArticleById(Number(params.id));
	if (!article) throw error(404, 'Nie znaleziono artykułu');
	return { article };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.id);
		const existing = await getArticleById(id);
		if (!existing) throw error(404, 'Nie znaleziono artykułu');

		const data = await request.formData();
		const parsed = parseArticleForm(data, existing.slug);
		if (!parsed.ok) return parsed.fail;

		await updateArticle(id, parsed.data);
		throw redirect(302, '/panel/artykuly');
	}
};
