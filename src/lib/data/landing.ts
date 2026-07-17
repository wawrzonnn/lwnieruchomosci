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

export const hero = {
	eyebrow: 'Lokalne biuro · Jelenia Góra i Karkonosze',
	tytul: 'Biuro nieruchomości Jelenia Góra — zaufaj lokalnym ekspertom z Karkonoszy',
	tytulEmfaza: 'lokalnym ekspertom',
	podtytul:
		'Kupno lub sprzedaż nieruchomości to jedna z najważniejszych decyzji w życiu. W LW Nieruchomości wiemy, że liczy się nie tylko skuteczna sprzedaż, ale przede wszystkim zaufanie i poczucie bezpieczeństwa. Od ponad 11 lat pomagamy naszym klientom przejść przez cały proces spokojnie i świadomie — od pierwszego spotkania aż po przekazanie nieruchomości.'
};

// Sekcja „Dlaczego my" — 6 kafelków pod wyszukiwarką. Zastąpiła dawny cienki
// pasek zaufania (4,9 / 120+ / Na wyłączność) — zgodnie z handoffem refinement.
// `ikona` = wnętrze <svg viewBox="0 0 24 24"> (ikony liniowe, renderowane {@html}).
// Redesign 1a (refinement 19): układ redakcyjny zamiast siatki 6 kart.
// Lewa kolumna: eyebrow + tytul (emfaza w złocie) + lead + kreska + podpis.
// Prawa: numerowana lista 01–06 (numer = index+1). Pole `ikona` w 1a nieużywane.
export const dlaczegoMy = {
	eyebrow: 'Dlaczego my',
	tytul: 'Powodów jest sześć — a każdy z nich to człowiek.',
	tytulEmfaza: 'człowiek',
	lead: 'Nie jesteśmy największym biurem w regionie i nie chcemy nim być. Zależy nam na czymś innym — żebyś po całej sprzedaży czy zakupie czuł, że byłeś w dobrych rękach.',
	podpis: 'Lidia Wolańska · LW Nieruchomości',
	kafle: [
		{ t: 'Mobilne biuro', d: 'Spotykamy się tam, gdzie jest Ci wygodnie i spokojnie.' },
		{ t: 'Indywidualne podejście', d: 'Liczy się jakość współpracy, nie liczba ofert.' },
		{ t: 'Uczciwe doradztwo', d: 'Radzimy rzetelnie — decyzja zawsze należy do Ciebie.' },
		{ t: 'Bezpieczeństwo', d: 'Jesteśmy obok od pierwszego spotkania po klucze.' },
		{ t: 'Znajomość rynku', d: 'Lokalny rynek Karkonoszy znamy od podszewki.' },
		{ t: '11 lat doświadczenia', d: 'Setki rozmów i transakcji, które realnie pomagają.' }
	]
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
	eyebrow: 'O nas',
	tytul: 'Nieruchomości to nie tylko transakcje. To przede wszystkim ludzie i ich historie.',
	tytulEmfaza: 'ludzie i ich historie',
	akapity: [
		'Sprzedaż nieruchomości to nie tylko podpisanie aktu notarialnego. To często początek nowego etapu życia, spełnianie marzeń, trudne rodzinne decyzje lub zamknięcie ważnego rozdziału. Dlatego od ponad 11 lat pomagamy naszym klientom przejść przez ten proces spokojnie i świadomie.',
		'LW Nieruchomości powstało z przekonania, że dobra współpraca zaczyna się od rozmowy i poznania potrzeb klienta. Każdą nieruchomość traktujemy indywidualnie, poświęcając jej czas i uwagę, na jakie zasługuje.',
		'Nie stawiamy na ilość obsługiwanych ofert — stawiamy na jakość współpracy. Dzięki temu jesteśmy z klientami od pierwszego spotkania aż po przekazanie nieruchomości nowemu właścicielowi, dbając o każdy etap procesu.'
	],
	zdjecie: U('photo-1573496359142-b8d87734a5a2', 800),
	podpisZdjecia: 'Poznajmy się osobiście',
	podpisZdjeciaMaly: 'LW NIERUCHOMOŚCI · JELENIA GÓRA'
};

