import type { Actions } from "./$types";
import { submitLead } from "$lib/server/lead-form";

export const actions: Actions = {
	default: async ({ request }) =>
		submitLead(await request.formData(), {
			type: "SERVICE",
			subject: "Doradztwo kredytowe",
			extra: [{ key: "amount", label: "Kwota" }, { key: "purpose", label: "Cel" }]
		})
};
