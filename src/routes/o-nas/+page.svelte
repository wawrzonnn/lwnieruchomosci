<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import {
		seo,
		breadcrumbs,
		hero,
		historia,
		wartosci,
		statystyki,
		zespol,
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
			style="background-image:linear-gradient(105deg,rgba(18,26,20,.76) 0%,rgba(18,26,20,.46) 52%,rgba(18,26,20,.22) 100%),url('{hero.tlo}')"
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

		<!-- ============ HISTORIA ============ -->
		<section class="section historia-section">
			<div class="historia-grid">
				<div>
					<div class="eyebrow">{historia.eyebrow}</div>
					<h2 class="h2">{historia.tytul}</h2>
					<p class="historia-lead">{historia.podtytul}</p>
				</div>
				<div class="timeline">
					{#each historia.kroki as krok, i}
						<div class="timeline-row">
							<div class="timeline-marker">
								<div class="timeline-dot"></div>
								{#if i < historia.kroki.length - 1}<div class="timeline-line"></div>{/if}
							</div>
							<div class="timeline-body">
								<div class="timeline-year">{krok.year}</div>
								<div class="timeline-t">{krok.t}</div>
								<p class="timeline-d">{krok.d}</p>
							</div>
						</div>
					{/each}
				</div>
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

		<!-- ============ ZESPÓŁ ============ -->
		<section class="section zespol-section" id="zespol">
			<div class="section-head col">
				<div class="eyebrow">{zespol.eyebrow}</div>
				<h2 class="h2">{zespol.tytul}</h2>
			</div>
			<div class="zespol-grid">
				{#each zespol.lista as p}
					<div class="zespol-card">
						<div class="zespol-photo">
							<img src={p.img} alt={p.name} />
						</div>
						<div class="zespol-body">
							<div class="zespol-name">{p.name}</div>
							<div class="zespol-role">{p.role}</div>
							<p class="zespol-bio">{p.bio}</p>
						</div>
					</div>
				{/each}
			</div>
			<p class="zespol-note">{zespol.uwaga}</p>
		</section>

		<!-- ============ OPINIE ============ -->
		<section class="testi-section-v2">
			<div class="testi-bg" style="background-image:url('{opinie.tlo}')"></div>
			<div class="testi-overlay"></div>
			<div class="testi-content">
				<span class="testi-watermark" aria-hidden="true">”</span>
				<div class="eyebrow eyebrow-dark">{opinie.eyebrow}</div>
				<p class="testi-quote-text">{opinie.lista[testiIndex].quote}</p>
				<div class="testi-author-v2">{opinie.lista[testiIndex].name} · {opinie.lista[testiIndex].loc}</div>
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
		height: 460px;
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
		color: rgba(255, 255, 255, 0.9);
		max-width: 560px;
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

	/* ===== HISTORIA ===== */
	.historia-section {
		padding-top: 72px;
		padding-bottom: 72px;
	}
	.historia-grid {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 56px;
		align-items: start;
	}
	.historia-lead {
		font-size: 17px;
		line-height: 1.7;
		color: var(--muted);
		margin-top: 16px;
	}
	.timeline-row {
		display: flex;
		gap: 22px;
	}
	.timeline-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0 0 auto;
		padding-top: 4px;
	}
	.timeline-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--gold);
		box-shadow: 0 0 0 4px var(--bg-cream-2), 0 0 0 5px #e7d8be;
	}
	.timeline-line {
		width: 2px;
		flex: 1;
		background: var(--divider);
		margin-top: 8px;
		min-height: 44px;
	}
	.timeline-body {
		padding-bottom: 30px;
	}
	.timeline-year {
		font-family: 'Newsreader', serif;
		font-size: 14px;
		letter-spacing: 0.06em;
		color: var(--gold);
		font-weight: 600;
	}
	.timeline-t {
		font-family: 'Newsreader', serif;
		font-size: 23px;
		font-weight: 500;
		line-height: 1.2;
		margin-top: 2px;
	}
	.timeline-d {
		font-size: 16px;
		line-height: 1.65;
		color: var(--muted);
		margin-top: 8px;
		max-width: 520px;
	}

	/* ===== WARTOŚCI ===== */
	.wartosci-section {
		padding-top: 8px;
		padding-bottom: 76px;
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

	/* ===== ZESPÓŁ ===== */
	.zespol-section {
		padding-top: 76px;
		padding-bottom: 8px;
	}
	.zespol-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	.zespol-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 18px;
		overflow: hidden;
		box-shadow: 0 16px 30px -22px rgba(30, 40, 30, 0.5);
	}
	.zespol-photo {
		position: relative;
		height: 300px;
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.zespol-body {
		padding: 22px 24px 26px;
	}
	.zespol-name {
		font-family: 'Newsreader', serif;
		font-size: 22px;
		font-weight: 500;
	}
	.zespol-role {
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 700;
		margin-top: 5px;
	}
	.zespol-bio {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted);
		margin-top: 12px;
	}
	.zespol-note {
		font-size: 14px;
		color: var(--label);
		margin-top: 18px;
	}

	/* ===== OPINIE (jak na innych podstronach) ===== */
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
		.historia-grid {
			grid-template-columns: 1fr;
		}
		.zespol-grid {
			grid-template-columns: 1fr;
			max-width: 420px;
			margin: 0 auto;
		}
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px 16px;
		}
	}
	@media (max-width: 760px) {
		.wartosci-grid {
			grid-template-columns: 1fr;
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
			height: 380px;
			min-height: 0;
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
		.historia-section,
		.wartosci-section,
		.zespol-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.stats-section {
			padding: 40px 20px;
		}
		.testi-section-v2 {
			padding: 64px 24px;
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
