import { fail, type ActionFailure } from '@sveltejs/kit';
import { slugify } from '$lib/utils';
import type { ListingData, ListingImageInput } from '$lib/db/listings';
import type {
	Condition,
	Heating,
	ListingCategory,
	ListingStatus,
	Market,
	TransactionType
} from '@prisma/client';

function num(v: FormDataEntryValue | null): number | null {
	if (v === null || String(v).trim() === '') return null;
	const n = Number(v);
	return Number.isFinite(n) ? n : null;
}

function enumOrNull<T extends string>(v: FormDataEntryValue | null): T | null {
	const s = String(v ?? '').trim();
	return s ? (s as T) : null;
}

export type ParsedListing =
	| { ok: true; data: ListingData }
	| { ok: false; fail: ActionFailure<{ error: string }> };

export function parseListingForm(data: FormData, existingSlug?: string): ParsedListing {
	const title = String(data.get('title') ?? '').trim();
	const price = num(data.get('price'));
	const city = String(data.get('city') ?? '').trim();

	if (!title || price === null || !city) {
		return { ok: false, fail: fail(400, { error: 'Uzupełnij tytuł, cenę i miejscowość.' }) };
	}

	const intent = String(data.get('intent') ?? 'publish');
	let status = enumOrNull<ListingStatus>(data.get('status')) ?? 'ACTIVE';
	if (intent === 'draft') status = 'DRAFT';
	else if (status === 'DRAFT') status = 'ACTIVE';

	let images: ListingImageInput[] = [];
	try {
		const raw = JSON.parse(String(data.get('images') ?? '[]'));
		if (Array.isArray(raw)) {
			images = raw.map((im, i) => ({
				url: String(im.url),
				order: Number.isFinite(im.order) ? im.order : i,
				isMain: !!im.isMain
			}));
			if (images.length && !images.some((im) => im.isMain)) images[0].isMain = true;
		}
	} catch {
		images = [];
	}

	let amenities: string[] = [];
	try {
		const raw = JSON.parse(String(data.get('amenities') ?? '[]'));
		if (Array.isArray(raw)) amenities = raw.map(String);
	} catch {
		amenities = [];
	}

	const parsed: ListingData = {
		title,
		referenceNumber: String(data.get('referenceNumber') ?? '').trim() || null,
		slug: existingSlug ?? `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`,
		category: enumOrNull<ListingCategory>(data.get('category')) ?? 'MIESZKANIE',
		transactionType: enumOrNull<TransactionType>(data.get('transactionType')) ?? 'SPRZEDAZ',
		market: enumOrNull<Market>(data.get('market')),
		status,
		isFeatured: data.get('isFeatured') != null,
		isHighlighted: data.get('isHighlighted') != null,
		isExclusive: data.get('isExclusive') != null,
		price,
		area: num(data.get('area')),
		rooms: num(data.get('rooms')),
		floor: num(data.get('floor')),
		totalFloors: num(data.get('totalFloors')),
		yearBuilt: num(data.get('yearBuilt')),
		condition: enumOrNull<Condition>(data.get('condition')),
		heating: enumOrNull<Heating>(data.get('heating')),
		voivodeship: String(data.get('voivodeship') ?? 'Dolnośląskie').trim() || 'Dolnośląskie',
		city,
		district: String(data.get('district') ?? '').trim() || null,
		postalCode: String(data.get('postalCode') ?? '').trim() || null,
		amenities,
		description: String(data.get('description') ?? '').trim(),
		images
	};

	return { ok: true, data: parsed };
}