export const statystyki = [
	{ n: '11+', l: 'lat doświadczenia' },
	{ n: '250', l: 'przeprowadzonych transakcji' },
	{ n: '5.0', l: 'średnia ocen Google' }
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
		img: U('photo-1560520653-9e0e4c89eb11'),
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
		},
		{
			size: 'big',
			img: U('photo-1464822759023-fed622ff2c3b', 1400),
			caption: 'Kamienna Góra',
			href: '/lokalizacje/kamienna-gora'
		},
		{
			size: 'small',
			img: U('photo-1476514525535-07fb3b4ae5f1', 1000),
			caption: 'Mysłakowice',
			href: '/lokalizacje/myslakowice'
		},
		{
			size: 'big',
			img: U('photo-1439066615861-d1af74d74000', 1400),
			caption: 'Leśna',
			href: '/lokalizacje/lesna'
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
	// Redesign 1a (refinement 19): lewa kolumna = kremowy panel z blokiem kontaktowym.
	panelTytul: 'Masz pytania? Zacznijmy od rozmowy.',
	panelLead:
		'Poniżej odpowiadamy na to, co słyszymy najczęściej. Nie znalazłeś swojego pytania? Zadzwoń albo napisz — bez zobowiązań.',
	panelKontakt: {
		telefon: '+48 690 008 273',
		email: 'biuro@lw.nieruchomosci.pl',
		godziny: 'Pon–Pt · 9:00–17:00'
	},
	cta: { label: 'Zadaj pytanie →', href: '#kontakt' },
	lista: [
		{
			q: 'Jak wygląda współpraca z LW Nieruchomości?',
			a: 'Współpracę rozpoczynamy od niezobowiązującej rozmowy, podczas której poznajemy Twoje potrzeby, oczekiwania i sytuację. Następnie analizujemy nieruchomość i przygotowujemy indywidualną strategię działania. Zajmujemy się całym procesem — od wyceny i przygotowania oferty, przez skuteczną promocję i negocjacje, aż po bezpieczne sfinalizowanie transakcji u notariusza i przekazanie nieruchomości. Na każdym etapie możesz liczyć na nasze wsparcie i stały kontakt.'
		},
		{
			q: 'Czy pierwsze spotkanie jest bezpłatne?',
			a: 'Tak. Pierwsze spotkanie jest całkowicie bezpłatne i niezobowiązujące. To czas na poznanie Twoich planów, omówienie możliwości oraz odpowiedź na wszystkie pytania. Dzięki temu wspólnie wybieramy najlepszy sposób działania.'
		},
		{
			q: 'Na jakim terenie działacie?',
			a: 'Specjalizujemy się w sprzedaży i zakupie nieruchomości na terenie Jeleniej Góry oraz całego regionu Karkonoszy. Obsługujemy między innymi Karpacz, Szklarską Porębę, Kowary, Podgórzyn, Piechowice, Jeżów Sudecki i okoliczne miejscowości, np. Rudawy Janowickie. Doskonała znajomość lokalnego rynku pozwala nam skutecznie doradzać i osiągać najlepsze rezultaty dla klientów.'
		},
		{
			q: 'Jak umówić się na spotkanie?',
			a: 'To proste. Wystarczy skontaktować się z nami telefonicznie, mailowo lub przez formularz kontaktowy na stronie. Spotkanie zorganizujemy w dogodnym dla Ciebie miejscu.'
		},
		{
			q: 'Czy pomagacie w formalnościach?',
			a: 'Oczywiście. Dbamy o to, aby cały proces przebiegał sprawnie i bezpiecznie. Pomagamy w kompletowaniu dokumentów, wyjaśniamy wszystkie formalności oraz współpracujemy z notariuszami, doradcami finansowymi i innymi specjalistami. Dzięki temu możesz czuć się spokojnie na każdym etapie transakcji.'
		},
		{
			q: 'Czy pomagacie w uzyskaniu kredytu hipotecznego?',
			a: 'Tak. Współpracujemy z doświadczonymi doradcami kredytowymi, którzy bezpłatnie porównają oferty wielu banków, pomogą wybrać najkorzystniejsze finansowanie oraz przeprowadzą Cię przez cały proces uzyskania kredytu.'
		},
		{
			q: 'Jak wygląda sprzedaż nieruchomości z LW Nieruchomości?',
			a: 'Każda nieruchomość ma swoją historię i potencjał, dlatego nie działamy według jednego schematu. Przygotowujemy profesjonalną wycenę, wykonujemy zdjęcia, filmy i ujęcia z drona, tworzymy atrakcyjną ofertę oraz promujemy ją na największych portalach i w mediach społecznościowych. Prowadzimy prezentacje, negocjacje i czuwamy nad bezpiecznym przebiegiem całej transakcji aż do przekazania nieruchomości nowemu właścicielowi.'
		},
		{
			q: 'Dlaczego warto wybrać LW Nieruchomości?',
			a: 'Bo wierzymy, że za każdą nieruchomością stoi człowiek i jego historia. Od ponad 11 lat pomagamy klientom podejmować bezpieczne i świadome decyzje o sprzedaży oraz zakupie nieruchomości. Łączymy doświadczenie, skuteczny marketing i doskonałą znajomość lokalnego rynku z indywidualnym podejściem, uczciwym doradztwem i pełnym zaangażowaniem. Najważniejsze są dla nas relacje, zaufanie i poczucie bezpieczeństwa naszych klientów.'
		},
		{
			q: 'Czy podpisanie umowy na wyłączność jest korzystne?',
			a: 'Tak. Umowa na wyłączność pozwala nam w pełni zaangażować się w sprzedaż i wykorzystać wszystkie narzędzia marketingowe. Dzięki spójnej strategii promocji, profesjonalnej prezentacji i pełnej odpowiedzialności za proces zwiększamy szanse na szybszą i korzystniejszą transakcję. Współpracujemy z biurami nieruchomości w całej Polsce, więc nic nie tracisz — masz jednego agenta, który wszystkiego dopilnuje.'
		},
		{
			q: 'Czy pomagacie przygotować nieruchomość do sprzedaży?',
			a: 'Tak. Doradzamy, jak przygotować nieruchomość, aby zrobiła najlepsze pierwsze wrażenie na kupujących. Podpowiadamy, co warto zmienić przed sesją zdjęciową i prezentacjami, aby zwiększyć atrakcyjność oferty i osiągnąć jak najlepszą cenę sprzedaży.'
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
