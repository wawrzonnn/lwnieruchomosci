import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { deleteAgent, getAllAgents } from '$lib/db/agents';

export const load: PageServerLoad = async () => {
	const agenci = await getAllAgents();
	return { agenci };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Brak identyfikatora agenta.' });

		// Oferty NIE znikają — relacja ma onDelete: SetNull. Mówimy tylko, ile
		// z nich zostało bez opiekuna, żeby nie było to cichą zmianą.
		const { osierocone } = await deleteAgent(id);
		return {
			success: true,
			info: osierocone
				? `Agent usunięty. ${osierocone} ${osierocone === 1 ? 'oferta została' : 'ofert zostało'} bez opiekuna — przypisz kogoś w edycji oferty.`
				: 'Agent usunięty.'
		};
	}
};
