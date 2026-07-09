// Szablon strony pojedynczego wpisu bloga (/blog/[slug]). Realne wpisy
// docelowo z CMS — tu przykładowy artykuł ("wzorzec układu"). Treść, autor
// i zdjęcia to placeholder do zatwierdzenia z klientką.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Blok =
	| { typ: 'sekcja'; id: string; naglowek2: string }
	| { typ: 'akapit'; html: string; dropCap?: boolean }
	| { typ: 'cytat'; tekst: string; autor: string }
	| { typ: 'lista'; pozycje: { mocne: string; reszta: string }[] }
	| { typ: 'zdjecie'; src: string; alt: string; podpis: string; lokalne?: boolean }
	| { typ: 'statystyki'; uwaga: string; pozycje: { wartosc: string; opis: string }[] };

export interface Artykul {
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
	udostepnij: { kanaly: string[] };
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
	newsletter: {
		eyebrow: string;
		tytul: string;
		podtytul: string;
		przycisk: string;
		potwierdzenie: string;
	};
}

const artykuly: Record<string, Artykul> = {
	'ceny-nieruchomosci-jelenia-gora-trendy-2026': {
		slug: 'ceny-nieruchomosci-jelenia-gora-trendy-2026',
		seo: {
			title: 'Ceny nieruchomości w Jeleniej Górze — trendy 2026 | LW Nieruchomości',
			description:
				'Rok 2025 przyniósł stabilizację. Co to oznacza dla planujących sprzedaż lub zakup nieruchomości w Jeleniej Górze i Karkonoszach w 2026 roku — trendy, prognozy i lokalizacje.',
			ogImage: U('photo-1600585154340-be6161a56a0c', 1600)
		},
		breadcrumbs: [
			{ label: 'Strona główna', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Ceny nieruchomości w Jeleniej Górze — trendy 2026' }
		],
		naglowek: {
			kategoria: 'Rynek',
			czasCzytania: '8 min czytania',
			tytul: 'Ceny nieruchomości w Jeleniej Górze — trendy 2026',
			tytulEmfaza: 'trendy 2026',
			lead: 'Rok 2025 przyniósł stabilizację po kilku latach gwałtownych zmian. Sprawdzamy, co to oznacza dla osób planujących sprzedaż albo zakup w Kotlinie Jeleniogórskiej w 2026 roku.',
			autor: { imie: 'Lidia Wolańska', rola: 'Właścicielka biura', inicjaly: 'LW' },
			data: '20 marca 2026'
		},
		zdjecieGlowne: {
			src: U('photo-1600585154340-be6161a56a0c', 1600),
			alt: 'Dom jednorodzinny w Kotlinie Jeleniogórskiej',
			podpis: 'Rynek nieruchomości w Kotlinie Jeleniogórskiej wchodzi w 2026 rok ze stabilnym popytem.'
		},
		spisTresci: {
			tytul: 'Na tej stronie',
			pozycje: [
				{ id: 'rynek-2025', label: 'Rynek w 2025' },
				{ id: 'prognozy-2026', label: 'Prognozy na 2026' },
				{ id: 'lokalizacje', label: 'Które lokalizacje rosną' },
				{ id: 'co-to-znaczy', label: 'Co to znaczy dla Ciebie' }
			]
		},
		tresc: {
			bloki: [
				{ typ: 'sekcja', id: 'rynek-2025', naglowek2: 'Rynek w 2025 roku w skrócie' },
				{
					typ: 'akapit',
					dropCap: true,
					html: 'Po dynamicznych wzrostach z lat 2021–2023 ubiegły rok upłynął pod znakiem wyhamowania. Ceny ofertowe mieszkań w Jeleniej Górze utrzymały się na zbliżonym poziomie, a liczba transakcji wróciła do zdrowej, przewidywalnej średniej.'
				},
				{
					typ: 'akapit',
					html: 'Kupujący stali się bardziej wymagający i cierpliwi — dłużej porównują oferty, częściej negocjują i zwracają uwagę na stan techniczny oraz koszty utrzymania. Dobrze przygotowana i uczciwie wyceniona nieruchomość wciąż jednak znajduje nabywcę w rozsądnym czasie.'
				},

				{ typ: 'sekcja', id: 'prognozy-2026', naglowek2: 'Prognozy na 2026' },
				{
					typ: 'akapit',
					html: 'Na 2026 rok spodziewamy się kontynuacji stabilizacji z lekką tendencją wzrostową w segmentach o ograniczonej podaży — przede wszystkim domów z ogrodem i mieszkań w kamienicach blisko centrum.'
				},
				{
					typ: 'cytat',
					tekst:
						'Na naszym rynku nie wygrywa najniższa cena, tylko najlepsze przygotowanie oferty i realna wycena.',
					autor: 'Lidia Wolańska, LW Nieruchomości'
				},
				{
					typ: 'akapit',
					html: 'Duże znaczenie będą miały warunki kredytowe. Jeśli koszt finansowania spadnie, część kupujących, która dziś czeka, wróci na rynek — co delikatnie podniesie ceny najbardziej poszukiwanych nieruchomości.'
				},

				{ typ: 'sekcja', id: 'lokalizacje', naglowek2: 'Które lokalizacje rosną najszybciej' },
				{
					typ: 'akapit',
					html: 'Nie ma jednego „rynku Karkonoszy". Różne lokalizacje zachowują się inaczej — oto te, które w ostatnich miesiącach przyciągały największe zainteresowanie:'
				},
				{
					typ: 'lista',
					pozycje: [
						{
							mocne: 'Cieplice i okolice',
							reszta: 'apartamenty pod wynajem krótkoterminowy i uzdrowiskowy charakter dzielnicy.'
						},
						{
							mocne: 'Karpacz i Szklarska Poręba',
							reszta: 'domy i działki z widokiem, kupowane też jako drugie miejsce zamieszkania.'
						},
						{
							mocne: 'Centrum Jeleniej Góry',
							reszta: 'mieszkania w kamienicach, cenione za lokalizację i klimat.'
						},
						{
							mocne: 'Podgórzyn i Sobieszów',
							reszta: 'spokojne okolice dla rodzin szukających domu blisko natury.'
						}
					]
				},
				{
					typ: 'zdjecie',
					src: '/karkonosze-panorama.png',
					alt: 'Panorama Karkonoszy',
					podpis: 'Bliskość gór wciąż jest jednym z najsilniejszych argumentów sprzedażowych w regionie.',
					lokalne: true
				},

				{
					typ: 'statystyki',
					uwaga: 'Dane poglądowe — do zastąpienia realnymi wskaźnikami z rynku lokalnego.',
					pozycje: [
						{ wartosc: '≈ 0%', opis: 'zmiana średnich cen ofertowych rok do roku' },
						{ wartosc: '~45 dni', opis: 'średni czas sprzedaży dobrze przygotowanej oferty' },
						{ wartosc: '3 z 4', opis: 'transakcji finalizowanych z negocjacją ceny' }
					]
				},

				{ typ: 'sekcja', id: 'co-to-znaczy', naglowek2: 'Co to znaczy dla Ciebie' },
				{
					typ: 'akapit',
					html: '<strong>Jeśli sprzedajesz:</strong> zadbaj o przygotowanie nieruchomości i realną wycenę. W rynku kupującego to prezentacja i cena wyjściowa decydują, czy oferta sprzeda się szybko, czy będzie „wisieć" miesiącami.'
				},
				{
					typ: 'akapit',
					html: '<strong>Jeśli kupujesz:</strong> masz komfort wyboru i przestrzeń do negocjacji. Warto działać spokojnie, ale zdecydowanie — najlepsze oferty w dobrych lokalizacjach wciąż znikają szybko.'
				},
				{
					typ: 'akapit',
					html: 'Zastanawiasz się, ile realnie warta jest Twoja nieruchomość w dzisiejszym rynku? Chętnie pomożemy — <a href="/wycena-nieruchomosci">bezpłatna wycena</a> to najlepszy pierwszy krok.'
				}
			]
		},
		tagi: ['Rynek', 'Jelenia Góra', 'Ceny', 'Prognozy 2026'],
		udostepnij: { kanaly: ['Kopiuj link', 'Facebook', 'E-mail'] },
		autor: {
			imie: 'Lidia Wolańska',
			rola: 'Właścicielka biura · LW Nieruchomości',
			inicjaly: 'LW',
			bio: 'Od kilkunastu lat pomaga mieszkańcom Kotliny Jeleniogórskiej sprzedawać i kupować domy oraz mieszkania. Prywatnie — miłośniczka górskich wędrówek.',
			cta: { label: 'Skontaktuj się', href: '/kontakt' }
		},
		powiazane: {
			tytul: 'Więcej z bloga',
			linkWszystkie: { label: 'Wszystkie wpisy →', href: '/blog' },
			wpisy: [
				{
					cat: 'Porady',
					title: 'Jak przygotować mieszkanie do sprzedaży?',
					excerpt: 'Kilka prostych kroków, które podnoszą wartość i przyspieszają sprzedaż.',
					date: '12 maja 2026',
					img: U('photo-1522708323590-d24dbb6b0267'),
					slug: 'jak-przygotowac-mieszkanie-do-sprzedazy'
				},
				{
					cat: 'Kredyty',
					title: 'Kredyt hipoteczny w 2026 — na co zwrócić uwagę',
					excerpt: 'Marże, wkład własny, zdolność — krótki przewodnik dla kupujących na start.',
					date: '15 kwietnia 2026',
					img: U('photo-1554224155-6726b3ff858f'),
					slug: 'kredyt-hipoteczny-2026'
				},
				{
					cat: 'Kupno',
					title: 'Działka w Karkonoszach — jak wybrać dobrze',
					excerpt: 'Media, dojazd, plan zagospodarowania — na co patrzeć przed zakupem działki.',
					date: '2 kwietnia 2026',
					img: U('photo-1500382017468-9049fed747ef'),
					slug: 'dzialka-w-karkonoszach'
				}
			]
		},
		newsletter: {
			eyebrow: 'Newsletter',
			tytul: 'Bądź na bieżąco z rynkiem',
			podtytul: 'Raz na jakiś czas — porady, nowe wpisy i ciekawe oferty z Karkonoszy. Zero spamu.',
			przycisk: 'Zapisz się',
			potwierdzenie: 'Dziękujemy! Potwierdź zapis w e-mailu, który wysłaliśmy.'
		}
	}
};

export function getArticleBySlug(slug: string): Artykul | undefined {
	return artykuly[slug];
}
