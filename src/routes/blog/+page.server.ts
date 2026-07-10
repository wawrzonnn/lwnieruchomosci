import type { PageServerLoad } from './$types';
import { getPublishedArticles, toCard } from '$lib/db/articles';

export const load: PageServerLoad = async () => {
	const rows = await getPublishedArticles();
	return { artykuly: rows.map(toCard) };
};
