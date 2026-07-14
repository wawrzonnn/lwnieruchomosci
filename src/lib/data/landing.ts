// Treść landingu LW Nieruchomości (wariant 1a). Zdjęcia lokalne w /static,
// zdjęcia ofert/usług/agentki to placeholdery Unsplash — łatwe do podmiany.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const kontakt = {
	telefon: '+48 690 008 273',
	email: 'biuro@lw.nieruchomosci.pl',
	adres: '58-506 Jelenia Góra',
	mapaEmbed: 'https://maps.google.com/maps?q=Jelenia+G%C3%B3ra,+58-506&z=12&output=embed'
};

export const wyszukiwarka = {
	rodzaj: ['Wszystkie', 'Mieszkania', 'Domy', 'Działki', 'Lokale'],
	lokalizacja: ['Cały region', 'Jelenia Góra', 'Sosnówka', 'Mysłakowice', 'Cieplice'],
	cenaDo: ['Bez limitu', '400 000 zł', '700 000 zł', '1 000 000 zł', '2 000 000 zł']
};

export const kategorie = [
	{
		name: 'Mieszkania',
		deal: 'Sprzedaż / wynajem',
		img: U('photo-1560448204-e02f11c3d0e2'),
		category: 'MIESZKANIE'
	},
	{
		name: 'Domy',
		deal: 'Sprzedaż / wynajem',
		img: U('photo-1600585154340-be6161a56a0c'),
		category: 'DOM'
	},
	{
		name: 'Działki',
		deal: 'Sprzedaż / dzierżawa',
		img: '/karkonosze-panorama.png',
		category: 'DZIALKA'
	},
	{
		name: 'Lokale',
		deal: 'Sprzedaż / wynajem',
		img: U('photo-1497366216548-37526070297c'),
		category: 'LOKAL'
	}
];

export const filtryChipy = ['Wszystkie', 'Mieszkania', 'Domy', 'Działki', 'Lokale'];

export interface Offer {
	badge: string;
	subtitle: string;
	city: string;
	street: string;
	title: string;
	price: string;
	perM2: string;
	specs: { l: string; v: string }[];
	img: string;
}

export const oferty: Offer[] = [
	{
		badge: 'Polecana',
		subtitle: 'Mieszkanie 3-pokojowe',
		city: 'Jelenia Góra',
		street: 'ul. Szymanowskiego',
		title: 'Mieszkanie ul. Szymanowskiego, 3 pokoje',
		price: '465 000 zł',
		perM2: '8 020 zł/m²',
		specs: [
			{ l: 'Pokoje', v: '3' },
			{ l: 'Powierzchnia', v: '58 m²' },
			{ l: 'Piętro', v: '2' }
		],
		img: U('photo-1522708323590-d24dbb6b0267')
	},
	{
		badge: '',
		subtitle: 'Segment szeregowy',
		city: 'Jelenia Góra',
		street: 'Cieplice',
		title: 'Nowoczesny segment szeregówki, Cieplice',
		price: '1 259 000 zł',
		perM2: '7 070 zł/m²',
		specs: [
			{ l: 'Pokoje', v: '5' },
			{ l: 'Powierzchnia', v: '178 m²' },
			{ l: 'Działka', v: '220 m²' }
		],
		img: U('photo-1600585154340-be6161a56a0c')
	},
	{
		badge: 'Na wyłączność',
		subtitle: 'Dom szeregowy',
		city: 'Jelenia Góra',
		street: 'ul. Moniuszki',
		title: 'Dom w zabudowie szeregowej, Moniuszki',
		price: '1 399 000 zł',
		perM2: '5 490 zł/m²',
		specs: [
			{ l: 'Pokoje', v: '6' },
			{ l: 'Powierzchnia', v: '255 m²' },
			{ l: 'Działka', v: '320 m²' }
		],
		img: U('photo-1512917774080-9991f1c4c750')
	},
	{
		badge: '',
		subtitle: 'Działka budowlana',
		city: 'Sosnówka',
		street: 'Podgórzyn, widokowa',
		title: 'Działka widokowa w Sosnówce',
		price: '1 650 000 zł',
		perM2: '179 zł/m²',
		specs: [
			{ l: 'Powierzchnia', v: '9220 m²' },
			{ l: 'Przeznaczenie', v: 'Budowlana' },
			{ l: 'Media', v: 'W drodze' }
		],
		img: '/sunset-dolina.png'
	},
	{
		badge: 'Na wyłączność',
		subtitle: 'Działka budowlana',
		city: 'Sosnówka',
		street: 'Podgórzyn',
		title: 'Atrakcyjna działka w Sosnówce',
		price: '740 000 zł',
		perM2: '180 zł/m²',
		specs: [
			{ l: 'Powierzchnia', v: '4122 m²' },
			{ l: 'Przeznaczenie', v: 'Budowlana' },
			{ l: 'Dojazd', v: 'Utwardzony' }
		],
		img: '/karkonosze-panorama.png'
	},
	{
		badge: '',
		subtitle: 'Działka inwestycyjna',
		city: 'Sosnówka',
		street: 'Podgórzyn',
		title: 'Działka pod budowę 10 domów',
		price: '2 385 000 zł',
		perM2: '180 zł/m²',
		specs: [
			{ l: 'Powierzchnia', v: '13 250 m²' },
			{ l: 'Zabudowa', v: 'do 10 domów' },
			{ l: 'Media', v: 'Dostępne' }
		],
		img: U('photo-1500382017468-9049fed747ef')
	}
];

