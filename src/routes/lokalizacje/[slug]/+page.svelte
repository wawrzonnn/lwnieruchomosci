<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import { seoWzor, ctaKontakt } from '$lib/data/lokalizacje';
	import { CATEGORY_LABELS, formatArea, formatPrice, pricePerM2 } from '$lib/utils';

	let { data } = $props();
	const miasto = data.miasto;
	const oferty = data.oferty;
	const inne = data.inne;

	const seoTitle = seoWzor.title.replace('{nazwaLoc}', miasto.nazwaLoc);
	const seoDescription = seoWzor.description
		.replace('{nazwaLoc}', miasto.nazwaLoc)
		.replace('{region}', miasto.region);

	function sortedImages(listing: (typeof oferty)[number]) {
		return [...(listing.images ?? [])].sort(
			(a, b) => Number(b.isMain) - Number(a.isMain) || a.order - b.order
		);
	}
	function offerBadge(listing: (typeof oferty)[number]) {
		if (listing.isFeatured) return 'Polecana';
		if (listing.isExclusive) return 'Na wyłączność';
		return '';
	}
	function offerSpecs(listing: (typeof oferty)[number]) {
		const specs: { l: string; v: string }[] = [];
		if (listing.rooms) specs.push({ l: 'Pokoje', v: String(listing.rooms) });
		if (listing.area) specs.push({ l: 'Powierzchnia', v: formatArea(listing.area) });
		if (listing.floor != null) specs.push({ l: 'Piętro', v: String(listing.floor) });
		return specs.slice(0, 3);
	}

	// ── Formularz zgłoszenia ──
	let submitted = $state(false);
	function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;
	}
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
</svelte:head>

