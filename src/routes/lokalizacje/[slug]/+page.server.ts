import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getMiastoBySlug, miasta } from '$lib/data/lokalizacje';
import { getFilteredListings } from '$lib/db/listings';
import { submitLead } from '$lib/server/lead-form';

export const load: PageServerLoad = async ({ params }) => {
	const miasto = getMiastoBySlug(params.slug);
	if (!miasto) throw error(404, 'Nie znaleziono lokalizacji');

	const oferty = (await getFilteredListings({ location: miasto.nazwa })).slice(0, 12);
	const inne = miasta.filter((m) => m.slug !== miasto.slug);

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
