import type { PageServerLoad } from './$types';
import { getCityOfferCounts } from '$lib/db/listings';
import { getRegionTiles } from '$lib/db/regions';
import { miasta } from '$lib/data/lokalizacje';

export const load: PageServerLoad = async () => {
	const cityCounts = await getCityOfferCounts();
	const kafelki = await getRegionTiles(cityCounts);

	// Kafelki (zdjęcie, kadr, kolejność) są redagowane w panelu, a lead miejscowości
	// bierzemy z lokalizacje.ts — po slugu.
	const opisy = new Map(miasta.map((m) => [m.slug, m.lead]));

	return {
		regiony: kafelki.map((k) => ({ ...k, lead: opisy.get(k.slug) ?? '' }))
	};
};
