import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getAgentById, updateAgent } from '$lib/db/agents';
import { parseAgentForm } from '$lib/server/agent-form';

export const load: PageServerLoad = async ({ params }) => {
	const agent = await getAgentById(Number(params.id));
	if (!agent) throw error(404, 'Nie znaleziono agenta');
	return { agent };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.id);
		if (!(await getAgentById(id))) throw error(404, 'Nie znaleziono agenta');

		const parsed = parseAgentForm(await request.formData());
		if (!parsed.ok) return parsed.fail;

		await updateAgent(id, parsed.data);
		throw redirect(302, '/panel/agenci?zapisano=agent');
	}
};
