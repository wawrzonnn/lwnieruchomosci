import { prisma } from './prisma';
import type { ListingCategory, ListingStatus, Prisma } from '@prisma/client';

const withImages = { images: { orderBy: { order: 'asc' as const } } };

export function getAllListings() {
	return prisma.listing.findMany({ orderBy: { createdAt: 'desc' }, include: withImages });
}

export function getListingById(id: number) {
	return prisma.listing.findUnique({ where: { id }, include: withImages });
}

export function getListingBySlug(slug: string) {
	return prisma.listing.findUnique({ where: { slug }, include: withImages });
}

export function getFeaturedListing() {
	return prisma.listing.findFirst({
		where: { isFeatured: true, status: { notIn: ['DRAFT', 'SOLD'] } },
		orderBy: { createdAt: 'desc' },
		include: withImages
	});
}

export function getPublicListings(take?: number) {
	return prisma.listing.findMany({
		where: { status: { not: 'DRAFT' } },
		// aktywne/zarezerwowane najpierw, sprzedane na końcu
		orderBy: [{ status: 'asc' }, { isFeatured: 'desc' }, { createdAt: 'desc' }],
		include: withImages,
		take
	});
}

// Promo na stronie głównej — tylko dostępne (bez sprzedanych).
export function getListingsExcept(id: number, take = 6) {
	return prisma.listing.findMany({
		where: { id: { not: id }, status: { notIn: ['DRAFT', 'SOLD'] } },
		orderBy: { createdAt: 'desc' },
		include: withImages,
		take
	});
}

export async function getCategoryCounts() {
	const groups = await prisma.listing.groupBy({
		by: ['category'],
		_count: true,
		where: { status: { not: 'DRAFT' } }
	});
	const counts: Record<ListingCategory, number> = { MIESZKANIE: 0, DOM: 0, DZIALKA: 0, LOKAL: 0 };
	for (const g of groups) counts[g.category] = g._count;
	return counts;
}

export interface ListingFilters {
	category?: string;
	location?: string;
	maxPrice?: number;
	sort?: 'newest' | 'price-asc' | 'price-desc';
}

export function getFilteredListings(filters: ListingFilters) {
	const where: Prisma.ListingWhereInput = { status: { not: 'DRAFT' } };
	if (filters.category) where.category = filters.category as ListingCategory;
	if (filters.location) where.city = { contains: filters.location, mode: 'insensitive' };
	if (filters.maxPrice) where.price = { lte: filters.maxPrice };

	const sortKey: Prisma.ListingOrderByWithRelationInput =
		filters.sort === 'price-asc'
			? { price: 'asc' }
			: filters.sort === 'price-desc'
				? { price: 'desc' }
				: { createdAt: 'desc' };

	// Sprzedane zawsze na końcu listy (status: ACTIVE→RESERVED→SOLD), reszta wg wyboru.
	return prisma.listing.findMany({
		where,
		orderBy: [{ status: 'asc' }, sortKey],
		include: withImages
	});
}

export interface ListingImageInput {
	url: string;
	order: number;
	isMain: boolean;
}

export type ListingData = Omit<Prisma.ListingCreateInput, 'images'> & { images?: ListingImageInput[] };

export async function createListing(data: ListingData) {
	const { images, ...rest } = data;
	return prisma.listing.create({
		data: {
			...rest,
			images: images && images.length ? { create: images } : undefined
		},
		include: withImages
	});
}

export async function updateListing(id: number, data: ListingData) {
	const { images, ...rest } = data;
	// Zdjęcia: nadpisujemy komplet (usuń stare, utwórz nowe wg przekazanej listy).
	return prisma.$transaction(async (tx) => {
		if (images) {
			await tx.listingImage.deleteMany({ where: { listingId: id } });
		}
		return tx.listing.update({
			where: { id },
			data: {
				...rest,
				images: images ? { create: images } : undefined
			},
			include: withImages
		});
	});
}

export function deleteListing(id: number) {
	return prisma.listing.delete({ where: { id } });
}

export async function getAdminStats() {
	const [total, active, featured] = await Promise.all([
		prisma.listing.count(),
		prisma.listing.count({ where: { status: 'ACTIVE' } }),
		prisma.listing.count({ where: { isFeatured: true } })
	]);
	return { total, active, featured };
}
