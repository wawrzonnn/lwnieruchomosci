import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '$lib/db/users';
import type { Role } from '@prisma/client';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const role = data.get('role') as Role;
		const password = String(data.get('password') ?? '').trim();

		if (!name || !email) {
			return fail(400, { error: 'Podaj imię i e-mail.' });
		}
		if (await getUserByEmail(email)) {
			return fail(400, { error: 'Użytkownik z tym e-mailem już istnieje.' });
		}

		await createUser({
			name,
			email,
			role,
			password: password || Math.random().toString(36).slice(2, 10)
		});
		throw redirect(302, '/panel/uzytkownicy');
	}
};
