// Szablon podstron lokalizacyjnych (/lokalizacje/[slug]) dla 6 miast regionu.
// Opisy, fakty, atuty i galeria to placeholder do zatwierdzenia przez klientkę
// (zdjęcia lokalne w static/, reszta Unsplash — podmienić na realne).
// Oferty NIE są tu hardcodowane — strona pobiera je z bazy wg miasta (patrz +page.server.ts).

const U = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export interface Fakt {
	k: string;
	v: string;
}

export interface Atut {
	t: string;
	d: string;
}

export interface Miasto {
	slug: string;
	nazwa: string;
	nazwaLoc: string;
	region: string;
	hero: string;
	lead: string;
	chips: string[];
	opis: string[];
	fakty: Fakt[];
	atuty: Atut[];
	galeria: string[];
}

export const seoWzor = {
	title: 'Nieruchomości w {nazwaLoc} — LW Nieruchomości',
	description:
		'Nieruchomości w {nazwaLoc} ({region}). Aktualne oferty, opis lokalizacji, atuty i galeria. LW Nieruchomości — lokalne biuro z Jeleniej Góry.'
};

export const pustyStanOfert = {
	tytulWzor: 'Brak aktywnych ofert w {nazwaLoc}',
	opis: 'Nowe nieruchomości pojawiają się regularnie. Zostaw kontakt, a odezwiemy się, gdy w tej lokalizacji pojawi się coś dla Ciebie.',
	cta: [
		{ label: 'Zostaw kontakt', href: '#kontakt', wariant: 'green' as const },
		{ label: 'Zobacz oferty w regionie', href: '/oferty', wariant: 'outline' as const }
	]
};

export const ctaKontakt = {
	tytulWzor: 'Szukasz nieruchomości w {nazwaLoc}?',
	opis: 'Powiedz nam, czego szukasz w tej lokalizacji. Odezwiemy się z dopasowanymi ofertami — także niepublikowanymi.',
	typOpcje: ['Mieszkanie', 'Dom', 'Działka', 'Lokal', 'Jeszcze nie wiem'],
	przycisk: 'Wyślij zgłoszenie',
	kontakt: { telefon: '+48 690 008 273', email: 'biuro@lw.nieruchomosci.pl', godziny: 'Pon–Pt: 9:00–17:00' }
};

