import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { getAllRegions, updateRegion } from '$lib/db/regions';
import { getCityOfferCounts } from '$lib/db/listings';

export const load: PageServerLoad = async () => {
	const [regiony, cityCounts] = await Promise.all([getAllRegions(), getCityOfferCounts()]);

	// Ile ofert ma każdy region — ta sama reguła co na stronie głównej (dopasowanie po
	// nazwie regionu zawartej w mieście oferty). Pokazujemy to w panelu, żeby było widać,
	// który kafelek jest realnie widoczny na stronie.
	const zLiczba = regiony.map((r) => ({
		...r,
		ofert: cityCounts
			.filter((c) => c.city.toLowerCase().includes(r.nazwa.toLowerCase()))
			.reduce((sum, c) => sum + c.count, 0)
	}));

	return { regiony: zLiczba };
};

export const actions: Actions = {
	zapisz: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { message: 'Brak identyfikatora regionu' });

		const nazwa = String(data.get('nazwa') ?? '').trim();
		if (!nazwa) return fail(400, { message: 'Nazwa nie może być pusta' });

		const image = String(data.get('image') ?? '').trim();
		const zakres = (v: unknown) => Math.min(100, Math.max(0, Math.round(Number(v) || 0)));

		await updateRegion(id, {
			nazwa,
			image: image || null,
			focalX: zakres(data.get('focalX')),
			focalY: zakres(data.get('focalY')),
			size: data.get('size') === 'BIG' ? 'BIG' : 'SMALL',
			order: Math.max(0, Math.round(Number(data.get('order')) || 0)),
			visible: data.get('visible') === 'on'
		});

		return { success: true };
	}
};
