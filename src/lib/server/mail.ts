import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

/**
 * Powiadomienia e-mail o zgłoszeniach z formularzy.
 *
 * Zasada nadrzędna: zgłoszenie jest już zapisane w bazie, zanim tu trafimy.
 * Poczta to wyłącznie wygoda (żeby nie trzeba było zaglądać do panelu), więc
 * ŻADEN błąd wysyłki nie może wywrócić formularza — wszystko łapiemy i logujemy.
 *
 * Konfiguracja przez zmienne środowiskowe (patrz .env.example). Gdy brak
 * SMTP_HOST/SMTP_USER/SMTP_PASS, wysyłka jest po prostu wyłączona.
 */

const HOST = env.SMTP_HOST ?? '';
const PORT = Number(env.SMTP_PORT ?? 465);
const USER = env.SMTP_USER ?? '';
const PASS = env.SMTP_PASS ?? '';
const NADAWCA = env.MAIL_FROM || USER;
const ODBIORCA = env.MAIL_TO || 'biuro@lw.nieruchomosci.pl';

export function pocztaSkonfigurowana(): boolean {
	return Boolean(HOST && USER && PASS);
}

let transport: nodemailer.Transporter | null = null;
function dajTransport() {
	if (!transport) {
		transport = nodemailer.createTransport({
			host: HOST,
			port: PORT,
			// 465 = SSL od razu, 587 = STARTTLS
			secure: PORT === 465,
			auth: { user: USER, pass: PASS }
		});
	}
	return transport;
}

export interface PowiadomienieZgloszenie {
	subject: string;
	name: string;
	contact: string;
	message: string;
	/** adres nadawcy, jeśli podał — trafia w Reply-To, żeby dało się odpisać jednym kliknięciem */
	replyTo?: string;
	/** link do oferty/podstrony, z której przyszło zgłoszenie */
	zrodlo?: string;
}

const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Wysyła powiadomienie o nowym zgłoszeniu. Nigdy nie rzuca.
 * Zwraca true tylko przy faktycznie wysłanej wiadomości.
 */
export async function powiadomOZgloszeniu(z: PowiadomienieZgloszenie): Promise<boolean> {
	if (!pocztaSkonfigurowana()) {
		console.warn(
			`[mail] Poczta nieskonfigurowana (brak SMTP_HOST/SMTP_USER/SMTP_PASS) — zgłoszenie „${z.subject}" zapisane tylko w panelu.`
		);
		return false;
	}

	const tekst = [
		`Nowe zgłoszenie ze strony: ${z.subject}`,
		'',
		`Od:      ${z.name}`,
		`Kontakt: ${z.contact}`,
		z.zrodlo ? `Strona:  ${z.zrodlo}` : null,
		'',
		'Treść:',
		z.message,
		'',
		'—',
		'Wiadomość wygenerowana automatycznie przez lw.nieruchomosci.pl.',
		'Zgłoszenie jest też widoczne w panelu: /panel/zgloszenia'
	]
		.filter((l) => l !== null)
		.join('\n');

	const html = `
<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;color:#23271f;line-height:1.6">
  <p style="margin:0 0 14px"><strong>Nowe zgłoszenie ze strony:</strong> ${esc(z.subject)}</p>
  <table style="border-collapse:collapse;margin-bottom:16px">
    <tr><td style="padding:2px 14px 2px 0;color:#6b7264">Od</td><td><strong>${esc(z.name)}</strong></td></tr>
    <tr><td style="padding:2px 14px 2px 0;color:#6b7264">Kontakt</td><td>${esc(z.contact)}</td></tr>
    ${z.zrodlo ? `<tr><td style="padding:2px 14px 2px 0;color:#6b7264">Strona</td><td>${esc(z.zrodlo)}</td></tr>` : ''}
  </table>
  <div style="white-space:pre-wrap;padding:14px 16px;background:#f7f4ec;border-radius:10px">${esc(z.message)}</div>
  <p style="margin:18px 0 0;font-size:12.5px;color:#8a9080">
    Wiadomość wygenerowana automatycznie. Zgłoszenie jest też w panelu → Zgłoszenia.
  </p>
</div>`;

	try {
		// Twardy limit czasu — użytkownik czeka na odpowiedź formularza.
		await Promise.race([
			dajTransport().sendMail({
				from: `"LW Nieruchomości — strona" <${NADAWCA}>`,
				to: ODBIORCA,
				replyTo: z.replyTo || undefined,
				subject: `Nowe zgłoszenie: ${z.subject} — ${z.name}`,
				text: tekst,
				html
			}),
			new Promise((_, odrzuc) =>
				setTimeout(() => odrzuc(new Error('przekroczono 10 s')), 10_000)
			)
		]);
		return true;
	} catch (e) {
		console.error('[mail] Nie udało się wysłać powiadomienia:', e instanceof Error ? e.message : e);
		return false;
	}
}
