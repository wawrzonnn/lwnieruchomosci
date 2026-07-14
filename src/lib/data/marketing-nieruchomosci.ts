// Treść podstrony „Marketing nieruchomości" (/marketing-nieruchomosci).
// UWAGA: ta podstrona NIE jest generycznym szkieletem usługi — to witryna
// kanałów promocji, każdy kanał (zdjęcia/film/dron/social/portale) ma
// własną, dedykowaną sekcję. Zdjęcia to placeholdery Unsplash — do
// podmiany na realne realizacje klientki.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Marketing nieruchomości — LW Nieruchomości Jelenia Góra',
	description:
		'Marketing nieruchomości w Jeleniej Górze i Karkonoszach: profesjonalne zdjęcia, film-spacer, ujęcia z drona, promocja w social media i na portalach ogłoszeniowych. W standardzie oferty sprzedaży.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Marketing nieruchomości' }
];

export const hero = {
	eyebrow: 'Usługa · Marketing nieruchomości',
	tytul: 'Marketing nieruchomości, który pomaga skutecznie sprzedawać',
	tytulEmfaza: 'skutecznie sprzedawać',
	podtytul:
		'Pierwsze wrażenie można zrobić tylko raz. Dlatego dbamy o to, aby każda nieruchomość została zaprezentowana w sposób, który przyciąga uwagę i pokazuje jej największe atuty. Profesjonalne materiały oraz przemyślana promocja zwiększają zainteresowanie ofertą i pomagają szybciej znaleźć odpowiedniego kupującego.',
	tlo: U('photo-1460925895917-afdab827c52f', 1600),
	cta: [
		{ label: 'Wypromuj nieruchomość', href: '#formularz', wariant: 'green' },
		{ label: 'Zobacz realizacje', href: '#realizacje', wariant: 'outline' }
	]
};

export const pasekKanalow = {
	haslo: 'Pełny pakiet marketingowy w standardzie każdej oferty sprzedaży — bez dodatkowych dopłat.',
	chipy: ['Zdjęcia', 'Film', 'Dron', 'Social media', 'Portale']
};

export const zdjecia = {
	eyebrow: '02 — Fotografia',
	tytul: 'Zdjęcia, które zatrzymują scroll',
	tytulEmfaza: 'scroll',
	opis: 'Kupujący najpierw ogląda zdjęcia i w kilka sekund decyduje, czy klika dalej. Dlatego traktujemy sesję jak projekt: naturalne światło, przemyślane kadry i pełna obróbka.',
	punkty: ['Sesja wnętrz, detali i otoczenia', 'Kadry w naturalnym świetle', 'Obróbka i retusz w cenie'],
	zdjecie: U('photo-1600607687939-ce8a6c25118c', 1000)
};

export const film = {
	eyebrow: '03 — Film',
	tytul: 'Film-spacer, który sprzedaje zanim kupujący przyjedzie',
	tytulEmfaza: 'zanim',
	opis: 'Płynne nagranie prowadzi widza przez nieruchomość jak podczas prezentacji na żywo. Oszczędza czas obu stronom i przyciąga naprawdę zainteresowanych.',
	punkty: [
		'Płynny spacer po całej nieruchomości',
		'Montaż z muzyką i opisem',
		'Format pod social media i portale'
	],
	zdjecie: U('photo-1502005229762-cf1b2da7c5d6', 1000),
	badge: 'Film-spacer · 60–90 s'
};

export const dron = {
	eyebrow: '04 — Z lotu ptaka',
	tytul: 'Pokaż okolicę z perspektywy, która robi wrażenie',
	tytulEmfaza: 'robi wrażenie',
	opis: 'Ujęcia z drona pokazują działkę, otoczenie i bliskość gór — kontekst, którego nie odda żadne zdjęcie z ręki. Idealne dla domów, działek i nieruchomości z widokiem na Karkonosze.',
	tlo: U('photo-1464822759023-fed622ff2c3b', 1800),
	statystyki: [
		{ wartosc: '4K', opis: 'jakość ujęć' },
		{ wartosc: '360°', opis: 'widok otoczenia' },
		{ wartosc: 'Foto + wideo', opis: 'w jednym locie' }
	]
};

export const socialMedia = {
	eyebrow: '05 — Social media',
	tytul: 'Docieramy tam, gdzie są kupujący',
	tytulEmfaza: 'są kupujący',
	opis: 'Publikujemy i promujemy ofertę na Facebooku i Instagramie, targetując lokalnie — osoby szukające nieruchomości w Jeleniej Górze i Kotlinie Jeleniogórskiej.',
	punkty: ['Posty i relacje z ofertą', 'Płatna promocja z targetem lokalnym', 'Nasza społeczność obserwujących'],
	makiety: [
		{
			platforma: 'Facebook',
			autor: 'LW Nieruchomości',
			podpis: 'Sponsorowane · Facebook',
			tresc: 'Nowość! Słoneczny apartament z widokiem na Śnieżkę 🌄 Zapraszamy na prezentację.',
			reakcje: '♥ 214 · 💬 37 · ↗ 12'
		},
		{
			platforma: 'Instagram',
			autor: 'lw.nieruchomosci',
			podpis: 'Instagram · Reels',
			tresc: 'Spacer po domu w Karpaczu 🎥 Pełne wideo w opisie oferty.'
		}
	]
};