<div class="lw-page">
	<div class="lw-landing site">
		<LandingNav />

		<div class="breadcrumbs">
			<a href="/">Strona główna</a><span class="sep">/</span><a href="/lokalizacje">Lokalizacje</a
			><span class="sep">/</span><span class="crumb-current">{miasto.nazwa}</span>
		</div>

		<!-- ============ HERO ============ -->
		<div class="hero" style="background-image:url('{miasto.hero}')">
			<div class="hero-overlay"></div>
			<div class="hero-content">
				<div class="hero-eyebrow">Lokalizacja · {miasto.region}</div>
				<h1 class="hero-h1">Nieruchomości<br class="br-desktop" /> w <em>{miasto.nazwaLoc}</em></h1>
				<p class="hero-lead">{miasto.lead}</p>
				<div class="hero-chips">
					{#each miasto.chips as chip}
						<span class="hero-chip">{chip}</span>
					{/each}
				</div>
				<div class="hero-cta-row">
					{#if oferty.length}
						<a href="#oferty" class="btn-solid">Zobacz oferty</a>
					{/if}
					<a href="#kontakt" class="btn-outline-light">Skontaktuj się</a>
				</div>
			</div>
		</div>

		<!-- ============ OPIS LOKALIZACJI ============ -->
		<section class="section opis-section">
			<div class="opis-grid">
				<div>
					<div class="eyebrow">Poznaj lokalizację</div>
					<h2 class="h2">O {miasto.nazwaLoc}</h2>
					<div class="opis-tresc">
						{#each miasto.opis as p}
							<p>{p}</p>
						{/each}
					</div>
				</div>
				<div class="fakty-card">
					<div class="fakty-title">Szybkie fakty</div>
					<div class="fakty-list">
						{#each miasto.fakty as f}
							<div class="fakt-row">
								<span class="fakt-k">{f.k}</span>
								<span class="fakt-v">{f.v}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<!-- ============ OFERTY (tylko gdy lokalizacja ma oferty) ============ -->
		{#if oferty.length}
			<section class="section oferty-section" id="oferty">
				<div class="section-head">
					<div>
						<div class="eyebrow">Nieruchomości</div>
						<h2 class="h2">Oferty w {miasto.nazwaLoc}</h2>
					</div>
					<a href="/oferty" class="head-link">Zobacz wszystkie oferty →</a>
				</div>

				<div class="offers-grid">
					{#each oferty as listing}
						{@const imgs = sortedImages(listing)}
						{@const mainImg = imgs[0]?.url}
						{@const badge = offerBadge(listing)}
						<article class="offer">
							<div class="offer-media" style={mainImg ? `background-image:url('${mainImg}')` : ''}>
								{#if badge}<span class="offer-badge">{badge}</span>{/if}
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
		{/if}

		<!-- ============ ATUTY ============ -->
		<section class="section atuty-section">
			<div class="atuty-head">
				<div class="eyebrow">Atuty lokalizacji</div>
				<h2 class="h2">Dlaczego warto tu mieszkać</h2>
				<p class="atuty-sub">Atuty, które wyróżniają {miasto.nazwa} na tle regionu.</p>
			</div>
			<div class="atuty-grid">
				{#each miasto.atuty as a}
					<div class="atut-card">
						<div class="atut-check">✓</div>
						<div class="atut-t">{a.t}</div>
						<div class="atut-d">{a.d}</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ GALERIA ============ -->
		<section class="section galeria-section">
			<div class="eyebrow">Galeria</div>
			<h2 class="h2">{miasto.nazwa} i okolice</h2>
			<div class="galeria-grid">
				{#each miasto.galeria as img, i}
					<div class="galeria-tile" class:big={i === 0} style="background-image:url('{img}')"></div>
				{/each}
			</div>
			<p class="galeria-note">Zdjęcia poglądowe regionu — do zastąpienia realnymi fotografiami lokalizacji i ofert.</p>
		</section>

		<!-- ============ CTA / KONTAKT ============ -->
		<section class="section kontakt-section" id="kontakt">
			<div class="kontakt-box">
				<div class="kontakt-info">
					<div class="eyebrow eyebrow-gold">Kontakt</div>
					<h2 class="kontakt-h2">{ctaKontakt.tytulWzor.replace('{nazwaLoc}', miasto.nazwaLoc)}</h2>
					<p class="kontakt-opis">{ctaKontakt.opis}</p>
					<div class="kontakt-details">
						<div>
							<div class="kd-label">Telefon</div>
							<div class="kd-value kd-big">{ctaKontakt.kontakt.telefon}</div>
						</div>
						<div>
							<div class="kd-label">E-mail</div>
							<div class="kd-value">{ctaKontakt.kontakt.email}</div>
						</div>
						<div class="kd-desktop-only">
							<div class="kd-label">Godziny</div>
							<div class="kd-value">{ctaKontakt.kontakt.godziny}</div>
						</div>
					</div>
				</div>
				<div class="kontakt-form-wrap">
					{#if !submitted}
						<form class="kontakt-form" onsubmit={onSubmit}>
							<label class="field"
								>Imię i nazwisko
								<input type="text" name="name" required />
							</label>
							<div class="field-row">
								<label class="field"
									>Telefon
									<input type="tel" name="phone" required />
								</label>
								<label class="field"
									>E-mail
									<input type="email" name="email" />
								</label>
							</div>
							<label class="field"
								>Czego szukasz?
								<select name="type">
									{#each ctaKontakt.typOpcje as opt}
										<option>{opt}</option>
									{/each}
								</select>
							</label>
							<label class="field"
								>Wiadomość
								<textarea
									name="message"
									rows="3"
									placeholder="Napisz, czego szukasz w tej lokalizacji..."
								></textarea>
							</label>
							<button type="submit">{ctaKontakt.przycisk}</button>
							<p class="form-note">
								Wysyłając formularz, zgadzasz się na kontakt w sprawie nieruchomości. Nie wysyłamy
								spamu.
							</p>
						</form>
					{:else}
						<div class="lead-thanks">
							<div class="thanks-icon">✓</div>
							<div class="thanks-title">Dziękujemy!</div>
							<p class="thanks-desc">
								Mamy Twoje zgłoszenie. Odezwiemy się z ofertami dopasowanymi do tej lokalizacji.
							</p>
						</div>
					{/if}
				</div>
			</div>
		</section>

		<!-- ============ INNE LOKALIZACJE ============ -->
		<section class="section inne-section">
			<div class="eyebrow">Inne lokalizacje w regionie</div>
			<div class="inne-grid">
				{#each inne as i}
					<a href="/lokalizacje/{i.slug}" class="inne-card">
						<div class="inne-nazwa">{i.nazwa}</div>
						<div class="inne-region">{i.region}</div>
						<div class="inne-link">Zobacz →</div>
					</a>
				{/each}
			</div>
		</section>

		<LandingFooter />
	</div>
</div>

<style lang="scss">
	.breadcrumbs {
		padding: 14px 48px;
		border-bottom: 1px solid var(--nav-border);
		font-size: 13px;
		color: var(--muted);
	}
	.breadcrumbs a:hover {
		color: var(--green);
	}
	.sep {
		color: #c9c3b4;
		margin: 0 6px;
	}
	.crumb-current {
		color: var(--text);
	}

	.eyebrow {
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 600;
		margin-bottom: 14px;
	}
	.eyebrow-gold {
		color: #d9be84;
	}
	.h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 38px;
		line-height: 1.1;
	}

	/* ===== HERO ===== */
	.hero {
		position: relative;
		height: 520px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 72px;
		overflow: hidden;
		background-size: cover;
		background-position: center;
	}
	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			105deg,
			rgba(18, 26, 20, 0.74) 0%,
			rgba(18, 26, 20, 0.4) 52%,
			rgba(18, 26, 20, 0.14) 100%
		);
	}
	.hero-content {
		position: relative;
		max-width: 660px;
		color: #fff;
	}
	.hero-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		background: rgba(255, 255, 255, 0.16);
		backdrop-filter: blur(6px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 7px 15px;
		border-radius: 999px;
		margin-bottom: 20px;
	}
	.hero-h1 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 56px;
		line-height: 1.05;
		letter-spacing: -0.015em;
		margin-bottom: 18px;
		em {
			font-style: italic;
			color: var(--gold-light);
		}
	}
	.hero-lead {
		font-size: 18px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.9);
		max-width: 560px;
		margin-bottom: 24px;
	}
	.hero-chips {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin-bottom: 28px;
	}
	.hero-chip {
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.28);
		color: #fff;
		font-size: 13px;
		font-weight: 500;
		padding: 7px 14px;
		border-radius: 999px;
	}
	.hero-cta-row {
		display: flex;
		gap: 14px;
		flex-wrap: wrap;
	}
	.btn-solid {
		background: var(--green);
		color: #fff;
		padding: 14px 28px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}
	.btn-outline-light {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.5);
		color: #fff;
		padding: 14px 28px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}

	/* ===== SECTION GENERIC ===== */
	.section {
		padding: 56px 48px 40px;
	}
	.section-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 26px;
		flex-wrap: wrap;
	}
	.head-link {
		font-weight: 600;
		color: var(--green);
		border-bottom: 1.5px solid var(--gold);
		padding-bottom: 2px;
	}

	/* ===== OPIS ===== */
	.opis-section {
		padding-top: 78px;
		padding-bottom: 40px;
	}
	.opis-grid {
		display: grid;
		grid-template-columns: 1.35fr 0.85fr;
		gap: 56px;
		align-items: start;
	}
	.opis-tresc p {
		font-size: 17px;
		line-height: 1.8;
		color: #3a3e33;
		margin-bottom: 18px;
	}
	.fakty-card {
		background: var(--bg-cream);
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: 28px 30px;
	}
	.fakty-title {
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 700;
		margin-bottom: 16px;
	}
	.fakt-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		padding: 13px 0;
		border-top: 1px solid #e4decf;
	}
	.fakt-row:first-child {
		border-top: none;
	}
	.fakt-k {
		font-size: 13.5px;
		color: var(--muted);
	}
	.fakt-v {
		font-size: 15px;
		font-weight: 700;
		color: var(--text);
		text-align: right;
	}

	/* ===== OFERTY ===== */
	.oferty-section {
		padding-top: 38px;
		scroll-margin-top: 90px;
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
		height: 270px;
		background-size: cover;
		background-position: center;
		background-color: var(--bg-cream);
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
		font-size: 16px;
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
		font-size: 17px;
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
		color: #2c3a2e;
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

	/* ===== ATUTY ===== */
	.atuty-head {
		max-width: 640px;
		margin-bottom: 30px;
	}
	.atuty-head .h2 {
		font-size: 38px;
		margin-bottom: 12px;
	}
	.atuty-sub {
		font-size: 16px;
		line-height: 1.6;
		color: var(--muted);
	}
	.atuty-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}
	.atut-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 16px 30px -26px rgba(30, 40, 30, 0.5);
	}
	.atut-check {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		background: var(--gold-soft);
		color: var(--gold);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 800;
		margin-bottom: 16px;
	}
	.atut-t {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.25;
		margin-bottom: 7px;
	}
	.atut-d {
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--muted);
	}

	/* ===== GALERIA ===== */
	.galeria-section {
		padding-top: 38px;
	}
	.galeria-section .h2 {
		font-size: 38px;
		margin-bottom: 26px;
	}
	.galeria-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 210px;
		grid-auto-flow: dense;
		gap: 14px;
	}
	.galeria-tile {
		background-size: cover;
		background-position: center;
		border-radius: 16px;
		border: 1px solid var(--border);
		&.big {
			grid-column: span 2;
			grid-row: span 2;
		}
	}
	.galeria-note {
		font-size: 13px;
		color: var(--label);
		margin-top: 14px;
	}

	/* ===== KONTAKT ===== */
	.kontakt-section {
		padding-bottom: 64px;
	}
	.kontakt-box {
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--border);
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
	}
	.kontakt-info {
		background: var(--green);
		color: var(--on-green);
		padding: 46px 42px;
	}
	.kontakt-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 30px;
		line-height: 1.18;
		margin-bottom: 14px;
		color: var(--on-green);
	}
	.kontakt-opis {
		font-size: 16px;
		line-height: 1.65;
		color: rgba(243, 238, 225, 0.82);
		margin-bottom: 30px;
	}
	.kontakt-details {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.kd-label {
		font-size: 12px;
		color: #d9be84;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 3px;
	}
	.kd-value {
		font-size: 16px;
		font-weight: 600;
	}
	.kd-big {
		font-size: 18px;
		font-weight: 700;
		color: #fff;
	}
	.kontakt-form-wrap {
		background: #fff;
		padding: 40px;
	}
	.kontakt-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--label);
		font-weight: 600;
	}
	.field input,
	.field select,
	.field textarea {
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 13px 15px;
		font-size: 15px;
		color: var(--text);
		background: var(--bg-site);
		text-transform: none;
		letter-spacing: normal;
		font-weight: 400;
	}
	.field textarea {
		resize: vertical;
	}
	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
	.kontakt-form button {
		margin-top: 4px;
		background: var(--green);
		color: #fff;
		border: none;
		border-radius: 12px;
		padding: 15px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
	}
	.kontakt-form button:hover {
		opacity: 0.92;
	}
	.form-note {
		font-size: 12px;
		color: var(--label);
		line-height: 1.5;
	}
	.lead-thanks {
		min-height: 360px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 16px;
	}
	.thanks-icon {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: rgba(44, 74, 56, 0.1);
		border: 1px solid rgba(44, 74, 56, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--green);
		font-size: 30px;
	}
	.thanks-title {
		font-family: 'Newsreader', serif;
		font-size: 26px;
		font-weight: 500;
	}
	.thanks-desc {
		font-size: 16px;
		line-height: 1.6;
		color: var(--muted);
		max-width: 340px;
	}

	/* ===== INNE LOKALIZACJE ===== */
	.inne-section {
		padding-top: 0;
		padding-bottom: 76px;
	}
	.inne-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
	}
	.inne-card {
		display: flex;
		flex-direction: column;
		gap: 6px;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 20px;
		box-shadow: 0 14px 26px -24px rgba(30, 40, 30, 0.5);
	}
	.inne-nazwa {
		font-family: 'Newsreader', serif;
		font-size: 19px;
		font-weight: 500;
		line-height: 1.2;
	}
	.inne-region {
		font-size: 12.5px;
		color: var(--label);
		line-height: 1.4;
	}
	.inne-link {
		color: var(--green);
		font-weight: 600;
		font-size: 13.5px;
		margin-top: 8px;
	}

	.kd-desktop-only {
		display: block;
	}
	.br-desktop {
		display: block;
	}

	/* ===== RESPONSYWNOŚĆ ===== */
	@media (max-width: 1199px) {
		.offers-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.atuty-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.inne-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (max-width: 980px) {
		.section {
			padding: 32px 20px 8px;
		}
		.hero {
			height: 430px;
			padding: 24px 20px 28px;
			justify-content: flex-end;
		}
		.hero-overlay {
			background: linear-gradient(180deg, rgba(18, 26, 20, 0.25) 0%, rgba(18, 26, 20, 0.82) 100%);
		}
		.hero-h1 {
			font-size: 33px;
		}
		.br-desktop {
			display: none;
		}
		.hero-lead {
			font-size: 14px;
		}
		.hero-cta-row {
			flex-direction: column;
		}
		.opis-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}
		.h2 {
			font-size: 25px;
		}
		.offers-grid {
			grid-template-columns: 1fr;
		}
		.atuty-grid {
			grid-template-columns: 1fr;
		}
		.galeria-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 120px;
		}
		.kontakt-box {
			grid-template-columns: 1fr;
		}
		.kd-desktop-only {
			display: none;
		}
		.inne-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 640px) {
		.breadcrumbs {
			padding: 11px 20px;
		}
	}
</style>
