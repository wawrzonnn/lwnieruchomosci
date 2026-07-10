import type { Actions } from "./$types";
import { submitLead } from "$lib/server/lead-form";

export const actions: Actions = {
	default: async ({ request }) =>
		submitLead(await request.formData(), {
			type: "CONTACT",
			subject: "Kontakt",
			extra: [{ key: "topic", label: "Temat" }]
		})
};
