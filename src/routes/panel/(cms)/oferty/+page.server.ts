import type { PageServerLoad, Actions } from './$types';
import { deleteListing, getAdminStats, getAllListings } from '$lib/db/listings';
import { deleteUpload } from '$lib/server/uploads';
import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async () => {
	const [listings, stats] = await Promise.all([getAllListings(), getAdminStats()]);
	return { listings, stats };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const images = await prisma.listingImage.findMany({ where: { listingId: id } });
		await deleteListing(id);
		for (const img of images) await deleteUpload(img.url);
		return { success: true };
	}
};
