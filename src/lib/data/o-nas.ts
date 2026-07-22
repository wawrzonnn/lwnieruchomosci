// Treść podstrony „O nas" (/o-nas) wg handoffu designera (refinement 21).
// GŁOS: LW Nieruchomości to BIURO — piszemy w 1. os. l.mnogiej („my / biuro"),
// nie personalnie. Na czele biura stoi Lucyna Wojtoń. Brak sekcji „Zespół".
// PLACEHOLDERY do potwierdzenia z klientką: zdjęcie biura (Unsplash), lata i
// liczby w historii/statystykach oraz opinie (imiona przykładowe).

export const seo = {
	title: 'O nas — LW Nieruchomości Jelenia Góra i Karkonosze',
	description:
		'LW Nieruchomości to lokalne biuro z Jeleniej Góry. Poznaj naszą historię, wartości i region — sprzedaż, kupno i wycena nieruchomości uczciwie i po ludzku.'
};

export const breadcrumbs = [{ label: 'Strona główna', href: '/' }, { label: 'O nas' }];

export const hero = {
	eyebrow: 'O nas',
	tytul: 'Ludzie i miejsca — nie tylko metry',
	tytulEmfaza: 'nie tylko metry',
	podtytul:
		'LW Nieruchomości to lokalne biuro z Jeleniej Góry. Pomagamy sprzedawać, kupować i wyceniać nieruchomości w Kotlinie Jeleniogórskiej — spokojnie, uczciwie i po ludzku.',
	tlo: '/karkonosze-panorama.png',
	cta: [
		{ label: 'Poznaj biuro', href: '#o-biurze', wariant: 'green' },
		{ label: 'Zadzwoń: +48 690 008 273', href: 'tel:+48690008273', wariant: 'outline' }
	]
};

export const oBiurze = {
	eyebrow: 'Nasze biuro',
	tytul: 'Biuro z lokalnymi korzeniami',
	tytulEmfaza: 'lokalnymi korzeniami',
	// PLACEHOLDER — podmień na realne zdjęcie biura / Lucyny (kadr pionowy 4:5, np. /biuro.jpg).
	zdjecie: {
		src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
		alt: 'Biuro LW Nieruchomości'
	},
	badges: [
		{ n: '4,9', l: 'ocena w Google' },
		{ n: '11 lat', l: 'na rynku' }
	],
	akapity: [
		'LW Nieruchomości to lokalne, mobilne biuro nieruchomości z Jeleniej Góry. Od lat pomagamy mieszkańcom Kotliny Jeleniogórskiej sprzedawać, kupować i wyceniać nieruchomości — bez pośpiechu i bez presji.',
		'Biuro prowadzi Lucyna Wojtoń, a w codziennej pracy wspiera ją zespół — specjalista ds. nieruchomości i specjalistka ds. marketingu. Każdą transakcję prowadzimy od początku do końca, z jasnymi zasadami i konkretnymi terminami.',
		'Wierzymy, że dobra transakcja to taka, po której obie strony chcą podać sobie rękę.'
	],
	kontakt: {
		prowadzenie: 'Masz pytanie? Odezwij się —',
		linki: [
			{ label: '+48 690 008 273', href: 'tel:+48690008273' },
			{ label: 'Napisz e-mail', href: 'mailto:biuro@lw.nieruchomosci.pl' }
		]
	}
};

export const zespol = {
	eyebrow: 'Nasz zespół',
	tytul: 'Kto poprowadzi Twoją sprawę',
	tytulEmfaza: 'Twoją sprawę',
	podtytul:
		'Małe biuro, konkretne osoby. Zawsze wiesz, kto prowadzi Twoją sprawę i do kogo zadzwonić.',
	// Zdjęcia realne (kadr pionowy 4:5, object-position: center top).
	osoby: [
		{
			img: '/zespol-lucyna.png',
			imie: 'Lucyna Wojtoń',
			rola: 'Pośredniczka w obrocie nieruchomościami',
			opis: 'Prowadzi biuro i osobiście zajmuje się transakcjami sprzedaży i zakupu — od wyceny, przez umowę pośrednictwa, po akt notarialny.'
		},
		{
			img: '/zespol-jaroslaw.png',
			imie: 'Jarosław Zięba',
			rola: 'Specjalista ds. nieruchomości',
			opis: 'Obsługuje sprzedających i kupujących: prezentacje nieruchomości, negocjacje i formalności. Zna lokalny rynek Kotliny Jeleniogórskiej.'
		},
		{
			img: '/zespol-sylwia.png',
			imie: 'Sylwia Szuman',
			rola: 'Specjalistka ds. marketingu',
			opis: 'Odpowiada za marketing ofert: sesje zdjęciowe, film, ujęcia z drona i publikację na portalach.'
		}
	]
};