export const oNas = {
	akapity: [
		'LW Nieruchomości powstało z przekonania, że dobra współpraca zaczyna się od rozmowy i poznania potrzeb klienta. Każdą nieruchomość traktujemy indywidualnie, poświęcając jej czas i uwagę, na jakie zasługuje.',
		'Nie stawiamy na ilość obsługiwanych ofert — stawiamy na jakość współpracy. Dzięki temu jesteśmy z klientami od pierwszego spotkania aż po przekazanie nieruchomości nowemu właścicielowi, dbając o każdy etap procesu.'
	],
	zdjecie: U('photo-1573496359142-b8d87734a5a2', 800),
	podpisZdjecia: 'Poznajmy się osobiście',
	podpisZdjeciaMaly: 'LW NIERUCHOMOŚCI · JELENIA GÓRA'
};

export const statystyki = [
	{ n: '120+', l: 'sprzedanych' },
	{ n: '11 lat', l: 'w branży' },
	{ n: '250+', l: 'klientów' },
	{ n: '4,9', l: 'ocena Google' }
];

export interface Service {
	no: string;
	t: string;
	d: string;
	long: string;
	img: string;
	href: string;
}

// Te same 5 usług co w dropdownie nawigacji i stopce — kafelki prowadzą
// do realnych podstron usługowych.
export const uslugi: Service[] = [
	{
		no: '01',
		t: 'Sprzedaż nieruchomości',
		d: 'Cała transakcja od A do Z.',
		long: 'Prowadzimy sprzedaż od początku do końca — wycena, prezentacja, negocjacje i formalności aż po akt notarialny. Wiele ofert prowadzimy na wyłączność.',
		img: U('photo-1600585154340-be6161a56a0c'),
		href: '/sprzedaz-nieruchomosci'
	},
	{
		no: '02',
		t: 'Kupno nieruchomości',
		d: 'Ktoś, kto stoi po Twojej stronie.',
		long: 'Reprezentujemy kupującego — szukamy ofert, sprawdzamy stan prawny i techniczny, negocjujemy cenę i przeprowadzamy przez formalności aż po klucze.',
		img: U('photo-1512917774080-9991f1c4c750'),
		href: '/kupno-nieruchomosci'
	},
	{
		no: '03',
		t: 'Wycena nieruchomości',
		d: 'Realna wartość, nie życzenia.',
		long: 'Rzetelna, rynkowa wycena mieszkania, domu lub działki oparta na danych transakcyjnych w okolicy — z komentarzem i rekomendacją ceny.',
		img: U('photo-1554224155-6726b3ff858f'),
		href: '/wycena-nieruchomosci'
	},
	{
		no: '04',
		t: 'Marketing nieruchomości',
		d: 'Widoczność tam, gdzie kupujący.',
		long: 'Profesjonalne zdjęcia, film, ujęcia z drona i skuteczna promocja — Twoja nieruchomość wyróżnia się od pierwszego dnia. W standardzie oferty.',
		img: U('photo-1460925895917-afdab827c52f'),
		href: '/marketing-nieruchomosci'
	},
	{
		no: '05',
		t: 'Doradztwo kredytowe',
		d: 'Najlepsi doradcy w regionie.',
		long: 'Współpracujemy z najlepszymi doradcami kredytowymi w regionie. Pomożemy dobrać finansowanie, porównać oferty banków i spokojnie przejść przez cały proces.',
		img: U('photo-1554224155-6726b3ff858f'),
		href: '/doradztwo-kredytowe'
	}
];

export interface RegionTile {
	size: 'big' | 'small';
	img: string;
	caption: string;
	href: string;
}

