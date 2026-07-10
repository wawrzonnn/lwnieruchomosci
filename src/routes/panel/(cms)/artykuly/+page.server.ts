import type { PageServerLoad, Actions } from './$types';
import { getAllArticles, getArticleStats, deleteArticle } from '$lib/db/articles';

export const load: PageServerLoad = async () => {
	const [articles, stats] = await Promise.all([getAllArticles(), getArticleStats()]);
	return { articles, stats };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		await deleteArticle(id);
		return { success: true };
	}
};
