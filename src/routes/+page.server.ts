import type { PageServerLoad } from './$types';
import { getPublicListings, getCityOfferCounts } from '$lib/db/listings';
import { miasta } from '$lib/data/lokalizacje';

export const load: PageServerLoad = async () => {
	const [featuredListings, cityCounts] = await Promise.all([
		getPublicListings(6),
		getCityOfferCounts()
	]);

	// Ile ofert przypada na każdą lokalizację regionu (city zawiera nazwę miasta).
	const regionCounts: Record<string, number> = {};
	for (const m of miasta) {
		regionCounts[m.slug] = cityCounts
			.filter((c) => c.city.toLowerCase().includes(m.nazwa.toLowerCase()))
			.reduce((sum, c) => sum + c.count, 0);
	}

	return { featuredListings, regionCounts };
};
