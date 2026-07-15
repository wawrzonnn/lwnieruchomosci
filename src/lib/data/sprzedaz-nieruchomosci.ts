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
		'Każda nieruchomość wymaga odpowiednio zaplanowanej sprzedaży. Przygotowujemy indywidualną strategię działania, dbamy o profesjonalną prezentację oferty i prowadzimy cały proces aż do bezpiecznej finalizacji transakcji.',
	tlo: U('photo-1600585154340-be6161a56a0c', 1600),
	cta: [
		{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' },
		{ label: 'Co obejmuje usługa?', href: '#zakres', wariant: 'outline' }
	]
};

export const opis = {
	eyebrow: 'O usłudze',
	tytul: 'Prowadzimy sprzedaż od początku do końca',
	akapity: [
		'Sprzedaż nieruchomości to często jedna z najważniejszych decyzji finansowych w życiu. Dlatego bierzemy na siebie cały proces — od rzetelnej wyceny, przez profesjonalną prezentację i promocję, po negocjacje i formalności u notariusza.',
		'Wiele ofert prowadzimy na wyłączność, dzięki czemu inwestujemy pełen budżet marketingowy w Twoją nieruchomość i realnie walczymy o najlepszą cenę. Na każdym etapie masz jeden kontakt i pełną wiedzę o tym, co się dzieje.'
	],
	zdjecie: U('photo-1522708323590-d24dbb6b0267'),
	badge: 'Na wyłączność',
	podpis: 'Twoja oferta — dopracowana w każdym detalu'
};

export const proces = {
	eyebrow: 'Jak to działa',
	tytul: 'Sprzedaż w 6 krokach',
	kroki: [
		{
			no: '01',
			t: 'Bezpłatna wycena',
			d: 'Oglądamy nieruchomość, analizujemy rynek i przygotowujemy realną wycenę oraz strategię sprzedaży.'
		},
		{
			no: '02',
			t: 'Umowa i plan',
			d: 'Ustalamy warunki współpracy i cenę ofertową, podpisujemy umowę i ruszamy z przygotowaniami.'
		},
		{
			no: '03',
			t: 'Przygotowanie oferty',
			d: 'Profesjonalna sesja zdjęciowa, ujęcia z drona i film — nieruchomość wygląda najlepiej, jak może.'
		},
		{
			no: '04',
			t: 'Promocja',
			d: 'Publikujemy ofertę na portalach, w social media i w naszej bazie klientów. Docieramy do kupujących.'
		},
		{
			no: '05',
			t: 'Prezentacje i negocjacje',
			d: 'Organizujemy pokazy, filtrujemy zapytania i negocjujemy najlepszą cenę w Twoim imieniu.'
		},
		{
			no: '06',
			t: 'Finalizacja',
			d: 'Kompletujemy dokumenty i prowadzimy Cię aż po podpisanie aktu notarialnego.'
		}
	]
};

export const zakres = {
	eyebrow: 'Co obejmuje usługa?',
	tytul: 'Prowadzimy sprzedaż od A do Z',
	lista: [
		'Analiza nieruchomości',
		'Przygotowanie strategii sprzedaży',
		'Profesjonalna sesja zdjęciowa',
		'Prezentacja wideo nieruchomości',
		'Promocja oferty',
		'Prezentacje nieruchomości',
		'Negocjacje',
		'Koordynacja formalności',
		'Przekazanie nieruchomości'
	],
	uwaga: 'Zdjęcia, dron i film są w standardzie — bez dodatkowych dopłat.'
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

export const korzysci = {
	eyebrow: 'Dlaczego my',
	tytul: 'Co zyskujesz',
	lista: [
		{
			t: 'Lepsza cena',
			d: 'Profesjonalna prezentacja i twarde negocjacje przekładają się na wyższą cenę sprzedaży.'
		},
		{
			t: 'Oszczędność czasu',
			d: 'Bierzemy na siebie zapytania, prezentacje i papierologię. Ty zajmujesz się swoim życiem.'
		},
		{
			t: 'Bezpieczeństwo',
			d: 'Weryfikujemy kupujących i pilnujemy formalności, żeby transakcja była bezpieczna.'
		},
		{
			t: 'Przejrzystość',
			d: 'Regularne raporty i stały kontakt — zawsze wiesz, na jakim etapie jest sprzedaż.'
		}
	]
};

export const opinie = {
	eyebrow: 'Opinie klientów',
	lista: [
		{
			quote: 'Sprzedaż mieszkania poszła sprawnie i bez stresu. Czułam, że ktoś naprawdę o mnie dba.',
			name: 'Joanna K.',
			loc: 'Jelenia Góra'
		},
		{
			quote: 'Dostaliśmy za dom więcej, niż się spodziewaliśmy. Świetne zdjęcia i twarde negocjacje.',
			name: 'Michał i Ola',
			loc: 'Sosnówka'
		},
		{
			quote: 'Pełen profesjonalizm — od wyceny po notariusza. Wszystkim polecam.',
			name: 'Robert W.',
			loc: 'Cieplice'
		}
	]
};

export const faq = {
	eyebrow: 'FAQ',
	tytul: 'Pytania o sprzedaż',
	cta: { label: 'Zadaj pytanie →', href: '#formularz' },
	lista: [
		{
			q: 'Ile wynosi prowizja przy sprzedaży?',
			a: 'Prowizję ustalamy indywidualnie, zawsze przed startem i bez ukrytych kosztów. Płacisz dopiero po skutecznej sprzedaży.'
		},
		{
			q: 'Czy muszę podpisać umowę na wyłączność?',
			a: 'Nie musisz, ale to się opłaca — przy wyłączności inwestujemy pełen budżet marketingowy i aktywniej szukamy kupca. Doradzimy, co będzie najlepsze w Twoim przypadku.'
		},
		{
			q: 'Jak ustalacie cenę ofertową?',
			a: 'Na podstawie realnych cen transakcyjnych w okolicy, stanu nieruchomości i sytuacji rynkowej. Cena ma przyciągać kupujących i chronić Twój interes.'
		},
		{
			q: 'Co przygotowujecie w ramach oferty?',
			a: 'Profesjonalne zdjęcia, ujęcia z drona, film-spacer, opis oraz publikację na portalach i w social media — w standardzie, bez dopłat.'
		},
		{
			q: 'Jak długo trwa sprzedaż?',
			a: 'Dobrze wyceniona i przygotowana oferta najczęściej znajduje kupca w ciągu kilku do kilkunastu tygodni.'
		},
		{
			q: 'Jakie dokumenty są potrzebne do sprzedaży?',
			a: 'Podpowiemy dokładną listę i pomożemy ją skompletować — m.in. akt własności, numer księgi wieczystej i niezbędne zaświadczenia. Zajmiemy się formalnościami razem z Tobą.'
		}
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
