// Treść podstrony „Marketing nieruchomości" (/marketing-nieruchomosci).
// Zatwierdzone przez klientkę copy: hero + checklista „Co zapewniamy" + CTA.
// Zdjęcie hero to placeholder Unsplash — do podmiany na realne.

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seo = {
	title: 'Marketing nieruchomości — LW Nieruchomości Jelenia Góra',
	description:
		'Marketing nieruchomości w Jeleniej Górze i Karkonoszach: profesjonalne zdjęcia, film-spacer, ujęcia z drona, promocja w social media i na portalach ogłoszeniowych. W standardzie oferty sprzedaży.'
};

export const breadcrumbs = [
	{ label: 'Strona główna', href: '/' },
	{ label: 'Usługi', href: '/#uslugi' },
	{ label: 'Marketing nieruchomości' }
];

export const hero = {
	eyebrow: 'Usługa · Marketing nieruchomości',
	tytul: 'Marketing nieruchomości, który pomaga skutecznie sprzedawać',
	tytulEmfaza: 'skutecznie sprzedawać',
	podtytul:
		'Pierwsze wrażenie można zrobić tylko raz. Dlatego dbamy o to, aby każda nieruchomość została zaprezentowana w sposób, który przyciąga uwagę i pokazuje jej największe atuty. Profesjonalne materiały oraz przemyślana promocja zwiększają zainteresowanie ofertą i pomagają szybciej znaleźć odpowiedniego kupującego.',
	tlo: U('photo-1460925895917-afdab827c52f', 1600),
	cta: [
		{ label: 'Umów spotkanie', href: '#formularz', wariant: 'green' },
		{ label: 'Co zapewniamy?', href: '#zakres', wariant: 'outline' }
	]
};

export const zakres = {
	eyebrow: 'W ramach współpracy',
	tytul: 'W ramach współpracy zapewniamy',
	lista: [
		'Profesjonalna fotografia nieruchomości',
		'Prezentacje wideo',
		'Ujęcia z drona',
		'Przygotowanie atrakcyjnych opisów ofert',
		'Publikacja na największych portalach nieruchomości',
		'Promocja w mediach społecznościowych',
		'Współpraca z biurami nieruchomości z całej Polski',
		'Spójna strategia promocji dopasowana do nieruchomości'
	]
};

export const formularz = {
	eyebrow: 'Zacznijmy',
	tytul: 'Dobra prezentacja nieruchomości to większa szansa na skuteczną sprzedaż.',
	podtytul: 'Porozmawiajmy o tym, jak najlepiej pokazać potencjał Twojej nieruchomości.',
	przycisk: 'Umów spotkanie',
	potwierdzenie: {
		tytul: 'Dziękujemy!',
		opis: 'Mamy Twoje zgłoszenie. Odezwiemy się z propozycją pakietu marketingowego.'
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
		t: 'Doradztwo kredytowe',
		slug: '/doradztwo-kredytowe',
		d: 'Dobierzemy finansowanie i przejdziemy przez formalności.'
	}
];
