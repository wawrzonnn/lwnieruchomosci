import type { LayoutServerLoad } from './$types';
import { getNewInquiriesCount } from '$lib/db/inquiries';

export const load: LayoutServerLoad = async ({ locals }) => {
	const newInquiries = await getNewInquiriesCount();
	return { user: locals.user!, newInquiries };
};
