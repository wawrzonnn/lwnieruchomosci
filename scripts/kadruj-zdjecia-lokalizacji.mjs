// Przycina zdjęcia od klientki na dwa formaty:
//  - banner (hero podstrony lokalizacji)  -> 2400x1200, static/lokalizacje/<slug>.jpg
//  - kafelek (LP + /lokalizacje)          -> 1200x1200, static/regiony/<slug>.jpg
// Kadry dobrane ręcznie pod każde zdjęcie (nieba jest dużo, środek kadru bywa pusty).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'C:/Users/Lenovo/Downloads';
const OUT = 'C:/Users/Lenovo/Desktop/platformy/platformy/lwnieruchomosci/static';

const zdjecia = [
	{
		slug: 'piechowice',
		plik: 'Skan_20260824-2129-04.jpg',
		hero: { left: 0, top: 360, width: 1440, height: 720 },
		kafel: { left: 180, top: 0, width: 1080, height: 1080 }
	},
	{
		slug: 'szklarska-poreba',
		plik: 'Skan_20260824-2129-08.jpg',
		hero: { left: 0, top: 240, width: 1440, height: 720 },
		kafel: { left: 180, top: 0, width: 1080, height: 1080 }
	},
	{
		// zdjęcie pionowe — kadr na pierzeję z wieżą kościoła, bruk zostaje na dole
		slug: 'kowary',
		plik: 'Skan_20260824-2129-06.jpg',
		hero: { left: 0, top: 200, width: 1080, height: 540 },
		kafel: { left: 0, top: 120, width: 1080, height: 1080 }
	},
	{
		slug: 'myslakowice',
		plik: 'Skan_20260824-2129-09.jpg',
		hero: { left: 0, top: 1428, width: 5712, height: 2856 },
		kafel: { left: 714, top: 0, width: 4284, height: 4284 }
	},
	{
		slug: 'karpacz',
		plik: 'Skan_20260824-2129-10.jpg',
		hero: { left: 0, top: 1008, width: 4032, height: 2016 },
		kafel: { left: 504, top: 0, width: 3024, height: 3024 }
	},
	{
		slug: 'sosnowka',
		plik: 'Skan_20260824-2129-11.jpg',
		hero: { left: 0, top: 1428, width: 5712, height: 2856 },
		kafel: { left: 714, top: 0, width: 4284, height: 4284 }
	},
	{
		// zdjęcie pionowe — kadr węższy niż oryginał, żeby kościół wyszedł ze środka w prawo
		slug: 'staniszow',
		plik: 'Skan_20260824-2129-13.jpg',
		hero: { left: 0, top: 1800, width: 3400, height: 1700 },
		kafel: { left: 0, top: 1327, width: 3400, height: 3400 }
	}
];

mkdirSync(join(OUT, 'lokalizacje'), { recursive: true });
mkdirSync(join(OUT, 'regiony'), { recursive: true });

for (const z of zdjecia) {
	const src = join(SRC, z.plik);

	await sharp(src)
		.extract(z.hero)
		.resize(2400, 1200)
		.jpeg({ quality: 82, mozjpeg: true })
		.toFile(join(OUT, 'lokalizacje', `${z.slug}.jpg`));

	await sharp(src)
		.extract(z.kafel)
		.resize(1200, 1200)
		.jpeg({ quality: 82, mozjpeg: true })
		.toFile(join(OUT, 'regiony', `${z.slug}.jpg`));

	console.log(`${z.slug}: banner + kafelek OK  (${z.plik})`);
}
