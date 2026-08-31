// Treść podstrony „O nas" (/o-nas) wg handoffu designera (refinement 21).
// GŁOS: LW Nieruchomości to BIURO — piszemy w 1. os. l.mnogiej („my / biuro"),
// nie personalnie. Na czele biura stoi Lucyna Wojtoń. Brak sekcji „Zespół".
// Liczby w statystykach i opinie potwierdzone przez klientkę (31.08.2026).

export const seo = {
	title: 'O nas – LW Nieruchomości Jelenia Góra i Karkonosze',
	description:
		'LW Nieruchomości to lokalne biuro z Jeleniej Góry. Poznaj naszą historię, wartości i region – sprzedaż, kupno i wycena nieruchomości uczciwie i po ludzku.'
};

export const breadcrumbs = [{ label: 'Strona główna', href: '/' }, { label: 'O nas' }];

export const hero = {
	eyebrow: 'O nas',
	tytul: 'Ludzie i miejsca – nie tylko metry',
	tytulEmfaza: 'nie tylko metry',
	podtytul:
		'LW Nieruchomości to lokalne biuro z Jeleniej Góry. Pomagamy sprzedawać, kupować i wyceniać nieruchomości w Kotlinie Jeleniogórskiej – spokojnie, uczciwie i po ludzku.',
	// Zdjęcie wybrane przez Lucynę (Messenger) — Mały Staw z odbiciem chmur.
	// Ten sam plik, którego używają galerie lokalizacji (static/karkonosze/).
	tlo: '/karkonosze/staw-odbicie-chmur.jpg',
	cta: [
		{ label: 'Poznaj biuro', href: '#o-biurze', wariant: 'green' },
		{ label: 'Zadzwoń: +48 690 008 273', href: 'tel:+48690008273', wariant: 'outline' }
	]
};

