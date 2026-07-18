// Treść podstrony „Doradztwo kredytowe" (/doradztwo-kredytowe).
// Zdjęcia hero/opisu to placeholdery Unsplash — do podmiany na realne.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Doradztwo kredytowe — LW Nieruchomości Jelenia Góra',
	description:
		'Doradztwo kredytowe w Jeleniej Górze i Karkonoszach — bezpłatne sprawdzenie zdolności, porównanie ofert banków, pomoc w dokumentach i prowadzenie wniosku.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Doradztwo kredytowe' }
];

export const hero = {
	eyebrow: 'Usługa · Doradztwo kredytowe',
	tytul: 'Doradztwo kredytowe dla klientów LW Nieruchomości',
	tytulEmfaza: 'kredytowe',
	podtytul:
		'Zakup nieruchomości nie kończy się na znalezieniu odpowiedniego domu czy mieszkania. Jeśli planujesz finansowanie kredytem hipotecznym, zapewniamy dostęp do sprawdzonych doradców kredytowych, którzy pomogą wybrać najlepsze rozwiązanie i przeprowadzą Cię przez cały proces.',
	tlo: U('photo-1554224155-6726b3ff858f', 1600),
	cta: [{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' }]
};

export const opis = {
	eyebrow: 'Wygodne finansowanie',
	bloki: [
		{
			tytul: 'Nie musisz szukać wszystkiego samodzielnie',
			tekst: 'Zakup nieruchomości i uzyskanie kredytu to dwa procesy, które powinny się wzajemnie uzupełniać. Dlatego współpracujemy z doświadczonymi doradcami kredytowymi, aby nasi klienci mogli w jednym miejscu otrzymać kompleksowe wsparcie.'
		},
		{
			tytul: 'Dlaczego to wygodne?',
			tekst: 'Nie musisz samodzielnie szukać doradcy kredytowego ani koordynować dwóch niezależnych procesów. Zakup nieruchomości i finansowanie są prowadzone równolegle, dzięki czemu cały proces jest prostszy, bardziej uporządkowany i pozwala zaoszczędzić czas.'
		}
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Planujesz zakup nieruchomości z kredytem?',
	podtytul:
		'Powiedz nam, czego szukasz. Pomożemy Ci znaleźć odpowiednią nieruchomość i skontaktujemy Cię ze sprawdzonym doradcą kredytowym.',
	przycisk: 'Umów spotkanie',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Mamy Twoje zgłoszenie. Doradca odezwie się i bezpłatnie sprawdzi Twoją zdolność kredytową.'
	},
	kontakt: {
		telefon: '+48 690 008 273',
		email: 'biuro@lw.nieruchomosci.pl',
		godziny: 'Pon–Pt: 9:00–17:00'
	}
};

export const powiazane = [
	{
		t: 'Sprzedaż nieruchomości',
		slug: '/sprzedaz-nieruchomosci',
		d: 'Sprzedamy Twoją nieruchomość — od wyceny po akt notarialny.'
	},
	{
		t: 'Kupno nieruchomości',
		slug: '/kupno-nieruchomosci',
		d: 'Znajdziemy i wynegocjujemy nieruchomość dla Ciebie.'
	},
	{
		t: 'Wycena nieruchomości',
		slug: '/wycena-nieruchomosci',
		d: 'Poznaj realną, rynkową wartość nieruchomości.'
	},
	{
		t: 'Marketing nieruchomości',
		slug: '/marketing-nieruchomosci',
		d: 'Zdjęcia, dron i film, które sprzedają szybciej.'
	}
];
