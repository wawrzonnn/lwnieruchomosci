// Jednorazowy skrypt: pobiera ORYGINAŁY zdjęć ofert ze starej strony (lw.nieruchomosci.pl)
// i podmienia nimi nasze miniaturki w static/oferty-media/<idOferty>/<n>.jpg.
//
// Dlaczego: pierwotny scraper wziął miniaturki 863x575 z bielą wypaloną w pliku (każde zdjęcie
// było wklejone na sztywne płótno 3:2 — pionowe dostawały po ~216px białych pasów z boków).
// Oryginały pod /photos/<galeria>/<n>.jpg mają pełną rozdzielczość i żadnych pasów.
//
// Nazwy plików i wpisy w bazie zostają bez zmian — podmieniana jest tylko zawartość.
// Uruchomienie:  node scripts/pobierz-oryginaly-zdjec.mjs [--zapis]
// Bez --zapis robi przebieg próbny (nic nie nadpisuje).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import sharp from 'sharp';

const BAZA = 'https://www.lw.nieruchomosci.pl';
const MEDIA = 'static/oferty-media';
const ZAPIS = process.argv.includes('--zapis');
const DLUGI_BOK = 1600;
const JAKOSC = 82;

const pobierzHtml = async (u) => (await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();

async function pobierzPlik(u) {
	const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } });
	if (!r.ok) throw new Error(`HTTP ${r.status}`);
	return Buffer.from(await r.arrayBuffer());
}

// proporcje treści naszej miniaturki po odjęciu białych pasów — do kontroli kolejności
async function proporcjaPoObcieciu(sciezka) {
	try {
		const { info } = await sharp(readFileSync(sciezka))
			.trim({ background: '#ffffff', threshold: 12 })
			.toBuffer({ resolveWithObject: true });
		return info.width / info.height;
	} catch {
		return null;
	}
}

// 1. adresy ofert (paginacja starej strony: strona 1 = 12, strona 2 = 6)
const linki = new Set();
for (const p of [1, 2]) {
	const html = await pobierzHtml(`${BAZA}/oferty?page=${p}`);
	for (const m of html.matchAll(/href="([^"]*\/oferta\/(\d+)-[^"]*)"/g)) linki.add(m[1]);
}
console.log(`Ofert: ${linki.size}   tryb: ${ZAPIS ? 'ZAPIS' : 'próbny (bez zapisu)'}\n`);

let ok = 0;
let rozjazdy = 0;
let bledy = 0;
let bajtyPrzed = 0;
let bajtyPo = 0;

for (const link of [...linki].sort()) {
	const url = link.startsWith('http') ? link : BAZA + link;
	const id = url.match(/\/oferta\/(\d+)-/)[1];
	const html = await pobierzHtml(url);
	const foty = [...new Set([...html.matchAll(/\/photos\/\d+\/\d+\.jpg/g)].map((m) => m[0]))];

	for (let i = 0; i < foty.length; i++) {
		const cel = `${MEDIA}/${id}/${i + 1}.jpg`;
		if (!existsSync(cel)) {
			console.log(`  ! ${cel} — brak pliku docelowego, pomijam`);
			bledy++;
			continue;
		}
		try {
			const oryginal = await pobierzPlik(BAZA + foty[i]);
			const wynik = await sharp(oryginal)
				.rotate() // uwzględnij orientację z EXIF
				.resize({ width: DLUGI_BOK, height: DLUGI_BOK, fit: 'inside', withoutEnlargement: true })
				.jpeg({ quality: JAKOSC, mozjpeg: true })
				.toBuffer({ resolveWithObject: true });

			const propNowa = wynik.info.width / wynik.info.height;
			const propStara = await proporcjaPoObcieciu(cel);
			const zgodne = propStara === null || Math.abs(propNowa - propStara) < 0.08;
			if (!zgodne) {
				console.log(
					`  !! ${cel}: proporcje się nie zgadzają (nasza treść ${propStara?.toFixed(2)} vs oryginał ${propNowa.toFixed(2)}) — możliwy inny porządek zdjęć`
				);
				rozjazdy++;
			}

			bajtyPrzed += readFileSync(cel).length;
			bajtyPo += wynik.data.length;
			if (ZAPIS) writeFileSync(cel, wynik.data);
			ok++;
		} catch (e) {
			console.log(`  ! ${cel}: ${e.message}`);
			bledy++;
		}
	}
	process.stdout.write(`oferta ${id}: ${foty.length} zdjęć\n`);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1) + ' MB';
console.log(`\nPrzetworzone: ${ok}   rozjazdy proporcji: ${rozjazdy}   błędy: ${bledy}`);
console.log(`Rozmiar: ${mb(bajtyPrzed)} -> ${mb(bajtyPo)}`);
if (!ZAPIS) console.log('\nTo był przebieg próbny. Uruchom z --zapis, żeby podmienić pliki.');
