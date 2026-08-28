import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { UPLOAD_DIR } from '$lib/server/uploads';

const MIME: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.gif': 'image/gif'
};

export const GET: RequestHandler = async ({ params }) => {
	const name = params.file;
	if (!name || name.includes('/') || name.includes('..')) throw error(400, 'Nieprawidłowa ścieżka');

	try {
		const data = await readFile(join(UPLOAD_DIR, name));
		const type = MIME[extname(name).toLowerCase()] ?? 'application/octet-stream';
		return new Response(new Uint8Array(data), {
			headers: {
				'Content-Type': type,
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});
	} catch {
		throw error(404, 'Nie znaleziono pliku');
	}
};
