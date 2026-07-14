// Treść podstrony „O nas" (/o-nas). Historia, zespół i statystyki to
// szkic/placeholder do zatwierdzenia z klientką — zdjęcia zespołu z
// Unsplash (podmień na realne portrety).

const U = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'O nas — LW Nieruchomości Jelenia Góra i Karkonosze',
	description:
		'Lokalne biuro nieruchomości z Jeleniej Góry. Poznaj naszą historię, wartości i zespół — uczciwie, spokojnie, po ludzku.'
};

export const breadcrumbs = [{ label: 'Strona główna', href: '/' }, { label: 'O nas' }];

export const hero = {
	eyebrow: 'O nas',
	tytul: 'Ludzie i miejsca — nie tylko metry',
	tytulEmfaza: 'nie tylko metry',
	podtytul:
		'Sprzedaż nieruchomości to nie tylko podpisanie aktu notarialnego. To często początek nowego etapu życia, spełnianie marzeń, trudne rodzinne decyzje lub zamknięcie ważnego rozdziału. Dlatego od ponad 11 lat pomagamy naszym klientom przejść przez ten proces spokojnie i świadomie.',
	tlo: '/karkonosze-panorama.png',
	cta: [
		{ label: 'Poznajmy się', href: '#kontakt', wariant: 'green' },
		{ label: 'Poznaj zespół', href: '#zespol', wariant: 'outline' }
	]
};

export const historia = {
	eyebrow: 'Nasza historia',
	tytul: 'Jak to się zaczęło',
	podtytul:
		'Od pierwszej transakcji wierzymy w to samo: uczciwość, spokój i realne wsparcie. Poniżej kilka momentów, które nas ukształtowały.',
	kroki: [
		{
			year: '2014',
			t: 'Początek',
			d: 'Powstaje LW Nieruchomości — z pasji do ludzi i lokalnego rynku Kotliny Jeleniogórskiej.'
		},
		{
			year: '2017',
			t: 'Pierwsze dziesiątki transakcji',
			d: 'Zdobywamy zaufanie klientów i budujemy reputację uczciwego, spokojnego biura.'
		},
		{
			year: '2020',
			t: 'Marketing premium w standardzie',
			d: 'Wprowadzamy profesjonalne zdjęcia, ujęcia z drona i film do każdej oferty — bez dopłat.'
		},
		{
			year: '2023',
			t: 'Ponad 100 rodzin',
			d: 'Pomagamy kolejnym rodzinom sprzedać, kupić i znaleźć swoje miejsce w Karkonoszach.'
		},
		{
			year: '2026',
			t: 'Dziś',
			d: 'Zaufane, mobilne biuro z oceną 4,9 w Google i wieloma ofertami prowadzonymi na wyłączność.'
		}
	]
};

export const wartosci = {
	eyebrow: 'Wartości',
	tytul: 'W co wierzymy',
	lista: [
		{
			t: 'Uczciwość',
			d: 'Mówimy wprost, nawet gdy trzeba odradzić. Bez ukrytych kosztów i gwiazdek.'
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
	{ n: '11 lat', l: 'w branży' },
	{ n: '120+', l: 'transakcji' },
	{ n: '250+', l: 'klientów' },
	{ n: '4,9', l: 'ocena Google' }
];

export const zespol = {
	eyebrow: 'Zespół',
	tytul: 'Ludzie, których poznasz',
	uwaga: 'Zdjęcia zespołu to placeholdery — podmień na realne portrety.',
	lista: [
		{
			name: 'Lidia W.',
			role: 'Właścicielka, agentka',
			bio: 'Prowadzi biuro od pierwszego dnia. Łączy znajomość rynku z ciepłym, ludzkim podejściem.',
			img: U('photo-1573496359142-b8d87734a5a2')
		},
		{
			name: 'Marek K.',
			role: 'Agent nieruchomości',
			bio: 'Specjalista od domów i działek w Karkonoszach. Negocjuje spokojnie i skutecznie.',
			img: U('photo-1507003211169-0a1dd7228f2d')
		},
		{
			name: 'Anna S.',
			role: 'Opieka nad klientem',
			bio: 'Czuwa nad formalnościami i terminami, żebyś na każdym etapie czuł się pewnie.',
			img: U('photo-1544005313-94ddf0286df2')
		}
	]
};

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
	podtytul: 'Bez zobowiązań i bez presji. Zadzwoń lub napisz — odpowiemy po ludzku.',
	cta: [
		{ label: 'Skontaktuj się', href: '/kontakt', wariant: 'green' },
		{ label: '+48 690 008 273', href: 'tel:+48690008273', wariant: 'outline' }
	]
};