export const portale = {
	eyebrow: '06 — Portale ogłoszeniowe',
	tytul: 'Twoja oferta na czołowych portalach',
	tytulEmfaza: 'czołowych portalach',
	opis: 'Publikujemy ogłoszenie z dopracowanym opisem i profesjonalnymi zdjęciami tam, gdzie kupujący naprawdę szukają — plus w naszej wewnętrznej bazie klientów.',
	portale: ['Otodom', 'OLX', 'Domiporta', 'Gratka', 'Morizon'],
	portalWyrozniony: 'Baza klientów LW'
};

export const realizacje = {
	eyebrow: '07 — Portfolio',
	tytul: 'Przykłady realizacji',
	uwaga: 'Zdjęcia poglądowe — docelowo galeria realnych realizacji klientki.',
	slajdy: [
		{
			img: U('photo-1600585154340-be6161a56a0c', 1200),
			tag: 'Fotografia · dom',
			caption: 'Dom z ogrodem — pełna sesja wnętrz i elewacji'
		},
		{
			img: U('photo-1512917774080-9991f1c4c750', 1200),
			tag: 'Film · rezydencja',
			caption: 'Film-spacer po domu w Karpaczu'
		},
		{
			img: U('photo-1464822759023-fed622ff2c3b', 1200),
			tag: 'Dron · działka',
			caption: 'Ujęcia z drona — działka u podnóża Karkonoszy'
		},
		{
			img: U('photo-1600607687939-ce8a6c25118c', 1200),
			tag: 'Fotografia · apartament',
			caption: 'Apartament w Jeleniej Górze w naturalnym świetle'
		},
		{
			img: U('photo-1502005229762-cf1b2da7c5d6', 1200),
			tag: 'Film + social',
			caption: 'Reels z prezentacji mieszkania'
		},
		{
			img: U('photo-1449844908441-8829872d2607', 1200),
			tag: 'Dron · panorama',
			caption: 'Otoczenie i widok na góry z lotu ptaka'
		}
	]
};

export const faq = {
	eyebrow: '08 — FAQ',
	tytul: 'Pytania o marketing',
	cta: { label: 'Zadaj pytanie →', href: '#formularz' },
	lista: [
		{
			q: 'Ile kosztuje marketing nieruchomości?',
			a: 'Przy zleceniu sprzedaży pełen pakiet marketingowy (zdjęcia, dron, film, promocja) jest w standardzie — bez dodatkowych dopłat.'
		},
		{
			q: 'Czy zdjęcia i film są w cenie?',
			a: 'Tak. Profesjonalna sesja, film-spacer i ujęcia z drona wchodzą w skład naszej obsługi sprzedaży.'
		},
		{
			q: 'Na jakich portalach publikujecie ofertę?',
			a: 'Na czołowych portalach nieruchomości (Otodom, OLX, Domiporta, Gratka, Morizon), w social media oraz w naszej bazie klientów — z dopracowanym opisem i zdjęciami.'
		},
		{
			q: 'Czy loty dronem są legalne i ubezpieczone?',
			a: 'Tak. Operator ma wymagane uprawnienia, a loty prowadzimy zgodnie z przepisami i tylko tam, gdzie jest to dozwolone.'
		},
		{
			q: 'Czy mogę zamówić sam marketing, bez pośrednictwa?',
			a: 'Tak, możemy przygotować sam pakiet marketingowy. Napisz, czego potrzebujesz — wycenimy indywidualnie.'
		},
		{
			q: 'Jak szybko powstają materiały?',
			a: 'Zwykle w kilka dni od sesji — zależnie od zakresu (film i montaż zajmują nieco więcej czasu).'
		}
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Dobra prezentacja to większa szansa na skuteczną sprzedaż',
	podtytul: 'Porozmawiajmy o tym, jak najlepiej pokazać potencjał Twojej nieruchomości.',
	przycisk: 'Wyślij zgłoszenie',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Mamy Twoje zgłoszenie. Odezwiemy się z propozycją pakietu marketingowego.'
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
		t: 'Kupno nieruchomości',
		slug: '/kupno-nieruchomosci',
		d: 'Znajdziemy i wynegocjujemy nieruchomość dla Ciebie.'
	},
	{
		t: 'Wycena nieruchomości',
		slug: '/wycena-nieruchomosci',
		d: 'Poznaj realną, rynkową wartość nieruchomości.'
	},
	{
		t: 'Doradztwo kredytowe',
		slug: '/doradztwo-kredytowe',
		d: 'Dobierzemy finansowanie i przejdziemy przez formalności.'
	}
];
