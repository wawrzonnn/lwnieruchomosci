import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getListingBySlug, getListingsExcept } from '$lib/db/listings';
import { createInquiry } from '$lib/db/inquiries';

export const load: PageServerLoad = async ({ params }) => {
	const listing = await getListingBySlug(params.slug);
	if (!listing) throw error(404, 'Nie znaleziono oferty');

	const similar = await getListingsExcept(listing.id, 3);

	return { listing, similar };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const contact = String(data.get('contact') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();

		if (!name || !contact) {
			return fail(400, { error: 'Podaj imię i kontakt.' });
		}

		const listing = await getListingBySlug(params.slug);
		await createInquiry({
			type: 'OFFER',
			subject: `Oferta: ${listing?.title ?? params.slug}`,
			name,
			contact,
			message: message || `Zapytanie o ofertę: ${listing?.title ?? params.slug}`,
			listingId: listing?.id
		});

		return { success: true };
	}
};
