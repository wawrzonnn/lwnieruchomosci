import type { Actions } from "./$types";
import { submitLead } from "$lib/server/lead-form";

export const actions: Actions = {
	default: async ({ request }) =>
		submitLead(await request.formData(), {
			type: "SERVICE",
			subject: "Kupno nieruchomości",
			extra: [{ key: "type", label: "Rodzaj" }, { key: "budget", label: "Budżet" }]
		})
};
