<script lang="ts">
	import {
		kontakt,
		wyszukiwarka,
		kategorie,
		filtryChipy,
		oferty,
		oNas,
		statystyki,
		uslugi,
		region,
		opinie,
		dualCta
	} from '$lib/data/landing';

	let active = $state(0);
	const svc = $derived(uslugi[active]);

	let menuOpen = $state(false);
</script>

<svelte:head>
	<title>LW Nieruchomości — biuro nieruchomości Jelenia Góra i Karkonosze</title>
	<meta
		name="description"
		content="Lokalne biuro nieruchomości z Jeleniej Góry. Kupno, sprzedaż i wynajem nieruchomości w Kotlinie Jeleniogórskiej i Karkonoszach."
	/>
</svelte:head>

<div class="lw-page">
	<div class="lw-landing site">
		<!-- ============ NAV ============ -->
		<header class="nav">
			<a href="/" class="brand">
				<span class="brand-logo">LW</span>
				<span class="brand-text">
					<span class="brand-name">LW Nieruchomości</span>
					<span class="brand-sub">Jelenia Góra · Karkonosze</span>
				</span>
			</a>
			<nav class="nav-links">
				<a href="/oferty">Oferty</a><a href="#uslugi">Usługi</a><a href="#o-nas">O nas</a><a
					href="#region">Region</a
				><a href="#kontakt">Kontakt</a>
			</nav>
			<div class="nav-right">
				<a href="tel:{kontakt.telefon.replace(/\s/g, '')}" class="nav-phone">{kontakt.telefon}</a>
				<a href="#kontakt" class="nav-cta">Zgłoś ofertę</a>
			</div>
			<button
				class="nav-burger"
				class:open={menuOpen}
				aria-label="Menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span></span><span></span><span></span>
			</button>
		</header>

		{#if menuOpen}
			<div class="mobile-menu">
				<a href="/oferty" onclick={() => (menuOpen = false)}>Oferty</a>
				<a href="#uslugi" onclick={() => (menuOpen = false)}>Usługi</a>
				<a href="#o-nas" onclick={() => (menuOpen = false)}>O nas</a>
				<a href="#region" onclick={() => (menuOpen = false)}>Region</a>
				<a href="#kontakt" onclick={() => (menuOpen = false)}>Kontakt</a>
				<a href="tel:{kontakt.telefon.replace(/\s/g, '')}" onclick={() => (menuOpen = false)}
					>{kontakt.telefon}</a
				>
			</div>
		{/if}

		<!-- ============ HERO ============ -->
		<section class="hero">
			<div class="hero-copy">
				<span class="hero-eyebrow">Lokalne biuro nieruchomości</span>
				<h1 class="hero-h1">Znajdź swój dom<br />w sercu <em>Karkonoszy</em></h1>
				<p class="hero-lead">
					Pomagamy kupić, sprzedać i wynająć nieruchomości w Jeleniej Górze i całej Kotlinie
					Jeleniogórskiej — uczciwie, spokojnie, po ludzku.
				</p>
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

		<!-- ============ TRUST ============ -->
		<section class="trust">
			<div class="trust-item"><span class="star">★</span><b>4,9</b><span class="muted">ocena Google</span></div>
			<div class="trust-sep"></div>
			<div class="trust-item"><b>120+</b><span class="muted">transakcji</span></div>
			<div class="trust-sep"></div>
			<div class="trust-item"><b>Na wyłączność</b><span class="muted">wiele ofert</span></div>
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
					<a href="/oferty" class="cat" style="background-image:url('{cat.img}')">
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
				{#each oferty as o}
					<article class="offer">
						<div class="offer-media" style="background-image:url('{o.img}')">
							{#if o.badge}<span class="offer-badge">{o.badge}</span>{/if}
							<span class="offer-heart">♡</span>
							<span class="offer-arrow left">‹</span>
							<span class="offer-arrow right">›</span>
							<div class="offer-strip">
								<div class="strip-loc">
									<div class="strip-city">{o.city}</div>
									<div class="strip-street">{o.street}</div>
								</div>
								<div class="strip-price">
									<div class="strip-amount">{o.price}</div>
									<div class="strip-perm2">{o.perM2}</div>
								</div>
							</div>
						</div>
						<div class="offer-body">
							<div class="offer-subtitle">{o.subtitle}</div>
							<div class="offer-title">{o.title}</div>
							<div class="offer-specs">
								{#each o.specs as sp}
									<div>
										<div class="spec-l">{sp.l}</div>
										<div class="spec-v">{sp.v}</div>
									</div>
								{/each}
							</div>
							<a href="/oferty" class="offer-cta">Zobacz ofertę →</a>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ============ ABOUT ============ -->
		<section class="about" id="o-nas">
			<div class="about-grid">
				<div>
					<div class="eyebrow eyebrow-green">O nas</div>
					<h2 class="about-h2">Z sercem do ludzi<br />i domów</h2>
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
						<button type="button" class="svc-row" class:active={i === active} onclick={() => (active = i)}>
							<span class="rowbar"></span>
							<span class="svc-no">{sv.no}</span>
							<span class="svc-text">
								<span class="svc-t">{sv.t}</span>
								<span class="svc-d">{sv.d}</span>
							</span>
						</button>
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
						<a href="#kontakt" class="svc-ask">Zapytaj o tę usługę →</a>
					</div>
				</div>
			</div>
		</section>

		<!-- ============ REGION ============ -->
		<section class="section region-section" id="region">
			<div class="region-head">
				<div class="eyebrow">Region Karkonosze</div>
				<h2 class="region-h2">Nasze miejsce na ziemi</h2>
				<p class="region-sub">{region.podtytul}</p>
			</div>
			<div class="region-grid">
				{#each region.kafle as k}
					<div class="region-tile" class:big={k.duzy}>
						<div class="region-img" style="background-image:url('{k.img}')"></div>
						<div class="region-cap" class:big={k.duzy}>{k.podpis}</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ TESTIMONIALS ============ -->
		<section class="section testi-section">
			<div class="section-head col">
				<div class="eyebrow">Opinie klientów</div>
				<h2 class="h2">Mówią o nas</h2>
			</div>
			<div class="testi-grid">
				{#each opinie as t}
					<div class="testi">
						<div class="testi-quote">”</div>
						<p class="testi-text">{t.quote}</p>
						<div class="testi-author">
							<span class="testi-av">{t.initials}</span>
							<div>
								<div class="testi-name">{t.name}</div>
								<div class="testi-loc">{t.loc}</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ DUAL CTA ============ -->
		<section class="section dual-section">
			<div class="dual-grid">
				{#each dualCta as c}
					<div class="dual-card {c.wariant}">
						<h3 class="dual-h3">{c.tytul}</h3>
						<p class="dual-p">{c.opis}</p>
						<a href="#kontakt" class="dual-btn">{c.przycisk}</a>
					</div>
				{/each}
			</div>
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
					<a href="mailto:{kontakt.email}" class="contact-btn">Wyślij wiadomość</a>
				</div>
				<div class="contact-map">
					<iframe src={kontakt.mapaEmbed} title="Mapa — Jelenia Góra" loading="lazy"></iframe>
				</div>
			</div>
		</section>

		<!-- ============ FOOTER ============ -->
		<footer class="footer">
			<div class="footer-grid">
				<div>
					<div class="footer-brand">
						<span class="footer-logo">LW</span>
						<span class="footer-name">LW Nieruchomości</span>
					</div>
					<p class="footer-desc">
						Mobilne biuro nieruchomości z sercem do ludzi i domów. Jelenia Góra i Kotlina Jeleniogórska.
					</p>
				</div>
				<div class="footer-col">
					<div class="footer-col-title">Nawigacja</div>
					<a href="/">Strona główna</a><a href="/oferty">Oferty</a><a href="#o-nas">O nas</a><a
						href="#kontakt">Kontakt</a
					>
				</div>
				<div class="footer-col">
					<div class="footer-col-title">Kategorie</div>
					<a href="/oferty">Mieszkania</a><a href="/oferty">Domy</a><a href="/oferty">Działki</a><a
						href="/oferty">Lokale</a
					>
				</div>
				<div class="footer-col muted">
					<div class="footer-col-title">Kontakt</div>
					<span>{kontakt.telefon}</span><span>{kontakt.email}</span><span>{kontakt.adres}</span>
				</div>
			</div>
			<div class="footer-bottom">© 2026 LW Nieruchomości. Wszelkie prawa zastrzeżone.</div>
		</footer>
	</div>
</div>

<style>
	/* ===== TOKENY (scope: .lw-landing) ===== */
	.lw-landing {
		--green: #2c4a38;
		--green-ink: #23271f;
		--green-spec: #2c3a2e;
		--gold: #b4894c;
		--gold-light: #e9d19a;
		--gold-soft: #d9be84;
		--gold-logo: #e9d9ae;
		--bg-site: #fbf8f2;
		--bg-cream: #f1efe6;
		--bg-cream-2: #f5f1e7;
		--text: #23271f;
		--muted: #6c7064;
		--label: #9a8f6e;
		--quote: #3b3f34;
		--on-green: #f3eee1;
		--border: #efeadd;
		--divider: #e8e2d5;
		--nav-border: #ece6d9;

		font-family: 'Hanken Grotesk', system-ui, sans-serif;
		color: var(--text);
		background: var(--bg-site);
		width: 1440px;
		max-width: 100%;
		margin: 0 auto;
		overflow: hidden;
	}
	.lw-page {
		background: #e9e7e1;
	}
	.lw-landing :global(select) {
		font-family: inherit;
		cursor: pointer;
	}
	.lw-landing a {
		text-decoration: none;
		color: inherit;
		transition: opacity 0.15s ease;
	}
	.lw-landing h1,
	.lw-landing h2,
	.lw-landing h3 {
		margin: 0;
	}

	.section {
		padding: 0 48px;
	}
	.eyebrow {
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 600;
		margin-bottom: 8px;
	}
	.eyebrow-green {
		color: var(--gold-soft);
		margin-bottom: 14px;
	}
	.h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 38px;
	}
	.section-head {
		display: flex;
		align-items: end;
		justify-content: space-between;
		margin-bottom: 24px;
	}
	.section-head.col {
		flex-direction: column;
		align-items: flex-start;
		gap: 0;
	}
	.head-link {
		font-weight: 600;
		color: var(--green);
		border-bottom: 1.5px solid var(--gold);
		padding-bottom: 2px;
	}
	.head-link:hover {
		opacity: 0.82;
	}

	/* ===== NAV ===== */
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 22px 48px;
		background: rgba(251, 248, 242, 0.9);
		border-bottom: 1px solid var(--nav-border);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.brand-logo {
		width: 46px;
		height: 46px;
		border-radius: 12px;
		background: var(--green);
		color: var(--gold-logo);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Newsreader', serif;
		font-weight: 600;
		font-size: 20px;
	}
	.brand-text {
		line-height: 1.15;
		display: flex;
		flex-direction: column;
	}
	.brand-name {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 600;
	}
	.brand-sub {
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--label);
	}
	.nav-links {
		display: flex;
		gap: 34px;
		font-size: 15px;
		color: var(--text-nav, #4a4e42);
	}
	.nav-links a:hover {
		color: var(--green);
	}
	.nav-right {
		display: flex;
		align-items: center;
		gap: 18px;
	}
	.nav-phone {
		font-weight: 600;
		font-size: 15px;
	}
	.nav-cta {
		background: var(--green);
		color: #fff;
		padding: 11px 20px;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 600;
	}
	.nav-cta:hover {
		opacity: 0.9;
		color: #fff;
	}
	.nav-burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		width: 26px;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
	.nav-burger span {
		display: block;
		height: 2px;
		width: 100%;
		background: var(--green);
		border-radius: 2px;
		transition: all 0.25s ease;
	}
	.nav-burger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.nav-burger.open span:nth-child(2) {
		opacity: 0;
	}
	.nav-burger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}
	.mobile-menu {
		display: none;
		flex-direction: column;
		gap: 2px;
		padding: 8px 48px 20px;
		background: rgba(251, 248, 242, 0.98);
		border-bottom: 1px solid var(--nav-border);
	}
	.mobile-menu a {
		padding: 12px 4px;
		font-size: 16px;
		color: var(--text-nav, #4a4e42);
		border-bottom: 1px solid var(--nav-border);
	}
	.mobile-menu a:last-child {
		border-bottom: none;
		color: var(--green);
		font-weight: 600;
	}

	/* ===== HERO ===== */
	.hero {
		position: relative;
		height: 660px;
		background-image: linear-gradient(
				105deg,
				rgba(18, 26, 20, 0.66) 0%,
				rgba(18, 26, 20, 0.3) 48%,
				rgba(18, 26, 20, 0.12) 100%
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
		max-width: 640px;
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
		font-size: 64px;
		line-height: 1.04;
		letter-spacing: -0.01em;
		margin-bottom: 20px;
		color: #fff;
	}
	.hero-h1 em {
		font-style: italic;
		color: var(--gold-light);
	}
	.hero-lead {
		font-size: 18px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.9);
		max-width: 520px;
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

	/* ===== TRUST ===== */
	.trust {
		display: flex;
		justify-content: center;
		gap: 56px;
		padding: 92px 48px 46px;
	}
	.trust-item {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.trust-item b {
		font-weight: 700;
		font-size: 18px;
	}
	.trust-item .muted {
		color: var(--muted);
	}
	.trust-item .star {
		color: var(--gold);
		font-size: 20px;
	}
	.trust-sep {
		width: 1px;
		background: var(--divider);
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
		top: 42%;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text);
		font-size: 17px;
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
		font-size: 42px;
		line-height: 1.1;
		margin-bottom: 20px;
		color: var(--on-green);
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
		grid-template-columns: repeat(4, 1fr);
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

	/* ===== REGION ===== */
	.region-section {
		padding-top: 64px;
		padding-bottom: 20px;
	}
	.region-head {
		text-align: center;
		margin-bottom: 32px;
	}
	.region-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 40px;
	}
	.region-sub {
		max-width: 560px;
		margin: 14px auto 0;
		color: var(--muted);
		font-size: 16px;
		line-height: 1.6;
	}
	.region-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: 220px 220px;
		gap: 18px;
	}
	.region-tile {
		position: relative;
		border-radius: 18px;
		overflow: hidden;
	}
	.region-tile.big {
		grid-row: 1 / span 2;
	}
	.region-img {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
	}
	.region-tile::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(20, 30, 22, 0.55), rgba(20, 30, 22, 0) 55%);
	}
	.region-tile.big::after {
		background: linear-gradient(0deg, rgba(20, 30, 22, 0.6), rgba(20, 30, 22, 0) 50%);
	}
	.region-cap {
		position: absolute;
		left: 18px;
		bottom: 16px;
		color: #fff;
		font-size: 15px;
		font-weight: 600;
		z-index: 1;
	}
	.region-cap.big {
		left: 22px;
		bottom: 20px;
		font-family: 'Newsreader', serif;
		font-size: 22px;
		font-weight: 500;
	}

	/* ===== TESTIMONIALS ===== */
	.testi-section {
		padding-top: 64px;
		padding-bottom: 20px;
	}
	.testi-section .section-head {
		margin-bottom: 28px;
	}
	.testi-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	.testi {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 28px 26px;
	}
	.testi-quote {
		font-family: 'Newsreader', serif;
		font-size: 44px;
		color: var(--gold-soft);
		line-height: 0.6;
		height: 24px;
	}
	.testi-text {
		font-size: 16px;
		line-height: 1.6;
		color: var(--quote);
		margin: 12px 0 22px;
	}
	.testi-author {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.testi-av {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		background: var(--green);
		color: var(--gold-light);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 14px;
	}
	.testi-name {
		font-weight: 700;
		font-size: 15px;
	}
	.testi-loc {
		font-size: 13px;
		color: var(--label);
	}

	/* ===== DUAL CTA ===== */
	.dual-section {
		padding-top: 56px;
		padding-bottom: 56px;
	}
	.dual-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}
	.dual-card {
		border-radius: 18px;
		padding: 38px 36px;
	}
	.dual-card.cream {
		background: var(--bg-cream);
		border: 1px solid var(--border);
	}
	.dual-card.green {
		background: var(--green);
		color: var(--on-green);
	}
	.dual-h3 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 27px;
		line-height: 1.2;
		margin-bottom: 12px;
	}
	.dual-p {
		font-size: 16px;
		line-height: 1.6;
		margin-bottom: 22px;
	}
	.dual-card.cream .dual-p {
		color: #5c6054;
	}
	.dual-card.green .dual-p {
		color: rgba(243, 238, 225, 0.8);
	}
	.dual-btn {
		display: inline-block;
		padding: 13px 26px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}
	.dual-card.cream .dual-btn {
		background: var(--green);
		color: #fff;
	}
	.dual-card.green .dual-btn {
		background: var(--gold-light);
		color: var(--green);
		font-weight: 700;
	}
	.dual-btn:hover {
		opacity: 0.92;
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

	/* ===== FOOTER ===== */
	.footer {
		background: var(--green-ink);
		color: #cfcbbe;
		padding: 52px 48px 34px;
	}
	.footer-grid {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr 1fr;
		gap: 40px;
	}
	.footer-brand {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}
	.footer-logo {
		width: 42px;
		height: 42px;
		border-radius: 11px;
		background: var(--green);
		color: var(--gold-light);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Newsreader', serif;
		font-size: 18px;
	}
	.footer-name {
		font-family: 'Newsreader', serif;
		font-size: 18px;
		color: #fff;
	}
	.footer-desc {
		font-size: 14px;
		line-height: 1.6;
		color: #8f8b7e;
		max-width: 280px;
	}
	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 9px;
		font-size: 14px;
	}
	.footer-col-title {
		color: #fff;
		font-weight: 600;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.footer-col a:hover {
		color: #fff;
	}
	.footer-col.muted {
		color: #8f8b7e;
	}
	.footer-bottom {
		border-top: 1px solid var(--green-border, #363a2e);
		margin-top: 34px;
		padding-top: 20px;
		font-size: 13px;
		color: #7c7869;
	}

	/* ===== RESPONSYWNOŚĆ ===== */
	@media (max-width: 1199px) {
		.cats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.offers-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 980px) {
		.nav-links,
		.nav-right {
			display: none;
		}
		.nav-burger {
			display: flex;
		}
		.mobile-menu {
			display: flex;
		}
		.hero-h1 {
			font-size: 48px;
		}
		.search-card {
			grid-template-columns: 1fr 1fr;
		}
		.search-btn {
			grid-column: span 2;
		}
		.about-grid,
		.services-grid,
		.contact-box,
		.region-grid {
			grid-template-columns: 1fr;
		}
		.region-grid {
			grid-template-rows: auto;
		}
		.region-tile {
			height: 220px;
		}
		.region-tile.big {
			grid-row: auto;
			height: 300px;
		}
		.footer-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 640px) {
		.section,
		.nav,
		.about,
		.footer,
		.mobile-menu {
			padding-left: 20px;
			padding-right: 20px;
		}
		.hero {
			height: 560px;
			padding: 0 24px;
		}
		.hero-h1 {
			font-size: 38px;
		}
		.search-card {
			position: static;
			left: auto;
			right: auto;
			bottom: auto;
			margin: 24px 24px 0;
			grid-template-columns: 1fr;
		}
		.search-btn {
			grid-column: auto;
		}
		.trust {
			flex-direction: column;
			align-items: center;
			gap: 16px;
			padding-top: 48px;
		}
		.trust-sep {
			display: none;
		}
		.cats-grid,
		.offers-grid,
		.testi-grid,
		.dual-grid,
		.stats {
			grid-template-columns: 1fr;
		}
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
		.hero-h1,
		.h2,
		.about-h2,
		.services-h2,
		.region-h2 {
			font-size: 32px;
		}
		.footer-grid {
			grid-template-columns: 1fr;
		}
		.section-head {
			flex-direction: column;
			align-items: flex-start;
			gap: 14px;
		}
	}
</style>
