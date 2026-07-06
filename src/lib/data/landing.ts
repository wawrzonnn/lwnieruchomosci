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
	{ name: 'Mieszkania', deal: 'Sprzedaż / wynajem', img: U('photo-1560448204-e02f11c3d0e2') },
	{ name: 'Domy', deal: 'Sprzedaż / wynajem', img: U('photo-1600585154340-be6161a56a0c') },
	{ name: 'Działki', deal: 'Sprzedaż / dzierżawa', img: '/karkonosze-panorama.png' },
	{ name: 'Lokale', deal: 'Sprzedaż / wynajem', img: U('photo-1497366216548-37526070297c') }
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
		'Jesteśmy lokalnym biurem z Jeleniej Góry, które powstało z pasji do pracy z ludźmi i miłości do miejsc, w których można naprawdę poczuć się jak w domu.',
		'Stawiamy na uczciwość, empatię i elastyczne podejście. Prowadzimy Cię krok po kroku przez cały proces — byś na każdym etapie czuł się pewnie i spokojnie.'
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
}

export const uslugi: Service[] = [
	{
		no: '01',
		t: 'Pośrednictwo w obrocie nieruchomości',
		d: 'Cała transakcja od A do Z.',
		long: 'Prowadzimy transakcję od początku do końca — wycena, prezentacja, negocjacje i formalności aż po akt notarialny. Pilnujemy terminów i dokumentów, żebyś Ty nie musiał.',
		img: U('photo-1521791136064-7986c2920216')
	},
	{
		no: '02',
		t: 'Marketing nieruchomości',
		d: 'Widoczność tam, gdzie kupujący.',
		long: 'Przygotowujemy profesjonalną prezentację oferty i publikujemy ją tam, gdzie są kupujący — portale, social media i nasza baza klientów. Twoja nieruchomość wyróżnia się od pierwszego dnia.',
		img: U('photo-1460925895917-afdab827c52f')
	},
	{
		no: '03',
		t: 'Doradztwo kredytowe',
		d: 'Najlepsi doradcy w regionie.',
		long: 'Współpracujemy z najlepszymi doradcami kredytowymi w regionie. Pomożemy dobrać finansowanie, porównać oferty banków i spokojnie przejść przez cały proces.',
		img: U('photo-1554224155-6726b3ff858f')
	},
	{
		no: '04',
		t: 'Zdjęcia i filmy z drona',
		d: 'Ujęcia, które robią wrażenie.',
		long: 'Zdjęcia i ujęcia z drona pokazują nieruchomość oraz okolicę z perspektywy, która robi wrażenie. W standardzie każdej naszej oferty — bez dodatkowych dopłat.',
		img: U('photo-1473968512647-3e447244af8f')
	},
	{
		no: '05',
		t: 'Projekt i remont',
		d: 'Projektant i sprawdzone ekipy.',
		long: 'Łączymy Cię z projektantem wnętrz i sprawdzonymi ekipami remontowymi. Pomożemy zaplanować metamorfozę i podnieść wartość nieruchomości przed sprzedażą lub po zakupie.',
		img: U('photo-1581858726788-75bc0f6a952d')
	},
	{
		no: '06',
		t: 'Video-prezentacja',
		d: 'Film, który sprzedaje.',
		long: 'Nagrywamy film-spacer po nieruchomości, który sprzedaje jeszcze zanim kupujący przyjedzie na miejsce. Idealny do ofert premium i sprzedaży na odległość.',
		img: U('photo-1526628953301-3e589a6a8b74')
	}
];

export const region = {
	podtytul: 'Mieszkamy i pracujemy w Kotlinie Jeleniogórskiej. Znamy każdą dolinę, drogę i widok na góry.',
	kafle: [
		{ podpis: 'Panorama Kotliny Jeleniogórskiej', img: '/karkonosze-panorama.png', duzy: true },
		{ podpis: 'Jelenia Góra zimą', img: '/jelenia-gora-zima.png' },
		{ podpis: 'Zachód nad doliną', img: '/sunset-dolina.png' }
	]
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
		przycisk: 'Zgłoś czego szukam',
		wariant: 'green'
	}
];
