import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getMiastoBySlug } from '$lib/data/lokalizacje';
import { getFilteredListings, getCityOfferCounts } from '$lib/db/listings';
import { getRegionTiles } from '$lib/db/regions';
import { submitLead } from '$lib/server/lead-form';

export const load: PageServerLoad = async ({ params }) => {
	const miasto = getMiastoBySlug(params.slug);
	if (!miasto) throw error(404, 'Nie znaleziono lokalizacji');

	const [wszystkieOferty, cityCounts] = await Promise.all([
		getFilteredListings({ location: miasto.nazwa }),
		getCityOfferCounts()
	]);
	const oferty = wszystkieOferty.slice(0, 12);

	// Ta sama karuzela co na stronie głównej (redagowana w /panel/regiony),
	// bez miejscowości, na której już jesteśmy.
	const inne = (await getRegionTiles(cityCounts)).filter((t) => t.slug !== miasto.slug);

	return { miasto, oferty, inne };
};

export const actions: Actions = {
	lead: async ({ request, params }) => {
		const miasto = getMiastoBySlug(params.slug);
		return submitLead(await request.formData(), {
			type: 'SEARCH',
			subject: `Lokalizacja: ${miasto?.nazwa ?? params.slug}`,
			extra: [{ key: 'type', label: 'Szukam' }]
		});
	}
};
