import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type Seed = {
	title: string;
	slug: string;
	category: 'MIESZKANIE' | 'DOM' | 'DZIALKA' | 'LOKAL';
	status?: 'ACTIVE' | 'DRAFT' | 'RESERVED' | 'SOLD';
	transactionType?: 'SPRZEDAZ' | 'WYNAJEM' | 'DZIERZAWA';
	isFeatured?: boolean;
	isHighlighted?: boolean;
	isExclusive?: boolean;
	isDeal?: boolean;
	price: number;
	oldPrice?: number;
	area?: number;
	rooms?: number;
	floor?: number;
	yearBuilt?: number;
	condition?: 'DO_ZAMIESZKANIA' | 'DO_ODSWIEZENIA' | 'DO_REMONTU' | 'DEWELOPERSKI' | 'SUROWY_ZAMKNIETY';
	heating?: 'MIEJSKIE' | 'GAZOWE' | 'POMPA_CIEPLA' | 'ELEKTRYCZNE' | 'KOMINKOWE';
	city: string;
	district?: string;
	amenities?: string[];
	description: string;
};

const listings: Seed[] = [
	{
		title: 'Nowy bliźniak z tarasem i widokiem na góry',
		slug: 'nowy-blizniak-z-tarasem-i-widokiem-na-gory',
		category: 'DOM',
		status: 'ACTIVE',
		isFeatured: true,
		isHighlighted: true,
		isDeal: true,
		price: 740000,
		oldPrice: 775000,
		area: 83,
		rooms: 4,
		yearBuilt: 2024,
		condition: 'DEWELOPERSKI',
		heating: 'POMPA_CIEPLA',
		city: 'Mysłakowice',
		district: 'jeleniogórski',
		amenities: ['Taras', 'Garaż', 'Ogród'],
		description:
			'Nowy, wykończony pod klucz bliźniak z dużym tarasem i widokiem na Karkonosze. Cicha, zielona okolica, blisko wyciągów.'
	},
	{
		title: '2 pokojowe z balkonem',
		slug: '2-pokojowe-z-balkonem-pilsudskiego',
		category: 'MIESZKANIE',
		status: 'RESERVED',
		isFeatured: true,
		isExclusive: true,
		price: 340000,
		oldPrice: 360000,
		area: 71.8,
		rooms: 2,
		floor: 3,
		yearBuilt: 1998,
		condition: 'DO_ZAMIESZKANIA',
		heating: 'MIEJSKIE',
		city: 'Jelenia Góra',
		district: 'Piłsudskiego',
		amenities: ['Balkon', 'Piwnica'],
		description:
			'Przestronne mieszkanie z balkonem w cichej, zielonej okolicy Jeleniej Góry. Po remoncie, gotowe do zamieszkania.'
	},
	{
		title: '4 działki budowlane, Cieplice',
		slug: '4-dzialki-budowlane-cieplice',
		category: 'DZIALKA',
		status: 'ACTIVE',
		isExclusive: true,
		price: 325000,
		area: 1211,
		city: 'Jelenia Góra',
		district: 'Cieplice',
		description: 'Cztery sąsiadujące działki budowlane na granicy lasu, media w drodze, dogodny dojazd.'
	},
	{
		title: 'Duża działka widokowa w Sosnówce',
		slug: 'duza-dzialka-widokowa-w-sosnowce',
		category: 'DZIALKA',
		status: 'ACTIVE',
		isHighlighted: true,
		price: 1844640,
		area: 10248,
		city: 'Sosnówka',
		district: 'Podgórzyn',
		description: 'Rozległa działka z panoramicznym widokiem na Karkonosze, idealna pod inwestycję lub dom marzeń.'
	},
	{
		title: 'Działka pod budowę 10 domów',
		slug: 'dzialka-pod-budowe-10-domow',
		category: 'DZIALKA',
		status: 'ACTIVE',
		price: 2385000,
		area: 13250,
		city: 'Sosnówka',
		district: 'Podgórzyn',
		description: 'Duża działka inwestycyjna z warunkami zabudowy pod 10 domów jednorodzinnych.'
	},
	{
		title: 'Atrakcyjna działka w Sosnówce',
		slug: 'atrakcyjna-dzialka-w-sosnowce',
		category: 'DZIALKA',
		status: 'ACTIVE',
		isExclusive: true,
		price: 740000,
		area: 4122,
		city: 'Sosnówka',
		district: 'Podgórzyn',
		description: 'Malownicza działka w spokojnej okolicy Sosnówki, blisko stoków narciarskich.'
	},
	{
		title: 'Działka widokowa w Sosnówce',
		slug: 'dzialka-widokowa-w-sosnowce',
		category: 'DZIALKA',
		status: 'ACTIVE',
		price: 1650000,
		area: 9220,
		city: 'Sosnówka',
		district: 'Podgórzyn',
		description: 'Działka z widokiem na góry w prestiżowej lokalizacji, blisko infrastruktury turystycznej.'
	},
	{
		title: '3 pokojowe w poszukiwanej dzielnicy',
		slug: '3-pokojowe-w-poszukiwanej-dzielnicy',
		category: 'MIESZKANIE',
		status: 'SOLD',
		price: 519000,
		area: 60.3,
		rooms: 3,
		floor: 1,
		yearBuilt: 2010,
		condition: 'DO_ZAMIESZKANIA',
		heating: 'GAZOWE',
		city: 'Jelenia Góra',
		amenities: ['Balkon', 'Winda'],
		description: 'Jasne, funkcjonalne mieszkanie 3-pokojowe w jednej z najbardziej poszukiwanych dzielnic miasta.'
	},
	{
		title: 'Dom w zabudowie szeregowej, Moniuszki',
		slug: 'dom-w-zabudowie-szeregowej-moniuszki',
		category: 'DOM',
		status: 'ACTIVE',
		price: 1399000,
		area: 255,
		rooms: 6,
		yearBuilt: 2015,
		condition: 'DO_ZAMIESZKANIA',
		heating: 'GAZOWE',
		city: 'Jelenia Góra',
		district: 'Moniuszki',
		amenities: ['Garaż', 'Ogród', 'Taras'],
		description: 'Przestronny dom szeregowy z dużym metrażem i ogrodem, w atrakcyjnej lokalizacji przy ul. Moniuszki.'
	},
	{
		title: 'Nowoczesny segment szeregówki, Cieplice',
		slug: 'nowoczesny-segment-szeregowki-cieplice',
		category: 'DOM',
		status: 'ACTIVE',
		price: 1259000,
		area: 178,
		rooms: 5,
		yearBuilt: 2022,
		condition: 'DEWELOPERSKI',
		heating: 'POMPA_CIEPLA',
		city: 'Jelenia Góra',
		district: 'Cieplice',
		amenities: ['Garaż', 'Taras', 'Ogród'],
		description: 'Nowoczesny segment w cichej części Cieplic — energooszczędny, z garażem i tarasem.'
	},
	{
		title: 'Mieszkanie ul. Szymanowskiego, 3 pokoje',
		slug: 'mieszkanie-szymanowskiego-3-pokoje',
		category: 'MIESZKANIE',
		status: 'ACTIVE',
		price: 465000,
		area: 58,
		rooms: 3,
		floor: 2,
		yearBuilt: 2005,
		condition: 'DO_ODSWIEZENIA',
		heating: 'MIEJSKIE',
		city: 'Jelenia Góra',
		district: 'Szymanowskiego',
		amenities: ['Balkon'],
		description: 'Wygodne mieszkanie w spokojnej okolicy, blisko szkół i komunikacji miejskiej.'
	},
	{
		title: 'Kawalerka w centrum, po remoncie',
		slug: 'kawalerka-w-centrum-po-remoncie',
		category: 'MIESZKANIE',
		status: 'DRAFT',
		price: 289000,
		area: 32,
		rooms: 1,
		floor: 4,
		yearBuilt: 1975,
		condition: 'DO_ZAMIESZKANIA',
		heating: 'MIEJSKIE',
		city: 'Jelenia Góra',
		district: 'centrum',
		amenities: ['Winda', 'Umeblowane'],
		description: 'Kompaktowa kawalerka idealna pod wynajem lub na start — świeżo po remoncie, w sercu miasta.'
	}
];

