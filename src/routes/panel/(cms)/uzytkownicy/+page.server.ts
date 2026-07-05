import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { createUser, getAllUsers, getUserByEmail } from '$lib/db/users';
import type { Role } from '@prisma/client';

export const load: PageServerLoad = async () => {
	const users = await getAllUsers();
	return { users };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const role = data.get('role') as Role;

		if (!name || !email) {
			return fail(400, { error: 'Podaj imię i e-mail.' });
		}

		if (await getUserByEmail(email)) {
			return fail(400, { error: 'Użytkownik z tym e-mailem już istnieje.' });
		}

		await createUser({ name, email, role, password: Math.random().toString(36).slice(2, 10) });
		return { success: true };
	}
};
