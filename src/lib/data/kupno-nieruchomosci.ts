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

export const opis = {
	eyebrow: 'O usłudze',
	tytul: 'Reprezentujemy kupującego — nie sprzedającego',
	akapity: [
		'Zakup nieruchomości to duża decyzja i jeszcze większe emocje. Działamy wyłącznie w Twoim interesie: słuchamy potrzeb, szukamy ofert (również tych spoza portali), umawiamy prezentacje i trzeźwo oceniamy każdą nieruchomość.',
		'Zanim cokolwiek podpiszesz, sprawdzamy stan prawny i techniczny, wskazujemy ryzyka i negocjujemy warunki. Chcemy, żebyś kupił dobrze — a nie tylko szybko.'
	],
	zdjecie: U('photo-1560448204-e02f11c3d0e2'),
	badge: 'Reprezentacja kupującego',
	podpis: 'Znajdziemy miejsce, które poczujesz jak dom'
};

export const pomagamy = {
	eyebrow: 'Jak pomagamy',
	tytul: 'Wsparcie kupującego na każdym kroku',
	lista: [
		{
			t: 'Dopasowanie do potrzeb',
			d: 'Zaczynamy od rozmowy o budżecie, lokalizacji i priorytetach — potem szukamy pod Ciebie.'
		},
		{
			t: 'Dostęp do ofert',
			d: 'Portale, nasza baza i oferty na wyłączność — również te, których nie znajdziesz publicznie.'
		},
		{
			t: 'Obiektywna ocena',
			d: 'Trzeźwo oceniamy stan, cenę i potencjał każdej nieruchomości. Odradzamy, gdy trzeba.'
		},
		{
			t: 'Negocjacje po Twojej stronie',
			d: 'Negocjujemy cenę i warunki w Twoim imieniu — na chłodno i skutecznie.'
		}
	]
};

export const etapy = {
	eyebrow: 'Jak to działa',
	tytul: 'Etapy zakupu',
	kroki: [
		{
			no: '01',
			t: 'Rozmowa o potrzebach',
			d: 'Ustalamy budżet, lokalizację, metraż i priorytety. Poznajemy Twój styl życia.'
		},
		{
			no: '02',
			t: 'Wyszukiwanie ofert',
			d: 'Przeszukujemy portale, naszą bazę i oferty na wyłączność — także te niepublikowane.'
		},
		{
			no: '03',
			t: 'Prezentacje i weryfikacja',
			d: 'Umawiamy oglądania, sprawdzamy stan techniczny i prawny, wskazujemy ryzyka.'
		},
		{
			no: '04',
			t: 'Negocjacje i rezerwacja',
			d: 'Negocjujemy cenę i warunki, przygotowujemy umowę rezerwacyjną lub przedwstępną.'
		},
		{
			no: '05',
			t: 'Kredyt i akt notarialny',
			d: 'Pomagamy z finansowaniem i formalnościami, aż po podpisanie aktu i odbiór kluczy.'
		}
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
		'Profesjonalne prezentacje wideo nieruchomości',
		'Wsparcie podczas negocjacji',
		'Pomoc w kompletowaniu dokumentów',
		'Koordynacja formalności',
		'Współpraca z doradcą kredytowym (jeśli potrzebna)',
		'Bezpieczna finalizacja zakupu'
	]
};

export const faq = {
	eyebrow: 'FAQ',
	tytul: 'Pytania o zakup',
	cta: { label: 'Zadaj pytanie →', href: '#formularz' },
	lista: [
		{
			q: 'Czy pobieracie prowizję od kupującego?',
			a: 'Zasady współpracy i ewentualne wynagrodzenie ustalamy jasno na starcie — bez ukrytych kosztów. Wszystko wiesz, zanim cokolwiek podpiszesz.'
		},
		{
			q: 'Szukacie też ofert spoza portali?',
			a: 'Tak. Korzystamy z naszej bazy, kontaktów i ofert na wyłączność — często docieramy do nieruchomości, zanim trafią do publicznego obiegu.'
		},
		{
			q: 'Czy sprawdzacie stan prawny nieruchomości?',
			a: 'Zawsze. Weryfikujemy księgę wieczystą, obciążenia i dokumenty, żeby zakup był bezpieczny.'
		},
		{
			q: 'Pomożecie z kredytem hipotecznym?',
			a: 'Tak — współpracujemy z najlepszymi doradcami w regionie i pomożemy dobrać oraz porównać oferty banków.'
		},
		{
			q: 'Czy mogę kupować zdalnie, z innego miasta?',
			a: 'Tak. Oglądamy nieruchomości za Ciebie (zdjęcia, wideo-spacer), relacjonujemy na bieżąco i możemy reprezentować Cię na miejscu.'
		},
		{
			q: 'Ile trwa proces zakupu?',
			a: 'Od kilku tygodni do kilku miesięcy — zależnie od tego, jak szybko znajdziemy właściwą nieruchomość i od procedury kredytowej.'
		}
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Szukasz nieruchomości?',
	podtytul:
		'Powiedz nam, czego szukasz, a pomożemy Ci znaleźć miejsce dopasowane do Twoich potrzeb. Umów spotkanie — odezwiemy się z propozycjami ofert.',
	przycisk: 'Wyślij zgłoszenie',
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
