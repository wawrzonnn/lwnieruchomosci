import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { saveUpload, UploadError } from '$lib/server/uploads';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) throw error(401, 'Sesja wygasła — zaloguj się ponownie.');

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		// adapter-node odrzuca ciało powyżej BODY_SIZE_LIMIT jeszcze przed handlerem,
		// ale przy zerwanym połączeniu w trakcie wysyłki lądujemy tutaj.
		throw error(
			413,
			'Zdjęcia są za duże albo połączenie zostało przerwane. Spróbuj wysłać mniej naraz.'
		);
	}

	const files = form.getAll('files').filter((f): f is File => f instanceof File && f.size > 0);
	if (files.length === 0) throw error(400, 'Nie wybrano żadnego pliku.');

	// Jeden zły plik nie może przerwać całej partii — przy wyborze 20 zdjęć
	// z telefonu jeden HEIC unieważniałby pozostałe 19.
	const urls: string[] = [];
	const pominiete: { nazwa: string; powod: string }[] = [];

	for (const file of files) {
		try {
			urls.push(await saveUpload(file));
		} catch (e) {
			if (e instanceof UploadError) {
				pominiete.push({ nazwa: file.name, powod: e.message });
			} else {
				console.error('[uploads] nieoczekiwany błąd zapisu:', e);
				pominiete.push({
					nazwa: file.name,
					powod: `Nie udało się zapisać „${file.name}". Spróbuj ponownie.`
				});
			}
		}
	}

	// Nic nie przeszło — to już błąd, a nie ostrzeżenie.
	if (urls.length === 0) {
		throw error(400, pominiete.map((p) => p.powod).join(' '));
	}

	return json({ urls, pominiete });
};
