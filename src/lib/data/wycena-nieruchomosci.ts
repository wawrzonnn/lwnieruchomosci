// Treść podstrony „Wycena nieruchomości" (/wycena-nieruchomosci).
// Zdjęcia hero/opisu to placeholdery Unsplash — do podmiany na realne.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Wycena nieruchomości — LW Nieruchomości Jelenia Góra',
	description:
		'Rzetelna, rynkowa wycena nieruchomości w Jeleniej Górze i Karkonoszach — oparta na danych transakcyjnych. Bezpłatna przy zleceniu sprzedaży.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Wycena nieruchomości' }
];

export const hero = {
	eyebrow: 'Usługa · Wycena nieruchomości',
	tytul: 'Wycena nieruchomości w Jeleniej Górze i Karkonoszach',
	tytulEmfaza: 'Karkonoszach',
	podtytul:
		'Właściwie ustalona cena to jeden z najważniejszych elementów skutecznej sprzedaży. Zbyt wysoka może wydłużyć czas sprzedaży, a zbyt niska oznacza realną stratę. Przygotowujemy wycenę opartą na analizie lokalnego rynku, potencjału nieruchomości i naszego doświadczenia.',
	tlo: U('photo-1600585154340-be6161a56a0c', 1600),
	cta: [
		{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' },
		{ label: 'Co zapewniamy?', href: '#zakres', wariant: 'outline' }
	]
};

export const opis = {
	eyebrow: 'O usłudze',
	tytul: 'Wycena oparta na danych, nie na życzeniach',
	akapity: [
		'Dobra cena to podstawa udanej transakcji. Przygotowujemy rzetelną wycenę rynkową na podstawie realnych cen transakcyjnych w okolicy, stanu i standardu nieruchomości oraz aktualnej sytuacji na rynku.',
		'Wycena to nie tylko liczba — dostajesz od nas komentarz i rekomendację: na co zwrócić uwagę, co warto poprawić przed sprzedażą i jak ustawić cenę, żeby przyciągnąć kupujących.'
	],
	zdjecie: U('photo-1554224155-6726b3ff858f'),
	badge: 'Bezpłatnie przy sprzedaży',
	podpis: 'Liczby poparte znajomością rynku'
};

export const kiedy = {
	eyebrow: 'Kiedy warto',
	tytul: 'Kiedy warto wykonać wycenę',
	lista: [
		{
			t: 'Przed sprzedażą',
			d: 'Żeby ustawić cenę, która przyciąga kupujących i nie zostawia pieniędzy na stole.'
		},
		{
			t: 'Przy zakupie',
			d: 'Żeby wiedzieć, czy cena ofertowa jest realna i bezpiecznie negocjować.'
		},
		{
			t: 'Do kredytu i banku',
			d: 'Orientacyjna wartość zabezpieczenia do rozmów z bankiem i doradcą kredytowym.'
		},
		{
			t: 'Spadek i podział',
			d: 'Przy dziale spadku, rozwodzie lub darowiźnie — obiektywna wartość na dany moment.'
		}
	]
};

export const przebieg = {
	eyebrow: 'Jak to działa',
	tytul: 'Przebieg wyceny',
	kroki: [
		{
			no: '01',
			t: 'Oględziny i wywiad',
			d: 'Oglądamy nieruchomość (lub online), zbieramy dane o stanie, metrażu, standardzie i dokumentach.'
		},
		{
			no: '02',
			t: 'Analiza rynku',
			d: 'Porównujemy z realnymi transakcjami w okolicy i bieżącymi ofertami, uwzględniamy trendy.'
		},
		{
			no: '03',
			t: 'Raport i rekomendacja',
			d: 'Dostajesz wycenę z komentarzem i strategią ceny — na piśmie, gotową do decyzji.'
		}
	]
};

export const zakres = {
	eyebrow: 'W ramach współpracy',
	tytul: 'W ramach współpracy zapewniamy',
	uwaga: 'Wycena kończy się rekomendacją ceny — gotową do decyzji o sprzedaży.',
	lista: [
		'Analiza lokalnego rynku nieruchomości',
		'Ocena potencjału nieruchomości',
		'Porównanie podobnych ofert',
		'Rekomendacja optymalnej ceny sprzedaży',
		'Omówienie czynników wpływających na wartość',
		'Wskazówki dotyczące przygotowania do sprzedaży',
		'Możliwość dalszej kompleksowej obsługi sprzedaży'
	]
};

export const faq = {
	eyebrow: 'FAQ',
	tytul: 'Pytania o wycenę',
	cta: { label: 'Zadaj pytanie →', href: '#formularz' },
	lista: [
		{
			q: 'Ile kosztuje wycena?',
			a: 'Przy zleceniu sprzedaży wycena jest bezpłatna. W pozostałych przypadkach cenę ustalamy indywidualnie — zawsze z góry, bez ukrytych kosztów.'
		},
		{
			q: 'Czym różni się wasza wycena od operatu szacunkowego?',
			a: 'Nasza wycena to rzetelna analiza rynkowa na potrzeby sprzedaży lub zakupu. Operat szacunkowy sporządza rzeczoznawca majątkowy (np. do banku) — w razie potrzeby polecimy sprawdzonego.'
		},
		{
			q: 'Jak szybko przygotujecie wycenę?',
			a: 'Zwykle w 2–4 dni robocze od oględzin i otrzymania dokumentów.'
		},
		{
			q: 'Czy wyceniacie zdalnie?',
			a: 'Wstępną wycenę możemy przygotować online, na podstawie danych i zdjęć. Dla precyzji zalecamy oględziny na miejscu.'
		},
		{
			q: 'Na czym opieracie wartość?',
			a: 'Na realnych cenach transakcyjnych w okolicy, stanie i standardzie nieruchomości oraz bieżącej sytuacji rynkowej — nie na cenach ofertowych z ogłoszeń.'
		},
		{
			q: 'Czy wycena gwarantuje cenę sprzedaży?',
			a: 'To rzetelny punkt wyjścia i rekomendacja. Ostateczna cena zależy też od negocjacji, terminu i popytu — pomagamy ją osiągnąć.'
		}
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Chcesz poznać wartość swojej nieruchomości?',
	podtytul: 'Umów spotkanie i dowiedz się, ile naprawdę może być warta Twoja nieruchomość.',
	przycisk: 'Zamów wycenę',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Mamy Twoje zgłoszenie. Przygotujemy wycenę i odezwiemy się z rekomendacją ceny.'
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
		t: 'Marketing nieruchomości',
		slug: '/marketing-nieruchomosci',
		d: 'Zdjęcia, dron i film, które sprzedają szybciej.'
	},
	{
		t: 'Doradztwo kredytowe',
		slug: '/doradztwo-kredytowe',
		d: 'Dobierzemy finansowanie i przejdziemy przez formalności.'
	}
];
