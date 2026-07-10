import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { unsealSession } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('lw_session');

	if (session) {
		const user = unsealSession(session);
		if (user) {
			event.locals.user = user;
		} else {
			// Nieprawidłowy/sfałszowany podpis — czyścimy ciasteczko.
			event.cookies.set('lw_session', '', { path: '/', maxAge: 0 });
		}
	}

	const pathname = event.url.pathname;
	const isPanelRoute = pathname.startsWith('/panel') && pathname !== '/panel';

	if (isPanelRoute && !event.locals.user) {
		throw redirect(302, '/panel');
	}

	if (pathname === '/panel' && event.locals.user) {
		throw redirect(302, '/panel/oferty');
	}

	return resolve(event);
};
