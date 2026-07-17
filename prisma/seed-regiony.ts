// Przenosi kafelki sekcji „Rozejrzyj się po Karkonoszach" z kodu do bazy (model Region).
// Wcześniej siedziały w src/lib/data/landing.ts → region.galeria, a część zdjęć wisiała
// na Unsplashu. Zdjęcia startowe lądują w static/regiony/<slug>.jpg (są w gicie, więc
// działają po każdym wdrożeniu); to, co klientka wgra później panelem, idzie do /uploads/.
//
// Uruchomienie:  npx tsx prisma/seed-regiony.ts
// Na produkcji:  DATABASE_URL="<vps>" npx tsx prisma/seed-regiony.ts
//   (dotenv NIE nadpisuje istniejących zmiennych środowiskowych)

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import sharp from 'sharp';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const U = (id: string, w = 1400) =>
	`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const KATALOG = 'static/regiony';

// Stan 1:1 z landing.ts → region.galeria (kolejność = kolejność wyświetlania).
const REGIONY = [
	{ slug: 'karpacz', nazwa: 'Karpacz', size: 'BIG', zrodlo: 'static/karkonosze-panorama.png' },
	{ slug: 'jelenia-gora', nazwa: 'Jelenia Góra', size: 'SMALL', zrodlo: 'static/jelenia-gora-zima.png' },
	{ slug: 'szklarska-poreba', nazwa: 'Szklarska Poręba', size: 'BIG', zrodlo: 'static/schronisko-staw.png' },
	{ slug: 'kowary', nazwa: 'Kowary', size: 'SMALL', zrodlo: 'static/sunset-dolina.png' },
	{ slug: 'piechowice', nazwa: 'Piechowice', size: 'BIG', zrodlo: U('photo-1476514525535-07fb3b4ae5f1') },
	{ slug: 'podgorzyn', nazwa: 'Podgórzyn', size: 'SMALL', zrodlo: U('photo-1441974231531-c6227db76b6e') },
	{ slug: 'kamienna-gora', nazwa: 'Kamienna Góra', size: 'BIG', zrodlo: U('photo-1464822759023-fed622ff2c3b') },
	{ slug: 'myslakowice', nazwa: 'Mysłakowice', size: 'SMALL', zrodlo: U('photo-1476514525535-07fb3b4ae5f1') },
	{ slug: 'lesna', nazwa: 'Leśna', size: 'BIG', zrodlo: U('photo-1439066615861-d1af74d74000') }
] as const;

async function wczytaj(zrodlo: string): Promise<Buffer> {
	if (zrodlo.startsWith('http')) {
		const r = await fetch(zrodlo);
		if (!r.ok) throw new Error(`HTTP ${r.status} dla ${zrodlo}`);
		return Buffer.from(await r.arrayBuffer());
	}
	return readFile(zrodlo);
}

async function main() {
	await mkdir(KATALOG, { recursive: true });

	for (const [i, r] of REGIONY.entries()) {
		const plik = `${KATALOG}/${r.slug}.jpg`;
		const url = `/regiony/${r.slug}.jpg`;

		if (!existsSync(plik)) {
			const dane = await sharp(await wczytaj(r.zrodlo))
				.rotate()
				.resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
				.jpeg({ quality: 82, mozjpeg: true })
				.toBuffer();
			await writeFile(plik, dane);
			console.log(`  zdjęcie: ${plik} (${(dane.length / 1024).toFixed(0)} kB)`);
		}

		// upsert po slugu — skrypt można puścić ponownie bez szkody.
		// Zdjęcie i punkt ostrości ustawiamy tylko przy tworzeniu, żeby nie nadpisać
		// tego, co klientka zmieni w panelu.
		await prisma.region.upsert({
			where: { slug: r.slug },
			update: { nazwa: r.nazwa, order: i },
			create: {
				slug: r.slug,
				nazwa: r.nazwa,
				image: url,
				size: r.size,
				order: i,
				focalX: 50,
				focalY: 50,
				visible: true
			}
		});
	}

	const wszystkie = await prisma.region.findMany({ orderBy: { order: 'asc' } });
	console.log(`\nGOTOWE. Regionów w bazie: ${wszystkie.length}`);
	for (const r of wszystkie) console.log(`  ${String(r.order).padStart(2)}. ${r.nazwa.padEnd(18)} ${r.size.padEnd(5)} ${r.image}`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
