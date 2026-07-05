import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.set('lw_session', '', { path: '/', maxAge: 0 });
	throw redirect(302, '/panel');
};
