// Treść podstrony „Blog" (/blog). Artykuły to szkic/placeholder do
// zatwierdzenia przez klientkę — zdjęcia z Unsplash (podmień na realne).
// Wyszukiwarka + filtr kategorii działają po stronie klienta.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Blog — LW Nieruchomości Jelenia Góra i Karkonosze',
	description:
		'Poradnik nieruchomości w Jeleniej Górze i Karkonoszach — sprzedaż, kupno, kredyty, rynek i praktyczne porady.'
};

export const breadcrumbs = [{ label: 'Strona główna', href: '/' }, { label: 'Blog' }];

export const hero = {
	eyebrow: 'Blog',
	tytul: 'Poradnik nieruchomości w Karkonoszach',
	tytulEmfaza: 'w Karkonoszach',
	podtytul:
		'Praktyczna wiedza o sprzedaży, kupnie, kredytach i rynku w Jeleniej Górze i okolicy — po ludzku i konkretnie.'
};

export const kategorie = ['Wszystkie', 'Sprzedaż', 'Kupno', 'Kredyty', 'Rynek', 'Porady'];

export interface Artykul {
	cat: string;
	title: string;
	excerpt: string;
	date: string;
	img: string;
	featured?: boolean;
	slug?: string;
}

export const artykuly: Artykul[] = [
	{
		cat: 'Rynek',
		title: 'Ceny nieruchomości w Jeleniej Górze — trendy 2026',
		excerpt: 'Co dzieje się na lokalnym rynku i czego spodziewać się w najbliższych miesiącach.',
		date: '20 marca 2026',
		img: U('photo-1600585154340-be6161a56a0c'),
		featured: true,
		slug: 'ceny-nieruchomosci-jelenia-gora-trendy-2026'
	},
	{
		cat: 'Porady',
		title: 'Jak przygotować mieszkanie do sprzedaży?',
		excerpt:
			'Kilka prostych kroków, które podnoszą wartość i przyspieszają sprzedaż — od porządków po drobne naprawy.',
		date: '12 maja 2026',
		img: U('photo-1522708323590-d24dbb6b0267')
	},
	{
		cat: 'Sprzedaż',
		title: 'Umowa na wyłączność — czy naprawdę się opłaca?',
		excerpt: 'Wyjaśniamy, co zyskujesz przy wyłączności i kiedy warto ją rozważyć.',
		date: '28 kwietnia 2026',
		img: U('photo-1560448204-e02f11c3d0e2')
	},
	{
		cat: 'Kredyty',
		title: 'Kredyt hipoteczny w 2026 — na co zwrócić uwagę',
		excerpt: 'Marże, wkład własny, zdolność — krótki przewodnik dla kupujących na start.',
		date: '15 kwietnia 2026',
		img: U('photo-1554224155-6726b3ff858f')
	},
	{
		cat: 'Kupno',
		title: 'Działka w Karkonoszach — jak wybrać dobrze',
		excerpt: 'Media, dojazd, plan zagospodarowania — na co patrzeć przed zakupem działki.',
		date: '2 kwietnia 2026',
		img: U('photo-1500382017468-9049fed747ef')
	},
	{
		cat: 'Porady',
		title: 'Home staging: małe zmiany, duża różnica',
		excerpt: 'Jak niewielkim kosztem przygotować wnętrze do sesji zdjęciowej i prezentacji.',
		date: '8 marca 2026',
		img: U('photo-1512917774080-9991f1c4c750')
	}
];

export const newsletter = {
	eyebrow: 'Newsletter',
	tytul: 'Bądź na bieżąco z rynkiem',
	podtytul: 'Raz na jakiś czas — porady, nowe wpisy i ciekawe oferty z Karkonoszy. Zero spamu.',
	przycisk: 'Zapisz się',
	potwierdzenie: 'Dziękujemy! Potwierdź zapis w e-mailu, który wysłaliśmy.'
};
