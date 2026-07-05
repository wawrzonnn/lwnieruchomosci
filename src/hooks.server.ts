import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('lw_session');

	if (session) {
		try {
			event.locals.user = JSON.parse(session);
		} catch {
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
