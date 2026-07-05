import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { createListing } from '$lib/db/listings';
import { parseListingForm } from '$lib/server/listing-form';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const parsed = parseListingForm(data);
		if (!parsed.ok) return parsed.fail;

		await createListing(parsed.data);
		throw redirect(302, '/panel/oferty');
	}
};