export const region = {
	tytul: 'Rozejrzyj się po Karkonoszach',
	hint: 'PRZECIĄGNIJ / PRZEWIŃ →',
	galeria: [
		{ size: 'big', img: '/karkonosze-panorama.png', caption: 'Karpacz', href: '/lokalizacje/karpacz' },
		{ size: 'small', img: '/jelenia-gora-zima.png', caption: 'Jelenia Góra', href: '/lokalizacje/jelenia-gora' },
		{
			size: 'big',
			img: '/schronisko-staw.png',
			caption: 'Szklarska Poręba',
			href: '/lokalizacje/szklarska-poreba'
		},
		{ size: 'small', img: '/sunset-dolina.png', caption: 'Kowary', href: '/lokalizacje/kowary' },
		{
			size: 'big',
			img: U('photo-1476514525535-07fb3b4ae5f1', 1400),
			caption: 'Piechowice',
			href: '/lokalizacje/piechowice'
		},
		{
			size: 'small',
			img: U('photo-1441974231531-c6227db76b6e', 1000),
			caption: 'Podgórzyn',
			href: '/lokalizacje/podgorzyn'
		}
	] satisfies RegionTile[]
};

export const opinie = [
	{
		quote: 'Sprzedaż mieszkania poszła sprawnie i bez stresu. Czułam, że ktoś naprawdę o mnie dba.',
		name: 'Joanna K.',
		loc: 'Jelenia Góra',
		initials: 'JK'
	},
	{
		quote: 'Znaleźli nam działkę z widokiem na góry — dokładnie taką, o jakiej marzyliśmy.',
		name: 'Michał i Ola',
		loc: 'Sosnówka',
		initials: 'MO'
	},
	{
		quote: 'Profesjonalnie, ciepło i konkretnie. Cały czas wiedziałem, co dzieje się z moją ofertą.',
		name: 'Robert W.',
		loc: 'Cieplice',
		initials: 'RW'
	}
];

export const faq = {
	eyebrow: 'FAQ',
	tytul: 'Najczęściej zadawane pytania',
	cta: { label: 'Zadaj pytanie →', href: '#kontakt' },
	lista: [
		{
			q: 'Ile kosztuje współpraca z biurem?',
			a: 'Wysokość wynagrodzenia ustalamy indywidualnie i zawsze przed rozpoczęciem współpracy — bez ukrytych opłat. Prowizję rozliczamy dopiero po skutecznej transakcji.'
		},
		{
			q: 'Co daje umowa na wyłączność?',
			a: 'Powierzasz sprzedaż wyłącznie nam, dzięki czemu inwestujemy pełen budżet w marketing — profesjonalne zdjęcia, ujęcia z drona, film i promocję. Ty masz jeden pewny kontakt i pełną kontrolę nad procesem.'
		},
		{
			q: 'Jak długo trwa sprzedaż nieruchomości?',
			a: 'To zależy od lokalizacji, ceny i stanu nieruchomości. Dobrze przygotowana i realnie wyceniona oferta w Kotlinie Jeleniogórskiej najczęściej znajduje kupca w ciągu kilku do kilkunastu tygodni.'
		},
		{
			q: 'Czy pomagacie uzyskać kredyt hipoteczny?',
			a: 'Tak. Współpracujemy z najlepszymi doradcami kredytowymi w regionie — pomożemy porównać oferty banków, dobrać finansowanie i spokojnie przejść przez wszystkie formalności.'
		},
		{
			q: 'Jak wygląda wycena nieruchomości?',
			a: 'Bezpłatnie oglądamy nieruchomość, analizujemy ceny transakcyjne w okolicy i przygotowujemy realną wycenę rynkową wraz z rekomendacją strategii sprzedaży.'
		},
		{
			q: 'W jakim regionie działacie?',
			a: 'Działamy w Jeleniej Górze i całej Kotlinie Jeleniogórskiej — m.in. w Cieplicach, Sosnówce, Mysłakowicach, Podgórzynie, Karpaczu i Szklarskiej Porębie.'
		}
	]
};

export const dualCta = [
	{
		tytul: 'Zgłoś nieruchomość do sprzedaży lub wynajęcia',
		opis: 'Wycenimy ją, przygotujemy profesjonalną prezentację i znajdziemy kupca lub najemcę. Wiele ofert prowadzimy na wyłączność.',
		przycisk: 'Zgłoś nieruchomość',
		wariant: 'cream'
	},
	{
		tytul: 'Szukasz oferty zakupu lub najmu?',
		opis: 'Powiedz nam, czego szukasz. Odezwiemy się, gdy pojawi się nieruchomość pasująca do Twoich potrzeb i budżetu.',
		przycisk: 'Zgłoś czego szukasz',
		wariant: 'green'
	}
];
