import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { createAgent } from '$lib/db/agents';
import { parseAgentForm } from '$lib/server/agent-form';

export const actions: Actions = {
	default: async ({ request }) => {
		const parsed = parseAgentForm(await request.formData());
		if (!parsed.ok) return parsed.fail;

		await createAgent(parsed.data);
		throw redirect(302, '/panel/agenci?zapisano=agent-nowy');
	}
};
