<script lang="ts">
	import {
		kontakt,
		wyszukiwarka,
		hero,
		dlaczegoMy,
		kategorie,
		filtryChipy,
		oNas,
		statystyki,
		uslugi,
		region,
		opinie,
		faq,
		dualCta
	} from '$lib/data/landing';
	import { CATEGORY_LABELS, formatArea, formatPrice, pricePerM2 } from '$lib/utils';
	import { godziny, social } from '$lib/data/kontakt-strona';
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import type { Listing, ListingImage } from '@prisma/client';

	let { data } = $props();

	// ── Polecane oferty: karuzela zdjęć per karta ──
	let activeImages = $state(data.featuredListings.map(() => 0));

	function sortedImages(listing: Listing & { images?: ListingImage[] }) {
		return [...(listing.images ?? [])].sort(
			(a, b) => Number(b.isMain) - Number(a.isMain) || a.order - b.order
		);
	}
	function prevImage(i: number, len: number) {
		activeImages[i] = (activeImages[i] - 1 + len) % len;
	}
	function nextImage(i: number, len: number) {
		activeImages[i] = (activeImages[i] + 1) % len;
	}
	function offerBadge(listing: Listing) {
		if (listing.isFeatured) return 'Polecana';
		if (listing.isExclusive) return 'Na wyłączność';
		return '';
	}
	function offerSpecs(listing: Listing) {
		const specs: { l: string; v: string }[] = [];
		if (listing.rooms) specs.push({ l: 'Pokoje', v: String(listing.rooms) });
		if (listing.area) specs.push({ l: 'Powierzchnia', v: formatArea(listing.area) });
		if (listing.floor != null) specs.push({ l: 'Piętro', v: String(listing.floor) });
		return specs.slice(0, 3);
	}

	let active = $state(0);
	const svc = $derived(uslugi[active]);
	// Akordeon usług na mobile (osobny od `active`, bo na telefonie tap ma zwijać/rozwijać
	// wiersz w miejscu zamiast tylko podmieniać zdjęcie w bocznym panelu jak na desktopie).
	let svcMobileOpen = $state(0);
	function onSvcRowClick(i: number) {
		active = i;
		svcMobileOpen = svcMobileOpen === i ? -1 : i;
	}

	// ── FAQ: akordeon z pojedynczym rozwinięciem ──
	let faqOpen = $state(0);
	function toggleFaq(i: number) {
		faqOpen = faqOpen === i ? -1 : i;
	}

	// ── Region: pozioma galeria (drag / wheel / strzałki, BEZ auto-play i BEZ scroll-jackingu) ──
	let regionScroller: HTMLDivElement | undefined = $state();
	let regionProgress = $state(10);
	let regionScrollable = $state(false);
	let regionDragging = false;
	let regionStartX = 0;
	let regionStartScroll = 0;
	let regionWheelCooldown = false;

	function updateRegionProgress() {
		if (!regionScroller) return;
		const max = regionScroller.scrollWidth - regionScroller.clientWidth;
		// Przy małej liczbie kafli mieszczą się one w całości na szerokim ekranie i nie ma czego
		// przewijać — wtedy chowamy strzałki, podpowiedź i pasek, żeby nie obiecywały ruchu,
		// którego nie będzie. Tolerancja 4px na zaokrąglenia sub-pikselowe.
		regionScrollable = max > 4;
		const pct = max > 0 ? Math.min(Math.max(regionScroller.scrollLeft / max, 0), 1) : 0;
		regionProgress = 10 + pct * 90;
	}
	$effect(() => {
		regionTiles; // przelicz też, gdy zmieni się liczba kafli
		if (!regionScroller) return;
		updateRegionProgress();
		// ResizeObserver zamiast nasłuchu `resize` na oknie: odpala się dopiero po przeliczeniu
		// układu, więc pomiar jest już aktualny (przy `resize` mierzylibyśmy sprzed reflow
		// i strzałki zostałyby ukryte mimo zwężenia okna).
		const ro = new ResizeObserver(() => updateRegionProgress());
		ro.observe(regionScroller);
		return () => ro.disconnect();
	});
	function onRegionWheel(e: WheelEvent) {
		if (!regionScroller) return;
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			e.preventDefault();
			// Drobny ruch kółkiem (np. jeden "click" myszy) to za mało, by natywny scroll-snap
			// przesunął widok o cały kafel — mandatory snap potrafi wtedy cofnąć widok do punktu
			// startowego, co wygląda jak "nie działa". Zamiast swobodnego scrolla + zgadywania przez
			// przeglądarkę, każdy gest kółkiem przesuwa dokładnie o jedną pozycję (jak strzałki),
			// z krótkim wyciszeniem, by seria eventów z jednego obrotu/swipe'a nie przewinęła kilku na raz.
			if (regionWheelCooldown) return;
			regionWheelCooldown = true;
			if (e.deltaY > 0) {
				regionNext();
			} else {
				regionPrev();
			}
			setTimeout(() => {
				regionWheelCooldown = false;
			}, 500);
		}
	}
	function onRegionMouseDown(e: MouseEvent) {
		if (!regionScroller) return;
		regionDragging = true;
		regionStartX = e.pageX;
		regionStartScroll = regionScroller.scrollLeft;
		regionScroller.style.cursor = 'grabbing';
		regionScroller.style.scrollSnapType = 'none';
	}
	function onWindowMouseMove(e: MouseEvent) {
		if (!regionDragging || !regionScroller) return;
		e.preventDefault();
		regionScroller.scrollLeft = regionStartScroll - (e.pageX - regionStartX);
	}
	function onWindowMouseUp() {
		if (!regionDragging || !regionScroller) return;
		regionDragging = false;
		regionScroller.style.cursor = 'grab';
		regionScroller.style.scrollSnapType = 'x mandatory';
	}
	// Celujemy w krawędź sąsiedniego kafla, a nie w stałe 580px: kafle mają różne szerokości
	// (big/small), więc stały skok lądował między punktami zaczepienia — a `scroll-snap-type:
	// x mandatory` potrafi wtedy ściągnąć widok z powrotem, co wygląda jak "nie działa".
	// Krawędź kafla jest punktem zaczepienia (scroll-snap-align: start), więc snap nie ma z czym walczyć.
	function regionScrollTo(kierunek: 1 | -1) {
		const el = regionScroller;
		if (!el) return;
		const baza = el.getBoundingClientRect().left - el.scrollLeft;
		const krawedzie = [...el.querySelectorAll<HTMLElement>('.region-tile')].map((t) =>
			Math.round(t.getBoundingClientRect().left - baza)
		);
		const teraz = el.scrollLeft;
		const cel =
			kierunek > 0
				? krawedzie.find((o) => o > teraz + 8)
				: [...krawedzie].reverse().find((o) => o < teraz - 8);
		if (cel === undefined) return;
		el.scrollTo({ left: cel, behavior: 'smooth' });
	}
	function regionPrev() {
		regionScrollTo(-1);
	}
	function regionNext() {
		regionScrollTo(1);
	}

	// ── Kafelki regionu: pokazujemy tylko lokalizacje, w których faktycznie mamy oferty ──
	function regionCount(href: string) {
		const slug = href.split('/').pop() ?? '';
		return data.regionCounts?.[slug] ?? 0;
	}
	function offerWord(n: number) {
		if (n === 1) return 'oferta';
		const d = n % 10;
		const dd = n % 100;
		return d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14) ? 'oferty' : 'ofert';
	}
	const regionTiles = $derived(region.galeria.filter((t) => regionCount(t.href) > 0));

	// ── Opinie: pojedynczy rotujący cytat, auto-rotacja co 6,5s + kropki (restartują timer) ──
	let testiIndex = $state(0);
	$effect(() => {
		testiIndex; // odczyt = zależność efektu; zmiana (auto lub klik) restartuje timer
		const id = setInterval(() => {
			testiIndex = (testiIndex + 1) % opinie.length;
		}, 6500);
		return () => clearInterval(id);
	});
