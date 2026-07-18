<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import {
		seo,
		breadcrumbs,
		hero,
		zakres,
		naOdleglosc,
		formularz,
		powiazane
	} from '$lib/data/sprzedaz-nieruchomosci';

	// Ikony mini-kafli sekcji „na odległość" (globus / users / dokument) — wg handoffu.
	const odlIkony = [
		'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/>',
		'<path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19"/><circle cx="10" cy="8" r="3"/><path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6"/>',
		'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>'
	];

	// ── Formularz: potwierdzenie po wysłaniu (podłącz pod backend/e-mail) ──
	let formSubmitted = $state(false);
	let formError = $state('');
	const enhanceLead: SubmitFunction = () => async ({ result }) => {
		if (result.type === 'success') {
			formSubmitted = true;
			formError = '';
		} else if (result.type === 'failure') {
			formError = String(result.data?.error ?? 'Nie udało się wysłać. Spróbuj ponownie.');
		}
	};
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
		<section class="hero-svc" style="background-image:linear-gradient(105deg,rgba(18,26,20,.74) 0%,rgba(18,26,20,.42) 52%,rgba(18,26,20,.18) 100%),url('{hero.tlo}')">
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

		<!-- ============ ZAKRES USŁUGI ============ -->
		<section class="zakres-section" id="zakres">
			<div class="section-head col">
				<div class="eyebrow eyebrow-green">{zakres.eyebrow}</div>
				<h2 class="h2 zakres-h2">{zakres.tytul}</h2>
			</div>
			<div class="zakres-grid">
				{#each zakres.lista as item}
					<div class="zakres-item">
						<span class="zakres-check">✓</span>
						<span class="zakres-text">{item}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ SPRZEDAŻ NA ODLEGŁOŚĆ ============ -->
		<section class="section odl-section">
			<div class="odl-panel">
				<div class="odl-text">
					<div class="eyebrow">{naOdleglosc.eyebrow}</div>
					<h2 class="h2 odl-h2">
						{@html naOdleglosc.tytul.replace(
							naOdleglosc.tytulEmfaza,
							`<em>${naOdleglosc.tytulEmfaza}</em>`
						)}
					</h2>
					{#each naOdleglosc.akapity as akapit}
						<p class="odl-p">{akapit}</p>
					{/each}
				</div>
				<div class="odl-kafle">
					{#each naOdleglosc.kafle as kafel, i}
						<div class="odl-kafel">
							<span class="odl-ico">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									{@html odlIkony[i]}
								</svg>
							</span>
							<div>
								<h3 class="odl-kt">{kafel.t}</h3>
								<p class="odl-kd">{kafel.d}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ CTA / FORMULARZ ============ -->
		<section class="section lead-section" id="formularz">
			<div class="lead-box">
				<div class="lead-info">
					<div class="eyebrow eyebrow-green">{formularz.eyebrow}</div>
					<h2 class="h2 lead-h2">{formularz.tytul}</h2>
					<p class="lead-sub">{formularz.podtytul}</p>
					<div class="lead-contact">
						<div>
							<div class="lead-contact-label">Telefon</div>
							<div class="lead-contact-value big">{formularz.kontakt.telefon}</div>
						</div>
						<div>
							<div class="lead-contact-label">E-mail</div>
							<div class="lead-contact-value">{formularz.kontakt.email}</div>
						</div>
						<div>
							<div class="lead-contact-label">Godziny</div>
							<div class="lead-contact-value">{formularz.kontakt.godziny}</div>
						</div>
					</div>
				</div>
				<div class="lead-form-wrap">
					{#if !formSubmitted}
						<form class="lead-form" method="POST" use:enhance={enhanceLead}>
						<input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0;width:0;" />
						{#if formError}<p style="color:#b3261e;font-size:14px;margin-top:6px;">{formError}</p>{/if}
							<label class="lead-field">
								Imię i nazwisko
								<input type="text" name="name" required />
							</label>
							<div class="lead-field-row">
								<label class="lead-field">
									Telefon
									<input type="tel" name="phone" required />
								</label>
								<label class="lead-field">
									E-mail
									<input type="email" name="email" />
								</label>
							</div>
							<div class="lead-field-row uneven">
								<label class="lead-field">
									Lokalizacja nieruchomości
									<input type="text" name="location" placeholder="np. Jelenia Góra, Cieplice" />
								</label>
								<label class="lead-field">
									Rodzaj
									<select name="type">
										<option>Mieszkanie</option>
										<option>Dom</option>
										<option>Działka</option>
										<option>Lokal</option>
									</select>
								</label>
							</div>
							<label class="lead-field">
								Wiadomość
								<textarea name="message" rows="4" placeholder="Napisz kilka słów o nieruchomości…"
								></textarea>
							</label>
							<button type="submit" class="lead-submit">{formularz.przycisk}</button>
							<p class="lead-fineprint">
								Wysyłając formularz, zgadzasz się na kontakt w sprawie wyceny. Nie wysyłamy spamu.
							</p>
						</form>
					{:else}
						<div class="lead-thanks">
							<div class="lead-thanks-icon">✓</div>
							<div class="lead-thanks-title">{formularz.potwierdzenie.tytul}</div>
							<p class="lead-thanks-desc">{formularz.potwierdzenie.opis}</p>
						</div>
					{/if}
				</div>
			</div>
		</section>

		<!-- ============ POWIĄZANE USŁUGI ============ -->
		<section class="section related-section">
			<div class="eyebrow">Zobacz też</div>
			<div class="related-grid">
				{#each powiazane as r}
					<a href={r.slug} class="related-card">
						<div class="related-t">{r.t}</div>
						<div class="related-d">{r.d}</div>
						<div class="related-more">Dowiedz się więcej →</div>
					</a>
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

	/* ===== ZAKRES ===== */
	.zakres-section {
		padding: 64px 48px;
		background: var(--green);
		color: var(--on-green);
	}
	.zakres-h2 {
		color: var(--on-green);
	}
	.zakres-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px 44px;
	}
	.zakres-item {
		display: flex;
		align-items: flex-start;
		gap: 13px;
		padding: 12px 0;
		border-bottom: 1px solid rgba(243, 238, 225, 0.14);
	}
	.zakres-check {
		flex: 0 0 auto;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: rgba(233, 209, 154, 0.16);
		border: 1px solid rgba(233, 209, 154, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gold-light);
		font-size: 13px;
		font-weight: 700;
	}
	.zakres-text {
		font-size: 16px;
		line-height: 1.45;
	}
	/* ===== NA ODLEGŁOŚĆ ===== */
	.odl-section {
		padding-top: 88px;
		padding-bottom: 88px;
	}
	.odl-panel {
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		gap: 44px;
		align-items: center;
		background: var(--bg-cream);
		border: 1px solid var(--border);
		border-radius: 20px;
		padding: 48px;
	}
	.odl-h2 {
		font-size: 33px;
		line-height: 1.22;
		margin-bottom: 16px;
	}
	.odl-h2 :global(em) {
		font-style: italic;
		color: var(--gold);
	}
	.odl-p {
		font-size: 15.5px;
		line-height: 1.72;
		color: var(--muted);
		margin: 0 0 14px;
	}
	.odl-p:last-child {
		margin-bottom: 0;
	}
	.odl-kafle {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.odl-kafel {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 18px;
	}
	.odl-ico {
		flex: none;
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border-radius: 12px;
		background: rgba(180, 137, 76, 0.12);
		color: var(--gold);
	}
	.odl-ico svg {
		width: 22px;
		height: 22px;
	}
	.odl-kt {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 17px;
		margin-bottom: 4px;
	}
	.odl-kd {
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--muted);
		margin: 0;
	}

	/* ===== CTA / FORMULARZ ===== */
	.lead-section {
		padding-top: 20px;
		padding-bottom: 72px;
	}
	.lead-box {
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--border);
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
	}
	.lead-info {
		background: var(--green);
		color: var(--on-green);
		padding: 44px 40px;
	}
	.lead-h2 {
		color: var(--on-green);
		font-size: 32px;
		line-height: 1.15;
		margin-bottom: 16px;
	}
	.lead-sub {
		font-size: 16px;
		line-height: 1.65;
		color: rgba(243, 238, 225, 0.82);
		margin-bottom: 28px;
	}
	.lead-contact {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.lead-contact-label {
		font-size: 12px;
		color: var(--gold-soft);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 3px;
	}
	.lead-contact-value {
		font-size: 16px;
		font-weight: 600;
	}
	.lead-contact-value.big {
		font-size: 18px;
		font-weight: 700;
	}
	.lead-form-wrap {
		background: #fff;
		padding: 40px;
		display: flex;
	}
	.lead-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
	}
	.lead-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--label);
		font-weight: 600;
	}
	.lead-field input,
	.lead-field select,
	.lead-field textarea {
		border: 1px solid var(--divider);
		border-radius: 12px;
		padding: 13px 15px;
		font-size: 15px;
		color: var(--text);
		background: var(--bg-site);
		font-family: inherit;
		text-transform: none;
		letter-spacing: normal;
		font-weight: 400;
	}
	.lead-field textarea {
		resize: vertical;
	}
	.lead-field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
	.lead-field-row.uneven {
		grid-template-columns: 1.3fr 0.7fr;
	}
	.lead-submit {
		margin-top: 4px;
		background: var(--green);
		color: #fff;
		border: none;
		border-radius: 12px;
		padding: 15px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
	}
	.lead-submit:hover {
		opacity: 0.92;
	}
	.lead-fineprint {
		font-size: 12px;
		color: var(--label);
		line-height: 1.5;
	}
	.lead-thanks {
		margin: auto;
		min-height: 360px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 16px;
	}
	.lead-thanks-icon {
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
	.lead-thanks-title {
		font-family: 'Newsreader', serif;
		font-size: 26px;
		font-weight: 500;
	}
	.lead-thanks-desc {
		font-size: 16px;
		line-height: 1.6;
		color: var(--muted);
		max-width: 340px;
	}

	/* ===== POWIĄZANE ===== */
	.related-section {
		padding-top: 0;
		padding-bottom: 76px;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
		margin-top: 16px;
	}
	.related-card {
		display: block;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 22px 24px;
		box-shadow: 0 16px 30px -24px rgba(30, 40, 30, 0.5);
	}
	.related-t {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.2;
	}
	.related-d {
		font-size: 13.5px;
		color: var(--muted);
		line-height: 1.5;
		margin-top: 8px;
	}
	.related-more {
		color: var(--green);
		font-weight: 600;
		font-size: 14px;
		margin-top: 14px;
		border-bottom: 1.5px solid var(--gold);
		display: inline-block;
		padding-bottom: 2px;
	}

	/* ===== RESPONSYWNOŚĆ ===== */
	@media (max-width: 1199px) {
		.related-grid {
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
		.lead-box {
			grid-template-columns: 1fr;
		}
		.zakres-grid {
			grid-template-columns: 1fr;
		}
		.odl-section {
			padding-top: 56px;
			padding-bottom: 56px;
		}
		.odl-panel {
			grid-template-columns: 1fr;
			gap: 24px;
			padding: 24px 20px;
			border-radius: 16px;
		}
		.odl-h2 {
			font-size: 25px;
		}
		.odl-p {
			font-size: 14px;
		}
	}
	@media (max-width: 760px) {
		.related-grid {
			grid-template-columns: 1fr;
		}
		.lead-field-row,
		.lead-field-row.uneven {
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
		.lead-section,
		.related-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.zakres-section {
			padding: 36px 20px;
		}
		.lead-info,
		.lead-form-wrap {
			padding: 26px 22px;
		}
	}
</style>