export const miasta: Miasto[] = [
	{
		slug: 'jelenia-gora',
		nazwa: 'Jelenia Góra',
		nazwaLoc: 'Jeleniej Górze',
		region: 'Kotlina Jeleniogórska',
		hero: '/jelenia-gora-zima.png',
		lead: 'Miasto na prawach powiatu w sercu Kotliny Jeleniogórskiej — z zabytkowym rynkiem, uzdrowiskiem Cieplice i doskonałym dostępem do gór.',
		chips: ['Kotlina Jeleniogórska', '≈ 76 tys. mieszkańców', 'Miasto + uzdrowisko'],
		opis: [
			'Jelenia Góra to największy ośrodek regionu i jego naturalne centrum — łączy miejski komfort z bliskością natury. Zabytkowy rynek, kamienice i uzdrowiskowa dzielnica Cieplice przyciągają zarówno mieszkańców, jak i inwestorów.',
			'Rynek nieruchomości jest tu najbardziej zróżnicowany w okolicy: od mieszkań w kamienicach i blokach, przez segmenty i domy, po działki na obrzeżach z widokiem na Karkonosze. To dobry wybór na życie, pracę i wynajem.'
		],
		fakty: [
			{ k: 'Region', v: 'Kotlina Jeleniogórska' },
			{ k: 'Powiat', v: 'm. Jelenia Góra' },
			{ k: 'Mieszkańcy', v: '≈ 76 000' },
			{ k: 'Charakter', v: 'Miasto + uzdrowisko' },
			{ k: 'W pobliżu', v: 'Karkonosze, Rudawy' }
		],
		atuty: [
			{ t: 'Uzdrowisko Cieplice', d: 'Zabytkowy park zdrojowy, tężnie i baseny termalne.' },
			{ t: 'Zabytkowe centrum', d: 'Klimatyczny rynek i kamienice z historią.' },
			{ t: 'Dobre skomunikowanie', d: 'DK3/S3 i szybki dojazd do Wrocławia.' },
			{ t: 'Edukacja', d: 'Szkoły, uczelnie i przedszkola na miejscu.' },
			{ t: 'Tereny rekreacyjne', d: 'Parki, szlaki i ścieżki rowerowe wokół miasta.' },
			{ t: 'Silny rynek najmu', d: 'Stały popyt — studenci i pracownicy.' }
		],
		galeria: [
			'/jelenia-gora-zima.png',
			'/karkonosze-panorama.png',
			'/schronisko-staw.png',
			U('photo-1519677100203-a0e668c92439'),
			U('photo-1449824913935-59a10b8d2000'),
			U('photo-1480714378408-67cf0d13bc1b')
		]
	},
	{
		slug: 'karpacz',
		nazwa: 'Karpacz',
		nazwaLoc: 'Karpaczu',
		region: 'Karkonosze · u stóp Śnieżki',
		hero: '/sniezka-sunset.png',
		lead: 'Najpopularniejszy górski kurort regionu u podnóża Śnieżki — turystyka przez cały rok i silny rynek apartamentów na wynajem.',
		chips: ['Karkonosze', '≈ 4,7 tys. mieszkańców', 'Kurort górski'],
		opis: [
			'Karpacz to wizytówka Karkonoszy — u stóp Śnieżki, z rozwiniętą bazą turystyczną, stokami i szlakami. Tętni życiem przez cały rok, co czyni go jednym z najbardziej pożądanych adresów w regionie.',
			'Dominują tu apartamenty i domy z widokiem, często kupowane jako inwestycja pod wynajem krótkoterminowy lub drugie miejsce zamieszkania. Ceny należą do najwyższych w okolicy — proporcjonalnie do prestiżu lokalizacji.'
		],
		fakty: [
			{ k: 'Region', v: 'Karkonosze' },
			{ k: 'Powiat', v: 'karkonoski' },
			{ k: 'Mieszkańcy', v: '≈ 4 700' },
			{ k: 'Charakter', v: 'Kurort górski' },
			{ k: 'Wysokość', v: '480–885 m n.p.m.' }
		],
		atuty: [
			{ t: 'Śnieżka i szlaki', d: 'Najwyższy szczyt Karkonoszy w zasięgu spaceru.' },
			{ t: 'Stok narciarski', d: 'Kompleks tras i wyciągów w sezonie zimowym.' },
			{ t: 'Silny wynajem', d: 'Wysoki popyt na najem krótkoterminowy.' },
			{ t: 'Świątynia Wang', d: 'Zabytek i rozpoznawalny symbol miasta.' },
			{ t: 'Gastronomia', d: 'Rozbudowana baza restauracji i kawiarni.' },
			{ t: 'Prestiż lokalizacji', d: 'Jeden z najbardziej pożądanych adresów.' }
		],
		galeria: [
			'/sniezka-sunset.png',
			'/karkonosze-panorama.png',
			'/sunset-dolina.png',
			U('photo-1506905925346-21bda4d32df4'),
			U('photo-1454496522488-7a8e488e8606'),
			U('photo-1439066615861-d1af74d74000')
		]
	},
	{
		slug: 'szklarska-poreba',
		nazwa: 'Szklarska Poręba',
		nazwaLoc: 'Szklarskiej Porębie',
		region: 'Karkonosze zachodnie',
		hero: '/sunset-dolina.png',
		lead: 'Kurort na zachodnim krańcu Karkonoszy — wodospady, szlaki i kolej gondolowa. Ceniony przez turystów i inwestorów apartamentowych.',
		chips: ['Karkonosze zachodnie', '≈ 6,5 tys. mieszkańców', 'Kurort górski'],
		opis: [
			'Szklarska Poręba leży u zbiegu Karkonoszy i Gór Izerskich, przy granicy z Czechami. Słynie z wodospadów, tras rowerowych i kolei gondolowej na Szrenicę — to jeden z najlepiej rozpoznawalnych kurortów w Sudetach.',
			'Rynek zdominowany jest przez apartamenty wakacyjne i domy z widokiem. To lokalizacja pod inwestycję turystyczną, ale też dla ceniących ciszę, czyste powietrze i bliskość natury na co dzień.'
		],
		fakty: [
			{ k: 'Region', v: 'Karkonosze zachodnie' },
			{ k: 'Powiat', v: 'karkonoski' },
			{ k: 'Mieszkańcy', v: '≈ 6 500' },
			{ k: 'Charakter', v: 'Kurort górski' },
			{ k: 'W pobliżu', v: 'Granica z Czechami' }
		],
		atuty: [
			{ t: 'Wodospad Kamieńczyka', d: 'Najwyższy wodospad polskich Karkonoszy.' },
			{ t: 'Kolej gondolowa', d: 'Wyjazd na Szrenicę przez cały rok.' },
			{ t: 'Szlaki i rowery', d: 'Rozbudowana sieć tras single track.' },
			{ t: 'Wynajem turystyczny', d: 'Stały ruch turystyczny w każdym sezonie.' },
			{ t: 'Blisko Czech', d: 'Szybki przejazd na czeską stronę gór.' },
			{ t: 'Czyste powietrze', d: 'Klimat górski ceniony przez kupujących.' }
		],
		galeria: [
			'/sunset-dolina.png',
			'/karkonosze-panorama.png',
			U('photo-1552083375-1447ce886485'),
			U('photo-1470071459604-3b5ec3a7fe05'),
			U('photo-1476514525535-07fb3b4ae5f1'),
			U('photo-1441974231531-c6227db76b6e')
		]
	},
	{
		slug: 'kowary',
		nazwa: 'Kowary',
		nazwaLoc: 'Kowarach',
		region: 'między Karkonoszami a Rudawami',
		hero: '/schronisko-staw.png',
		lead: 'Spokojne miasteczko między Karkonoszami a Rudawami Janowickimi — z tradycjami tkackimi i sztolniami, cenione za ciszę i naturę.',
		chips: ['Karkonosze / Rudawy', '≈ 11 tys. mieszkańców', 'Spokojne miasteczko'],
		opis: [
			'Kowary to kameralne miasto o bogatej historii, położone w dolinie między dwoma pasmami gór. Znane z Parku Miniatur, sztolni i tradycji tkackich, oferuje spokój z dala od turystycznego zgiełku większych kurortów.',
			'Ceny nieruchomości są tu wyraźnie niższe niż w Karpaczu czy Szklarskiej Porębie, przy zachowaniu bliskości gór. To dobra propozycja dla rodzin i osób szukających ciszy oraz dla kupujących z myślą o rekreacji.'
		],
		fakty: [
			{ k: 'Region', v: 'Karkonosze / Rudawy' },
			{ k: 'Powiat', v: 'karkonoski' },
			{ k: 'Mieszkańcy', v: '≈ 11 000' },
			{ k: 'Charakter', v: 'Miasteczko' },
			{ k: 'Atrakcje', v: 'Sztolnie, Park Miniatur' }
		],
		atuty: [
			{ t: 'Cisza i natura', d: 'Spokój z dala od turystycznego zgiełku.' },
			{ t: 'Atrakcje turystyczne', d: 'Sztolnie, Park Miniatur, tradycje tkackie.' },
			{ t: 'Blisko Karpacza', d: 'Kilkanaście minut do kurortu i szlaków.' },
			{ t: 'Przystępne ceny', d: 'Niższe stawki niż w głównych kurortach.' },
			{ t: 'Tereny spacerowe', d: 'Doliny i szlaki w dwóch pasmach gór.' },
			{ t: 'Klimat leczniczy', d: 'Tradycje sanatoryjne i czyste powietrze.' }
		],
		galeria: [
			'/schronisko-staw.png',
			'/karkonosze-panorama.png',
			'/sniezka-sunset.png',
			U('photo-1500534623283-312aade485b7'),
			U('photo-1470071459604-3b5ec3a7fe05'),
			U('photo-1439066615861-d1af74d74000')
		]
	},
	{
		slug: 'piechowice',
		nazwa: 'Piechowice',
		nazwaLoc: 'Piechowicach',
		region: 'brama do zachodnich Karkonoszy',
		hero: '/karkonosze-panorama.png',
		lead: 'Miasto u zbiegu Kamiennej i Małej Kamiennej, brama do zachodnich Karkonoszy — z hutą kryształów i wodospadem Szklarki.',
		chips: ['Karkonosze zachodnie', '≈ 6 tys. mieszkańców', 'Miasteczko'],
		opis: [
			'Piechowice leżą pomiędzy Jelenią Górą a Szklarską Porębą, stanowiąc wygodną bazę wypadową w zachodnie Karkonosze. Miasto znane jest z Huty Szkła Kryształowego „Julia” i pobliskiego wodospadu Szklarki.',
			'To lokalizacja łącząca spokój mniejszej miejscowości z dobrym skomunikowaniem i bliskością kurortów. Dostępne są tu zarówno domy i działki, jak i mieszkania — w cenach niższych niż w sąsiedniej Szklarskiej Porębie.'
		],
		fakty: [
			{ k: 'Region', v: 'Karkonosze zachodnie' },
			{ k: 'Powiat', v: 'karkonoski' },
			{ k: 'Mieszkańcy', v: '≈ 6 000' },
			{ k: 'Charakter', v: 'Miasteczko' },
			{ k: 'Atrakcje', v: 'Huta Julia, Wodospad Szklarki' }
		],
		atuty: [
			{ t: 'Wodospad Szklarki', d: 'Malowniczy wodospad w pobliżu miasta.' },
			{ t: 'Huta „Julia”', d: 'Zabytkowa huta szkła kryształowego.' },
			{ t: 'Między miastem a górami', d: 'Blisko Jeleniej Góry i Szklarskiej Poręby.' },
			{ t: 'Dobry dojazd', d: 'Droga i kolej w kierunku obu ośrodków.' },
			{ t: 'Przystępne ceny', d: 'Taniej niż w sąsiednim kurorcie.' },
			{ t: 'Tereny nad rzeką', d: 'Doliny Kamiennej i Małej Kamiennej.' }
		],
		galeria: [
			'/karkonosze-panorama.png',
			'/sunset-dolina.png',
			'/schronisko-staw.png',
			U('photo-1552083375-1447ce886485'),
			U('photo-1454496522488-7a8e488e8606'),
			U('photo-1441974231531-c6227db76b6e')
		]
	},
	{
		slug: 'podgorzyn',
		nazwa: 'Podgórzyn',
		nazwaLoc: 'Podgórzynie',
		region: 'u podnóża Karkonoszy',
		hero: U('photo-1464822759023-fed622ff2c3b', 1600),
		lead: 'Gmina u podnóża Karkonoszy z zalewem Sosnówka — spokojne okolice dla rodzin szukających domu i działki blisko natury.',
		chips: ['Kotlina Jeleniogórska', '≈ 8 tys. (gmina)', 'Wieś / rekreacja'],
		opis: [
			'Podgórzyn to gmina wiejska tuż przy Jeleniej Górze, u podnóża Karkonoszy. Sercem okolicy jest zalew Sosnówka — popularne miejsce rekreacji, wokół którego rozwija się budownictwo jednorodzinne.',
			'To lokalizacja dla ceniących spokój, przestrzeń i widok na góry, przy zachowaniu bliskości miasta. Dominują tu domy i działki budowlane, często z widokowym położeniem — chętnie wybierane przez rodziny.'
		],
		fakty: [
			{ k: 'Region', v: 'Kotlina Jeleniogórska' },
			{ k: 'Typ', v: 'Gmina wiejska' },
			{ k: 'Powiat', v: 'karkonoski' },
			{ k: 'Charakter', v: 'Wieś / rekreacja' },
			{ k: 'Atrakcja', v: 'Zalew Sosnówka' }
		],
		atuty: [
			{ t: 'Zalew Sosnówka', d: 'Tereny rekreacyjne i plaża w zasięgu.' },
			{ t: 'Domy i działki', d: 'Przestrzeń pod budowę własnego domu.' },
			{ t: 'Blisko Jeleniej Góry', d: 'Kilka minut do miejskich udogodnień.' },
			{ t: 'Cisza i przestrzeń', d: 'Spokojne, kameralne otoczenie.' },
			{ t: 'Tereny widokowe', d: 'Panorama Karkonoszy z wielu działek.' },
			{ t: 'Rozwój budownictwa', d: 'Rosnąca oferta nowych inwestycji.' }
		],
		galeria: [
			'/sunset-dolina.png',
			'/karkonosze-panorama.png',
			'/schronisko-staw.png',
			U('photo-1500382017468-9049fed747ef'),
			U('photo-1449824913935-59a10b8d2000'),
			U('photo-1439066615861-d1af74d74000')
		]
	},
	{
		slug: 'kamienna-gora',
		nazwa: 'Kamienna Góra',
		nazwaLoc: 'Kamiennej Górze',
		region: 'między Rudawami Janowickimi a Górami Kamiennymi',
		hero: U('photo-1464822759023-fed622ff2c3b', 1600),
		lead: 'Miasto powiatowe nad Bobrem, między Rudawami Janowickimi a Górami Kamiennymi — z opactwem w pobliskim Krzeszowie i cenami niższymi niż w Kotlinie Jeleniogórskiej.',
		chips: ['Kotlina Kamiennogórska', '≈ 18 tys. mieszkańców', 'Miasto powiatowe'],
		opis: [
			'Kamienna Góra leży nad Bobrem, w kotlinie zamkniętej Rudawami Janowickimi od zachodu i Górami Kamiennymi od wschodu. To miasto powiatowe z własnym rynkiem, szkołami i strefą ekonomiczną, a jednocześnie punkt wypadowy w dwa różne pasma górskie.',
			'Kilka kilometrów dalej leży Krzeszów z barokowym opactwem cystersów — jednym z najcenniejszych zabytków Dolnego Śląska. Nieruchomości bywają tu wyraźnie tańsze niż w okolicach Jeleniej Góry czy Karpacza, co przyciąga kupujących szukających przestrzeni za rozsądne pieniądze.'
		],
		fakty: [
			{ k: 'Region', v: 'Kotlina Kamiennogórska' },
			{ k: 'Powiat', v: 'kamiennogórski (miasto powiatowe)' },
			{ k: 'Mieszkańcy', v: '≈ 18 000' },
			{ k: 'Rzeka', v: 'Bóbr' },
			{ k: 'W pobliżu', v: 'Krzeszów, Rudawy Janowickie' }
		],
		atuty: [
			{ t: 'Opactwo w Krzeszowie', d: 'Barokowy zespół cystersów kilka km od miasta.' },
			{ t: 'Dwa pasma górskie', d: 'Rudawy Janowickie i Góry Kamienne w zasięgu.' },
			{ t: 'Przystępne ceny', d: 'Taniej niż w Kotlinie Jeleniogórskiej.' },
			{ t: 'Miasto powiatowe', d: 'Urzędy, szkoły i handel na miejscu.' },
			{ t: 'Strefa ekonomiczna', d: 'Lokalny rynek pracy i inwestycje.' },
			{ t: 'Tradycje tkackie', d: 'Muzeum Tkactwa i historia przemysłu.' }
		],
		galeria: [
			'/sunset-dolina.png',
			'/karkonosze-panorama.png',
			'/schronisko-staw.png',
			U('photo-1454496522488-7a8e488e8606'),
			U('photo-1441974231531-c6227db76b6e'),
			U('photo-1449824913935-59a10b8d2000')
		]
	},
	{
		slug: 'myslakowice',
		nazwa: 'Mysłakowice',
		nazwaLoc: 'Mysłakowicach',
		region: 'Dolina Pałaców i Ogrodów',
		hero: U('photo-1476514525535-07fb3b4ae5f1', 1600),
		lead: 'Gmina w Dolinie Pałaców i Ogrodów, w połowie drogi między Jelenią Górą a Karpaczem — z pałacem królewskim i tyrolskimi domami osadników.',
		chips: ['Kotlina Jeleniogórska', '≈ 10 tys. (gmina)', 'Wieś / pałace'],
		opis: [
			'Mysłakowice leżą nad Łomnicą, u podnóża Karkonoszy, w sercu Doliny Pałaców i Ogrodów. Dawna letnia rezydencja króla Fryderyka Wilhelma IV i charakterystyczne domy tyrolskie — zbudowane przez osadników z doliny Zillertal — nadają miejscowości rys, jakiego nie ma żadna sąsiednia gmina.',
			'To wygodny kompromis: kilkanaście minut do Jeleniej Góry i podobnie blisko do Karpacza, przy zachowaniu spokoju i widoku na góry. Dominują domy i działki, chętnie wybierane przez rodziny szukające przestrzeni bez odcinania się od miasta.'
		],
		fakty: [
			{ k: 'Region', v: 'Kotlina Jeleniogórska' },
			{ k: 'Typ', v: 'Gmina wiejska' },
			{ k: 'Powiat', v: 'karkonoski' },
			{ k: 'Mieszkańcy', v: '≈ 10 000 (gmina)' },
			{ k: 'Atrakcje', v: 'Pałac Mysłakowice, domy tyrolskie' }
		],
		atuty: [
			{ t: 'Dolina Pałaców i Ogrodów', d: 'Jeden z najcenniejszych zespołów rezydencji w kraju.' },
			{ t: 'Domy tyrolskie', d: 'Ślad po osadnikach z doliny Zillertal.' },
			{ t: 'Między miastem a Karpaczem', d: 'Blisko Jeleniej Góry i stoków.' },
			{ t: 'Widok na Karkonosze', d: 'Panorama gór z wielu działek.' },
			{ t: 'Domy i działki', d: 'Przestrzeń pod budowę własnego domu.' },
			{ t: 'Nad Łomnicą', d: 'Tereny zielone wzdłuż rzeki.' }
		],
		galeria: [
			'/karkonosze-panorama.png',
			'/sniezka-sunset.png',
			'/sunset-dolina.png',
			U('photo-1464822759023-fed622ff2c3b'),
			U('photo-1500382017468-9049fed747ef'),
			U('photo-1552083375-1447ce886485')
		]
	},
	{
		slug: 'lesna',
		nazwa: 'Leśna',
		nazwaLoc: 'Leśnej',
		region: 'Pogórze Izerskie',
		hero: U('photo-1439066615861-d1af74d74000', 1600),
		lead: 'Miasteczko nad Kwisą na Pogórzu Izerskim — z zamkiem Czocha i jeziorami zaporowymi, dla szukających wody i ciszy poza tłokiem Karkonoszy.',
		chips: ['Pogórze Izerskie', '≈ 4,5 tys. mieszkańców', 'Miasteczko / jeziora'],
		opis: [
			'Leśna leży nad Kwisą, na Pogórzu Izerskim, w powiecie lubańskim. Okolicę definiuje woda: dwa jeziora zaporowe — Leśniańskie i Złotnickie — z zabytkowymi zaporami z początku XX wieku, a nad brzegiem pierwszego z nich stoi zamek Czocha, jeden z najbardziej rozpoznawalnych zamków w Polsce.',
			'To inna okolica niż Karkonosze: łagodniejsza, mniej turystyczna i wyraźnie tańsza, za to z dostępem do jezior i lasów. Trafiają się tu domy i działki rekreacyjne dla osób, którym bardziej zależy na wodzie i spokoju niż na bliskości stoków.'
		],
		fakty: [
			{ k: 'Region', v: 'Pogórze Izerskie' },
			{ k: 'Powiat', v: 'lubański' },
			{ k: 'Mieszkańcy', v: '≈ 4 500' },
			{ k: 'Rzeka', v: 'Kwisa' },
			{ k: 'Atrakcje', v: 'Zamek Czocha, jeziora zaporowe' }
		],
		atuty: [
			{ t: 'Zamek Czocha', d: 'Znany zamek nad Jeziorem Leśniańskim.' },
			{ t: 'Dwa jeziora', d: 'Leśniańskie i Złotnickie w zasięgu spaceru.' },
			{ t: 'Nad Kwisą', d: 'Rzeka, zapory i tereny rekreacyjne.' },
			{ t: 'Niskie ceny', d: 'Wyraźnie taniej niż w Karkonoszach.' },
			{ t: 'Cisza i lasy', d: 'Mniej turystyczna okolica niż kurorty.' },
			{ t: 'Domy i rekreacja', d: 'Działki i domy blisko wody.' }
		],
		galeria: [
			'/schronisko-staw.png',
			'/sunset-dolina.png',
			'/karkonosze-panorama.png',
			U('photo-1441974231531-c6227db76b6e'),
			U('photo-1439066615861-d1af74d74000'),
			U('photo-1454496522488-7a8e488e8606')
		]
	}
];

export function getMiastoBySlug(slug: string): Miasto | undefined {
	return miasta.find((m) => m.slug === slug);
}
