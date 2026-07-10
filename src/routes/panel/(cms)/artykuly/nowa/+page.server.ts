import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { createArticle } from '$lib/db/articles';
import { parseArticleForm } from '$lib/server/article-form';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const parsed = parseArticleForm(data);
		if (!parsed.ok) return parsed.fail;

		await createArticle(parsed.data);
		throw redirect(302, '/panel/artykuly');
	}
};
