// Wspólne typy bloga — treść artykułu to tablica bloków (przechowywana jako JSON
// w kolumnie Article.content). Ten sam typ konsumuje edytor w CMS i strona artykułu.

export type Blok =
	| { typ: 'sekcja'; id: string; naglowek2: string }
	| { typ: 'akapit'; html: string; dropCap?: boolean }
	| { typ: 'cytat'; tekst: string; autor: string }
	| { typ: 'lista'; pozycje: { mocne: string; reszta: string }[] }
	| { typ: 'zdjecie'; src: string; alt: string; podpis: string; lokalne?: boolean }
	| { typ: 'statystyki'; uwaga: string; pozycje: { wartosc: string; opis: string }[] };

export const BLOK_TYPY: Blok['typ'][] = [
	'sekcja',
	'akapit',
	'cytat',
	'lista',
	'zdjecie',
	'statystyki'
];

export const BLOK_LABELS: Record<Blok['typ'], string> = {
	sekcja: 'Sekcja (nagłówek H2)',
	akapit: 'Akapit',
	cytat: 'Cytat',
	lista: 'Lista',
	zdjecie: 'Zdjęcie',
	statystyki: 'Statystyki'
};

// Karta na liście /blog
export interface ArticleCard {
	slug: string;
	cat: string;
	title: string;
	excerpt: string;
	date: string;
	img: string;
	featured?: boolean;
}

// Pełny widok artykułu (kształt, którego oczekuje strona /blog/[slug])
export interface ArticleView {
	slug: string;
	seo: { title: string; description: string; ogImage: string };
	breadcrumbs: { label: string; href?: string }[];
	naglowek: {
		kategoria: string;
		czasCzytania: string;
		tytul: string;
		tytulEmfaza: string;
		lead: string;
		autor: { imie: string; rola: string; inicjaly: string };
		data: string;
	};
	zdjecieGlowne: { src: string; alt: string; podpis: string };
	spisTresci: { tytul: string; pozycje: { id: string; label: string }[] };
	tresc: { bloki: Blok[] };
	tagi: string[];
	autor: { imie: string; rola: string; inicjaly: string; bio: string; cta: { label: string; href: string } };
	powiazane: {
		tytul: string;
		linkWszystkie: { label: string; href: string };
		wpisy: { cat: string; title: string; excerpt: string; date: string; img: string; slug: string }[];
	};
}