export const oBiurze = {
	eyebrow: 'Nasze biuro',
	tytul: 'LW Nieruchomości – doświadczenie i znajomość lokalnego rynku',
	tytulEmfaza: 'lokalnego rynku',
	// Główne zdjęcie sekcji = Lucyna Wojtoń (założycielka). Kadr pionowy 4:5.
	zdjecie: {
		src: '/zespol-lucyna.webp',
		alt: 'Lucyna Wojtoń – LW Nieruchomości'
	},
	badges: [
		{ n: '5,0', l: 'ocena w Google' },
		{ n: '11 lat', l: 'na rynku' }
	],
	akapity: [
		'Od ponad 11 lat pomagamy klientom sprzedawać i kupować nieruchomości w Jeleniej Górze i regionie Karkonoszy. Znamy nieruchomości, które oferujemy, ich potencjał i najważniejsze atuty, dzięki czemu możemy rzetelnie doradzać zarówno sprzedającym, jak i kupującym.'
	],
	// Blok „Biuro prowadzi" pod tekstem o biurze — Lucyna (jedyne miejsce z jej opisem).
	lider: {
		eyebrow: 'Biuro prowadzi',
		imie: 'Lucyna Wojtoń',
		rola: 'Właścicielka i specjalistka ds. nieruchomości',
		opis: 'Założycielka LW Nieruchomości z ponad 11-letnim doświadczeniem w branży. Osobiście prowadzi klientów przez proces sprzedaży i zakupu nieruchomości – od pierwszej rozmowy i ustalenia strategii działania aż po finalizację transakcji i przekazanie nieruchomości.'
	},
	kontakt: {
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
		'W codziennej pracy Lucynę wspiera zespół – zawsze wiesz, kto prowadzi Twoją sprawę i do kogo zadzwonić.',
	// Zdjęcia realne (kadr pionowy 4:5, object-position: center top).
	// Lucyna jest na głównym zdjęciu sekcji „Nasze biuro" — tu zespół wspierający.
	osoby: [
		{
			img: '/zespol-jaroslaw.png',
			imie: 'Jarosław Zięba',
			rola: 'Specjalista ds. nieruchomości',
			opis: 'Wieloletnie doświadczenie w sprzedaży wykorzystuje dziś na rynku nieruchomości. Doskonale odnajduje się w rozmowach z klientami i negocjacjach, dbając o sprawny przebieg sprzedaży oraz zakupu nieruchomości.'
		},
		{
			img: '/zespol-sylwia.png',
			imie: 'Sylwia Szuman',
			rola: 'Specjalistka ds. marketingu',
			opis: 'Odpowiada za video marketing nieruchomości. Tworzy prezentacje wideo i treści do mediów społecznościowych, które pokazują przestrzeń, charakter i największe atuty nieruchomości.'
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
		{ t: 'Lokalność', d: 'Znamy region na wylot – od Cieplic po Karpacz i Szklarską Porębę.' },
		{
			t: 'Zaangażowanie',
			d: 'Twoja sprawa jest naszą sprawą – od pierwszej rozmowy po klucze.'
		}
	]
};

export const statystyki = [
	{ n: '11 lat', l: 'na rynku' },
	{ n: '250', l: 'transakcji' },
	{ n: '250+', l: 'zadowolonych klientów' },
	{ n: '5,0', l: 'ocena Google' }
];

export const region = {
	eyebrow: 'Nasz region',
	tytul: 'Karkonosze znamy od podszewki',
	tytulEmfaza: 'od podszewki',
	tlo: '/schronisko-staw.png',
	akapity: [
		'Działamy lokalnie – w Jeleniej Górze i całej Kotlinie Jeleniogórskiej. Wiemy, którą doliną rano niesie się mgła, gdzie najlepiej dochodzi słońce i czym różni się życie w Cieplicach od życia w Sosnówce.',
		'Kupując dom w tym regionie, kupujesz też sąsiedztwo, drogę do szkoły i widok z okna. My znamy je z bliska – i chętnie się tą wiedzą dzielimy.'
	],
	cta: { label: 'Poznaj region →', href: '/#region' }
};

// Realne opinie z profilu Google LW Nieruchomości (przekazane przez klientkę
// 31.08.2026). Cytaty dosłowne; część recenzji Google pokazuje skrócone —
// z tych wzięty jest fragment urwany NA GRANICY ZDANIA, nigdy w połowie myśli.
// Uzupełnione tylko brakujące polskie znaki (np. „calego" → „całego").
export const opinie = {
	eyebrow: 'Opinie klientów',
	tlo: '/sunset-dolina.png',
	lista: [
		{
			quote:
				'Bardzo profesjonalna i rzetelna agencja nieruchomości w Jeleniej Górze. Pomogli mi sprawnie przejść przez cały proces zakupu mieszkania – od pierwszego kontaktu po podpisanie umowy. Świetna obsługa, miła atmosfera i duże zaangażowanie. Gorąco polecam!',
			name: 'Marta Górak',
			zrodlo: 'opinia z Google'
		},
		{
			quote:
				'Polecam – to zdecydowanie za mało. Lucyna jest osobą, która w pełni poświęca się swoim klientom.',
			name: 'Kamil Grębosz',
			zrodlo: 'opinia z Google'
		},
		{
			quote:
				'Z całego serca polecamy współpracę z Panią Lucyną. To osoba bardzo profesjonalna, rzetelna i zaangażowana w swoją pracę.',
			name: 'Paulina Mius',
			zrodlo: 'opinia z Google'
		},
		{
			quote:
				'Pani Lucyna to osoba, która rzeczowo podchodzi do sprzedaży. Bardzo pomocna i zaangażowana.',
			name: 'Paulina Kamyna',
			zrodlo: 'opinia z Google'
		},
		{
			quote:
				'Współpraca z tym biurem to czysta przyjemność. Działki są promowane na bardzo wysokim poziomie.',
			name: 'Robert Nowakowski',
			zrodlo: 'opinia z Google'
		},
		{
			quote: 'Jedyna agencja nieruchomości w Jeleniej, którą mogę polecić z czystym sumieniem.',
			name: 'Rafał Makuch',
			zrodlo: 'opinia z Google'
		},
		{
			quote:
				'LW Nieruchomości – kupno mieszkania za pośrednictwem tego biura jest szybkie, sprawne i profesjonalne!',
			name: 'Justyna Makutunowicz',
			zrodlo: 'opinia z Google'
		},
		{
			quote:
				'Dzięki współpracy z biurem Pani Lucyny szybko znalazłam klienta na moje mieszkanie, zaoszczędziłam wiele czasu, bo nie musiałam się martwić o formalności – wszystkim zajęło się biuro. Serdecznie polecam.',
			name: 'emagie',
			zrodlo: 'opinia z Google'
		},
		{
			quote:
				'Polecam w 100%. Pełen profesjonalizm, opieka nad klientem na najwyższym poziomie przez cały proces zakupu i po zakupie nieruchomości.',
			name: 'Tomasz Mikołajewski',
			zrodlo: 'opinia z Google'
		},
		{
			quote: 'Gorąco polecam to biuro nieruchomości.',
			name: 'Krzysztof Malinowski',
			zrodlo: 'opinia z Google'
		},
		{
			quote: 'Super biuro, bardzo szybko sprzedali moje mieszkanie, polecam.',
			name: 'Starlord81',
			zrodlo: 'opinia z Google'
		}
	]
};

export const kontaktCta = {
	eyebrow: 'Poznajmy się osobiście',
	tytul: 'Porozmawiajmy o Twojej nieruchomości',
	podtytul:
		'Bez zobowiązań i bez presji. Zadzwoń lub napisz – odpowiemy po ludzku i doradzimy, co dalej.',
	cta: [
		{ label: 'Skontaktuj się', href: '/kontakt', wariant: 'green' },
		{ label: '+48 690 008 273', href: 'tel:+48690008273', wariant: 'outline' }
	]
};
