// Treść podstrony „Kontakt" (/kontakt).
// Hero to zdjęcie klientki ze static/karkonosze/. Mapa to Google embed.

export const seo = {
	title: 'Kontakt – LW Nieruchomości Jelenia Góra i Karkonosze',
	description:
		'Skontaktuj się z LW Nieruchomości – telefon, e-mail, formularz, mapa i godziny pracy. Jelenia Góra i Kotlina Jeleniogórska.'
};

export const breadcrumbs = [{ label: 'Strona główna', href: '/' }, { label: 'Kontakt' }];

export const hero = {
	eyebrow: 'Kontakt',
	tytul: 'Porozmawiajmy o Twojej nieruchomości',
	tytulEmfaza: 'nieruchomości',
	podtytul:
		'Bez zobowiązań i bez presji. Zadzwoń, napisz lub zostaw wiadomość – odpowiemy po ludzku i konkretnie.',
	// Świerki po lewej stronie kadru trzymają biały tekst na ciemnym tle — patrz
	// gradient w .hero-contact (ciemno po lewej, jaśniej w prawo).
	tlo: '/karkonosze/swierki-panorama-doliny.jpg'
};

export const dane = {
	telefon: '+48 690 008 273',
	email: 'biuro@lw.nieruchomosci.pl',
	adres: '58-506 Jelenia Góra · Kotlina Jeleniogórska'
};

export const godziny = [
	{ d: 'Poniedziałek – Piątek', h: '9:00 – 17:00' },
	{ d: 'Sobota', h: 'po umówieniu' },
	{ d: 'Niedziela', h: 'zamknięte' }
];

// Realne profile firmy (zgodne z tymi używanymi w stopce landing page).
export const social = [
	{ nazwa: 'Facebook', znak: 'f', href: 'https://www.facebook.com/profile.php?id=61564944833164' },
	{ nazwa: 'Instagram', znak: 'IG', href: 'https://www.instagram.com/lw.nieruchomoscijg' },
	{ nazwa: 'TikTok', znak: 'TT', href: 'https://www.tiktok.com/@lw.nieruchomosci' }
];

export const formularz = {
	eyebrow: 'Napisz do nas',
	tytul: 'Wyślij wiadomość',
	przycisk: 'Wyślij wiadomość',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Odebraliśmy Twoją wiadomość i odezwiemy się najszybciej, jak to możliwe.'
	}
};

export const mapaEmbed =
	'https://maps.google.com/maps?q=Jelenia+G%C3%B3ra,+58-506&z=12&output=embed';
