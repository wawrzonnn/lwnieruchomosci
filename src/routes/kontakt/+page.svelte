<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import {
		seo,
		breadcrumbs,
		hero,
		dane,
		godziny,
		social,
		formularz,
		mapaEmbed
	} from '$lib/data/kontakt-strona';

	let formSubmitted = $state(false);
	function onSubmitForm(e: SubmitEvent) {
		e.preventDefault();
		formSubmitted = true;
	}

	const phoneHref = `tel:${dane.telefon.replace(/\s/g, '')}`;
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
			class="hero-contact"
			style="background-image:linear-gradient(105deg,rgba(18,26,20,.74) 0%,rgba(18,26,20,.42) 52%,rgba(18,26,20,.2) 100%),url('{hero.tlo}')"
		>
			<div class="hero-contact-copy">
				<span class="hero-contact-eyebrow">{hero.eyebrow}</span>
				<h1 class="hero-contact-h1">
					{hero.tytul.split(hero.tytulEmfaza)[0]}<em>{hero.tytulEmfaza}</em>{hero.tytul.split(
						hero.tytulEmfaza
					)[1]}
				</h1>
				<p class="hero-contact-lead">{hero.podtytul}</p>
			</div>
		</section>

		<!-- ============ DANE + FORMULARZ ============ -->
		<section class="section contact-section" id="formularz">
			<div class="contact-grid">
				<div class="contact-info">
					<div class="eyebrow eyebrow-green">Dane kontaktowe</div>
					<div class="contact-info-list">
						<div>
							<div class="contact-info-label">Telefon</div>
							<a href={phoneHref} class="contact-info-value big">{dane.telefon}</a>
						</div>
						<div>
							<div class="contact-info-label">E-mail</div>
							<a href="mailto:{dane.email}" class="contact-info-value">{dane.email}</a>
						</div>
						<div>
							<div class="contact-info-label">Biuro mobilne</div>
							<div class="contact-info-value plain">{dane.adres}</div>
						</div>
					</div>

					<div class="contact-divider"></div>

					<div class="eyebrow eyebrow-green">Godziny pracy</div>
					<div class="hours-list">
						{#each godziny as g}
							<div class="hours-row">
								<span class="hours-day">{g.d}</span>
								<span class="hours-value">{g.h}</span>
							</div>
						{/each}
					</div>

					<div class="social-block">
						<div class="eyebrow eyebrow-green">Social media</div>
						<div class="social-row">
							{#each social as s}
								<a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.nazwa} class="social-btn"
									>{s.znak}</a
								>
							{/each}
						</div>
					</div>
				</div>

				<div class="contact-form-card">
					<div class="eyebrow">{formularz.eyebrow}</div>
					<h2 class="h2 contact-form-h2">{formularz.tytul}</h2>
					{#if !formSubmitted}
						<form class="lead-form" onsubmit={onSubmitForm}>
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
							<label class="lead-field">
								Temat
								<select name="topic">
									<option>Sprzedaż nieruchomości</option>
									<option>Kupno nieruchomości</option>
									<option>Wycena</option>
									<option>Doradztwo kredytowe</option>
									<option>Marketing</option>
									<option>Inne</option>
								</select>
							</label>
							<label class="lead-field">
								Wiadomość
								<textarea name="message" rows="4" placeholder="W czym możemy pomóc?"></textarea>
							</label>
							<button type="submit" class="lead-submit">{formularz.przycisk}</button>
							<p class="lead-fineprint">
								Odpowiadamy zwykle tego samego dnia roboczego. Nie wysyłamy spamu.
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

		<!-- ============ MAPA ============ -->
		<section class="section map-section">
			<div class="map-box">
				<iframe src={mapaEmbed} title="Mapa — lokalizacja biura" loading="lazy"></iframe>
			</div>
		</section>

		<LandingFooter />
	</div>
</div>

<style lang="scss">
	.site {
		width: 1440px;
		max-width: 100%;
		margin: 0 auto;
	}

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
	.hero-contact {
		position: relative;
		height: 400px;
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 72px;
	}
	.hero-contact-copy {
		max-width: 680px;
		color: #fff;
	}
	.hero-contact-eyebrow {
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
	.hero-contact-h1 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 52px;
		line-height: 1.07;
		letter-spacing: -0.01em;
		margin-bottom: 16px;
		em {
			font-style: italic;
			color: var(--gold-light);
		}
	}
	.hero-contact-lead {
		font-size: 18px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.9);
		max-width: 540px;
	}

	/* ===== DANE + FORMULARZ ===== */
	.contact-section {
		padding-top: 64px;
		padding-bottom: 64px;
	}
	.contact-grid {
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 40px;
		align-items: stretch;
	}
	.contact-info {
		background: var(--green);
		color: var(--on-green);
		border-radius: 20px;
		padding: 44px 40px;
	}
	.contact-info-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.contact-info-label {
		font-size: 12px;
		color: var(--gold-soft);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 4px;
	}
	.contact-info-value {
		font-size: 17px;
		font-weight: 600;
		color: var(--on-green);
	}
	.contact-info-value.big {
		font-size: 22px;
		font-weight: 700;
		color: #fff;
	}
	.contact-info-value.plain {
		font-size: 17px;
		font-weight: 600;
	}
	.contact-divider {
		height: 1px;
		background: rgba(243, 238, 225, 0.18);
		margin: 28px 0;
	}
	.hours-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.hours-row {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		font-size: 15px;
		border-bottom: 1px solid rgba(243, 238, 225, 0.12);
		padding-bottom: 9px;
	}
	.hours-day {
		color: rgba(243, 238, 225, 0.82);
	}
	.hours-value {
		font-weight: 600;
	}
	.social-block {
		margin-top: 28px;
	}
	.social-row {
		display: flex;
		gap: 12px;
	}
	.social-btn {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(233, 209, 154, 0.14);
		border: 1px solid rgba(233, 209, 154, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gold-light);
		font-size: 13px;
		font-weight: 700;
	}
	.social-btn:hover {
		background: rgba(233, 209, 154, 0.24);
	}

	.contact-form-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 20px;
		padding: 44px 40px;
		box-shadow: 0 26px 54px -32px rgba(30, 40, 30, 0.55);
	}
	.contact-form-h2 {
		font-size: 30px;
		line-height: 1.15;
		margin-bottom: 24px;
	}
	.lead-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
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
		min-height: 380px;
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

	/* ===== MAPA ===== */
	.map-section {
		padding-top: 0;
		padding-bottom: 64px;
	}
	.map-box {
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--border);
		height: 440px;
		iframe {
			width: 100%;
			height: 100%;
			border: 0;
			filter: saturate(0.9);
		}
	}

	/* ===== RESPONSYWNOŚĆ ===== */
	@media (max-width: 980px) {
		.hero-contact {
			padding: 0 40px;
			height: auto;
			min-height: 340px;
			padding-top: 60px;
			padding-bottom: 40px;
		}
		.hero-contact-h1 {
			font-size: 40px;
		}
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.breadcrumbs {
			padding-left: 20px;
			padding-right: 20px;
		}
		.hero-contact {
			padding-left: 20px;
			padding-right: 20px;
			height: 320px;
			min-height: 0;
		}
		.hero-contact-h1 {
			font-size: 29px;
			line-height: 1.1;
		}
		.hero-contact-lead {
			font-size: 14px;
		}
		.contact-section,
		.map-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.contact-info,
		.contact-form-card {
			padding: 26px 22px;
		}
		.contact-form-h2 {
			font-size: 23px;
		}
		.map-box {
			height: 260px;
			border-radius: 16px;
		}
	}
</style>
