import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';

export interface SessionUser {
	id: number;
	email: string;
	name: string;
	role: 'ADMIN' | 'AGENT';
}

// Klucz HMAC do podpisu ciasteczka sesji. Preferujemy dedykowany AUTH_SECRET;
// gdy go brak — używamy DATABASE_URL (zawsze ustawiony lokalnie i na Netlify),
// dzięki czemu podpis działa bez dokładania zmiennej środowiskowej.
function key(): string {
	return env.AUTH_SECRET || env.DATABASE_URL || 'lw-dev-fallback-secret';
}

const b64url = (s: string) => Buffer.from(s, 'utf8').toString('base64url');
const unb64url = (s: string) => Buffer.from(s, 'base64url').toString('utf8');

function sign(payload: string): string {
	return createHmac('sha256', key()).update(payload).digest('base64url');
}

export function sealSession(user: SessionUser): string {
	const payload = JSON.stringify(user);
	return `${b64url(payload)}.${sign(payload)}`;
}

// Zwraca użytkownika tylko, gdy podpis się zgadza — inaczej null (sfałszowane
// lub uszkodzone ciasteczko traktujemy jak brak sesji).
export function unsealSession(cookie: string | undefined | null): SessionUser | null {
	if (!cookie) return null;
	const dot = cookie.lastIndexOf('.');
	if (dot < 1) return null;

	const body = cookie.slice(0, dot);
	const sig = cookie.slice(dot + 1);

	let payload: string;
	try {
		payload = unb64url(body);
	} catch {
		return null;
	}

	const expected = sign(payload);
	const a = Buffer.from(sig);
	const b = Buffer.from(expected);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

	try {
		const user = JSON.parse(payload);
		if (typeof user?.id === 'number' && (user.role === 'ADMIN' || user.role === 'AGENT')) {
			return user as SessionUser;
		}
		return null;
	} catch {
		return null;
	}
}
