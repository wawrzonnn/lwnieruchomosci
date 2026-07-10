// Elementy stałe podstrony „Blog" (/blog): SEO, hero, kategorie filtra,
// newsletter. Artykuły pochodzą z bazy (model Article) — patrz +page.server.ts.

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

export const newsletter = {
	eyebrow: 'Newsletter',
	tytul: 'Bądź na bieżąco z rynkiem',
	podtytul: 'Raz na jakiś czas — porady, nowe wpisy i ciekawe oferty z Karkonoszy. Zero spamu.',
	przycisk: 'Zapisz się',
	potwierdzenie: 'Dziękujemy! Potwierdź zapis w e-mailu, który wysłaliśmy.'
};
