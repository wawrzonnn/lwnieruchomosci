import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { randomUUID } from 'node:crypto';

// Katalog na przesłane zdjęcia (poza static/, serwowany przez /uploads/[file]).
export const UPLOAD_DIR = join(process.cwd(), 'uploads');

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

export async function saveUpload(file: File): Promise<string> {
	const ext = extname(file.name).toLowerCase() || '.jpg';
	if (!ALLOWED.has(ext)) {
		throw new Error(`Niedozwolony format pliku: ${ext}`);
	}
	await mkdir(UPLOAD_DIR, { recursive: true });
	const name = `${randomUUID()}${ext}`;
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(join(UPLOAD_DIR, name), buffer);
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
