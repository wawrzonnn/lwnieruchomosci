import type { PageServerLoad, Actions } from './$types';
import { getPublishedArticles, toCard } from '$lib/db/articles';
import { submitNewsletter } from '$lib/server/lead-form';

export const load: PageServerLoad = async () => {
	const rows = await getPublishedArticles();
	return { artykuly: rows.map(toCard) };
};

export const actions: Actions = {
	newsletter: async ({ request }) => submitNewsletter(await request.formData(), 'Blog')
};
