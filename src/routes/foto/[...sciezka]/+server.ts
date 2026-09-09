import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

/**
 * Miniatury zdjęć ofert.
 *
 * Karty ofert pokazują zdjęcie w boksie ~290×200, a w bazie leżą oryginały do
 * 2400×1800. Zmierzone na dławionym CPU: zdekodowanie jednego takiego zdjęcia
 * to 204 ms, a kompletu sześciu kart — 588 ms. Przy przewijaniu karuzeli każda
 * wjeżdżająca karta gubiła przez to klatki.
 *
 *   /foto/uploads/<plik>?w=600
 *   /foto/oferty-media/<katalog>/<plik>?w=600
 *
 * Wynik jest cache'owany na dysku, więc sharp pracuje raz na (plik, szerokość).
 */

// Tylko te dwa katalogi — nic poza nimi nie może być odczytane.
const ZRODLA: Record<string, string[]> = {
	uploads: [join(process.cwd(), 'uploads')],
	'oferty-media': [
		join(process.cwd(), 'static', 'oferty-media'),
		// po zbudowaniu adapter-node trzyma kopię statyków tutaj
		join(process.cwd(), 'build', 'client', 'oferty-media')
	]
};

/** Zamknięty zestaw szerokości — inaczej dowolne ?w= rozsadziłoby cache. */
const SZEROKOSCI = [320, 480, 640, 900, 1400];
const CACHE = join(process.cwd(), 'uploads', '_miniatury');

function bezpiecznaSciezka(sciezka: string) {
	const czysta = normalize(sciezka).replace(/^(\.\.[/\\])+/, '');
	if (czysta.includes('..') || czysta.startsWith('/') || czysta.startsWith('\\')) return null;
	const [katalog, ...reszta] = czysta.split(/[/\\]/);
	if (!ZRODLA[katalog] || !reszta.length) return null;
	return { katalog, reszta };
}

export const GET: RequestHandler = async ({ params, url, setHeaders }) => {
	const cel = bezpiecznaSciezka(params.sciezka ?? '');
	if (!cel) throw error(400, 'Nieprawidłowa ścieżka');

	const zadana = Number(url.searchParams.get('w')) || 640;
	const szerokosc = SZEROKOSCI.reduce((a, b) =>
		Math.abs(b - zadana) < Math.abs(a - zadana) ? b : a
	);

	const klucz = createHash('sha1')
		.update(`${cel.katalog}/${cel.reszta.join('/')}@${szerokosc}`)
		.digest('hex');
	const plikCache = join(CACHE, `${klucz}.webp`);

	// Nagłówki dokładamy dopiero przy udanej odpowiedzi. Ustawione wcześniej
	// trafiały też na 404 — a rok „immutable" na braku pliku oznacza, że
	// przeglądarka nie zauważyłaby zdjęcia dodanego minutę później.
	const oddaj = (buf: Buffer) => {
		setHeaders({
			'Content-Type': 'image/webp',
			'Cache-Control': 'public, max-age=31536000, immutable'
		});
		return new Response(new Uint8Array(buf));
	};

	// 1) gotowa miniatura
	try {
		return oddaj(await readFile(plikCache));
	} catch {
		// brak w cache — generujemy niżej
	}

	// 2) oryginał (pierwszy katalog, w którym plik istnieje)
	let oryginal: Buffer | null = null;
	for (const katalog of ZRODLA[cel.katalog]) {
		try {
			oryginal = await readFile(join(katalog, ...cel.reszta));
			break;
		} catch {
			// próbujemy następnego
		}
	}
	if (!oryginal) throw error(404, 'Nie znaleziono pliku');

	let mini: Buffer;
	try {
		mini = await sharp(oryginal)
			.rotate()
			.resize({ width: szerokosc, withoutEnlargement: true })
			.webp({ quality: 78, effort: 4 })
			.toBuffer();
	} catch {
		// Czegoś, czego sharp nie otworzy, nie udajemy — lepiej 404 niż zepsuty obraz.
		throw error(415, 'Nieobsługiwany format obrazu');
	}

	// Zapis do cache jest ubocznym efektem — jego błąd nie może wywrócić odpowiedzi.
	void mkdir(CACHE, { recursive: true })
		.then(() => writeFile(plikCache, mini))
		.catch((e) => console.error('[foto] nie udało się zapisać miniatury:', e?.message));

	return oddaj(mini);
};
