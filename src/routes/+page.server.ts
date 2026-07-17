import type { PageServerLoad } from './$types';
import { getPublicListings, getCityOfferCounts } from '$lib/db/listings';
import { getRegionTiles } from '$lib/db/regions';
import { resolveBase, organizationLd, jsonLdScript, defaultOgImage } from '$lib/seo';

export const load: PageServerLoad = async ({ url }) => {
	const [featuredListings, cityCounts] = await Promise.all([
		getPublicListings(6),
		getCityOfferCounts()
	]);
	const base = resolveBase(url.origin);

	// Kafelki regionów pochodzą z bazy (redagowalne w /panel/regiony).
	// Filtr „min. 1 oferta" siedzi w getRegionTiles.
	const regionTiles = await getRegionTiles(cityCounts);

	return {
		featuredListings,
		regionTiles,
		jsonLd: jsonLdScript(organizationLd(base)),
		ogImage: defaultOgImage(base)
	};
};