export const historia = {
	eyebrow: 'Nasza historia',
	tytul: 'Jak to się zaczęło',
	podtytul: 'Kilka momentów, które ukształtowały nasze biuro — krok po kroku.',
	// Desktop = pozioma oś czasu; mobile = pionowa. Lata/opisy do potwierdzenia z klientką.
	kroki: [
		{
			year: '2015',
			t: 'Początek',
			d: 'Rusza LW Nieruchomości — lokalne biuro z sercem do Kotliny Jeleniogórskiej.'
		},
		{
			year: '2017',
			t: 'Marka na mapie',
			d: 'Zdobywamy zaufanie pierwszych klientów i budujemy reputację spokojnego, uczciwego biura.'
		},
		{
			year: '2020',
			t: 'Marketing w standardzie',
			d: 'Do każdej oferty wprowadzamy profesjonalne zdjęcia, ujęcia z drona i film — bez dopłat.'
		},
		{
			year: '2023',
			t: 'Ponad 100 rodzin',
			d: 'Pomagamy kolejnym rodzinom sprzedać, kupić i znaleźć swoje miejsce w Karkonoszach.'
		},
		{
			year: '2026',
			t: 'Dziś',
			d: 'Zaufane, mobilne biuro z oceną 4,9 w Google i ofertami prowadzonymi na wyłączność.'
		}
	]
};

export const wartosci = {
	eyebrow: 'Wartości',
	tytul: 'W co wierzymy',
	lista: [
		{
			t: 'Uczciwość',
			d: 'Mówimy wprost, nawet gdy trzeba odradzić. Bez ukrytych kosztów i gwiazdek w umowie.'
		},
		{ t: 'Empatia', d: 'Słuchamy i prowadzimy przez proces spokojnie, w Twoim tempie.' },
		{ t: 'Lokalność', d: 'Znamy region na wylot — od Cieplic po Karpacz i Szklarską Porębę.' },
		{
			t: 'Zaangażowanie',
			d: 'Twoja sprawa jest naszą sprawą — od pierwszej rozmowy po klucze.'
		}
	]
};

export const statystyki = [
	{ n: '11 lat', l: 'na rynku' },
	{ n: '120+', l: 'transakcji' },
	{ n: '250+', l: 'zadowolonych klientów' },
	{ n: '4,9', l: 'ocena Google' }
];

export const region = {
	eyebrow: 'Nasz region',
	tytul: 'Karkonosze znamy od podszewki',
	tytulEmfaza: 'od podszewki',
	tlo: '/schronisko-staw.png',
	akapity: [
		'Działamy lokalnie — w Jeleniej Górze i całej Kotlinie Jeleniogórskiej. Wiemy, którą doliną rano niesie się mgła, gdzie najlepiej dochodzi słońce i czym różni się życie w Cieplicach od życia w Sosnówce.',
		'Kupując dom w tym regionie, kupujesz też sąsiedztwo, drogę do szkoły i widok z okna. My znamy je z bliska — i chętnie się tą wiedzą dzielimy.'
	],
	cta: { label: 'Poznaj region →', href: '/#region' }
};

// PLACEHOLDER — opinie z przykładowymi imionami. Przed publikacją podmień na
// realne recenzje (np. z profilu Google) po akceptacji klientki.
export const opinie = {
	eyebrow: 'Opinie klientów',
	tlo: '/sunset-dolina.png',
	lista: [
		{
			quote: 'Sprzedaż mieszkania poszła sprawnie i bez stresu. Czułam, że ktoś naprawdę o mnie dba.',
			name: 'Joanna K.',
			loc: 'Jelenia Góra'
		},
		{
			quote: 'Znaleźli nam działkę z widokiem na góry — dokładnie taką, o jakiej marzyliśmy.',
			name: 'Michał i Ola',
			loc: 'Sosnówka'
		},
		{
			quote: 'Profesjonalnie, ciepło i konkretnie. Cały czas wiedziałem, co dzieje się z moją ofertą.',
			name: 'Robert W.',
			loc: 'Cieplice'
		}
	]
};

export const kontaktCta = {
	eyebrow: 'Poznajmy się osobiście',
	tytul: 'Porozmawiajmy o Twojej nieruchomości',
	podtytul:
		'Bez zobowiązań i bez presji. Zadzwoń lub napisz — odpowiemy po ludzku i doradzimy, co dalej.',
	cta: [
		{ label: 'Skontaktuj się', href: '/kontakt', wariant: 'green' },
		{ label: '+48 690 008 273', href: 'tel:+48690008273', wariant: 'outline' }
	]
};
