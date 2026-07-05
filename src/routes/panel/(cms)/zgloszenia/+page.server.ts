import type { PageServerLoad, Actions } from './$types';
import { getAllInquiries, updateInquiryStatus } from '$lib/db/inquiries';
import { INQUIRY_STATUS_FLOW } from '$lib/utils';
import type { InquiryStatus } from '@prisma/client';

export const load: PageServerLoad = async () => {
	const inquiries = await getAllInquiries();
	return { inquiries };
};

export const actions: Actions = {
	cycleStatus: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const current = String(data.get('status'));
		await updateInquiryStatus(id, INQUIRY_STATUS_FLOW[current] as InquiryStatus);
		return { success: true };
	}
};
