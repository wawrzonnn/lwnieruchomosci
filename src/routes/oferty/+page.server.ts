import type { PageServerLoad } from './$types';
import { getFilteredListings } from '$lib/db/listings';

export const load: PageServerLoad = async ({ url }) => {
	const category = url.searchParams.get('category') ?? '';
	const location = url.searchParams.get('location') ?? '';
	const maxPrice = url.searchParams.get('maxPrice');
	const sort = (url.searchParams.get('sort') ?? 'newest') as 'newest' | 'price-asc' | 'price-desc';

	const listings = await getFilteredListings({
		category: category || undefined,
		location: location || undefined,
		maxPrice: maxPrice ? Number(maxPrice) : undefined,
		sort
	});

	return { listings, filters: { category, location, maxPrice: maxPrice ?? '', sort } };
};
