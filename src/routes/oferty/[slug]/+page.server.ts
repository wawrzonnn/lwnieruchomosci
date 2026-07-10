import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getListingBySlug, getListingsExcept } from '$lib/db/listings';
import { createInquiry } from '$lib/db/inquiries';
import { resolveBase, listingLd, jsonLdScript, abs, defaultOgImage } from '$lib/seo';
import { CATEGORY_LABELS, formatArea, formatPrice, locationLabel } from '$lib/utils';

export const load: PageServerLoad = async ({ params, url }) => {
	const listing = await getListingBySlug(params.slug);
	if (!listing) throw error(404, 'Nie znaleziono oferty');

	const similar = await getListingsExcept(listing.id, 3);

	const base = resolveBase(url.origin);
	const mainImg = listing.images?.find((i) => i.isMain)?.url ?? listing.images?.[0]?.url;
	const parts = [
		CATEGORY_LABELS[listing.category],
		locationLabel(listing.city, listing.district),
		formatPrice(listing.price),
		listing.area ? formatArea(listing.area) : null
	].filter(Boolean);

	return {
		listing,
		similar,
		seo: {
			description: `${parts.join(' · ')}. ${listing.description ?? ''}`.slice(0, 160),
			ogImage: mainImg ? abs(base, mainImg) : defaultOgImage(base),
			jsonLd: jsonLdScript(listingLd(base, listing))
		}
	};
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
