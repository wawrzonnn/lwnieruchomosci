import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { verifyPassword } from '$lib/db/users';
import { sealSession } from '$lib/server/session';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim();
		const password = String(data.get('password') ?? '');

		const user = await verifyPassword(email, password);
		if (!user) {
			return fail(400, { error: 'Nieprawidłowy e-mail lub hasło.', email });
		}

		cookies.set(
			'lw_session',
			sealSession({ id: user.id, email: user.email, name: user.name, role: user.role }),
			{ path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 }
		);

		throw redirect(302, '/panel/oferty');
	}
};