const inquiries = [
	{
		type: 'OFFER' as const,
		status: 'NEW' as const,
		name: 'Marek Kowalski',
		message: 'Mam do sprzedania mieszkanie 3 pok, Zabobrze',
		contact: '+48 601 234 567',
		createdAt: new Date('2026-07-02T10:00:00')
	},
	{
		type: 'SEARCH' as const,
		status: 'NEW' as const,
		name: 'Ewa Zielińska',
		message: 'Szukam domu do 900 tys. w okolicy Cieplic',
		contact: 'ewa.zielinska@gmail.com',
		createdAt: new Date('2026-07-01T09:30:00')
	},
	{
		type: 'OFFER' as const,
		status: 'IN_PROGRESS' as const,
		name: 'Tomasz Lis',
		message: 'Działka budowlana w Sosnówce, ok. 8 arów',
		contact: '+48 500 100 200',
		createdAt: new Date('2026-06-28T14:15:00')
	},
	{
		type: 'SEARCH' as const,
		status: 'DONE' as const,
		name: 'Anna Nowicka',
		message: 'Kawalerka pod inwestycję, centrum JG',
		contact: '+48 692 887 771',
		createdAt: new Date('2026-06-25T16:45:00')
	}
];

async function main() {
	for (const l of listings) {
		await prisma.listing.upsert({
			where: { slug: l.slug },
			update: l,
			create: l
		});
	}
	console.log(`✅ Zseedowano ${listings.length} ofert`);

	for (const inquiry of inquiries) {
		const existing = await prisma.inquiry.findFirst({ where: { name: inquiry.name, message: inquiry.message } });
		if (!existing) await prisma.inquiry.create({ data: inquiry });
	}
	console.log(`✅ Zseedowano ${inquiries.length} zgłoszeń`);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
