import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

// Katalog na przesłane zdjęcia (poza static/, serwowany przez /uploads/[file]).
// Leży w korzeniu repo i jest wykluczony w .gitignore wzorcem `/uploads/`.
export const UPLOAD_DIR = join(process.cwd(), 'uploads');

/** Górna granica pojedynczego pliku. Musi zmieścić się w BODY_SIZE_LIMIT
 *  (adapter-node) i client_max_body_size (nginx) — oba ustawione na 25M. */
const MAX_BYTES = 20 * 1024 * 1024;

/** Dłuższy bok po przeskalowaniu. Galeria oferty nigdy nie pokazuje więcej. */
const MAX_EDGE = 2400;

export class UploadError extends Error {}

/**
 * Zapisuje zdjęcie oferty/artykułu/regionu.
 *
 * Wszystko przechodzi przez sharp, bo panel dostaje zdjęcia prosto z telefonu:
 * - `rotate()` stosuje orientację z EXIF (inaczej połowa zdjęć leży na boku),
 * - skalowanie w dół do 2400 px (8 MB z aparatu → ~300 kB),
 * - konwersja na WebP (jeden format do obsłużenia po stronie strony),
 * - metadane EXIF znikają — zdjęcia nieruchomości potrafią nieść współrzędne GPS,
 *   a te nie mają czego szukać w publicznej galerii.
 */
export async function saveUpload(file: File): Promise<string> {
	if (file.size > MAX_BYTES) {
		throw new UploadError(
			`Zdjęcie „${file.name}" waży ${(file.size / 1024 / 1024).toFixed(1)} MB — maksimum to 20 MB.`
		);
	}

	const wejscie = Buffer.from(await file.arrayBuffer());

	let wyjscie: Buffer;
	try {
		wyjscie = await sharp(wejscie, { failOn: 'error' })
			.rotate()
			.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
			.webp({ quality: 82, effort: 4 })
			.toBuffer();
	} catch {
		// Najczęstszy przypadek: HEIC/HEIF z iPhone'a, którego sharp bez libheif nie otworzy.
		const heic = /\.hei[cf]$/i.test(file.name) || /hei[cf]/i.test(file.type);
		throw new UploadError(
			heic
				? `„${file.name}" jest w formacie HEIC. W telefonie ustaw Aparat → Formaty → Najbardziej zgodny, albo wyślij zdjęcie jako JPG.`
				: `Nie udało się odczytać pliku „${file.name}". Dozwolone są zdjęcia JPG, PNG, WebP, AVIF i GIF.`
		);
	}

	await mkdir(UPLOAD_DIR, { recursive: true });
	const name = `${randomUUID()}.webp`;
	await writeFile(join(UPLOAD_DIR, name), wyjscie);
	return `/uploads/${name}`;
}

export async function deleteUpload(url: string): Promise<void> {
	if (!url.startsWith('/uploads/')) return;
	const name = url.replace('/uploads/', '');
	if (name.includes('/') || name.includes('..')) return;
	try {
		await unlink(join(UPLOAD_DIR, name));
	} catch {
		// plik mógł już nie istnieć — ignorujemy
	}
}
