import { fail, type ActionFailure } from '@sveltejs/kit';
import type { InquiryType } from '@prisma/client';
import { createInquiry } from '$lib/db/inquiries';

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

export type LeadResult = { success: true } | ActionFailure<{ error: string }>;

export interface LeadOptions {
	type: InquiryType;
	subject: string;
	// Dodatkowe pola formularza (poza name/phone/email/message) dopisywane do treści.
	extra?: { key: string; label: string }[];
	listingId?: number;
}

// Wspólna obsługa formularzy kontaktowych/usługowych → zapis do bazy jako Inquiry.
// (Wysyłkę e-mail dołożymy tu później, obok createInquiry.)
export async function submitLead(data: FormData, opts: LeadOptions): Promise<LeadResult> {
	// Honeypot — pole ukryte dla ludzi; jeśli wypełnione, to bot: udajemy sukces, nie zapisujemy.
	if (str(data.get('company'))) {
		return { success: true };
	}

	const name = str(data.get('name'));
	const phone = str(data.get('phone'));
	const email = str(data.get('email'));
	const message = str(data.get('message'));

	if (!name) {
		return fail(400, { error: 'Podaj imię i nazwisko.' });
	}
	if (!phone && !email) {
		return fail(400, { error: 'Podaj telefon lub e-mail, żebyśmy mogli się odezwać.' });
	}

	const contact = [phone && `tel: ${phone}`, email && `e-mail: ${email}`].filter(Boolean).join(' · ');

	const extraLines = (opts.extra ?? [])
		.map(({ key, label }) => {
			const val = str(data.get(key));
			return val ? `• ${label}: ${val}` : null;
		})
		.filter(Boolean);

	const messageParts = [message, extraLines.length ? extraLines.join('\n') : null].filter(Boolean);
	const composed = messageParts.join('\n\n') || `Zgłoszenie z formularza: ${opts.subject}`;

	await createInquiry({
		type: opts.type,
		subject: opts.subject,
		name,
		contact,
		message: composed,
		listingId: opts.listingId
	});

	return { success: true };
}

// Newsletter — tylko e-mail; też zapisujemy jako Inquiry, by nie zgubić zapisu.
export async function submitNewsletter(data: FormData, source: string): Promise<LeadResult> {
	if (str(data.get('company'))) {
		return { success: true };
	}
	const email = str(data.get('email'));
	if (!email) {
		return fail(400, { error: 'Podaj adres e-mail.' });
	}
	await createInquiry({
		type: 'NEWSLETTER',
		subject: `Newsletter — ${source}`,
		name: 'Zapis newsletter',
		contact: `e-mail: ${email}`,
		message: `Zapis do newslettera ze strony: ${source}`
	});
	return { success: true };
}
