import { fail, type ActionFailure } from '@sveltejs/kit';
import type { AgentData } from '$lib/db/agents';

export type ParsedAgent =
	| { ok: true; data: AgentData }
	| { ok: false; fail: ActionFailure<{ error: string }> };

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

/** Zostawia cyfry, spacje i wiodący plus — tak, jak numer ma być pokazany. */
function normalizujTelefon(v: string) {
	return v.replace(/[^\d+\s]/g, '').replace(/\s+/g, ' ').trim();
}

export function parseAgentForm(data: FormData): ParsedAgent {
	const imie = str(data.get('imie'));
	const telefon = normalizujTelefon(str(data.get('telefon')));

	if (!imie) {
		return { ok: false, fail: fail(400, { error: 'Podaj imię i nazwisko agenta.' }) };
	}
	// Bez telefonu karta agenta na ofercie traci sens — to jedyna akcja, jaką daje.
	if (telefon.replace(/\D/g, '').length < 9) {
		return { ok: false, fail: fail(400, { error: 'Podaj poprawny numer telefonu (min. 9 cyfr).' }) };
	}

	return {
		ok: true,
		data: {
			imie,
			rola: str(data.get('rola')) || null,
			telefon,
			image: str(data.get('image')) || null,
			aktywny: data.get('aktywny') != null,
			order: Math.max(0, Math.round(Number(data.get('order')) || 0))
		}
	};
}
