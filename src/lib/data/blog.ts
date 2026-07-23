// Elementy stałe podstrony „Blog" (/blog): SEO, hero, kategorie filtra,
// newsletter. Artykuły pochodzą z bazy (model Article) — patrz +page.server.ts.

export const seo = {
	title: 'Blog — LW Nieruchomości Jelenia Góra i Karkonosze',
	description:
		'Poradnik nieruchomości w Jeleniej Górze i Karkonoszach — sprzedaż, kupno, kredyty, rynek i praktyczne porady.'
};

export const breadcrumbs = [{ label: 'Strona główna', href: '/' }, { label: 'Blog' }];

export const hero = {
	eyebrow: 'Blog · Poradnik',
	tytul: 'Poradnik nieruchomości w Karkonoszach',
	tytulEmfaza: 'w Karkonoszach',
	podtytul:
		'Praktyczna wiedza o sprzedaży, wycenie, marketingu i rynku w Jeleniej Górze i okolicy — po ludzku i konkretnie.'
};

export const kategorie = ['Wszystkie', 'Sprzedaż', 'Wycena', 'Marketing', 'Porady'];

// Autor wyróżnionego wpisu (duża karta u góry listy) — biuro pisze w głosie „my".
export const autorFeatured = {
	imie: 'Lucyna Wojtoń',
	rola: 'Właścicielka i specjalistka ds. nieruchomości'
};

export const newsletter = {
	eyebrow: 'Newsletter',
	tytul: 'Bądź na bieżąco z rynkiem',
	podtytul: 'Raz na jakiś czas — porady, nowe wpisy i ciekawe oferty z Karkonoszy. Zero spamu.',
	przycisk: 'Zapisz się',
	potwierdzenie: 'Dziękujemy! Potwierdź zapis w e-mailu, który wysłaliśmy.'
};
