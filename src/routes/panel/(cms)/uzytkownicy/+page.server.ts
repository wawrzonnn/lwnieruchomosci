import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { deleteUsers, getAllUsers } from '$lib/db/users';

export const load: PageServerLoad = async () => {
	const users = await getAllUsers();
	return { users };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const ids = data
			.getAll('ids')
			.map((v) => Number(v))
			.filter((n) => !Number.isNaN(n));

		if (!ids.length) return fail(400, { error: 'Nie wybrano żadnego użytkownika.' });
		if (locals.user && ids.includes(locals.user.id)) {
			return fail(400, { error: 'Nie możesz usunąć własnego konta.' });
		}

		await deleteUsers(ids);
		return { success: true };
	}
};
