// Treść podstrony „Doradztwo kredytowe" (/doradztwo-kredytowe).
// Zdjęcia hero/opisu to placeholdery Unsplash — do podmiany na realne.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Doradztwo kredytowe — LW Nieruchomości Jelenia Góra',
	description:
		'Doradztwo kredytowe w Jeleniej Górze i Karkonoszach — bezpłatne sprawdzenie zdolności, porównanie ofert banków, pomoc w dokumentach i prowadzenie wniosku.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Doradztwo kredytowe' }
];

export const hero = {
	eyebrow: 'Usługa · Doradztwo kredytowe',
	tytul: 'Kredyt hipoteczny bez chaosu i bieganiny',
	tytulEmfaza: 'bez chaosu',
	podtytul:
		'Współpracujemy z najlepszymi doradcami kredytowymi w regionie. Porównamy oferty banków, pomożemy skompletować dokumenty i przejdziemy z Tobą przez cały proces — spokojnie i po ludzku.',
	tlo: U('photo-1554224155-6726b3ff858f', 1600),
	cta: [
		{ label: 'Sprawdź swoją zdolność', href: '#formularz', wariant: 'green' },
		{ label: 'Jak pomagamy', href: '#przebieg', wariant: 'outline' }
	]
};

export const opis = {
	eyebrow: 'O usłudze',
	tytul: 'Finansowanie dopasowane do Ciebie',
	akapity: [
		'Kredyt hipoteczny potrafi przytłoczyć — dziesiątki ofert, dokumentów i wymagań. My to porządkujemy: łączymy Cię ze sprawdzonym doradcą, który przeanalizuje Twoją sytuację i dobierze najlepsze rozwiązanie.',
		'Nie jesteśmy bankiem, więc gramy do jednej bramki — Twojej. Porównujemy oferty wielu banków i tłumaczymy wszystko prostym językiem, żebyś podejmował decyzje świadomie.'
	],
	zdjecie: U('photo-1521791136064-7986c2920216'),
	badge: 'Najlepsi doradcy w regionie',
	podpis: 'Jeden kontakt zamiast obchodzenia banków'
};

export const zakres = {
	eyebrow: 'Zakres pomocy',
	tytul: 'W czym pomagamy',
	lista: [
		'Analiza zdolności kredytowej',
		'Porównanie ofert wielu banków',
		'Dobór optymalnego finansowania',
		'Pomoc w skompletowaniu dokumentów',
		'Złożenie i prowadzenie wniosku',
		'Wsparcie aż do uruchomienia kredytu',
		'Kredyty hipoteczne i gotówkowe',
		'Refinansowanie i konsolidacja'
	]
};

export const przebieg = {
	eyebrow: 'Jak to działa',
	tytul: 'Przebieg współpracy',
	kroki: [
		{
			no: '01',
			t: 'Bezpłatna rozmowa',
			d: 'Poznajemy Twoją sytuację, plany i możliwości. Bez zobowiązań i bez presji.'
		},
		{
			no: '02',
			t: 'Analiza zdolności',
			d: 'Doradca sprawdza zdolność kredytową i wskazuje realny budżet zakupu.'
		},
		{
			no: '03',
			t: 'Porównanie ofert',
			d: 'Zestawiamy oferty banków i wybieramy najkorzystniejszą dla Ciebie.'
		},
		{
			no: '04',
			t: 'Dokumenty i wniosek',
			d: 'Pomagamy skompletować dokumenty i składamy wniosek do wybranego banku.'
		},
		{
			no: '05',
			t: 'Decyzja i uruchomienie',
			d: 'Prowadzimy sprawę aż po pozytywną decyzję i wypłatę środków.'
		}
	]
};

export const korzysci = {
	eyebrow: 'Dlaczego my',
	tytul: 'Co zyskujesz',
	lista: [
		{
			t: 'Lepsze warunki',
			d: 'Doradca wynegocjuje marże i warunki lepsze, niż zwykle uzyskasz samodzielnie.'
		},
		{
			t: 'Oszczędność czasu',
			d: 'Jeden kontakt zamiast obchodzenia banków. Papierologię bierzemy na siebie.'
		},
		{
			t: 'Większa szansa na kredyt',
			d: 'Dobrze przygotowany wniosek to mniejsze ryzyko odmowy.'
		},
		{
			t: 'Prosty język',
			d: 'Tłumaczymy oferty i zapisy umów zrozumiale — bez bankowego żargonu.'
		}
	]
};

export const faq = {
	eyebrow: 'FAQ',
	tytul: 'Pytania o kredyt',
	cta: { label: 'Zadaj pytanie →', href: '#formularz' },
	lista: [
		{
			q: 'Ile kosztuje doradztwo kredytowe?',
			a: 'Dla Ciebie najczęściej bezpłatne — doradca rozliczany jest z bankiem po uruchomieniu kredytu. Wszystko ustalamy jasno na starcie.'
		},
		{
			q: 'Czy sprawdzicie moją zdolność kredytową?',
			a: 'Tak, bezpłatnie i bez zobowiązań. Dowiesz się, na jaki budżet realnie możesz liczyć.'
		},
		{
			q: 'Z iloma bankami współpracujecie?',
			a: 'Doradcy, z którymi pracujemy, porównują oferty wielu banków — wybieramy tę najkorzystniejszą dla Ciebie.'
		},
		{
			q: 'Czy pomagacie przy kredycie na działkę lub budowę?',
			a: 'Tak — hipoteczne na zakup, budowę i remont, a także refinansowanie i konsolidację.'
		},
		{
			q: 'Mam umowę zlecenie lub działalność — dostanę kredyt?',
			a: 'To zależy od banku. Doradca dobierze bank, który akceptuje Twoją formę dochodu.'
		},
		{
			q: 'Jak długo trwa proces kredytowy?',
			a: 'Zwykle od kilku do kilkunastu tygodni — od analizy po decyzję i uruchomienie. Pilnujemy terminów za Ciebie.'
		}
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Sprawdź swoją zdolność kredytową',
	podtytul: 'Zostaw kontakt — bezpłatnie i bez zobowiązań sprawdzimy, na jaki kredyt możesz liczyć.',
	przycisk: 'Sprawdź zdolność',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Mamy Twoje zgłoszenie. Doradca odezwie się i bezpłatnie sprawdzi Twoją zdolność kredytową.'
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
		t: 'Marketing nieruchomości',
		slug: '/marketing-nieruchomosci',
		d: 'Zdjęcia, dron i film, które sprzedają szybciej.'
	}
];
