import type { PageServerLoad } from './$types';
import { getCategoryCounts, getFeaturedListing, getListingsExcept } from '$lib/db/listings';
import { createInquiry } from '$lib/db/inquiries';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const featured = await getFeaturedListing();
	const categoryCounts = await getCategoryCounts();
	const listings = featured ? await getListingsExcept(featured.id, 6) : [];

	return { featured, categoryCounts, listings };
};

export const actions = {
	offer: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const contact = String(data.get('contact') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();

		if (!name || !contact || !message) {
			return fail(400, { error: 'Wypełnij wszystkie pola.', type: 'offer' });
		}

		await createInquiry({ type: 'OFFER', name, contact, message });
		return { success: true, type: 'offer' };
	},
	search: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const contact = String(data.get('contact') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();

		if (!name || !contact || !message) {
			return fail(400, { error: 'Wypełnij wszystkie pola.', type: 'search' });
		}

		await createInquiry({ type: 'SEARCH', name, contact, message });
		return { success: true, type: 'search' };
	},
	contact: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const contact = String(data.get('contact') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();

		if (!name || !contact || !message) {
			return fail(400, { error: 'Wypełnij wszystkie pola.', type: 'contact' });
		}

		await createInquiry({ type: 'SEARCH', name, contact, message });
		return { success: true, type: 'contact' };
	}
};