</script>

<svelte:window onmousemove={onWindowMouseMove} onmouseup={onWindowMouseUp} />

<svelte:head>
	<title>LW Nieruchomości — biuro nieruchomości Jelenia Góra i Karkonosze</title>
	<meta
		name="description"
		content="Lokalne biuro nieruchomości z Jeleniej Góry. Kupno, sprzedaż i wynajem nieruchomości w Kotlinie Jeleniogórskiej i Karkonoszach."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="LW Nieruchomości — Jelenia Góra i Karkonosze" />
	<meta
		property="og:description"
		content="Lokalne biuro nieruchomości z Jeleniej Góry. Kupno, sprzedaż i wynajem w Kotlinie Jeleniogórskiej i Karkonoszach."
	/>
	<meta property="og:image" content={data.ogImage} />
	{@html data.jsonLd}
</svelte:head>

<div class="lw-page">
	<div class="lw-landing site">
		<LandingNav />

		<!-- ============ HERO ============ -->
		<section class="hero">
			<div class="hero-copy">
				<span class="hero-eyebrow">{hero.eyebrow}</span>
				<h1 class="hero-h1">
					{@html hero.tytul.replace(hero.tytulEmfaza, `<em>${hero.tytulEmfaza}</em>`)}
				</h1>
				<p class="hero-lead">{hero.podtytul}</p>
			</div>
			<form class="search-card" onsubmit={(e) => e.preventDefault()}>
				<label class="search-field">
					Rodzaj
					<select>{#each wyszukiwarka.rodzaj as o}<option>{o}</option>{/each}</select>
				</label>
				<label class="search-field">
					Lokalizacja
					<select>{#each wyszukiwarka.lokalizacja as o}<option>{o}</option>{/each}</select>
				</label>
				<label class="search-field">
					Cena do
					<select>{#each wyszukiwarka.cenaDo as o}<option>{o}</option>{/each}</select>
				</label>
				<button type="submit" class="search-btn">Szukaj</button>
			</form>
		</section>

		<!-- ============ DLACZEGO MY — 6 kafelków (zastąpiło dawny pasek trust) ============ -->
		<section class="why">
			<div class="why-head">
				<div class="eyebrow">{dlaczegoMy.eyebrow}</div>
				<h2 class="why-h2">{dlaczegoMy.tytul}</h2>
			</div>
			<div class="why-grid">
				{#each dlaczegoMy.kafle as k}
					<div class="why-card">
						<div class="why-ico">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.6"
								stroke-linecap="round"
								stroke-linejoin="round">{@html k.ikona}</svg
							>
						</div>
						<h3 class="why-t">{k.t}</h3>
						<p class="why-d">{k.d}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ CATEGORIES ============ -->
		<section class="section cats-section">
			<div class="section-head">
				<div>
					<div class="eyebrow">Przeglądaj</div>
					<h2 class="h2">Kategorie nieruchomości</h2>
				</div>
			</div>
			<div class="cats-grid">
				{#each kategorie as cat}
					<a href="/oferty?category={cat.category}" class="cat" style="background-image:url('{cat.img}')">
						<div class="cat-shade"></div>
						<div class="cat-bar">
							<div class="cat-name">{cat.name}</div>
							<div class="cat-deal">{cat.deal}</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- ============ OFFERS ============ -->
		<section class="section offers-section">
			<div class="section-head">
				<div>
					<div class="eyebrow">Wybrane dla Ciebie</div>
					<h2 class="h2">Polecane oferty</h2>
				</div>
				<a href="/oferty" class="head-link">Zobacz wszystkie oferty →</a>
			</div>
			<div class="chips">
				{#each filtryChipy as chip, i}
					<span class="chip" class:active={i === 0}>{chip}</span>
				{/each}
			</div>
			<div class="offers-grid">
				{#each data.featuredListings as listing, i}
					{@const imgs = sortedImages(listing)}
					{@const activeIdx = imgs.length ? activeImages[i] % imgs.length : 0}
					{@const mainImg = imgs[activeIdx]?.url}
					{@const badge = offerBadge(listing)}
					<article class="offer">
						<div class="offer-media" style={mainImg ? `background-image:url('${mainImg}')` : ''}>
							{#if badge}<span class="offer-badge">{badge}</span>{/if}
							<span class="offer-heart">♡</span>
							{#if imgs.length > 1}
								<button
									type="button"
									class="offer-arrow left"
									aria-label="Poprzednie zdjęcie"
									onclick={() => prevImage(i, imgs.length)}>‹</button
								>
								<button
									type="button"
									class="offer-arrow right"
									aria-label="Następne zdjęcie"
									onclick={() => nextImage(i, imgs.length)}>›</button
								>
							{/if}
							<div class="offer-strip">
								<div class="strip-loc">
									<div class="strip-city">{listing.city}</div>
									{#if listing.district}<div class="strip-street">{listing.district}</div>{/if}
								</div>
								<div class="strip-price">
									<div class="strip-amount">{formatPrice(listing.price)}</div>
									{#if pricePerM2(listing.price, listing.area)}
										<div class="strip-perm2">{pricePerM2(listing.price, listing.area)}</div>
									{/if}
								</div>
							</div>
						</div>
						<div class="offer-body">
							<div class="offer-subtitle">
								{CATEGORY_LABELS[listing.category]}{listing.rooms ? ` ${listing.rooms}-pokojowe` : ''}
							</div>
							<div class="offer-title">{listing.title}</div>
							<div class="offer-specs">
								{#each offerSpecs(listing) as sp}
									<div>
										<div class="spec-l">{sp.l}</div>
										<div class="spec-v">{sp.v}</div>
									</div>
								{/each}
							</div>
							<a href="/oferty/{listing.slug}" class="offer-cta">Zobacz ofertę →</a>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ============ ABOUT ============ -->
		<section class="about" id="o-nas">
			<div class="about-grid">
				<div>
					<div class="eyebrow eyebrow-green">{oNas.eyebrow}</div>
					<h2 class="about-h2">
						{@html oNas.tytul.replace(oNas.tytulEmfaza, `<em>${oNas.tytulEmfaza}</em>`)}
					</h2>
					{#each oNas.akapity as p}<p class="about-p">{p}</p>{/each}
					<div class="stats">
						{#each statystyki as s}
							<div>
								<div class="stat-n">{s.n}</div>
								<div class="stat-l">{s.l}</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="about-photo">
					<div class="about-photo-img" style="background-image:url('{oNas.zdjecie}')"></div>
					<div class="about-photo-grad"></div>
					<div class="about-photo-cap">
						<div class="cap-big">{oNas.podpisZdjecia}</div>
						<div class="cap-small">{oNas.podpisZdjeciaMaly}</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ============ SERVICES (interactive) ============ -->
		<section class="section services-section" id="uslugi">
			<div class="services-head">
				<div class="eyebrow">Usługi</div>
				<h2 class="services-h2">Kompleksowa obsługa — od wyceny po klucze</h2>
				<p class="services-sub">Wybierz usługę z listy, aby zobaczyć szczegóły i zdjęcie.</p>
			</div>
			<div class="services-grid">
				<div class="svc-list">
					{#each uslugi as sv, i}
						<div class="svc-item">
							<button
								type="button"
								class="svc-row"
								class:active={i === active}
								onclick={() => onSvcRowClick(i)}
							>
								<span class="rowbar"></span>
								<span class="svc-no">{sv.no}</span>
								<span class="svc-text">
									<span class="svc-t">{sv.t}</span>
									<span class="svc-d">{sv.d}</span>
								</span>
								<span class="svc-chevron" class:open={svcMobileOpen === i} aria-hidden="true">⌄</span>
							</button>
							<div class="svc-mobile-panel" class:open={svcMobileOpen === i}>
								<div class="svc-mobile-img" style="background-image:url('{sv.img}')"></div>
								<p class="svc-mobile-desc">{sv.long}</p>
								<a href={sv.href} class="svc-ask">Zobacz szczegóły →</a>
							</div>
						</div>
					{/each}
				</div>
				<div class="svc-panel">
					<div class="svc-panel-media">
						{#key active}
							<div class="svc-img" style="background-image:url('{svc.img}')"></div>
						{/key}
						<div class="svc-img-grad"></div>
						<div class="svc-img-title">{svc.t}</div>
					</div>
					<div class="svc-panel-body">
						<div class="svc-label">Usługa {svc.no}</div>
						<p class="svc-long">{svc.long}</p>
						<a href={svc.href} class="svc-ask">Zobacz szczegóły usługi →</a>
					</div>
				</div>
			</div>
		</section>

		<!-- ============ REGION — pozioma przeciągana galeria (tylko lokalizacje z ofertami) ============ -->
		{#if regionTiles.length}
			<section class="region-section" id="region">
				<div class="region-head">
					<div class="region-head-text">
						<div class="eyebrow eyebrow-dark">Region Karkonosze</div>
						<h2 class="region-h2">{region.tytul}</h2>
					</div>
					{#if regionScrollable}
						<div class="region-hint">{region.hint}</div>
					{/if}
				</div>
				<div class="region-gallery-wrap">
					<div
						class="region-scroller"
						bind:this={regionScroller}
						onscroll={updateRegionProgress}
						onwheel={onRegionWheel}
						onmousedown={onRegionMouseDown}
					>
						{#each regionTiles as tile}
							{@const n = regionCount(tile.href)}
							<a href={tile.href} class="region-tile {tile.size}">
								<div class="region-img" style="background-image:url('{tile.img}')"></div>
								<div class="region-cap {tile.size}">{tile.caption}</div>
								<span class="region-link">{n} {offerWord(n)} →</span>
							</a>
						{/each}
					</div>
					{#if regionScrollable}
						<button class="region-arrow left" aria-label="Poprzednie zdjęcie" onclick={regionPrev}
							>‹</button
						>
						<button class="region-arrow right" aria-label="Następne zdjęcie" onclick={regionNext}
							>›</button
						>
					{/if}
				</div>
				{#if regionScrollable}
					<div class="region-progress-track">
						<div class="region-progress-bar" style="width:{regionProgress}%"></div>
					</div>
				{/if}
			</section>
		{/if}

		<!-- ============ TESTIMONIALS — pojedynczy rotujący cytat na zdjęciu ============ -->
		<section class="testi-section-v2">
			<div class="testi-bg" style="background-image:url('/sunset-dolina.png')"></div>
			<div class="testi-overlay"></div>
			<div class="testi-content">
				<span class="testi-watermark" aria-hidden="true">”</span>
				<div class="eyebrow eyebrow-dark">Opinie klientów</div>
				<p class="testi-quote-text">{opinie[testiIndex].quote}</p>
				<div class="testi-author-v2">{opinie[testiIndex].name} · {opinie[testiIndex].loc}</div>
				<div class="testi-dots">
					{#each opinie as _, i}
						<button
							type="button"
							class="testi-dot"
							class:active={i === testiIndex}
							aria-label="Pokaż opinię {i + 1}"
							onclick={() => (testiIndex = i)}
						></button>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ FAQ — akordeon ============ -->
		<section class="section faq-section" id="faq">
			<div class="faq-grid">
				<div class="faq-intro">
					<div class="eyebrow">{faq.eyebrow}</div>
					<h2 class="h2 faq-h2">{faq.tytul}</h2>
					<p class="faq-lead">
						Krótkie odpowiedzi na pytania, które słyszymy najczęściej. Nie znalazłeś swojego? Zadzwoń lub
						napisz — chętnie pomożemy.
					</p>
					<a href={faq.cta.href} class="faq-cta">{faq.cta.label}</a>
				</div>
				<div class="faq-list">
					{#each faq.lista as item, i}
						<div class="faq-item" class:open={faqOpen === i}>
							<div class="faq-bar"></div>
							<button
								type="button"
								class="faq-q"
								aria-expanded={faqOpen === i}
								onclick={() => toggleFaq(i)}
							>
								<span class="faq-q-text">{item.q}</span>
								<span class="faq-icon" aria-hidden="true">{faqOpen === i ? '−' : '+'}</span>
								<span class="faq-chevron" class:open={faqOpen === i} aria-hidden="true">⌄</span>
							</button>
							{#if faqOpen === i}
								<div class="faq-panel">
									<p class="faq-answer">{item.a}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ DUAL CTA — przekątny podział ============ -->
		<section class="dual-diag">
			<div class="dual-panel dual-left">
				<h3 class="dual-h3">{dualCta[0].tytul}</h3>
				<p class="dual-p-left">{dualCta[0].opis}</p>
				<a href="#kontakt" class="dual-btn-left">{dualCta[0].przycisk}</a>
			</div>
			<div class="dual-panel dual-right">
				<h3 class="dual-h3">{dualCta[1].tytul}</h3>
				<p class="dual-p-right">{dualCta[1].opis}</p>
				<a href="#kontakt" class="dual-btn-right">{dualCta[1].przycisk}</a>
			</div>
			<div class="dual-badge">Wybierz swoją ścieżkę</div>
		</section>

		<!-- ============ CONTACT + MAP ============ -->
		<section class="section contact-section" id="kontakt">
			<div class="contact-box">
				<div class="contact-left">
					<div class="eyebrow">Kontakt</div>
					<h2 class="contact-h2">Porozmawiajmy o Twojej nieruchomości</h2>
					<div class="contact-rows">
						<div>
							<div class="contact-label">Telefon</div>
							<div class="contact-phone">{kontakt.telefon}</div>
						</div>
						<div>
							<div class="contact-label">E-mail</div>
							<div class="contact-val">{kontakt.email}</div>
						</div>
						<div>
							<div class="contact-label">Biuro mobilne</div>
							<div class="contact-val">{kontakt.adres}</div>
						</div>
					</div>

					<div class="contact-hours">
						<div class="contact-label">Godziny pracy</div>
						{#each godziny as g}
							<div class="contact-hours-row"><span>{g.d}</span><span>{g.h}</span></div>
						{/each}
					</div>

					<div class="contact-social">
						{#each social as s}
							<a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.nazwa}
								>{s.znak}</a
							>
						{/each}
					</div>

					<a href="/kontakt#formularz" class="contact-btn">Wyślij wiadomość</a>
				</div>
				<div class="contact-map">
					<iframe src={kontakt.mapaEmbed} title="Mapa — Jelenia Góra" loading="lazy"></iframe>
				</div>
			</div>
		</section>

		<LandingFooter />
	</div>
</div>

<style>
	/* ===== HERO ===== */
	.hero {
		position: relative;
		min-height: 740px;
		background-image: linear-gradient(
				105deg,
				rgba(18, 26, 20, 0.76) 0%,
				rgba(18, 26, 20, 0.46) 50%,
				rgba(18, 26, 20, 0.16) 100%
			),
			url('/sniezka-sunset.png');
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 72px;
	}
	.hero-copy {
		max-width: 720px;
		color: #fff;
	}
	.hero-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		background: rgba(255, 255, 255, 0.16);
		backdrop-filter: blur(6px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 7px 15px;
		border-radius: 999px;
		margin-bottom: 22px;
	}
	.hero-h1 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 47px;
		line-height: 1.09;
		letter-spacing: -0.01em;
		margin-bottom: 18px;
		color: #fff;
	}
	/* emfaza wstrzykiwana przez {@html} — Svelte nie scope'uje jej klasą, stąd :global */
	.hero-h1 :global(em) {
		font-style: italic;
		color: var(--gold-light);
	}
	.hero-lead {
		font-size: 16.5px;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.9);
		max-width: 640px;
	}
	.search-card {
		position: absolute;
		left: 72px;
		right: 72px;
		bottom: -56px;
		background: #fff;
		border-radius: 18px;
		box-shadow: 0 30px 60px -30px rgba(30, 40, 30, 0.4);
		padding: 22px 24px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr auto;
		gap: 18px;
		align-items: end;
		border: 1px solid var(--border);
	}
	.search-field {
		display: flex;
		flex-direction: column;
		gap: 7px;
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--label);
		font-weight: 600;
	}
	.search-field select {
		appearance: none;
		background: var(--bg-site)
			url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%232C4A38' stroke-width='2'><path d='M2 4l4 4 4-4'/></svg>")
			no-repeat right 14px center;
		border: 1px solid var(--divider);
		border-radius: 12px;
		padding: 13px 15px;
		font-size: 15px;
		color: var(--text);
		text-transform: none;
		letter-spacing: 0;
		font-weight: 500;
	}
	.search-btn {
		background: var(--green);
		color: #fff;
		border: none;
		border-radius: 12px;
		padding: 14px 30px;
		font-size: 16px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		height: 50px;
	}
	.search-btn:hover {
		opacity: 0.92;
	}

	/* ===== DLACZEGO MY — 6 kafelków (zastąpiło dawny pasek trust) ===== */
	.why {
		/* górny padding robi miejsce dla wyszukiwarki wystającej z hero (bottom:-56px) */
		padding: 104px 48px 26px;
	}
	.why-head {
		text-align: center;
		max-width: 680px;
		margin: 0 auto 40px;
	}
	.why-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 38px;
		line-height: 1.12;
	}
	.why-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}
	.why-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 28px 26px;
		box-shadow: 0 16px 30px -26px rgba(30, 40, 30, 0.5);
	}
	.why-ico {
		width: 50px;
		height: 50px;
		border-radius: 14px;
		background: rgba(180, 137, 76, 0.12);
		color: var(--gold);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 18px;
	}
	.why-t {
		font-family: 'Newsreader', serif;
		font-size: 21px;
		font-weight: 500;
		line-height: 1.2;
		margin-bottom: 8px;
	}
	.why-d {
		font-size: 14.5px;
		line-height: 1.65;
		color: var(--muted);
	}

	/* ===== CATEGORIES ===== */
	.cats-section {
		padding-top: 36px;
		padding-bottom: 20px;
	}
	.cats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
	.cat {
		position: relative;
		height: 300px;
		border-radius: 16px;
		overflow: hidden;
		display: block;
		box-shadow: 0 16px 30px -22px rgba(30, 40, 30, 0.5);
		background-size: cover;
		background-position: center;
	}
	.cat-shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(20, 30, 22, 0.14), rgba(20, 30, 22, 0.34));
	}
	.cat-bar {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(18, 26, 20, 0.44);
		backdrop-filter: blur(2px);
		border-top: 1px solid rgba(255, 255, 255, 0.16);
		border-bottom: 1px solid rgba(255, 255, 255, 0.16);
		padding: 16px 18px;
		text-align: center;
		color: #fff;
	}
	.cat-name {
		font-family: 'Newsreader', serif;
		font-size: 25px;
		font-weight: 600;
		letter-spacing: 0.01em;
	}
	.cat-deal {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.88);
		margin-top: 5px;
	}

	/* ===== OFFERS ===== */
	.offers-section {
		padding-top: 52px;
		padding-bottom: 20px;
	}
	.chips {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin-bottom: 24px;
	}
	.chip {
		background: #fff;
		border: 1px solid var(--divider);
		color: #4a4e42;
		padding: 9px 18px;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 500;
	}
	.chip.active {
		background: var(--green);
		color: #fff;
		border-color: var(--green);
		font-weight: 600;
	}
	.offers-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	.offer {
		background: #fff;
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: 0 20px 44px -30px rgba(30, 40, 30, 0.55);
		display: flex;
		flex-direction: column;
	}
	.offer-media {
		position: relative;
		height: 290px;
		background-size: cover;
		background-position: center;
	}
	.offer-badge {
		position: absolute;
		top: 16px;
		left: 16px;
		background: var(--gold);
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		padding: 6px 13px;
		border-radius: 999px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	}
	.offer-heart {
		position: absolute;
		top: 14px;
		right: 14px;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--green);
		font-size: 18px;
	}
	.offer-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 34px;
		height: 34px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text);
		font-family: inherit;
		font-size: 18px;
		line-height: 1;
		padding: 0;
		cursor: pointer;
		z-index: 2;
		transition: background 0.15s ease, transform 0.15s ease;
	}
	.offer-arrow:hover {
		background: #fff;
		transform: translateY(-50%) scale(1.08);
	}
	.offer-arrow.left {
		left: 12px;
	}
	.offer-arrow.right {
		right: 12px;
	}
	.offer-strip {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		background: rgba(18, 26, 20, 0.62);
		backdrop-filter: blur(3px);
		border-top: 1px solid rgba(255, 255, 255, 0.14);
		padding: 13px 18px;
		color: #fff;
	}
	.strip-loc {
		line-height: 1.3;
	}
	.strip-city {
		font-weight: 700;
		font-size: 17px;
	}
	.strip-street {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.82);
	}
	.strip-price {
		text-align: right;
		line-height: 1.3;
		border-left: 1px solid rgba(255, 255, 255, 0.32);
		padding-left: 14px;
	}
	.strip-amount {
		font-weight: 800;
		font-size: 18px;
	}
	.strip-perm2 {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.82);
	}
	.offer-body {
		padding: 20px 22px 22px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.offer-subtitle {
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 700;
		margin-bottom: 6px;
	}
	.offer-title {
		font-family: 'Newsreader', serif;
		font-size: 21px;
		font-weight: 500;
		line-height: 1.25;
		margin-bottom: 18px;
	}
	.offer-specs {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		margin-top: auto;
	}
	.spec-l {
		font-size: 11px;
		color: var(--label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 3px;
	}
	.spec-v {
		font-size: 15px;
		font-weight: 700;
		color: var(--green-spec);
	}
	.offer-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 16px;
		background: var(--green);
		color: #fff;
		padding: 13px;
		border-radius: 12px;
		font-weight: 600;
		font-size: 15px;
	}
	.offer-cta:hover {
		opacity: 0.92;
		color: #fff;
	}

	/* ===== ABOUT ===== */
	.about {
		margin-top: 64px;
		padding: 64px 48px;
		background: var(--green);
		color: var(--on-green);
	}
	.about-grid {
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: 56px;
		align-items: center;
	}
	.about-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 33px;
		line-height: 1.22;
		margin-bottom: 20px;
		color: var(--on-green);
	}
	.about-h2 :global(em) {
		font-style: italic;
		color: var(--gold-light);
	}
	.about-p {
		font-size: 17px;
		line-height: 1.65;
		color: rgba(243, 238, 225, 0.82);
		margin-bottom: 16px;
	}
	.about-p:last-of-type {
		margin-bottom: 0;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		margin-top: 34px;
	}
	.stat-n {
		font-family: 'Newsreader', serif;
		font-size: 34px;
		font-weight: 600;
		color: var(--gold-light);
	}
	.stat-l {
		font-size: 13px;
		color: rgba(243, 238, 225, 0.7);
		margin-top: 4px;
	}
	.about-photo {
		position: relative;
		height: 440px;
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.14);
		box-shadow: 0 30px 60px -34px rgba(0, 0, 0, 0.5);
	}
	.about-photo-img {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center 18%;
	}
	.about-photo-grad {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 130px;
		background: linear-gradient(0deg, rgba(20, 30, 22, 0.74), transparent);
	}
	.about-photo-cap {
		position: absolute;
		left: 24px;
		bottom: 20px;
		color: #fff;
	}
	.cap-big {
		font-family: 'Newsreader', serif;
		font-size: 21px;
		line-height: 1.15;
	}
	.cap-small {
		font-size: 12px;
		color: var(--gold-light);
		letter-spacing: 0.08em;
		margin-top: 3px;
	}

	/* ===== SERVICES ===== */
	.services-section {
		padding-top: 76px;
		padding-bottom: 28px;
	}
	.services-head {
		margin-bottom: 30px;
		max-width: 600px;
	}
	.services-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 41px;
		line-height: 1.08;
		margin-bottom: 14px;
	}
	.services-sub {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted);
	}
	.services-grid {
		display: grid;
		grid-template-columns: 1fr 1.05fr;
		gap: 44px;
		align-items: start;
	}
	.svc-list {
		border-bottom: 1px solid var(--divider);
	}
	.svc-row {
		position: relative;
		cursor: pointer;
		display: flex;
		gap: 22px;
		align-items: flex-start;
		padding: 20px 18px;
		border-top: 1px solid var(--divider);
		width: 100%;
		text-align: left;
		background: none;
		border-left: none;
		border-right: none;
		font-family: inherit;
		color: inherit;
	}
	.rowbar {
		position: absolute;
		inset: 0;
		background: var(--bg-cream-2);
		border-left: 3px solid var(--gold);
		display: none;
	}
	.svc-row.active .rowbar {
		display: block;
	}
	.svc-no {
		position: relative;
		font-family: 'Newsreader', serif;
		font-size: 30px;
		font-weight: 500;
		color: var(--gold);
		line-height: 1;
		min-width: 44px;
	}
	.svc-text {
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.svc-t {
		font-family: 'Newsreader', serif;
		font-size: 22px;
		font-weight: 500;
		line-height: 1.2;
	}
	.svc-d {
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--muted);
		margin-top: 3px;
	}
	.svc-chevron {
		display: none;
	}
	.svc-mobile-panel {
		display: none;
	}
	.svc-panel {
		position: relative;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 26px 54px -32px rgba(30, 40, 30, 0.6);
	}
	.svc-panel-media {
		position: relative;
		height: 340px;
	}
	.svc-img {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		animation: svcfade 0.3s ease;
	}
	@keyframes svcfade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.svc-img-grad {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(20, 30, 22, 0.58), rgba(20, 30, 22, 0) 58%);
	}
	.svc-img-title {
		position: absolute;
		left: 24px;
		bottom: 20px;
		color: #fff;
		font-family: 'Newsreader', serif;
		font-size: 25px;
	}
	.svc-panel-body {
		padding: 26px 28px 30px;
	}
	.svc-label {
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 700;
		margin-bottom: 12px;
	}
	.svc-long {
		font-size: 16px;
		line-height: 1.7;
		color: var(--quote);
		margin-bottom: 22px;
	}
	.svc-ask {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--green);
		color: #fff;
		padding: 12px 24px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}
	.svc-ask:hover {
		opacity: 0.92;
		color: #fff;
	}

	/* ===== REGION — pozioma przeciągana galeria ===== */
	.region-section {
		background: var(--green-ink);
		padding: 56px 0 28px;
	}
	.region-head {
		padding: 0 48px 28px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
	}
	.region-head-text {
		max-width: 520px;
	}
	.eyebrow-dark {
		color: var(--gold-soft);
	}
	.region-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 40px;
		line-height: 1.1;
		color: var(--bg-site);
	}
	.region-hint {
		font-size: 12px;
		letter-spacing: 0.08em;
		color: rgba(243, 238, 225, 0.6);
		white-space: nowrap;
		padding-bottom: 6px;
	}
	.region-gallery-wrap {
		position: relative;
	}
	.region-scroller {
		display: flex;
		gap: 20px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding: 4px 48px 10px;
		cursor: grab;
		/* pasek postępu pod galerią zastępuje natywny scrollbar — ukrywamy go */
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.region-scroller::-webkit-scrollbar {
		display: none;
		height: 0;
	}
	.region-tile {
		display: block;
		flex: 0 0 340px;
		height: 440px;
		scroll-snap-align: start;
		position: relative;
		border-radius: 18px;
		overflow: hidden;
	}
	.region-tile.big {
		flex: 0 0 560px;
	}
	.region-img {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		transition: transform 0.5s ease;
	}
	.region-tile:hover .region-img {
		transform: scale(1.045);
	}
	.region-tile::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(18, 26, 20, 0.64), transparent 48%);
	}
	.region-cap {
		position: absolute;
		left: 18px;
		bottom: 40px;
		color: #fff;
		font-size: 15px;
		font-weight: 600;
		z-index: 1;
	}
	.region-cap.big {
		left: 22px;
		bottom: 48px;
		font-family: 'Newsreader', serif;
		font-size: 22px;
		font-weight: 500;
	}
	.region-link {
		position: absolute;
		left: 18px;
		bottom: 16px;
		z-index: 1;
		font-size: 12.5px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.82);
		border-bottom: 1px solid rgba(233, 209, 154, 0.55);
		padding-bottom: 1px;
		transition: color 0.2s ease;
	}
	.region-tile.big .region-link {
		left: 22px;
	}
	.region-tile:hover .region-link {
		color: var(--gold-light);
		border-bottom-color: var(--gold-light);
	}
	.region-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 46px;
		height: 46px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.88);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--green-ink);
		font-size: 19px;
		box-shadow: 0 12px 26px -12px rgba(0, 0, 0, 0.55);
	}
	.region-arrow.left {
		left: 20px;
	}
	.region-arrow.right {
		right: 20px;
	}
	.region-progress-track {
		margin: 18px 48px 0;
		height: 2px;
		background: rgba(243, 238, 225, 0.18);
		border-radius: 2px;
		overflow: hidden;
	}
	.region-progress-bar {
		height: 100%;
		background: var(--gold-light);
	}

	/* ===== TESTIMONIALS — pojedynczy rotujący cytat ===== */
	.testi-section-v2 {
		position: relative;
		padding: 100px 48px;
		text-align: center;
		overflow: hidden;
	}
	.testi-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
	}
	.testi-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(rgba(18, 26, 20, 0.82), rgba(18, 26, 20, 0.88));
	}
	.testi-content {
		position: relative;
		z-index: 1;
		padding-top: 8px;
	}
	/* delikatny, duży cudzysłów jako watermark w tle — nie wpływa na przepływ treści */
	.testi-watermark {
		position: absolute;
		top: -76px;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'Newsreader', serif;
		font-size: 220px;
		line-height: 1;
		color: var(--gold-soft);
		opacity: 0.16;
		pointer-events: none;
		user-select: none;
		z-index: 0;
	}
	.testi-quote-text {
		position: relative;
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-weight: 500;
		font-size: 32px;
		line-height: 1.45;
		color: var(--bg-site);
		max-width: 760px;
		margin: 26px auto 24px;
	}
	.testi-author-v2 {
		position: relative;
		font-size: 14px;
		letter-spacing: 0.03em;
		color: rgba(243, 238, 225, 0.72);
		margin-bottom: 30px;
	}
	.testi-dots {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 9px;
	}
	.testi-dot {
		appearance: none;
		-webkit-appearance: none;
		display: block;
		width: 8px;
		height: 8px;
		border-radius: 999px;
		border: none;
		cursor: pointer;
		background: rgba(243, 238, 225, 0.3);
		padding: 0;
		transition: all 0.3s ease;
	}
	.testi-dot.active {
		width: 26px;
		height: 8px;
		border-radius: 999px;
		background: var(--gold-light);
	}

	/* ===== FAQ — akordeon ===== */
	.faq-section {
		padding-top: 76px;
		padding-bottom: 44px;
	}
	.faq-grid {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 56px;
		align-items: start;
	}
	.faq-h2 {
		margin-bottom: 16px;
	}
	.faq-lead {
		font-size: 16px;
		line-height: 1.65;
		color: var(--muted);
		margin-bottom: 24px;
		max-width: 340px;
	}
	.faq-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--green);
		color: #fff;
		padding: 13px 26px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}
	.faq-list {
		border-bottom: 1px solid var(--divider);
	}
	.faq-item {
		position: relative;
		border-top: 1px solid var(--divider);
	}
	.faq-bar {
		position: absolute;
		inset: 0;
		background: var(--bg-cream-2);
		border-left: 3px solid var(--gold);
		display: none;
	}
	.faq-item.open .faq-bar {
		display: block;
	}
	.faq-q {
		position: relative;
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 22px 18px;
	}
	.faq-q-text {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 500;
		color: var(--text);
		line-height: 1.3;
	}
	.faq-icon {
		flex: 0 0 auto;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid rgba(180, 137, 76, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gold);
		font-size: 18px;
		line-height: 1;
	}
	.faq-chevron {
		display: none;
	}
	.faq-panel {
		position: relative;
		padding: 0 18px 24px;
	}
	.faq-answer {
		font-size: 16px;
		line-height: 1.7;
		color: var(--quote);
		max-width: 620px;
	}

	/* ===== DUAL CTA — przekątny podział ===== */
	.dual-diag {
		position: relative;
		height: 440px;
		overflow: hidden;
	}
	.dual-panel {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.dual-left {
		width: 58%;
		background: var(--bg-cream);
		clip-path: polygon(0 0, 100% 0, 84% 100%, 0 100%);
		z-index: 1;
		padding: 0 10% 0 48px;
		color: var(--green-ink);
	}
	.dual-right {
		left: 45%;
		width: 55%;
		background: var(--green);
		clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
		z-index: 2;
		padding: 0 48px 0 10%;
		color: var(--on-green);
	}
	.dual-h3 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 32px;
		line-height: 1.2;
		margin-bottom: 14px;
		max-width: 380px;
	}
	.dual-p-left,
	.dual-p-right {
		font-size: 15px;
		line-height: 1.6;
		max-width: 360px;
		margin-bottom: 24px;
	}
	.dual-p-left {
		color: #5c6054;
	}
	.dual-p-right {
		color: rgba(243, 238, 225, 0.8);
	}
	.dual-btn-left,
	.dual-btn-right {
		align-self: flex-start;
		padding: 13px 26px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}
	.dual-btn-left {
		background: var(--green);
		color: #fff;
	}
	.dual-btn-right {
		background: var(--gold-light);
		color: var(--green);
		font-weight: 700;
	}
	.dual-btn-left:hover,
	.dual-btn-right:hover {
		opacity: 0.92;
	}
	.dual-badge {
		position: absolute;
		left: 50%;
		top: 56px;
		transform: translateX(-50%) rotate(-7deg);
		z-index: 3;
		background: var(--green-ink);
		color: var(--bg-site);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 600;
		padding: 9px 18px;
		border-radius: 999px;
		white-space: nowrap;
		box-shadow: 0 14px 30px -12px rgba(0, 0, 0, 0.5);
	}

	/* ===== CONTACT ===== */
	.contact-section {
		padding-top: 20px;
		padding-bottom: 64px;
	}
	.contact-box {
		display: grid;
		grid-template-columns: 1fr 1.1fr;
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--border);
	}
	.contact-left {
		padding: 44px 40px;
		background: #fff;
	}
	.contact-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 32px;
		line-height: 1.15;
		margin-bottom: 26px;
	}
	.contact-rows {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.contact-label {
		font-size: 12px;
		color: var(--label);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 3px;
	}
	.contact-phone {
		font-size: 18px;
		font-weight: 700;
		color: var(--green);
	}
	.contact-val {
		font-size: 16px;
		font-weight: 600;
	}
	.contact-hours {
		margin-top: 22px;
		padding-top: 18px;
		border-top: 1px solid var(--divider, var(--border));
	}
	.contact-hours-row {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		font-size: 14.5px;
		margin-top: 8px;
		color: var(--muted);
		span:last-child {
			font-weight: 600;
			color: var(--text);
		}
	}
	.contact-social {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.contact-social a {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: var(--bg-cream-2);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		color: var(--green);
	}
	.contact-social a:hover {
		background: var(--green);
		color: #fff;
	}
	.contact-btn {
		display: inline-block;
		margin-top: 28px;
		background: var(--green);
		color: #fff;
		padding: 14px 30px;
		border-radius: 12px;
		font-weight: 600;
		font-size: 16px;
	}
	.contact-btn:hover {
		opacity: 0.92;
		color: #fff;
	}
	.contact-map {
		min-height: 360px;
	}
	.contact-map iframe {
		width: 100%;
		height: 100%;
		border: 0;
		filter: saturate(0.9);
	}

	/* ===== RESPONSYWNOŚĆ ===== */
	@media (max-width: 1199px) {
		.cats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.offers-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.why-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 980px) {
		.hero-h1 {
			font-size: 38px;
		}
		.search-card {
			grid-template-columns: 1fr 1fr;
		}
		.search-btn {
			grid-column: span 2;
		}
		.about-grid,
		.services-grid,
		.faq-grid,
		.contact-box {
			grid-template-columns: 1fr;
		}
		.region-tile {
			flex-basis: 300px;
			height: 380px;
		}
		.region-tile.big {
			flex-basis: 460px;
		}
		.testi-quote-text {
			font-size: 26px;
		}
		.dual-h3 {
			font-size: 26px;
		}
	}
	/* Przekątny podział Dual CTA nie działa przy wąskich układach — poniżej
	   tego progu wracamy do zwykłego stosu dwóch bloków bez clip-path. */
	@media (max-width: 760px) {
		.dual-diag {
			height: auto;
		}
		.dual-panel {
			position: static;
			width: 100%;
			clip-path: none;
			padding: 40px 24px;
		}
		.dual-h3,
		.dual-p-left,
		.dual-p-right {
			max-width: none;
		}
		.dual-badge {
			display: none;
		}
	}
	@media (max-width: 640px) {
		.section,
		.about {
			padding-left: 20px;
			padding-right: 20px;
		}
		.hero {
			min-height: 472px;
			justify-content: flex-end;
			padding: 24px 20px 40px;
			/* mobile: gradient pionowy (180°) zamiast desktopowego 105° */
			background-image: linear-gradient(
					180deg,
					rgba(18, 26, 20, 0.3) 0%,
					rgba(18, 26, 20, 0.82) 100%
				),
				url('/sniezka-sunset.png');
		}
		.hero-h1 {
			font-size: 26px;
		}
		.hero-lead {
			font-size: 13.5px;
			line-height: 1.55;
		}
		.why {
			padding: 36px 20px 8px;
		}
		.why-head {
			text-align: left;
			margin: 0 0 16px;
		}
		.why-h2 {
			font-size: 24px;
		}
		.why-grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}
		.search-card {
			position: static;
			left: auto;
			right: auto;
			bottom: auto;
			margin: -28px 16px 0;
			grid-template-columns: 1fr;
		}
		.search-btn {
			grid-column: auto;
		}
		.offers-grid {
			grid-template-columns: 1fr;
		}
		.cats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.stats {
			grid-template-columns: repeat(3, 1fr);
			gap: 12px;
		}
		.h2,
		.about-h2,
		.services-h2,
		.region-h2 {
			font-size: 32px;
		}
		.section-head {
			flex-direction: column;
			align-items: flex-start;
			gap: 14px;
		}
		.region-head {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
			padding: 0 20px 20px;
		}
		.region-scroller {
			padding: 4px 20px 10px;
		}
		.region-progress-track {
			margin: 18px 20px 0;
		}
		.region-tile {
			flex-basis: 160px;
			height: 280px;
		}
		.region-tile.big {
			flex-basis: 240px;
		}
		.region-arrow {
			display: none;
		}
		.svc-panel {
			display: none;
		}
		.svc-row {
			align-items: center;
		}
		.svc-chevron {
			display: block;
			margin-left: auto;
			font-size: 18px;
			color: var(--gold);
			transition: transform 0.2s ease;
		}
		.svc-chevron.open {
			transform: rotate(180deg);
		}
		.svc-mobile-panel {
			display: none;
			padding: 0 18px 20px;
		}
		.svc-mobile-panel.open {
			display: block;
		}
		.svc-mobile-img {
			height: 150px;
			border-radius: 12px;
			overflow: hidden;
			margin-bottom: 12px;
			background-size: cover;
			background-position: center;
		}
		.svc-mobile-desc {
			font-size: 13.5px;
			line-height: 1.6;
			color: #3b3f34;
		}
		.testi-section-v2 {
			padding: 64px 24px;
		}
		.testi-watermark {
			font-size: 130px;
			top: -46px;
		}
		.testi-quote-text {
			font-size: 21px;
		}
		.faq-section {
			padding-top: 40px;
			padding-bottom: 8px;
		}
		.faq-lead {
			font-size: 13px;
			max-width: none;
			margin-bottom: 12px;
		}
		.faq-cta {
			display: inline-block;
			margin-top: 4px;
		}
		.faq-q {
			padding: 15px 2px;
			gap: 12px;
		}
		.faq-q-text {
			font-size: 15.5px;
		}
		.faq-panel {
			padding: 0 2px 16px;
		}
		.faq-answer {
			font-size: 13.5px;
		}
		.faq-icon {
			display: none;
		}
		.faq-chevron {
			display: block;
			font-size: 18px;
			color: var(--gold);
			transition: transform 0.2s ease;
		}
		.faq-chevron.open {
			transform: rotate(180deg);
		}
		.faq-bar {
			display: none !important;
		}
	}
</style>
