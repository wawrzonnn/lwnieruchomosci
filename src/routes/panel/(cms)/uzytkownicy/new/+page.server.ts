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

		// Wszystkie gałęzie zwracają ten sam kształt, żeby formularz mógł
		// odtworzyć wpisane wartości zamiast czyścić je przy każdym błędzie.
		if (!name || !email) {
			return fail(400, { error: 'Podaj imię i e-mail.', name, email });
		}
		if (await getUserByEmail(email)) {
			return fail(400, { error: 'Użytkownik z tym e-mailem już istnieje.', name, email });
		}
		// Wcześniej puste pole dawało losowe hasło, którego NIKT nigdy nie widział —
		// konto powstawało i od razu było nie do zalogowania.
		if (password.length < 10) {
			return fail(400, {
				error: 'Podaj hasło dla nowego konta — co najmniej 10 znaków. Przekaż je potem użytkownikowi.',
				name,
				email
			});
		}

		await createUser({ name, email, role, password });
		throw redirect(302, '/panel/uzytkownicy?zapisano=uzytkownik');
	}
};
