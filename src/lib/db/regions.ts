import { prisma } from './prisma';
import type { Region } from '@prisma/client';

export function getAllRegions() {
	return prisma.region.findMany({ orderBy: { order: 'asc' } });
}

export function getRegionById(id: number) {
	return prisma.region.findUnique({ where: { id } });
}

export function updateRegion(id: number, data: Partial<Omit<Region, 'id' | 'createdAt' | 'updatedAt'>>) {
	return prisma.region.update({ where: { id }, data });
}

export type RegionTile = {
	slug: string;
	nazwa: string;
	image: string | null;
	size: 'BIG' | 'SMALL';
	focalX: number;
	focalY: number;
	count: number;
};

/**
 * Kafelki sekcji „Region Karkonosze" na stronie głównej.
 *
 * Pokazujemy tylko regiony, które mają min. 1 ofertę — pusty kafelek prowadziłby
 * na podstronę bez ofert. Liczbę ofert dopasowujemy po nazwie regionu zawartej
 * w mieście oferty (np. region „Podgórzyn" łapie oferty z Sosnówki i Staniszowa,
 * bo mają miasto „Podgórzyn"). Ta sama reguła jest opisana w panelu (/panel/regiony).
 */
export async function getRegionTiles(
	cityCounts: { city: string; count: number }[]
): Promise<RegionTile[]> {
	const regiony = await prisma.region.findMany({
		where: { visible: true },
		orderBy: { order: 'asc' }
	});

	return regiony
		.map((r) => ({
			slug: r.slug,
			nazwa: r.nazwa,
			image: r.image,
			size: r.size as 'BIG' | 'SMALL',
			focalX: r.focalX,
			focalY: r.focalY,
			count: cityCounts
				.filter((c) => c.city.toLowerCase().includes(r.nazwa.toLowerCase()))
				.reduce((sum, c) => sum + c.count, 0)
		}))
		.filter((t) => t.count > 0);
}
