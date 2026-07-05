import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getListingById, updateListing } from '$lib/db/listings';
import { parseListingForm } from '$lib/server/listing-form';
import { deleteUpload } from '$lib/server/uploads';

export const load: PageServerLoad = async ({ params }) => {
	const listing = await getListingById(Number(params.id));
	if (!listing) throw error(404, 'Nie znaleziono oferty');
	return { listing };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.id);
		const existing = await getListingById(id);
		if (!existing) throw error(404, 'Nie znaleziono oferty');

		const data = await request.formData();
		const parsed = parseListingForm(data, existing.slug);
		if (!parsed.ok) return parsed.fail;

		// Usuń z dysku zdjęcia, które zniknęły z formularza.
		const keptUrls = new Set((parsed.data.images ?? []).map((i) => i.url));
		for (const img of existing.images) {
			if (!keptUrls.has(img.url)) await deleteUpload(img.url);
		}

		await updateListing(id, parsed.data);
		throw redirect(302, '/panel/oferty');
	}
};
