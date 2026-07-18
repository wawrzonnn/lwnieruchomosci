// Treść podstrony „Kupno nieruchomości" (/kupno-nieruchomosci).
// Zdjęcia hero/opisu to placeholdery Unsplash — do podmiany na realne.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Kupno nieruchomości — LW Nieruchomości Jelenia Góra',
	description:
		'Pomoc w kupnie nieruchomości w Jeleniej Górze i Karkonoszach — reprezentacja kupującego, wyszukiwanie ofert, weryfikacja stanu prawnego, negocjacje i formalności.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Kupno nieruchomości' }
];

export const hero = {
	eyebrow: 'Usługa · Kupno nieruchomości',
	tytul: 'Kupno nieruchomości w Jeleniej Górze i Karkonoszach',
	tytulEmfaza: 'Karkonoszach',
	podtytul:
		'Zakup nieruchomości to ważna decyzja, która wymaga nie tylko znalezienia odpowiedniej oferty, ale także dokładnej analizy i bezpiecznego przeprowadzenia całego procesu. Pomożemy Ci znaleźć nieruchomość dopasowaną do Twoich potrzeb i przeprowadzimy Cię przez każdy etap zakupu.',
	tlo: U('photo-1512917774080-9991f1c4c750', 1600),
	cta: [
		{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' },
		{ label: 'Co obejmuje usługa?', href: '#zakres', wariant: 'outline' }
	]
};

export const zakres = {
	eyebrow: 'Co obejmuje usługa?',
	tytul: 'Prowadzimy zakup od A do Z',
	podtytul:
		'Bierzemy na siebie cały proces — od poznania Twoich potrzeb, przez wyszukiwanie i analizę ofert, po bezpieczną finalizację zakupu.',
	lista: [
		'Poznanie Twoich potrzeb i możliwości',
		'Wyszukiwanie odpowiednich ofert',
		'Organizacja prezentacji nieruchomości',
		'Analiza wybranych ofert',
		'Profesjonalne prezentacje wideo nieruchomości, dzięki którym możesz lepiej poznać ofertę jeszcze przed umówieniem spotkania',
		'Wsparcie podczas negocjacji',
		'Pomoc w kompletowaniu dokumentów',
		'Koordynacja formalności',
		'Współpraca z doradcą kredytowym (jeśli jest potrzebna)',
		'Bezpieczna finalizacja zakupu'
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Szukasz nieruchomości?',
	podtytul:
		'Powiedz nam, czego szukasz, a pomożemy Ci znaleźć miejsce dopasowane do Twoich potrzeb.',
	przycisk: 'Umów spotkanie',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Mamy Twoje zgłoszenie. Odezwiemy się z ofertami dopasowanymi do Twoich potrzeb i budżetu.'
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
		t: 'Wycena nieruchomości',
		slug: '/wycena-nieruchomosci',
		d: 'Poznaj realną, rynkową wartość nieruchomości.'
	},
	{
		t: 'Marketing nieruchomości',
		slug: '/marketing-nieruchomosci',
		d: 'Zdjęcia, dron i film, które sprzedają szybciej.'
	},
	{
		t: 'Doradztwo kredytowe',
		slug: '/doradztwo-kredytowe',
		d: 'Dobierzemy finansowanie i przejdziemy przez formalności.'
	}
];
