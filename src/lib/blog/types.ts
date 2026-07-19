// Wspólne typy bloga — treść artykułu to tablica bloków (przechowywana jako JSON
// w kolumnie Article.content). Ten sam typ konsumuje edytor w CMS i strona artykułu.
// Model bloków wg handoffu designera (refinement 23).

export type Blok =
	| {
			typ: 'sekcja';
			id: string;
			tocLabel?: string; // etykieta w spisie treści (domyślnie = naglowek)
			numer?: string; // np. „01" dla artykułów krokowych
			naglowek: string;
			akapity: string[]; // każdy akapit może zawierać <strong>/<a>
			dropCap?: boolean; // inicjał w pierwszym akapicie
	  }
	| { typ: 'cytat'; tekst: string; autor: string }
	| {
			typ: 'lista';
			id: string;
			tocLabel?: string;
			naglowek: string;
			wstep?: string;
			punkty: string[]; // punktory złote
	  }
	| {
			typ: 'bledy';
			id: string;
			tocLabel?: string;
			naglowek: string;
			punkty: string[]; // panel kremowy, znacznik ✕ w złotym kółku
	  }
	| {
			typ: 'podsumowanie';
			id: string;
			tocLabel?: string;
			naglowek: string;
			akapity: string[];
	  };

export const BLOK_TYPY: Blok['typ'][] = ['sekcja', 'lista', 'bledy', 'podsumowanie', 'cytat'];

export const BLOK_LABELS: Record<Blok['typ'], string> = {
	sekcja: 'Sekcja (nagłówek + akapity)',
	lista: 'Lista (punktory)',
	bledy: 'Najczęstsze błędy (panel)',
	podsumowanie: 'Podsumowanie',
	cytat: 'Cytat'
};

// Bloki, które trafiają do spisu treści (mają id + tocLabel/naglowek).
export type BlokZKotwica = Exclude<Blok, { typ: 'cytat' }>;
export function maKotwice(b: Blok): b is BlokZKotwica {
	return b.typ !== 'cytat';
}

// Karta na liście /blog
export interface ArticleCard {
	slug: string;
	cat: string;
	title: string;
	excerpt: string;
	date: string;
	read: string;
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
	wSkrocie: string[]; // punkty boxu „W skrócie" (puste = box ukryty)
	spisTresci: { tytul: string; pozycje: { id: string; label: string }[] };
	tresc: { bloki: Blok[] };
	tagi: string[];
	autor: {
		imie: string;
		rola: string;
		inicjaly: string;
		bio: string;
		cta: { label: string; href: string };
	};
	powiazane: {
		tytul: string;
		linkWszystkie: { label: string; href: string };
		wpisy: { cat: string; title: string; excerpt: string; date: string; img: string; slug: string }[];
	};
}
