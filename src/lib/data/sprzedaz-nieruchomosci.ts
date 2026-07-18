// Treść podstrony „Sprzedaż nieruchomości" (/sprzedaz-nieruchomosci).
// Zdjęcia hero/opisu to placeholdery Unsplash — do podmiany na realne.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Sprzedaż nieruchomości — LW Nieruchomości Jelenia Góra',
	description:
		'Kompleksowa sprzedaż nieruchomości w Jeleniej Górze i Karkonoszach — bezpłatna wycena, profesjonalny marketing, negocjacje i formalności. Wiele ofert na wyłączność.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Sprzedaż nieruchomości' }
];

export const hero = {
	eyebrow: 'Usługa · Sprzedaż nieruchomości',
	tytul: 'Sprzedaż nieruchomości w Jeleniej Górze i Karkonoszach',
	tytulEmfaza: 'Karkonoszach',
	podtytul:
		'Każda nieruchomość wymaga odpowiednio zaplanowanej sprzedaży. Dlatego przygotowujemy indywidualną strategię działania, dbamy o profesjonalną prezentację oferty i prowadzimy cały proces aż do bezpiecznej finalizacji transakcji.',
	tlo: U('photo-1600585154340-be6161a56a0c', 1600),
	cta: [
		{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' },
		{ label: 'Co obejmuje usługa?', href: '#zakres', wariant: 'outline' }
	]
};

export const zakres = {
	eyebrow: 'Co obejmuje usługa?',
	tytul: 'Prowadzimy sprzedaż od A do Z',
	lista: [
		'Analiza nieruchomości',
		'Przygotowanie strategii sprzedaży',
		'Profesjonalna sesja zdjęciowa',
		'Prezentacja wideo nieruchomości, która pozwala lepiej pokazać jej przestrzeń i potencjał potencjalnym kupującym',
		'Promocja oferty',
		'Prezentacje nieruchomości',
		'Negocjacje',
		'Koordynacja formalności',
		'Przekazanie nieruchomości'
	]
};

// Sekcja „na odległość" (handoff refinement 18): kremowy panel + 3 mini-karty.
// Dla klientów spoza regionu / z zagranicy.
export const naOdleglosc = {
	eyebrow: 'Dla klientów spoza regionu',
	tytul: 'Sprzedaż nieruchomości na odległość',
	tytulEmfaza: 'na odległość',
	akapity: [
		'Mieszkasz za granicą lub poza regionem? Nie musisz przyjeżdżać na każde spotkanie ani zajmować się organizacją sprzedaży. Możemy przeprowadzić cały proces w Twoim imieniu — od przygotowania oferty i prezentacji nieruchomości, przez kontakt z kupującymi i formalności, aż do finalizacji transakcji.',
		'Jeżeli będzie taka potrzeba, sprzedaż może odbyć się również na podstawie pełnomocnictwa notarialnego, dzięki czemu Twoja obecność nie będzie konieczna.'
	],
	kafle: [
		{ t: 'Za granicą lub poza regionem', d: 'Nie musisz przyjeżdżać na spotkania ani prezentacje.' },
		{ t: 'Prowadzimy w Twoim imieniu', d: 'Oferta, kupujący i formalności — całość po naszej stronie.' },
		{ t: 'Pełnomocnictwo notarialne', d: 'W razie potrzeby sprzedaż bez Twojej obecności.' }
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Porozmawiajmy o sprzedaży Twojej nieruchomości',
	podtytul: 'Umów spotkanie i wspólnie przygotujmy plan działania dopasowany do Twojej sytuacji.',
	przycisk: 'Wyślij zgłoszenie',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Odebraliśmy Twoje zgłoszenie i odezwiemy się wkrótce, żeby umówić termin bezpłatnej wyceny.'
	},
	kontakt: {
		telefon: '+48 690 008 273',
		email: 'biuro@lw.nieruchomosci.pl',
		godziny: 'Pon–Pt: 9:00–17:00'
	}
};

export const powiazane = [
	{
		t: 'Kupno nieruchomości',
		slug: '/kupno-nieruchomosci',
		d: 'Znajdziemy i wynegocjujemy nieruchomość skrojoną pod Twoje potrzeby.'
	},
	{
		t: 'Wycena nieruchomości',
		slug: '/wycena-nieruchomosci',
		d: 'Poznaj realną, rynkową wartość swojej nieruchomości.'
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
