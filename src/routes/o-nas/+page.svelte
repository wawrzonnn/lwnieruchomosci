<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import {
		seo,
		breadcrumbs,
		hero,
		oBiurze,
		zespol,
		wartosci,
		statystyki,
		region,
		opinie,
		kontaktCta
	} from '$lib/data/o-nas';

	// ── Opinie: pojedynczy rotujący cytat, auto-rotacja co 6,5s + kropki ──
	let testiIndex = $state(0);
	$effect(() => {
		testiIndex;
		const id = setInterval(() => {
			testiIndex = (testiIndex + 1) % opinie.lista.length;
		}, 6500);
		return () => clearInterval(id);
	});
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
</svelte:head>

<div class="lw-page">
	<div class="lw-landing site">
		<LandingNav />

		<!-- ============ BREADCRUMBS ============ -->
		<div class="breadcrumbs">
			{#each breadcrumbs as crumb, i}
				{#if crumb.href}
					<a href={crumb.href}>{crumb.label}</a>
				{:else}
					<span class="crumb-current">{crumb.label}</span>
				{/if}
				{#if i < breadcrumbs.length - 1}<span class="crumb-sep">/</span>{/if}
			{/each}
		</div>

		<!-- ============ HERO ============ -->
		<section
			class="hero-svc"
			style="background-image:linear-gradient(105deg,rgba(18,26,20,.78) 0%,rgba(18,26,20,.5) 52%,rgba(18,26,20,.24) 100%),url('{hero.tlo}')"
		>
			<div class="hero-svc-copy">
				<span class="hero-svc-eyebrow">{hero.eyebrow}</span>
				<h1 class="hero-svc-h1">
					{hero.tytul.split(hero.tytulEmfaza)[0]}<em>{hero.tytulEmfaza}</em>{hero.tytul.split(
						hero.tytulEmfaza
					)[1]}
				</h1>
				<p class="hero-svc-lead">{hero.podtytul}</p>
				<div class="hero-svc-cta-row">
					{#each hero.cta as cta}
						<a href={cta.href} class="hero-svc-cta" class:outline={cta.wariant === 'outline'}
							>{cta.label}</a
						>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ NASZE BIURO ============ -->
		<section class="section biuro-section" id="o-biurze">
			<div class="biuro-grid">
				<div class="biuro-media">
					<div class="biuro-photo">
						<img src={oBiurze.zdjecie.src} alt={oBiurze.zdjecie.alt} />
					</div>
					<div class="biuro-badge-google">
						<div class="bg-n">{oBiurze.badges[0].n}</div>
						<div>
							<div class="bg-stars">★★★★★</div>
							<div class="bg-l">{oBiurze.badges[0].l}</div>
						</div>
					</div>
					<div class="biuro-badge-lata">
						<div class="bl-n">{oBiurze.badges[1].n}</div>
						<div class="bl-l">{oBiurze.badges[1].l}</div>
					</div>
				</div>
				<div class="biuro-head">
					<div class="eyebrow">{oBiurze.eyebrow}</div>
					<h2 class="h2 biuro-h2">
						{oBiurze.tytul.split(oBiurze.tytulEmfaza)[0]}<em>{oBiurze.tytulEmfaza}</em>{oBiurze.tytul.split(
							oBiurze.tytulEmfaza
						)[1]}
					</h2>
				</div>
				<div class="biuro-body">
					{#each oBiurze.akapity as akapit}
						<p class="biuro-p">{akapit}</p>
					{/each}
					<div class="biuro-lider">
						<div class="eyebrow">{oBiurze.lider.eyebrow}</div>
						<div class="biuro-lider-imie">{oBiurze.lider.imie}</div>
						<div class="biuro-lider-rola">{oBiurze.lider.rola}</div>
						<p class="biuro-lider-bio">{oBiurze.lider.opis}</p>
						<div class="biuro-lider-kontakt">
							{#each oBiurze.kontakt.linki as link, i}
								<a href={link.href} class="biuro-contact-btn" class:ghost={i > 0}>{link.label}</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ============ ZESPÓŁ ============ -->
		<section class="section zespol-section">
			<div class="zespol-head">
				<div class="eyebrow">{zespol.eyebrow}</div>
				<h2 class="h2 zespol-h2">
					{zespol.tytul.split(zespol.tytulEmfaza)[0]}<em>{zespol.tytulEmfaza}</em>{zespol.tytul.split(
						zespol.tytulEmfaza
					)[1]}
				</h2>
				<p class="zespol-lead">{zespol.podtytul}</p>
			</div>
			<div class="zespol-grid">
				{#each zespol.osoby as osoba}
					<div class="zespol-card">
						<div class="zespol-photo">
							<img src={osoba.img} alt={osoba.imie} />
						</div>
						<div class="zespol-body">
							<div class="zespol-rola">{osoba.rola}</div>
							<div class="zespol-imie">{osoba.imie}</div>
							<p class="zespol-opis">{osoba.opis}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ WARTOŚCI ============ -->
		<section class="section wartosci-section">
			<div class="section-head col">
				<div class="eyebrow">{wartosci.eyebrow}</div>
				<h2 class="h2">{wartosci.tytul}</h2>
			</div>
			<div class="wartosci-grid">
				{#each wartosci.lista as w}
					<div class="wartosci-card">
						<div class="wartosci-badge">✦</div>
						<div class="wartosci-t">{w.t}</div>
						<p class="wartosci-d">{w.d}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ STATYSTYKI ============ -->
		<section class="stats-section">
			<div class="stats-grid">
				{#each statystyki as s}
					<div class="stat">
						<div class="stat-n">{s.n}</div>
						<div class="stat-l">{s.l}</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ NASZ REGION ============ -->
		<section class="region-section">
			<div class="region-photo" style="background-image:url('{region.tlo}')"></div>
			<div class="region-inner">
				<div class="region-card">
					<div class="eyebrow">{region.eyebrow}</div>
					<h2 class="h2 region-h2">
						{region.tytul.split(region.tytulEmfaza)[0]}<em>{region.tytulEmfaza}</em>{region.tytul.split(
							region.tytulEmfaza
						)[1]}
					</h2>
					{#each region.akapity as akapit}
						<p class="region-p">{akapit}</p>
					{/each}
					<a href={region.cta.href} class="region-cta">{region.cta.label}</a>
				</div>
			</div>
		</section>

		<!-- ============ OPINIE ============ -->
		<section class="testi-section-v2">
			<div class="testi-bg" style="background-image:url('{opinie.tlo}')"></div>
			<div class="testi-overlay"></div>
			<div class="testi-content">
				<span class="testi-watermark" aria-hidden="true">”</span>
				<div class="eyebrow eyebrow-dark">{opinie.eyebrow}</div>
				<p class="testi-quote-text">{opinie.lista[testiIndex].quote}</p>
				<div class="testi-author-v2">
					{opinie.lista[testiIndex].name} · {opinie.lista[testiIndex].loc}
				</div>
				<div class="testi-dots">
					{#each opinie.lista as _, i}
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

		<!-- ============ CTA / KONTAKT ============ -->
		<section class="kontakt-cta-section" id="kontakt">
			<div class="eyebrow">{kontaktCta.eyebrow}</div>
			<h2 class="h2 kontakt-cta-h2">{kontaktCta.tytul}</h2>
			<p class="kontakt-cta-lead">{kontaktCta.podtytul}</p>
			<div class="kontakt-cta-row">
				{#each kontaktCta.cta as cta}
					<a href={cta.href} class="kontakt-cta-btn" class:outline={cta.wariant === 'outline'}
						>{cta.label}</a
					>
				{/each}
			</div>
		</section>

		<LandingFooter />
	</div>
</div>

<style lang="scss">
	/* ===== BREADCRUMBS ===== */
	.breadcrumbs {
		padding: 14px 48px;
		border-bottom: 1px solid var(--nav-border);
		font-size: 13px;
		color: var(--muted);
	}
	.breadcrumbs a:hover {
		color: var(--green);
	}
	.crumb-sep {
		color: #c9c3b4;
		margin: 0 6px;
	}
	.crumb-current {
		color: var(--text);
	}

	/* ===== HERO ===== */
	.hero-svc {
		position: relative;
		height: 470px;
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 72px;
	}
	.hero-svc-copy {
		max-width: 680px;
		color: #fff;
	}
	.hero-svc-eyebrow {
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
	.hero-svc-h1 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 54px;
		line-height: 1.07;
		letter-spacing: -0.01em;
		margin-bottom: 18px;
		em {
			font-style: italic;
			color: var(--gold-light);
		}
	}
	.hero-svc-lead {
		font-size: 18px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.92);
		max-width: 580px;
	}
	.hero-svc-cta-row {
		display: flex;
		gap: 14px;
		flex-wrap: wrap;
		margin-top: 28px;
	}
	.hero-svc-cta {
		background: var(--green);
		color: #fff;
		padding: 14px 28px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}
	.hero-svc-cta.outline {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.5);
		color: #fff;
	}

	/* ===== NASZE BIURO ===== */
	.biuro-section {
		padding-top: 84px;
		padding-bottom: 78px;
	}
	.biuro-grid {
		display: grid;
		grid-template-columns: 0.92fr 1.08fr;
		grid-template-rows: auto auto;
		grid-template-areas:
			'media head'
			'media body';
		column-gap: 64px;
		row-gap: 20px;
		align-items: start;
	}
	.biuro-media {
		grid-area: media;
		position: relative;
		align-self: center;
	}
	.biuro-photo {
		position: relative;
		border-radius: 24px;
		overflow: hidden;
		aspect-ratio: 4 / 5;
		box-shadow: 0 44px 80px -42px rgba(30, 40, 30, 0.62);
	}
	.biuro-photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}
	.biuro-badge-google {
		position: absolute;
		left: -24px;
		bottom: 34px;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 15px 20px;
		box-shadow: 0 26px 46px -24px rgba(30, 40, 30, 0.5);
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.bg-n {
		font-family: 'Newsreader', serif;
		font-size: 36px;
		font-weight: 600;
		color: var(--green);
		line-height: 1;
	}
	.bg-stars {
		color: var(--gold);
		font-size: 15px;
		letter-spacing: 0.08em;
	}
	.bg-l {
		font-size: 12px;
		color: var(--muted);
		margin-top: 3px;
	}
	.biuro-badge-lata {
		position: absolute;
		right: -14px;
		top: 26px;
		background: var(--green);
		color: var(--gold-light);
		border-radius: 14px;
		padding: 12px 18px;
		box-shadow: 0 22px 40px -22px rgba(18, 26, 20, 0.65);
		text-align: center;
	}
	.bl-n {
		font-family: 'Newsreader', serif;
		font-size: 26px;
		font-weight: 600;
		line-height: 1;
	}
	.bl-l {
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(233, 209, 154, 0.82);
		margin-top: 4px;
	}
	.biuro-head {
		grid-area: head;
		align-self: end;
	}
	.biuro-h2 {
		font-size: 37px;
		line-height: 1.1;
		margin-top: 12px;
		em {
			font-style: italic;
			color: var(--green);
		}
	}
	.biuro-body {
		grid-area: body;
	}
	.biuro-p {
		font-size: 17px;
		line-height: 1.72;
		color: var(--muted);
		text-wrap: pretty;
	}
	.biuro-p + .biuro-p {
		margin-top: 15px;
	}
	/* Blok „Biuro prowadzi" — Lucyna + kontakt */
	.biuro-lider {
		margin-top: 26px;
		padding-top: 24px;
		border-top: 1px solid var(--border);
	}
	.biuro-lider-imie {
		font-family: 'Newsreader', serif;
		font-size: 26px;
		font-weight: 500;
		line-height: 1.12;
		margin-top: 8px;
	}
	.biuro-lider-rola {
		font-size: 14px;
		color: var(--muted);
		margin: 4px 0 13px;
	}
	.biuro-lider-bio {
		font-size: 16px;
		line-height: 1.68;
		color: var(--muted);
		text-wrap: pretty;
	}
	.biuro-lider-kontakt {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin-top: 20px;
	}
	.biuro-contact-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--green);
		color: #fff;
		padding: 12px 20px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 14px;
	}
	.biuro-contact-btn.ghost {
		background: #fff;
		border: 1px solid var(--border);
		color: var(--text);
	}

	/* ===== ZESPÓŁ ===== */
	.zespol-section {
		padding-top: 8px;
		padding-bottom: 84px;
	}
	.zespol-head {
		max-width: 660px;
		margin-bottom: 44px;
	}
	.zespol-h2 {
		font-size: 40px;
		line-height: 1.08;
		margin: 4px 0 14px;
		em {
			font-style: italic;
			color: var(--green);
		}
	}
	.zespol-lead {
		font-size: 17px;
		line-height: 1.7;
		color: var(--muted);
		text-wrap: pretty;
	}
	.zespol-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 28px;
	}
	.zespol-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 20px 40px -26px rgba(30, 40, 30, 0.5);
	}
	.zespol-photo {
		position: relative;
		aspect-ratio: 4 / 5;
		background: #ece7d8;
		overflow: hidden;
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center top;
		}
	}
	.zespol-body {
		padding: 24px 24px 28px;
	}
	.zespol-rola {
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 600;
		margin-bottom: 7px;
	}
	.zespol-imie {
		font-family: 'Newsreader', serif;
		font-size: 25px;
		font-weight: 500;
		line-height: 1.15;
	}
	.zespol-opis {
		font-size: 15px;
		line-height: 1.62;
		color: var(--muted);
		margin-top: 11px;
		text-wrap: pretty;
	}
	/* Mobile/tablet: lista poziomych kart (foto po lewej). */
	@media (max-width: 900px) {
		.zespol-grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}
		.zespol-card {
			display: flex;
			gap: 15px;
			align-items: center;
			padding: 14px;
			border-radius: 16px;
		}
		.zespol-photo {
			flex: 0 0 auto;
			width: 84px;
			height: 104px;
			aspect-ratio: auto;
			border-radius: 14px;
		}
		.zespol-body {
			padding: 0;
		}
		.zespol-rola {
			font-size: 10.5px;
			margin-bottom: 3px;
		}
		.zespol-imie {
			font-size: 19px;
		}
		.zespol-opis {
			font-size: 13px;
			line-height: 1.5;
			margin-top: 5px;
		}
	}
	@media (max-width: 640px) {
		.zespol-h2 {
			font-size: 26px;
		}
	}

	/* ===== WARTOŚCI ===== */
	.wartosci-section {
		padding-top: 8px;
		padding-bottom: 78px;
	}
	.wartosci-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
	.wartosci-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: 26px 24px;
		box-shadow: 0 16px 30px -22px rgba(30, 40, 30, 0.5);
	}
	.wartosci-badge {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: var(--bg-cream-2);
		border: 1px solid #e7d8be;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gold);
		font-size: 17px;
	}
	.wartosci-t {
		font-family: 'Newsreader', serif;
		font-size: 21px;
		font-weight: 500;
		line-height: 1.2;
		margin-top: 16px;
	}
	.wartosci-d {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted);
		margin-top: 9px;
	}

	/* ===== STATYSTYKI ===== */
	.stats-section {
		padding: 56px 48px;
		background: var(--green);
		color: var(--on-green);
	}
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
		text-align: center;
	}
	.stat-n {
		font-family: 'Newsreader', serif;
		font-size: 46px;
		font-weight: 600;
		color: var(--gold-light);
		line-height: 1;
	}
	.stat-l {
		font-size: 14px;
		color: rgba(243, 238, 225, 0.8);
		margin-top: 8px;
	}

	/* ===== NASZ REGION ===== */
	.region-section {
		position: relative;
		padding: 92px 48px;
		overflow: hidden;
	}
	.region-photo {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
	}
	.region-photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, rgba(18, 26, 20, 0.3) 0%, rgba(18, 26, 20, 0.06) 60%);
	}
	.region-inner {
		position: relative;
		max-width: 1344px;
		margin: 0 auto;
		display: flex;
	}
	.region-card {
		max-width: 540px;
		background: var(--bg-site);
		border: 1px solid var(--border);
		border-radius: 24px;
		padding: 46px 46px 42px;
		box-shadow: 0 46px 90px -42px rgba(18, 26, 20, 0.7);
	}
	.region-h2 {
		font-size: 40px;
		line-height: 1.08;
		margin: 4px 0 16px;
		em {
			font-style: italic;
			color: var(--green);
		}
	}
	.region-p {
		font-size: 17px;
		line-height: 1.72;
		color: var(--muted);
		text-wrap: pretty;
	}
	.region-p + .region-p {
		margin-top: 14px;
	}
	.region-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 22px;
		color: var(--green);
		font-weight: 600;
		font-size: 15px;
		border-bottom: 2px solid var(--gold);
		padding-bottom: 3px;
	}

	/* ===== OPINIE ===== */
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
	}
	.eyebrow-dark {
		color: var(--gold-soft);
	}
	.testi-watermark {
		display: block;
		font-family: 'Newsreader', serif;
		font-size: 70px;
		color: var(--gold-soft);
		opacity: 0.6;
		line-height: 0.4;
		height: 40px;
		margin-bottom: 20px;
	}
	.testi-quote-text {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-weight: 500;
		font-size: 32px;
		line-height: 1.45;
		color: var(--bg-site);
		max-width: 760px;
		margin: 22px auto 24px;
		text-wrap: pretty;
	}
	.testi-author-v2 {
		font-size: 14px;
		letter-spacing: 0.03em;
		color: rgba(243, 238, 225, 0.72);
		margin-bottom: 30px;
	}
	.testi-dots {
		display: flex;
		justify-content: center;
		gap: 9px;
	}
	.testi-dot {
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
		background: var(--gold-light);
	}

	/* ===== CTA / KONTAKT ===== */
	.kontakt-cta-section {
		background: var(--bg-cream);
		padding: 80px 48px;
		text-align: center;
	}
	.kontakt-cta-h2 {
		max-width: 640px;
		margin: 0 auto 16px;
	}
	.kontakt-cta-lead {
		font-size: 17px;
		line-height: 1.6;
		color: var(--muted);
		max-width: 520px;
		margin: 0 auto 26px;
	}
	.kontakt-cta-row {
		display: flex;
		gap: 14px;
		flex-wrap: wrap;
		justify-content: center;
	}
	.kontakt-cta-btn {
		background: var(--green);
		color: #fff;
		padding: 14px 28px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 15px;
	}
	.kontakt-cta-btn.outline {
		background: #fff;
		border: 1px solid var(--divider);
		color: var(--text);
	}

	/* ===== RESPONSYWNOŚĆ ===== */
	@media (max-width: 1199px) {
		.wartosci-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 980px) {
		.hero-svc {
			padding: 0 40px;
			height: auto;
			min-height: 420px;
			padding-top: 60px;
			padding-bottom: 40px;
		}
		.hero-svc-h1 {
			font-size: 42px;
		}
	}
	/* Poniżej 900px: biuro w jednej kolumnie, region = zdjęcie u góry + karta nachodząca. */
	@media (max-width: 900px) {
		.biuro-grid {
			grid-template-columns: 1fr;
			grid-template-areas:
				'head'
				'media'
				'body';
			row-gap: 0;
		}
		.biuro-media {
			align-self: auto;
			margin: 16px 0 24px;
		}
		.biuro-head {
			align-self: auto;
		}
		.biuro-h2 {
			font-size: 30px;
			margin-top: 6px;
		}

		.region-section {
			padding: 0;
			overflow: visible;
		}
		.region-photo {
			position: relative;
			inset: auto;
			height: 240px;
		}
		.region-photo::after {
			display: none;
		}
		.region-inner {
			display: block;
			margin: 0 16px;
		}
		.region-card {
			max-width: none;
			margin-top: -52px;
			border-radius: 20px;
			padding: 28px 24px;
		}
	}
	@media (max-width: 760px) {
		.wartosci-grid {
			grid-template-columns: 1fr;
		}
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px 16px;
		}
	}
	@media (max-width: 640px) {
		.breadcrumbs {
			padding-left: 20px;
			padding-right: 20px;
		}
		.hero-svc {
			padding-left: 20px;
			padding-right: 20px;
			height: 400px;
			min-height: 0;
			justify-content: flex-end;
			padding-bottom: 30px;
		}
		.hero-svc-h1 {
			font-size: 31px;
			line-height: 1.12;
		}
		.hero-svc-lead {
			font-size: 14px;
		}
		.hero-svc-cta-row {
			flex-direction: column;
		}
		.hero-svc-cta {
			text-align: center;
		}
		.biuro-section {
			padding-top: 40px;
			padding-bottom: 8px;
		}
		.region-h2 {
			font-size: 26px;
		}
		.stats-section {
			padding: 40px 20px;
		}
		.stat-n {
			font-size: 34px;
		}
		.testi-section-v2 {
			padding: 56px 24px;
		}
		.testi-watermark {
			font-size: 44px;
			height: 26px;
		}
		.testi-quote-text {
			font-size: 19px;
		}
		.kontakt-cta-section {
			padding: 48px 20px;
		}
	}
</style>
