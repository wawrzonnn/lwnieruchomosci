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
		'Właściwie ustalona cena to jeden z najważniejszych elementów skutecznej sprzedaży nieruchomości. Zbyt wysoka może wydłużyć czas sprzedaży, a zbyt niska oznacza realną stratę. Dlatego przygotowujemy wycenę opartą na analizie lokalnego rynku, potencjału nieruchomości i naszego doświadczenia.',
	tlo: U('photo-1600585154340-be6161a56a0c', 1600),
	cta: [
		{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' },
		{ label: 'Co zapewniamy?', href: '#zakres', wariant: 'outline' }
	]
};

export const zakres = {
	eyebrow: 'W ramach współpracy',
	tytul: 'W ramach współpracy zapewniamy',
	lista: [
		'Analiza lokalnego rynku nieruchomości',
		'Ocena potencjału nieruchomości',
		'Porównanie podobnych ofert',
		'Rekomendacja optymalnej ceny sprzedaży',
		'Omówienie czynników wpływających na wartość nieruchomości',
		'Wskazówki dotyczące przygotowania nieruchomości do sprzedaży',
		'Możliwość dalszej kompleksowej obsługi sprzedaży'
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Chcesz poznać wartość swojej nieruchomości?',
	podtytul: 'Umów spotkanie i dowiedz się, ile naprawdę może być warta Twoja nieruchomość.',
	przycisk: 'Umów spotkanie',
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
