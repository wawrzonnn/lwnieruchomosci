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
	tytul: 'Doradztwo kredytowe dla klientów LW Nieruchomości',
	tytulEmfaza: 'kredytowe',
	podtytul:
		'Zakup nieruchomości nie kończy się na znalezieniu odpowiedniego domu czy mieszkania. Jeśli planujesz finansowanie kredytem hipotecznym, zapewniamy dostęp do sprawdzonych doradców kredytowych, którzy pomogą wybrać najlepsze rozwiązanie i przeprowadzą Cię przez cały proces.',
	tlo: U('photo-1554224155-6726b3ff858f', 1600),
	cta: [
		{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' },
		{ label: 'W czym pomagamy', href: '#zakres', wariant: 'outline' }
	]
};

export const opis = {
	eyebrow: 'Wygodne finansowanie',
	tytul: 'Nie musisz szukać wszystkiego samodzielnie',
	akapity: [
		'Zakup nieruchomości i uzyskanie kredytu to dwa procesy, które powinny się wzajemnie uzupełniać. Dlatego współpracujemy z doświadczonymi doradcami kredytowymi, aby nasi klienci mogli w jednym miejscu otrzymać kompleksowe wsparcie.',
		'Dlaczego to wygodne? Nie musisz samodzielnie szukać doradcy kredytowego ani koordynować dwóch niezależnych procesów. Zakup nieruchomości i finansowanie są prowadzone równolegle, dzięki czemu cały proces jest prostszy, bardziej uporządkowany i pozwala zaoszczędzić czas.'
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
	tytul: 'Planujesz zakup nieruchomości z kredytem?',
	podtytul:
		'Powiedz nam, czego szukasz. Pomożemy Ci znaleźć odpowiednią nieruchomość i skontaktujemy Cię ze sprawdzonym doradcą kredytowym.',
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
