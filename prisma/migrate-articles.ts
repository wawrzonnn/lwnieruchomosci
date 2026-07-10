import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const U = (id: string, w = 1600) =>
	`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Blok =
	| { typ: 'sekcja'; id: string; naglowek2: string }
	| { typ: 'akapit'; html: string; dropCap?: boolean }
	| { typ: 'cytat'; tekst: string; autor: string }
	| { typ: 'lista'; pozycje: { mocne: string; reszta: string }[] }
	| { typ: 'zdjecie'; src: string; alt: string; podpis: string; lokalne?: boolean }
	| { typ: 'statystyki'; uwaga: string; pozycje: { wartosc: string; opis: string }[] };

const AUTHOR = {
	authorName: 'Lidia Wolańska',
	authorRole: 'Właścicielka biura · LW Nieruchomości',
	authorInitials: 'LW',
	authorBio:
		'Od kilkunastu lat pomaga mieszkańcom Kotliny Jeleniogórskiej sprzedawać i kupować domy oraz mieszkania. Prywatnie — miłośniczka górskich wędrówek.'
};

type Input = {
	slug: string;
	featured?: boolean;
	category: string;
	title: string;
	titleEmphasis?: string;
	excerpt: string;
	lead: string;
	readTime: string;
	publishedAt: string; // ISO
	coverImage: string;
	coverAlt?: string;
	coverCaption?: string;
	content: Blok[];
	tags: string[];
	seoTitle?: string;
	seoDescription?: string;
	ogImage?: string;
};

const articles: Input[] = [
	// 1) PEŁNY artykuł — 1:1 z dotychczasowego mocka
	{
		slug: 'ceny-nieruchomosci-jelenia-gora-trendy-2026',
		featured: true,
		category: 'Rynek',
		title: 'Ceny nieruchomości w Jeleniej Górze — trendy 2026',
		titleEmphasis: 'trendy 2026',
		excerpt: 'Co dzieje się na lokalnym rynku i czego spodziewać się w najbliższych miesiącach.',
		lead: 'Rok 2025 przyniósł stabilizację po kilku latach gwałtownych zmian. Sprawdzamy, co to oznacza dla osób planujących sprzedaż albo zakup w Kotlinie Jeleniogórskiej w 2026 roku.',
		readTime: '8 min czytania',
		publishedAt: '2026-03-20',
		coverImage: U('photo-1600585154340-be6161a56a0c'),
		coverAlt: 'Dom jednorodzinny w Kotlinie Jeleniogórskiej',
		coverCaption:
			'Rynek nieruchomości w Kotlinie Jeleniogórskiej wchodzi w 2026 rok ze stabilnym popytem.',
		tags: ['Rynek', 'Jelenia Góra', 'Ceny', 'Prognozy 2026'],
		seoTitle: 'Ceny nieruchomości w Jeleniej Górze — trendy 2026 | LW Nieruchomości',
		seoDescription:
			'Rok 2025 przyniósł stabilizację. Co to oznacza dla planujących sprzedaż lub zakup nieruchomości w Jeleniej Górze i Karkonoszach w 2026 roku — trendy, prognozy i lokalizacje.',
		ogImage: U('photo-1600585154340-be6161a56a0c'),
		content: [
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
				podpis:
					'Bliskość gór wciąż jest jednym z najsilniejszych argumentów sprzedażowych w regionie.',
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

	// 2)
	{
		slug: 'jak-przygotowac-mieszkanie-do-sprzedazy',
		category: 'Porady',
		title: 'Jak przygotować mieszkanie do sprzedaży?',
		excerpt:
			'Kilka prostych kroków, które podnoszą wartość i przyspieszają sprzedaż — od porządków po drobne naprawy.',
		lead: 'Pierwsze wrażenie kupujący robi w kilka sekund. Zanim wystawisz ofertę, warto poświęcić chwilę na przygotowanie mieszkania — to najtańszy sposób, by sprzedać szybciej i drożej.',
		readTime: '5 min czytania',
		publishedAt: '2026-05-12',
		coverImage: U('photo-1522708323590-d24dbb6b0267'),
		coverAlt: 'Jasne, uprzątnięte wnętrze mieszkania',
		tags: ['Porady', 'Sprzedaż', 'Home staging'],
		content: [
			{ typ: 'sekcja', id: 'porzadki', naglowek2: 'Zacznij od porządków i odgracania' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Im mniej rzeczy, tym większe i jaśniejsze wydaje się wnętrze. Schowaj to, czego nie używasz na co dzień, usuń nadmiar mebli i zrób miejsce na światło. Kupujący musi móc wyobrazić sobie w tym mieszkaniu siebie — a nie oglądać Twoje życie.'
			},
			{ typ: 'sekcja', id: 'drobne-naprawy', naglowek2: 'Zadbaj o drobne naprawy' },
			{
				typ: 'akapit',
				html: 'Cieknący kran, skrzypiące drzwi, odpryski farby — pojedynczo to drobiazgi, ale razem budują wrażenie zaniedbania. Lista drobnych poprawek zwraca się z nawiązką w cenie i czasie sprzedaży.'
			},
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Ściany', reszta: 'przemaluj na jasny, neutralny kolor.' },
					{ mocne: 'Oświetlenie', reszta: 'wymień przepalone żarówki na ciepłe i jednolite.' },
					{ mocne: 'Zapach', reszta: 'wywietrz i unikaj intensywnych zapachów.' },
					{ mocne: 'Detale', reszta: 'dokręć klamki, uzupełnij fugi, umyj okna.' }
				]
			},
			{ typ: 'sekcja', id: 'zdjecia', naglowek2: 'Postaw na dobre zdjęcia' },
			{
				typ: 'akapit',
				html: 'Większość kupujących zaczyna poszukiwania od zdjęć w internecie. Zadbane, jasne wnętrze na profesjonalnych fotografiach generuje po prostu więcej telefonów — i więcej prezentacji.'
			},
			{
				typ: 'akapit',
				html: 'Jeśli chcesz, zajmiemy się tym za Ciebie — <a href="/marketing-nieruchomosci">profesjonalny marketing nieruchomości</a> to standard w naszej ofercie.'
			}
		]
	},

	// 3)
	{
		slug: 'umowa-na-wylacznosc-czy-sie-oplaca',
		category: 'Sprzedaż',
		title: 'Umowa na wyłączność — czy naprawdę się opłaca?',
		excerpt: 'Wyjaśniamy, co zyskujesz przy wyłączności i kiedy warto ją rozważyć.',
		lead: 'Wielu sprzedających obawia się wyłączności, myśląc, że ogranicza im pole manewru. W praktyce dobrze poprowadzona umowa na wyłączność najczęściej działa na korzyść właściciela.',
		readTime: '5 min czytania',
		publishedAt: '2026-04-28',
		coverImage: U('photo-1560448204-e02f11c3d0e2'),
		coverAlt: 'Podpisywanie umowy sprzedaży nieruchomości',
		tags: ['Sprzedaż', 'Wyłączność', 'Porady'],
		content: [
			{ typ: 'sekcja', id: 'co-to-jest', naglowek2: 'Co oznacza wyłączność' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Umowa na wyłączność to zobowiązanie, że sprzedaż nieruchomości prowadzi jedno biuro. W zamian agent angażuje w ofertę pełne zasoby — czas, budżet marketingowy i sieć kontaktów — bo ma pewność rozliczenia swojej pracy.'
			},
			{ typ: 'sekcja', id: 'korzysci', naglowek2: 'Co zyskujesz' },
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Zaangażowanie', reszta: 'biuro inwestuje w marketing, bo ma pewność efektu.' },
					{ mocne: 'Jedna, spójna cena', reszta: 'oferta nie „krąży" po portalach w kilku wersjach.' },
					{ mocne: 'Mniej telefonów', reszta: 'kontakt i prezentacje przejmuje agent.' },
					{ mocne: 'Bezpieczeństwo', reszta: 'weryfikacja kupujących i wsparcie przy formalnościach.' }
				]
			},
			{
				typ: 'cytat',
				tekst:
					'Oferta prowadzona przez kilka biur naraz sprawia wrażenie, że nikomu na niej nie zależy. Wyłączność mówi rynkowi coś przeciwnego.',
				autor: 'Lidia Wolańska, LW Nieruchomości'
			},
			{ typ: 'sekcja', id: 'kiedy-warto', naglowek2: 'Kiedy warto ją rozważyć' },
			{
				typ: 'akapit',
				html: 'Wyłączność sprawdza się szczególnie przy nieruchomościach wymagających dobrego przygotowania i promocji — a także wtedy, gdy zależy Ci na spokoju i jednym punkcie kontaktu przez cały proces.'
			}
		]
	},

	// 4)
	{
		slug: 'kredyt-hipoteczny-2026-na-co-zwrocic-uwage',
		category: 'Kredyty',
		title: 'Kredyt hipoteczny w 2026 — na co zwrócić uwagę',
		excerpt: 'Marże, wkład własny, zdolność — krótki przewodnik dla kupujących na start.',
		lead: 'Zdolność kredytowa, wkład własny i marża banku decydują o tym, na jaką nieruchomość realnie Cię stać. Zanim zaczniesz szukać, warto poznać kilka podstaw.',
		readTime: '6 min czytania',
		publishedAt: '2026-04-15',
		coverImage: U('photo-1554224155-6726b3ff858f'),
		coverAlt: 'Kalkulacja kredytu hipotecznego',
		tags: ['Kredyty', 'Finansowanie', '2026'],
		content: [
			{ typ: 'sekcja', id: 'zdolnosc', naglowek2: 'Zdolność kredytowa to punkt wyjścia' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Zanim zakochasz się w konkretnym mieszkaniu, sprawdź, ile bank jest gotów Ci pożyczyć. Zdolność zależy od dochodów, formy zatrudnienia, liczby domowników i innych zobowiązań — i potrafi się różnić między bankami.'
			},
			{ typ: 'sekcja', id: 'wklad-wlasny', naglowek2: 'Wkład własny' },
			{
				typ: 'akapit',
				html: 'Standardem jest 20% wartości nieruchomości, choć część banków akceptuje 10% z dodatkowym ubezpieczeniem. Im wyższy wkład, tym zwykle lepsze warunki kredytu.'
			},
			{ typ: 'sekcja', id: 'marza', naglowek2: 'Marża i oprocentowanie' },
			{
				typ: 'akapit',
				html: 'Marża to stały zarobek banku doliczany do stopy referencyjnej. Różnice między ofertami bywają pozornie niewielkie, ale w skali całego kredytu to realne tysiące złotych.'
			},
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Porównaj kilka banków', reszta: 'nawet 0,3 p.p. marży robi różnicę.' },
					{ mocne: 'Sprawdź prowizje', reszta: 'i koszt ubezpieczeń okołokredytowych.' },
					{ mocne: 'Policz całość', reszta: 'RRSO mówi więcej niż samo oprocentowanie.' }
				]
			},
			{
				typ: 'akapit',
				html: 'Nie musisz robić tego sam — współpracujemy z doradcami, którzy przejdą z Tobą przez cały proces. Zobacz <a href="/doradztwo-kredytowe">doradztwo kredytowe</a>.'
			}
		]
	},

	// 5)
	{
		slug: 'dzialka-w-karkonoszach-jak-wybrac-dobrze',
		category: 'Kupno',
		title: 'Działka w Karkonoszach — jak wybrać dobrze',
		excerpt: 'Media, dojazd, plan zagospodarowania — na co patrzeć przed zakupem działki.',
		lead: 'Widok na góry to nie wszystko. Przy zakupie działki liczą się przede wszystkim plan zagospodarowania, dostęp do mediów i realny dojazd przez cały rok.',
		readTime: '6 min czytania',
		publishedAt: '2026-04-02',
		coverImage: U('photo-1500382017468-9049fed747ef'),
		coverAlt: 'Widokowa działka w Karkonoszach',
		tags: ['Kupno', 'Działki', 'Karkonosze'],
		content: [
			{ typ: 'sekcja', id: 'plan-zagospodarowania', naglowek2: 'Sprawdź plan zagospodarowania' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Zanim kupisz, sprawdź w gminie miejscowy plan zagospodarowania (MPZP) albo wystąp o warunki zabudowy. To one decydują, czy i co możesz na działce wybudować — a bywa, że widokowa parcela okazuje się terenem rolnym bez prawa zabudowy.'
			},
			{ typ: 'sekcja', id: 'media', naglowek2: 'Media i uzbrojenie' },
			{
				typ: 'akapit',
				html: 'Prąd, woda i odprowadzenie ścieków potrafią kosztować więcej niż sama działka. Zanim zdecydujesz, ustal odległości przyłączy i realne koszty doprowadzenia mediów.'
			},
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Prąd', reszta: 'odległość przyłącza od granicy działki.' },
					{ mocne: 'Woda', reszta: 'wodociąg gminny albo warunki na studnię.' },
					{ mocne: 'Ścieki', reszta: 'kanalizacja, szambo lub przydomowa oczyszczalnia.' },
					{ mocne: 'Dojazd', reszta: 'droga utwardzona i uregulowany status prawny dojazdu.' }
				]
			},
			{ typ: 'sekcja', id: 'teren', naglowek2: 'Ukształtowanie i otoczenie' },
			{
				typ: 'akapit',
				html: 'Duży spadek terenu, podmokłe podłoże czy sąsiedztwo mogą znacząco wpłynąć na koszt budowy i komfort życia. Warto obejrzeć działkę o różnych porach i porozmawiać z sąsiadami.'
			}
		]
	},

	// 6)
	{
		slug: 'home-staging-male-zmiany-duza-roznica',
		category: 'Porady',
		title: 'Home staging: małe zmiany, duża różnica',
		excerpt: 'Jak niewielkim kosztem przygotować wnętrze do sesji zdjęciowej i prezentacji.',
		lead: 'Home staging to sztuka pokazania wnętrza z najlepszej strony — bez remontu i dużych nakładów. Kilka prostych zabiegów potrafi skrócić czas sprzedaży o tygodnie.',
		readTime: '5 min czytania',
		publishedAt: '2026-03-08',
		coverImage: U('photo-1512917774080-9991f1c4c750'),
		coverAlt: 'Przygotowane do sesji wnętrze',
		tags: ['Porady', 'Home staging', 'Prezentacja'],
		content: [
			{ typ: 'sekcja', id: 'swiatlo', naglowek2: 'Światło przede wszystkim' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Jasne wnętrze wydaje się większe i bardziej przyjazne. Odsłoń okna, dołóż źródła światła i zadbaj o jednolitą, ciepłą barwę żarówek — to najprostszy sposób, by wnętrze „ożyło" na zdjęciach.'
			},
			{ typ: 'sekcja', id: 'kolory', naglowek2: 'Neutralnie, ale z charakterem' },
			{
				typ: 'akapit',
				html: 'Stonowane kolory ścian i tekstyliów pozwalają kupującemu wyobrazić sobie własne życie w tym miejscu. Dodatki mogą wprowadzić charakter — byle nie przytłaczały przestrzeni.'
			},
			{
				typ: 'cytat',
				tekst:
					'Nie sprzedajesz swojego gustu — sprzedajesz przestrzeń, w której kupujący ma poczuć się jak u siebie.',
				autor: 'Lidia Wolańska, LW Nieruchomości'
			},
			{ typ: 'sekcja', id: 'detale', naglowek2: 'Detale, które robią różnicę' },
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Rośliny', reszta: 'ożywiają i ocieplają wnętrze.' },
					{ mocne: 'Tekstylia', reszta: 'świeże poduszki, koc, ręczniki w łazience.' },
					{ mocne: 'Zapach i porządek', reszta: 'neutralny zapach i uprzątnięte blaty.' }
				]
			}
		]
	}
];

async function main() {
	let n = 0;
	for (const a of articles) {
		const { slug, publishedAt, content, ...rest } = a;
		const data = {
			...rest,
			slug,
			status: 'PUBLISHED' as const,
			publishedAt: new Date(publishedAt),
			content: content as unknown as object,
			...AUTHOR
		};
		await prisma.article.upsert({
			where: { slug },
			create: data,
			update: data
		});
		n++;
		console.log(`  upserted: ${slug}`);
	}
	const total = await prisma.article.count();
	console.log(`\nDONE. upserted ${n}, total articles in DB: ${total}`);
}

main()
	.catch((e) => {
		console.error('ERROR:', e.message);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
