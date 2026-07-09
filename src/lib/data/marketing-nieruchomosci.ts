// Treść podstrony „Marketing nieruchomości" (/marketing-nieruchomosci).
// Zdjęcia to placeholdery Unsplash — do podmiany na realne realizacje.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Marketing nieruchomości — LW Nieruchomości Jelenia Góra',
	description:
		'Profesjonalny marketing nieruchomości w Jeleniej Górze i Karkonoszach — zdjęcia, film, ujęcia z drona, home staging, social media i portale. W standardzie oferty.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Marketing nieruchomości' }
];

export const hero = {
	eyebrow: 'Usługa · Marketing nieruchomości',
	tytul: 'Marketing, który sprzedaje szybciej i drożej',
	tytulEmfaza: 'szybciej i drożej',
	podtytul:
		'Profesjonalne zdjęcia, film, ujęcia z drona i skuteczna promocja — Twoja nieruchomość wyróżnia się od pierwszego dnia i trafia dokładnie tam, gdzie są kupujący.',
	tlo: U('photo-1460925895917-afdab827c52f', 1600),
	cta: [
		{ label: 'Wypromuj nieruchomość', href: '#formularz', wariant: 'green' },
		{ label: 'Zobacz realizacje', href: '#realizacje', wariant: 'outline' }
	]
};

export const opis = {
	eyebrow: 'O usłudze',
	tytul: 'Pierwsze wrażenie robi się raz',
	akapity: [
		'Kupujący najpierw ogląda zdjęcia — i w kilka sekund decyduje, czy klika dalej. Dlatego traktujemy prezentację nieruchomości jak projekt: profesjonalna sesja, film-spacer, ujęcia z drona i przemyślany opis.',
		'Potem docieramy z ofertą tam, gdzie są kupujący: portale, social media i nasza baza klientów. Wszystko w standardzie naszej obsługi — bez dodatkowych dopłat.'
	],
	zdjecie: U('photo-1526628953301-3e589a6a8b74'),
	badge: 'W standardzie oferty',
	podpis: 'Oferta, która wyróżnia się od pierwszego dnia'
};

export const zakres = {
	eyebrow: 'Zakres',
	tytul: 'Co składa się na profesjonalny marketing',
	lista: [
		{
			tag: 'Foto',
			t: 'Zdjęcia',
			d: 'Profesjonalna sesja w naturalnym świetle, która pokazuje wnętrza z najlepszej strony.'
		},
		{
			tag: 'Video',
			t: 'Film ofertowy',
			d: 'Film-spacer po nieruchomości, który sprzedaje jeszcze zanim kupujący przyjedzie.'
		},
		{
			tag: 'Dron',
			t: 'Ujęcia z drona',
			d: 'Nieruchomość i okolica z perspektywy, która robi wrażenie i pokazuje kontekst.'
		},
		{
			tag: 'Staging',
			t: 'Home staging',
			d: 'Podpowiadamy, jak przygotować wnętrza do sesji i prezentacji, by wyglądały najlepiej.'
		},
		{
			tag: 'Social',
			t: 'Social media',
			d: 'Publikacja i promocja oferty w social media — docieramy do lokalnych kupujących.'
		},
		{
			tag: 'Portale',
			t: 'Portale ogłoszeniowe',
			d: 'Publikacja na czołowych portalach i w naszej bazie klientów, z dopracowanym opisem.'
		}
	]
};

export const realizacje = {
	eyebrow: 'Portfolio',
	tytul: 'Przykłady realizacji',
	uwaga: 'Zdjęcia poglądowe — docelowo galeria realnych realizacji klientki.',
	lista: [
		{ img: U('photo-1522708323590-d24dbb6b0267'), caption: 'Sesja foto — salon' },
		{ img: U('photo-1512917774080-9991f1c4c750'), caption: 'Film-spacer — dom' },
		{ img: U('photo-1473968512647-3e447244af8f'), caption: 'Ujęcia z drona' },
		{ img: U('photo-1560448204-e02f11c3d0e2'), caption: 'Home staging — wnętrze' },
		{ img: U('photo-1600585154340-be6161a56a0c'), caption: 'Dom z ogrodem' },
		{ img: U('photo-1526628953301-3e589a6a8b74'), caption: 'Realizacja wideo' }
	]
};

export const faq = {
	eyebrow: 'FAQ',
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
			a: 'Na czołowych portalach nieruchomości, w social media oraz w naszej bazie klientów — z dopracowanym opisem i zdjęciami.'
		},
		{
			q: 'Czy robicie home staging?',
			a: 'Doradzamy, jak przygotować wnętrza do sesji i prezentacji. W razie potrzeby łączymy z ekipą, która zajmie się metamorfozą.'
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
	tytul: 'Wypromuj swoją nieruchomość',
	podtytul: 'Zostaw kontakt — zaproponujemy pakiet materiałów i promocji dopasowany do Twojej oferty.',
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
