import type { PageServerLoad } from './$types';
import { getPublicListings } from '$lib/db/listings';

export const load: PageServerLoad = async () => {
	const featuredListings = await getPublicListings(6);
	return { featuredListings };
};
