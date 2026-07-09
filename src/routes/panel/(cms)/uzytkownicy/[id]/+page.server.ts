import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { getUserByEmail, getUserById, updateUser } from '$lib/db/users';
import type { Role } from '@prisma/client';

export const load: PageServerLoad = async ({ params }) => {
	const user = await getUserById(Number(params.id));
	if (!user) throw error(404, 'Nie znaleziono użytkownika');
	return { user };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.id);
		const existing = await getUserById(id);
		if (!existing) throw error(404, 'Nie znaleziono użytkownika');

		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const role = data.get('role') as Role;
		const password = String(data.get('password') ?? '').trim();

		if (!name || !email) {
			return fail(400, { error: 'Podaj imię i e-mail.' });
		}
		const byEmail = await getUserByEmail(email);
		if (byEmail && byEmail.id !== id) {
			return fail(400, { error: 'Użytkownik z tym e-mailem już istnieje.' });
		}

		await updateUser(id, { name, email, role, password: password || undefined });
		throw redirect(302, '/panel/uzytkownicy');
	}
};
