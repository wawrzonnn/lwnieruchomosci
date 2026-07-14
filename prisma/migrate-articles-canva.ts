// Artykuły bloga z tekstów copywriterki (Canva Doc, lipiec 2026).
// Upsert po slug: 2 nadpisują istniejące placeholdery (umowa-na-wylacznosc,
// jak-przygotowac-mieszkanie), 3 są nowe. Re-runnable.
// Uruchom: `npx tsx prisma/migrate-articles-canva.ts` (DATABASE_URL z .env);
// na staging/VPS: `DATABASE_URL="postgresql://...VPS..." npx tsx prisma/migrate-articles-canva.ts`.

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
	publishedAt: string;
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
	// ————————————————————————————————————————————————————————————
	// 1) NOWY — Jak sprzedać mieszkanie, 7 kroków
	{
		slug: 'jak-sprzedac-mieszkanie-7-krokow',
		category: 'Sprzedaż',
		title: 'Jak sprzedać mieszkanie w Jeleniej Górze? 7 kroków do skutecznej sprzedaży',
		titleEmphasis: '7 kroków',
		excerpt:
			'Dobra strategia pozwala sprzedać nieruchomość szybciej i zwiększa szansę na satysfakcjonującą cenę. Zobacz, o czym pamiętać przed wystawieniem oferty.',
		lead: 'Sprzedaż mieszkania to jedna z najważniejszych decyzji finansowych. Dobra strategia pozwala sprzedać nieruchomość szybciej i zwiększa szansę na uzyskanie satysfakcjonującej ceny. Zobacz, o czym warto pamiętać przed wystawieniem oferty.',
		readTime: '6 min czytania',
		publishedAt: '2026-07-02',
		coverImage: U('photo-1560448204-e02f11c3d0e2'),
		coverAlt: 'Jasne mieszkanie przygotowane do sprzedaży',
		coverCaption: 'Dobrze przygotowana oferta to podstawa skutecznej sprzedaży.',
		tags: ['Sprzedaż', 'Porady', 'Jelenia Góra'],
		seoTitle: 'Jak sprzedać mieszkanie w Jeleniej Górze? 7 kroków | LW Nieruchomości',
		seoDescription:
			'7 kroków do skutecznej sprzedaży mieszkania w Jeleniej Górze i Karkonoszach — wycena, przygotowanie, prezentacja, promocja, negocjacje i formalności.',
		content: [
			{ typ: 'sekcja', id: 'kroki', naglowek2: '7 kroków do skutecznej sprzedaży' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Skuteczna sprzedaż rzadko jest dziełem przypadku. Najczęściej to efekt kilku dobrze zaplanowanych działań — od właściwej ceny po dopilnowanie formalności. Oto siedem kroków, które warto przejść po kolei.'
			},
			{
				typ: 'lista',
				pozycje: [
					{
						mocne: '1. Ustal realną cenę.',
						reszta:
							'Cena ma ogromny wpływ na zainteresowanie ofertą. Zbyt wysoka może wydłużyć czas sprzedaży, a zbyt niska oznacza niepotrzebną stratę. Warto oprzeć wycenę na analizie lokalnego rynku, a nie wyłącznie na cenach podobnych ogłoszeń.'
					},
					{
						mocne: '2. Przygotuj nieruchomość.',
						reszta:
							'Nie zawsze potrzebny jest remont. Często wystarczy uporządkować wnętrza, usunąć drobne usterki i zadbać o estetykę. Dobre pierwsze wrażenie ma znaczenie.'
					},
					{
						mocne: '3. Zadbaj o prezentację.',
						reszta:
							'Większość kupujących zaczyna poszukiwania w internecie. Profesjonalne zdjęcia, materiały wideo i dobrze przygotowany opis pomagają wyróżnić ofertę i przyciągnąć więcej zainteresowanych.'
					},
					{
						mocne: '4. Wybierz odpowiednią promocję.',
						reszta:
							'Sama publikacja ogłoszenia to za mało. Warto wykorzystać największe portale nieruchomości, media społecznościowe oraz inne kanały, które zwiększą zasięg oferty.'
					},
					{
						mocne: '5. Przygotuj się do prezentacji.',
						reszta:
							'Przed spotkaniem z kupującym zadbaj o porządek, odpowiednie oświetlenie i spokojną atmosferę. To drobne elementy, które często wpływają na decyzję o zakupie.'
					},
					{
						mocne: '6. Nie bój się negocjacji.',
						reszta:
							'Negocjacje dotyczą nie tylko ceny — często obejmują też termin przekazania, wyposażenie czy sposób finansowania. Dobrze przygotowana strategia ułatwia porozumienie.'
					},
					{
						mocne: '7. Dopilnuj formalności.',
						reszta:
							'Ostatni etap to podpisanie aktu notarialnego i przekazanie nieruchomości nowemu właścicielowi. Warto wcześniej przygotować wszystkie dokumenty, aby proces przebiegł sprawnie.'
					}
				]
			},
			{ typ: 'sekcja', id: 'bledy', naglowek2: 'Najczęstsze błędy sprzedających' },
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Zbyt wysoka cena', reszta: 'oderwana od realnych cen transakcyjnych.' },
					{ mocne: 'Przypadkowe zdjęcia', reszta: 'wykonane w pośpiechu, przy słabym świetle.' },
					{ mocne: 'Nieprzygotowana nieruchomość', reszta: 'bałagan i drobne usterki na prezentacji.' },
					{ mocne: 'Zbyt mała promocja', reszta: 'jedno ogłoszenie zamiast wielu kanałów.' },
					{ mocne: 'Sprzedaż bez planu', reszta: 'działania po omacku, bez strategii.' }
				]
			},
			{ typ: 'sekcja', id: 'podsumowanie', naglowek2: 'Podsumowanie' },
			{
				typ: 'akapit',
				html: 'Skuteczna sprzedaż nieruchomości to efekt odpowiedniej wyceny, profesjonalnej prezentacji i dobrze zaplanowanych działań. Im lepiej przygotujesz ofertę, tym większa szansa na sprawną sprzedaż i korzystną cenę.'
			}
		]
	},

	// ————————————————————————————————————————————————————————————
	// 2) NOWY — Jak ustalić cenę, 7 błędów
	{
		slug: 'jak-ustalic-cene-nieruchomosci-7-bledow',
		category: 'Wycena',
		title: 'Jak ustalić cenę nieruchomości? 7 błędów, które mogą kosztować nawet kilkadziesiąt tysięcy',
		titleEmphasis: '7 błędów',
		excerpt:
			'Odpowiednio ustalona cena to fundament skutecznej sprzedaży. Poznaj błędy, które najczęściej kosztują właścicieli czas i pieniądze.',
		lead: 'Cena widoczna w ogłoszeniu to cena ofertowa, a nie ta, za którą nieruchomość faktycznie się sprzeda. To dwie różne wartości — a mylenie ich potrafi kosztować nawet kilkadziesiąt tysięcy złotych.',
		readTime: '6 min czytania',
		publishedAt: '2026-06-24',
		coverImage: U('photo-1554224155-6726b3ff858f'),
		coverAlt: 'Analiza wartości nieruchomości',
		coverCaption: 'Realna cena to efekt analizy rynku, nie intuicji.',
		tags: ['Wycena', 'Ceny', 'Porady'],
		seoTitle: 'Jak ustalić cenę nieruchomości? 7 błędów | LW Nieruchomości',
		seoDescription:
			'7 błędów przy ustalaniu ceny nieruchomości, które kosztują właścicieli czas i pieniądze — i jak ich uniknąć dzięki rzetelnej analizie rynku.',
		content: [
			{ typ: 'sekcja', id: 'bledy', naglowek2: '7 błędów przy ustalaniu ceny' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Wycena to jedna z najtrudniejszych decyzji w całym procesie sprzedaży. Poniżej najczęstsze pułapki, w które wpadają właściciele — i sposób myślenia, który pozwala ich uniknąć.'
			},
			{
				typ: 'lista',
				pozycje: [
					{
						mocne: '1. Sugerowanie się cenami z portali.',
						reszta:
							'Cena w ogłoszeniu to cena ofertowa, a nie ta, za którą nieruchomość zostanie sprzedana. To dwie różne wartości.'
					},
					{
						mocne: '2. Emocje nie zwiększają wartości.',
						reszta:
							'Właściciele często wyceniają nieruchomość przez pryzmat wspomnień lub poniesionych kosztów. Kupującego interesuje przede wszystkim aktualna wartość rynkowa.'
					},
					{
						mocne: '3. Liczy się lokalizacja.',
						reszta:
							'Dwie podobne nieruchomości mogą mieć zupełnie inną wartość ze względu na położenie, otoczenie czy dostęp do infrastruktury.'
					},
					{
						mocne: '4. Stan techniczny ma znaczenie.',
						reszta:
							'Standard wykończenia, wiek budynku, układ pomieszczeń czy stan instalacji wpływają na końcową cenę.'
					},
					{
						mocne: '5. Obserwuj lokalny rynek.',
						reszta:
							'Rynek zmienia się dynamicznie. Cena odpowiednia rok temu nie musi być właściwa dzisiaj.'
					},
					{
						mocne: '6. Zbyt wysoka cena wydłuża sprzedaż.',
						reszta:
							'Oferty oderwane od realiów długo nie wzbudzają zainteresowania. Po kilku miesiącach konieczna jest obniżka, co osłabia atrakcyjność nieruchomości w oczach kupujących.'
					},
					{
						mocne: '7. Skorzystaj z profesjonalnej wyceny.',
						reszta:
							'Rzetelna analiza rynku i doświadczenie pozwalają ustalić cenę, która zwiększa szanse na sprzedaż i chroni przed niepotrzebną stratą.'
					}
				]
			},
			{ typ: 'sekcja', id: 'bledy-wlascicieli', naglowek2: 'Najczęstsze błędy właścicieli' },
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Kierowanie się emocjami', reszta: 'zamiast danymi rynkowymi.' },
					{ mocne: 'Porównywanie tylko cen z internetu', reszta: 'czyli cen ofertowych.' },
					{ mocne: 'Pomijanie lokalnego rynku', reszta: 'i jego bieżącej sytuacji.' },
					{ mocne: 'Zawyżanie ceny „na próbę”', reszta: 'z nadzieją, że ktoś się zdecyduje.' },
					{ mocne: 'Częste zmiany ceny', reszta: 'w trakcie sprzedaży, co niepokoi kupujących.' }
				]
			},
			{ typ: 'sekcja', id: 'podsumowanie', naglowek2: 'Podsumowanie' },
			{
				typ: 'akapit',
				html: 'Odpowiednio ustalona cena to fundament skutecznej sprzedaży. Warto oprzeć ją na analizie lokalnego rynku, a nie wyłącznie na intuicji czy cenach podobnych ogłoszeń.'
			}
		]
	},

	// ————————————————————————————————————————————————————————————
	// 3) NOWY — Profesjonalne zdjęcia i filmy
	{
		slug: 'profesjonalne-zdjecia-i-filmy-nieruchomosci',
		category: 'Marketing',
		title: 'Dlaczego profesjonalne zdjęcia i filmy pomagają sprzedać nieruchomość?',
		titleEmphasis: 'zdjęcia i filmy',
		excerpt:
			'Większość kupujących zaczyna poszukiwania w internecie. Dobre materiały decydują, czy oferta w ogóle zostanie zauważona.',
		lead: 'Większość kupujących rozpoczyna poszukiwania nieruchomości w internecie. To oznacza, że pierwszą decyzję podejmują jeszcze przed umówieniem prezentacji. Profesjonalne zdjęcia i materiały wideo sprawiają, że oferta przyciąga uwagę i zachęca do kontaktu.',
		readTime: '5 min czytania',
		publishedAt: '2026-06-16',
		coverImage: U('photo-1600607687939-ce8a6c25118c'),
		coverAlt: 'Profesjonalna fotografia wnętrza',
		coverCaption: 'Dobre zdjęcia sprzedają, zanim kupujący przekroczy próg.',
		tags: ['Marketing', 'Zdjęcia', 'Wideo', 'Porady'],
		seoTitle: 'Profesjonalne zdjęcia i filmy nieruchomości | LW Nieruchomości',
		seoDescription:
			'Dlaczego profesjonalne zdjęcia, film-spacer i ujęcia z drona pomagają sprzedać nieruchomość szybciej i przyciągają realnie zainteresowanych kupujących.',
		content: [
			{ typ: 'sekcja', id: 'pierwsze-wrazenie', naglowek2: 'Pierwsze wrażenie ma znaczenie' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Kupujący przeglądają dziesiątki, a często setki ogłoszeń. Jeśli zdjęcia są ciemne, nieostre lub przypadkowe, istnieje duże ryzyko, że oferta zostanie pominięta.'
			},
			{ typ: 'sekcja', id: 'wiecej-niz-metraz', naglowek2: 'Zdjęcia pokazują więcej niż metraż' },
			{
				typ: 'akapit',
				html: 'Dobra fotografia nie tylko przedstawia pomieszczenia, ale pokazuje przestrzeń, światło i charakter nieruchomości. Dzięki temu kupujący łatwiej wyobraża sobie, jak mogłoby wyglądać życie w danym miejscu.'
			},
			{ typ: 'sekcja', id: 'film', naglowek2: 'Dlaczego warto przygotować film?' },
			{
				typ: 'akapit',
				html: 'Film pozwala pokazać układ pomieszczeń i płynnie przeprowadzić odbiorcę przez całą nieruchomość. To szczególnie pomocne dla osób, które mieszkają poza regionem lub chcą wstępnie ocenić ofertę przed umówieniem spotkania.'
			},
			{ typ: 'sekcja', id: 'dron', naglowek2: 'Ujęcia z drona — kiedy mają sens?' },
			{
				typ: 'akapit',
				html: 'W przypadku domów, działek czy nieruchomości położonych w atrakcyjnej okolicy zdjęcia z powietrza pozwalają pokazać nie tylko budynek, ale też otoczenie, dojazd i walory lokalizacji.'
			},
			{ typ: 'sekcja', id: 'oszczednosc-czasu', naglowek2: 'Dobra prezentacja oszczędza czas' },
			{
				typ: 'akapit',
				html: 'Lepsze materiały oznaczają, że na prezentacje częściej trafiają osoby rzeczywiście zainteresowane zakupem. To korzyść zarówno dla sprzedającego, jak i dla kupujących.'
			},
			{ typ: 'sekcja', id: 'bledy', naglowek2: 'Najczęstsze błędy' },
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Słabe oświetlenie', reszta: 'zdjęcia wykonane w ciemnych wnętrzach.' },
					{ mocne: 'Nieuporządkowane wnętrza', reszta: 'bałagan, który odwraca uwagę.' },
					{ mocne: 'Za mało zdjęć', reszta: 'kupujący nie widzi całości oferty.' },
					{ mocne: 'Brak filmu', reszta: 'oferta bez prezentacji wideo.' },
					{ mocne: 'Pominięte atuty', reszta: 'zdjęcia nie pokazują największych zalet.' }
				]
			},
			{ typ: 'sekcja', id: 'podsumowanie', naglowek2: 'Podsumowanie' },
			{
				typ: 'akapit',
				html: 'Profesjonalna prezentacja nieruchomości to nie estetyczny dodatek, ale element, który wpływa na liczbę zapytań i zainteresowanie ofertą. Dobre zdjęcia, materiały wideo i dopracowane ogłoszenie pomagają wyróżnić nieruchomość i zwiększają szansę na skuteczną sprzedaż.'
			}
		]
	},

	// ————————————————————————————————————————————————————————————
	// 4) NADPISUJE istniejący — Umowa na wyłączność
	{
		slug: 'umowa-na-wylacznosc-czy-sie-oplaca',
		category: 'Sprzedaż',
		title: 'Czy warto podpisać umowę na wyłączność z biurem nieruchomości?',
		titleEmphasis: 'na wyłączność',
		excerpt:
			'Umowa na wyłączność budzi wiele pytań i obaw. W praktyce dobrze prowadzona współpraca często zwiększa szanse na szybszą i korzystniejszą sprzedaż.',
		lead: 'Umowa na wyłączność wciąż budzi wiele pytań. Część właścicieli obawia się, że ograniczy możliwość sprzedaży nieruchomości. W praktyce dobrze prowadzona współpraca na wyłączność często zwiększa szanse na szybszą i korzystniejszą sprzedaż.',
		readTime: '6 min czytania',
		publishedAt: '2026-06-06',
		coverImage: U('photo-1450101499163-c8848c66ca85'),
		coverAlt: 'Podpisanie umowy z biurem nieruchomości',
		coverCaption: 'Jedna spójna strategia zamiast rozproszonych działań.',
		tags: ['Sprzedaż', 'Współpraca', 'Porady'],
		seoTitle: 'Umowa na wyłączność — czy się opłaca? | LW Nieruchomości',
		seoDescription:
			'Czy warto podpisać umowę na wyłączność z biurem nieruchomości? Korzyści, obawy i sytuacje, w których wyłączność ma największy sens.',
		content: [
			{ typ: 'sekcja', id: 'czym-jest', naglowek2: 'Czym jest umowa na wyłączność?' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'To forma współpracy, w której sprzedażą nieruchomości zajmuje się jedno biuro. Oznacza to, że cały proces jest prowadzony według jednej, spójnej strategii.'
			},
			{ typ: 'sekcja', id: 'watpliwosci', naglowek2: 'Dlaczego właściciele mają wątpliwości?' },
			{
				typ: 'akapit',
				html: 'Najczęściej obawiają się, że ograniczą swoje możliwości lub stracą potencjalnych kupujących. W rzeczywistości wygląda to inaczej.'
			},
			{ typ: 'sekcja', id: 'korzysci', naglowek2: 'Jakie są korzyści?' },
			{
				typ: 'lista',
				pozycje: [
					{
						mocne: 'Spójna strategia sprzedaży.',
						reszta:
							'Jedna oferta, jedna cena i jeden opiekun. Kupujący nie widzą kilku różnych ogłoszeń tej samej nieruchomości z rozbieżnymi informacjami.'
					},
					{
						mocne: 'Większe zaangażowanie.',
						reszta:
							'Biuro w pełni wykorzystuje profesjonalne zdjęcia, filmy, promocję w social media i płatne działania marketingowe — mając pewność, że inwestuje w nieruchomość, którą rzeczywiście sprzedaje.'
					},
					{
						mocne: 'Jeden kontakt dla kupujących.',
						reszta:
							'Kupujący nie muszą dzwonić do kilku pośredników. Wszystkie informacje otrzymują od jednej osoby, która zna nieruchomość.'
					},
					{
						mocne: 'Współpraca z innymi biurami.',
						reszta:
							'Wyłączność nie oznacza, że oferta trafia tylko do jednego biura. Profesjonalne agencje współpracują z innymi pośrednikami, dzięki czemu nieruchomość dociera do jeszcze większej liczby kupujących.'
					}
				]
			},
			{ typ: 'sekcja', id: 'sam-kupujacy', naglowek2: 'Czy mogę sam znaleźć kupującego?' },
			{
				typ: 'akapit',
				html: 'To zależy od zapisów umowy, dlatego przed jej podpisaniem warto dokładnie omówić wszystkie warunki współpracy.'
			},
			{ typ: 'sekcja', id: 'kiedy-sens', naglowek2: 'Kiedy wyłączność ma największy sens?' },
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Zależy Ci na profesjonalnym marketingu', reszta: 'i spójnej promocji.' },
					{ mocne: 'Nie masz czasu', reszta: 'prowadzić sprzedaży samodzielnie.' },
					{ mocne: 'Mieszkasz poza regionem', reszta: 'lub za granicą.' },
					{ mocne: 'Chcesz jednego opiekuna', reszta: 'który koordynuje cały proces.' }
				]
			},
			{ typ: 'sekcja', id: 'podsumowanie', naglowek2: 'Podsumowanie' },
			{
				typ: 'akapit',
				html: 'Umowa na wyłączność nie ogranicza możliwości sprzedaży. Dobrze prowadzona współpraca pozwala skupić wszystkie działania w jednym miejscu, zapewnia spójną promocję oraz wygodniejszy kontakt zarówno dla sprzedającego, jak i kupujących.'
			}
		]
	},

	// ————————————————————————————————————————————————————————————
	// 5) NADPISUJE istniejący — Jak przygotować nieruchomość, 10 sposobów
	{
		slug: 'jak-przygotowac-mieszkanie-do-sprzedazy',
		category: 'Porady',
		title: 'Jak przygotować mieszkanie lub dom do sprzedaży? 10 prostych sposobów',
		titleEmphasis: '10 prostych sposobów',
		excerpt:
			'Dobre przygotowanie nie zawsze oznacza kosztowny remont. Często wystarczy kilka prostych zmian, by oferta zrobiła lepsze wrażenie.',
		lead: 'Dobre przygotowanie nieruchomości nie zawsze oznacza kosztowny remont. Często wystarczy kilka prostych zmian, aby oferta zrobiła lepsze pierwsze wrażenie i przyciągnęła więcej kupujących. Sprawdź, o czym pamiętać przed wykonaniem zdjęć i rozpoczęciem sprzedaży.',
		readTime: '6 min czytania',
		publishedAt: '2026-05-28',
		coverImage: U('photo-1513694203232-719a280e022f'),
		coverAlt: 'Zadbane, rozświetlone wnętrze mieszkania',
		coverCaption: 'Kilka prostych zmian potrafi zmienić odbiór oferty.',
		tags: ['Porady', 'Home staging', 'Sprzedaż'],
		seoTitle: 'Jak przygotować mieszkanie do sprzedaży? 10 sposobów | LW Nieruchomości',
		seoDescription:
			'10 prostych sposobów, jak przygotować mieszkanie lub dom do sprzedaży bez kosztownego remontu — i zwiększyć zainteresowanie ofertą.',
		content: [
			{ typ: 'sekcja', id: 'sposoby', naglowek2: '10 sposobów na lepsze pierwsze wrażenie' },
			{
				typ: 'akapit',
				dropCap: true,
				html: 'Przygotowanie nieruchomości do sprzedaży nie musi wiązać się z dużymi kosztami. Poniżej dziesięć prostych kroków, które realnie poprawiają odbiór oferty.'
			},
			{
				typ: 'lista',
				pozycje: [
					{ mocne: '1. Posprzątaj i uporządkuj wnętrza.', reszta: 'Czyste i uporządkowane pomieszczenia sprawiają, że nieruchomość wydaje się bardziej zadbana i atrakcyjna.' },
					{ mocne: '2. Schowaj prywatne przedmioty.', reszta: 'Zdjęcia rodzinne, kolekcje czy nadmiar dekoracji odwracają uwagę. Im łatwiej kupujący wyobrazi sobie siebie w tym miejscu, tym lepiej.' },
					{ mocne: '3. Napraw drobne usterki.', reszta: 'Kapiący kran, niedomykające się drzwi czy przepalona żarówka sugerują większe nakłady, niż są w rzeczywistości potrzebne.' },
					{ mocne: '4. Wpuść naturalne światło.', reszta: 'Odsłoń rolety i zasłony. Jasne wnętrza wyglądają na bardziej przestronne i przyjazne.' },
					{ mocne: '5. Zadbaj o zapach.', reszta: 'Świeże powietrze i neutralny zapach są lepsze niż intensywne odświeżacze.' },
					{ mocne: '6. Przygotuj ogród lub balkon.', reszta: 'Przestrzeń zewnętrzna to często jeden z największych atutów oferty.' },
					{ mocne: '7. Nie remontuj na siłę.', reszta: 'Nie każdy remont się zwróci. Czasem lepsze jest dobre przygotowanie niż duże inwestycje tuż przed sprzedażą.' },
					{ mocne: '8. Zadbaj o profesjonalne zdjęcia.', reszta: 'To zdjęcia najczęściej decydują, czy kupujący kliknie w ofertę i zechce dowiedzieć się więcej.' },
					{ mocne: '9. Pomyśl o prezentacji wideo.', reszta: 'Film pokazuje przestrzeń i układ pomieszczeń tak, jak nie oddadzą tego nawet najlepsze zdjęcia.' },
					{ mocne: '10. Skorzystaj z pomocy specjalistów.', reszta: 'Dobra oferta to połączenie właściwej wyceny, profesjonalnych materiałów i skutecznej promocji.' }
				]
			},
			{ typ: 'sekcja', id: 'bledy', naglowek2: 'Najczęstsze błędy' },
			{
				typ: 'lista',
				pozycje: [
					{ mocne: 'Za dużo mebli i dodatków', reszta: 'przytłaczają wnętrze.' },
					{ mocne: 'Nieporządek podczas sesji', reszta: 'psuje efekt zdjęć.' },
					{ mocne: 'Zdjęcia z telefonu', reszta: 'zamiast profesjonalnej sesji.' },
					{ mocne: 'Brak filmu', reszta: 'prezentującego nieruchomość.' },
					{ mocne: 'Odkładanie drobnych napraw', reszta: 'na później.' }
				]
			},
			{ typ: 'sekcja', id: 'podsumowanie', naglowek2: 'Podsumowanie' },
			{
				typ: 'akapit',
				html: 'Przygotowanie nieruchomości do sprzedaży nie musi wiązać się z dużymi kosztami. Nawet niewielkie zmiany mogą znacząco poprawić odbiór oferty i zwiększyć zainteresowanie kupujących.'
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
		await prisma.article.upsert({ where: { slug }, create: data, update: data });
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
	.finally(() => pool.end());
