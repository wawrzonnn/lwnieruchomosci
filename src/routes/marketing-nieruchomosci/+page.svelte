<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import {
		seo,
		breadcrumbs,
		hero,
		pasekKanalow,
		zdjecia,
		film,
		dron,
		socialMedia,
		portale,
		realizacje,
		faq,
		formularz,
		powiazane
	} from '$lib/data/marketing-nieruchomosci';

	// ── Slider realizacji ──
	let slideIdx = $state(0);
	function prevSlide() {
		slideIdx = (slideIdx - 1 + realizacje.slajdy.length) % realizacje.slajdy.length;
	}
	function nextSlide() {
		slideIdx = (slideIdx + 1) % realizacje.slajdy.length;
	}

	// ── FAQ: akordeon z pojedynczym rozwinięciem ──
	let faqOpen = $state(0);
	function toggleFaq(i: number) {
		faqOpen = faqOpen === i ? -1 : i;
	}

	// ── Formularz: potwierdzenie po wysłaniu ──
	let formSubmitted = $state(false);
	function onSubmitForm(e: SubmitEvent) {
		e.preventDefault();
		formSubmitted = true;
	}
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

		<!-- ============ 1. HERO ============ -->
		<section
			class="hero-svc"
			style="background-image:linear-gradient(105deg,rgba(18,26,20,.74) 0%,rgba(18,26,20,.42) 52%,rgba(18,26,20,.18) 100%),url('{hero.tlo}')"
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

		<!-- ============ PASEK KANAŁÓW ============ -->
		<section class="kanaly-bar">
			<div class="kanaly-haslo">
				Pełny pakiet marketingowy <strong>w standardzie każdej oferty sprzedaży</strong> — bez dodatkowych
				dopłat.
			</div>
			<div class="kanaly-chipy">
				{#each pasekKanalow.chipy as chip}
					<span class="kanaly-chip">{chip}</span>
				{/each}
			</div>
		</section>

		<!-- ============ 2. ZDJĘCIA ============ -->
		<section class="section channel-section zdjecia-grid">
			<div class="channel-header">
				<div class="eyebrow">{zdjecia.eyebrow}</div>
				<h2 class="h2 channel-h2">
					{zdjecia.tytul.split(zdjecia.tytulEmfaza)[0]}<em>{zdjecia.tytulEmfaza}</em>{zdjecia.tytul.split(
						zdjecia.tytulEmfaza
					)[1]}
				</h2>
			</div>
			<div class="channel-media">
				<img src={zdjecia.zdjecie} alt="Profesjonalna sesja wnętrza" />
			</div>
			<div class="channel-body">
				<p class="channel-opis">{zdjecia.opis}</p>
				<div class="channel-checklist">
					{#each zdjecia.punkty as p}
						<div class="chk-item"><span>✓</span>{p}</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ 3. FILMY ============ -->
		<section class="section channel-section film-grid">
			<div class="channel-media film-media">
				<img src={film.zdjecie} alt="Film-spacer po nieruchomości" />
				<div class="film-grad"></div>
				<div class="film-play" aria-hidden="true"><span class="film-play-icon"></span></div>
				<span class="film-badge">{film.badge}</span>
			</div>
			<div class="channel-header">
				<div class="eyebrow">{film.eyebrow}</div>
				<h2 class="h2 channel-h2">
					{film.tytul.split(film.tytulEmfaza)[0]}<em>{film.tytulEmfaza}</em>{film.tytul.split(
						film.tytulEmfaza
					)[1]}
				</h2>
			</div>
			<div class="channel-body">
				<p class="channel-opis">{film.opis}</p>
				<div class="channel-checklist">
					{#each film.punkty as p}
						<div class="chk-item"><span>✓</span>{p}</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ 4. DRON (full-bleed) ============ -->
		<section
			class="dron-section"
			style="background-image:linear-gradient(100deg,rgba(18,26,20,.86) 0%,rgba(18,26,20,.55) 48%,rgba(18,26,20,.15) 100%),url('{dron.tlo}')"
		>
			<div class="dron-copy">
				<div class="dron-eyebrow">{dron.eyebrow}</div>
				<h2 class="dron-h2">
					{dron.tytul.split(dron.tytulEmfaza)[0]}<em>{dron.tytulEmfaza}</em>{dron.tytul.split(
						dron.tytulEmfaza
					)[1]}
				</h2>
				<p class="dron-lead">{dron.opis}</p>
				<div class="dron-stats">
					{#each dron.statystyki as s}
						<div class="dron-stat">
							<div class="dron-stat-v">{s.wartosc}</div>
							<div class="dron-stat-l">{s.opis}</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ 5. SOCIAL MEDIA ============ -->
		<section class="section social-section">
			<div class="social-grid">
				<div>
					<div class="eyebrow">{socialMedia.eyebrow}</div>
					<h2 class="h2 channel-h2">
						{socialMedia.tytul.split(socialMedia.tytulEmfaza)[0]}<em
							>{socialMedia.tytulEmfaza}</em
						>{socialMedia.tytul.split(socialMedia.tytulEmfaza)[1]}
					</h2>
					<p class="channel-opis">{socialMedia.opis}</p>
					<div class="channel-checklist">
						{#each socialMedia.punkty as p}
							<div class="chk-item"><span>✓</span>{p}</div>
						{/each}
					</div>
				</div>
				<div class="mockups">
					{#each socialMedia.makiety as m, i}
						<div class="mockup-card" class:offset={i === 1}>
							<div class="mockup-head">
								{#if m.platforma === 'Facebook'}
									<div class="mockup-avatar fb">LW</div>
								{:else}
									<div class="mockup-avatar ig">◎</div>
								{/if}
								<div class="mockup-who">
									<div class="mockup-name">{m.autor}</div>
									<div class="mockup-sub">{m.podpis}</div>
								</div>
							</div>
							<div class="mockup-text">{m.tresc}</div>
							{#if m.reakcje}
								<div class="mockup-image"></div>
								<div class="mockup-reactions">
									{#each m.reakcje.split(' · ') as r}<span>{r}</span>{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ 6. PORTALE OGŁOSZENIOWE ============ -->
		<section class="section portale-section">
			<div class="portale-panel">
				<div>
					<div class="eyebrow">{portale.eyebrow}</div>
					<h2 class="h2 portale-h2">
						{portale.tytul.split(portale.tytulEmfaza)[0]}<em
							>{portale.tytulEmfaza}</em
						>{portale.tytul.split(portale.tytulEmfaza)[1]}
					</h2>
					<p class="channel-opis">{portale.opis}</p>
				</div>
				<div class="portale-grid">
					{#each portale.portale as p}
						<div class="portal-chip">{p}</div>
					{/each}
					<div class="portal-chip highlighted">{portale.portalWyrozniony}</div>
				</div>
			</div>
		</section>

		<!-- ============ 7. PRZYKŁADY REALIZACJI (slider) ============ -->
		<section class="section realizacje-section" id="realizacje">
			<div class="realizacje-head">
				<div class="realizacje-head-text">
					<div class="eyebrow">{realizacje.eyebrow}</div>
					<h2 class="h2">{realizacje.tytul}</h2>
				</div>
				<div class="realizacje-arrows desktop-only">
					<button type="button" class="rz-arrow" aria-label="Poprzednie" onclick={prevSlide}>‹</button>
					<button type="button" class="rz-arrow" aria-label="Następne" onclick={nextSlide}>›</button>
				</div>
			</div>
			<div class="realizacje-media">
				{#each realizacje.slajdy as slide, i}
					<div class="realizacje-slide" class:active={i === slideIdx}>
						<img src={slide.img} alt={slide.caption} />
						<div class="realizacje-slide-grad"></div>
						<div class="realizacje-slide-copy">
							<div class="realizacje-slide-tag">{slide.tag}</div>
							<div class="realizacje-slide-caption">{slide.caption}</div>
						</div>
					</div>
				{/each}
				<div class="realizacje-counter">{slideIdx + 1} / {realizacje.slajdy.length}</div>
				<button
					type="button"
					class="rz-arrow rz-arrow-mobile left mobile-only"
					aria-label="Poprzednie"
					onclick={prevSlide}>‹</button
				>
				<button
					type="button"
					class="rz-arrow rz-arrow-mobile right mobile-only"
					aria-label="Następne"
					onclick={nextSlide}>›</button
				>
			</div>
			<div class="realizacje-dots">
				{#each realizacje.slajdy as _, i}
					<button
						type="button"
						class="rz-dot"
						class:active={i === slideIdx}
						aria-label="Pokaż slajd {i + 1}"
						onclick={() => (slideIdx = i)}
					></button>
				{/each}
			</div>
			<p class="realizacje-note">{realizacje.uwaga}</p>
		</section>

		<!-- ============ 8. FAQ (na zielonym tle) ============ -->
		<section class="faq-green-section" id="faq">
			<div class="faq-grid">
				<div class="faq-intro">
					<div class="eyebrow eyebrow-green">{faq.eyebrow}</div>
					<h2 class="h2 faq-green-h2">{faq.tytul}</h2>
					<p class="faq-green-lead">
						Najczęstsze pytania o promocję ofert. Nie znalazłeś swojego? Napisz — chętnie doradzimy.
					</p>
					<a href={faq.cta.href} class="faq-green-cta">{faq.cta.label}</a>
				</div>
				<div class="faq-green-list">
					{#each faq.lista as item, i}
						<div class="faq-green-item" class:open={faqOpen === i}>
							<button
								type="button"
								class="faq-green-q"
								aria-expanded={faqOpen === i}
								onclick={() => toggleFaq(i)}
							>
								<span class="faq-green-q-text">{item.q}</span>
								<span class="faq-green-icon" aria-hidden="true">{faqOpen === i ? '−' : '+'}</span>
								<span class="faq-chevron" class:open={faqOpen === i} aria-hidden="true">⌄</span>
							</button>
							{#if faqOpen === i}
								<div class="faq-green-panel">
									<p class="faq-green-answer">{item.a}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ 9. CTA / FORMULARZ ============ -->
		<section class="section lead-section" id="formularz">
			<div class="lead-box">
				<div class="lead-info light">
					<div class="eyebrow">{formularz.eyebrow}</div>
					<h2 class="h2 lead-h2 dark">{formularz.tytul}</h2>
					<p class="lead-sub dark">{formularz.podtytul}</p>
					<div class="lead-contact">
						<div>
							<div class="lead-contact-label light">Telefon</div>
							<div class="lead-contact-value big dark">{formularz.kontakt.telefon}</div>
						</div>
						<div>
							<div class="lead-contact-label light">E-mail</div>
							<div class="lead-contact-value dark">{formularz.kontakt.email}</div>
						</div>
						<div>
							<div class="lead-contact-label light">Godziny</div>
							<div class="lead-contact-value dark">{formularz.kontakt.godziny}</div>
						</div>
					</div>
				</div>
				<div class="lead-form-wrap">
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
							<div class="lead-field-row">
								<label class="lead-field">
									Rodzaj
									<select name="type">
										<option>Mieszkanie</option>
										<option>Dom</option>
										<option>Działka</option>
										<option>Lokal</option>
									</select>
								</label>
								<label class="lead-field">
									Zakres
									<select name="scope">
										<option>Pełny pakiet</option>
										<option>Zdjęcia</option>
										<option>Film</option>
										<option>Dron</option>
										<option>Inny</option>
									</select>
								</label>
							</div>
							<label class="lead-field">
								Wiadomość
								<textarea
									name="message"
									rows="3"
									placeholder="Napisz o nieruchomości i czego potrzebujesz…"
								></textarea>
							</label>
							<button type="submit" class="lead-submit">{formularz.przycisk}</button>
							<p class="lead-fineprint">
								Wysyłając formularz, zgadzasz się na kontakt w sprawie marketingu. Nie wysyłamy spamu.
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

	/* ===== PASEK KANAŁÓW ===== */
	.kanaly-bar {
		padding: 34px 48px;
		border-bottom: 1px solid var(--nav-border);
		background: var(--bg-cream-2);
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 18px;
	}
	.kanaly-haslo {
		font-size: 14px;
		color: var(--muted);
		max-width: 420px;
		line-height: 1.5;
		strong {
			color: var(--green);
		}
	}
	.kanaly-chipy {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.kanaly-chip {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 9px 16px;
		font-size: 13px;
		font-weight: 600;
		color: var(--green);
	}

	/* ===== SEKCJE KANAŁÓW (zdjęcia / film) — wspólny wzorzec ===== */
	.channel-section {
		padding-top: 40px;
		padding-bottom: 40px;
	}
	.channel-h2 {
		margin-bottom: 18px;
		em {
			font-style: italic;
			color: var(--gold);
		}
	}
	.channel-opis {
		font-size: 17px;
		line-height: 1.7;
		color: var(--muted);
		margin-bottom: 22px;
	}
	.channel-checklist {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.chk-item {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 15.5px;
		color: var(--text);
		span {
			flex: 0 0 auto;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background: rgba(180, 137, 76, 0.15);
			color: var(--gold);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			font-weight: 800;
		}
	}
	.channel-media {
		position: relative;
		height: 440px;
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: 0 30px 60px -34px rgba(30, 40, 30, 0.55);
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.zdjecia-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: 'header media' 'body media';
		gap: 8px 60px;
		align-items: center;
	}
	.film-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: 'media header' 'media body';
		gap: 8px 60px;
		align-items: center;
	}
	.channel-header {
		grid-area: header;
		align-self: end;
	}
	.channel-body {
		grid-area: body;
		align-self: start;
	}
	.zdjecia-grid .channel-media,
	.film-grid .channel-media {
		grid-area: media;
	}

	/* ---- film: miniatura z przyciskiem play ---- */
	.film-media {
		height: 440px;
	}
	.film-grad {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(18, 26, 20, 0.45), rgba(18, 26, 20, 0.12));
	}
	.film-play {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 78px;
		height: 78px;
		border-radius: 50%;
		background: rgba(251, 248, 242, 0.94);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 16px 34px -14px rgba(0, 0, 0, 0.55);
	}
	.film-play-icon {
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 13px 0 13px 20px;
		border-color: transparent transparent transparent var(--green);
		margin-left: 5px;
	}
	.film-badge {
		position: absolute;
		bottom: 18px;
		left: 18px;
		background: rgba(35, 39, 31, 0.72);
		color: #fff;
		font-size: 12px;
		font-weight: 600;
		padding: 6px 13px;
		border-radius: 999px;
	}

	/* ===== DRON (full-bleed) ===== */
	.dron-section {
		position: relative;
		margin-top: 38px;
		min-height: 520px;
		display: flex;
		align-items: center;
		background-size: cover;
		background-position: center;
	}
	.dron-copy {
		padding: 72px 48px;
		max-width: 640px;
		color: #fff;
	}
	.dron-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		background: rgba(233, 209, 154, 0.16);
		border: 1px solid rgba(233, 209, 154, 0.45);
		color: var(--gold-light);
		padding: 7px 15px;
		border-radius: 999px;
		margin-bottom: 20px;
	}
	.dron-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 44px;
		line-height: 1.08;
		margin-bottom: 18px;
		em {
			font-style: italic;
			color: var(--gold-light);
		}
	}
	.dron-lead {
		font-size: 18px;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.9);
		max-width: 540px;
	}
	.dron-stats {
		display: flex;
		gap: 28px;
		flex-wrap: wrap;
		margin-top: 30px;
	}
	.dron-stat-v {
		font-family: 'Newsreader', serif;
		font-size: 34px;
		color: var(--gold-light);
	}
	.dron-stat-l {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.72);
		letter-spacing: 0.04em;
	}

	/* ===== SOCIAL MEDIA ===== */
	.social-section {
		padding-top: 78px;
		padding-bottom: 40px;
	}
	.social-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: center;
	}
	.mockups {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.mockup-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 18px;
		box-shadow: 0 18px 36px -26px rgba(30, 40, 30, 0.55);
	}
	.mockup-card.offset {
		margin-left: 38px;
	}
	.mockup-head {
		display: flex;
		align-items: center;
		gap: 11px;
		margin-bottom: 12px;
	}
	.mockup-avatar {
		flex: none;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
	}
	.mockup-avatar.fb {
		background: var(--green);
		color: var(--gold-logo, #e9d9ae);
		font-family: 'Newsreader', serif;
		font-size: 15px;
	}
	.mockup-avatar.ig {
		background: linear-gradient(135deg, var(--gold), var(--gold-light));
		color: #fff;
		font-size: 16px;
	}
	.mockup-name {
		font-weight: 700;
		font-size: 14px;
	}
	.mockup-sub {
		font-size: 12px;
		color: var(--label);
	}
	.mockup-text {
		font-size: 14px;
		color: #3a3e33;
		line-height: 1.5;
		margin-bottom: 12px;
	}
	.mockup-image {
		height: 120px;
		border-radius: 10px;
		background: linear-gradient(120deg, #e7e1d2, var(--gold-soft));
	}
	.mockup-reactions {
		display: flex;
		gap: 18px;
		margin-top: 12px;
		font-size: 13px;
		color: var(--muted);
		font-weight: 600;
	}

	/* ===== PORTALE OGŁOSZENIOWE ===== */
	.portale-section {
		padding-top: 38px;
		padding-bottom: 46px;
	}
	.portale-panel {
		background: var(--bg-cream);
		border: 1px solid var(--border);
		border-radius: 22px;
		padding: 48px;
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 48px;
		align-items: center;
	}
	.portale-h2 {
		margin-bottom: 16px;
		em {
			font-style: italic;
			color: var(--gold);
		}
	}
	.portale-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}
	.portal-chip {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 20px 16px;
		text-align: center;
		font-family: 'Newsreader', serif;
		font-size: 19px;
		color: var(--green);
	}
	.portal-chip.highlighted {
		background: var(--green);
		border-color: var(--green);
		color: var(--gold-light);
		line-height: 1.25;
	}

	/* ===== PRZYKŁADY REALIZACJI (slider) ===== */
	.realizacje-section {
		padding-top: 38px;
		padding-bottom: 76px;
	}
	.realizacje-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 26px;
		flex-wrap: wrap;
	}
	.realizacje-head-text {
		max-width: 600px;
	}
	.realizacje-arrows {
		display: flex;
		gap: 10px;
	}
	.rz-arrow {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid #e0d9c8;
		background: #fff;
		color: var(--green);
		font-size: 22px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.rz-arrow:hover {
		background: var(--bg-cream-2);
	}
	.realizacje-media {
		position: relative;
		height: 540px;
		border-radius: 22px;
		overflow: hidden;
		background: #ede8dc;
		border: 1px solid var(--border);
	}
	.realizacje-slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.55s ease;
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.realizacje-slide.active {
		opacity: 1;
	}
	.realizacje-slide-grad {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(18, 26, 20, 0.72), rgba(18, 26, 20, 0.05) 55%);
	}
	.realizacje-slide-copy {
		position: absolute;
		left: 36px;
		bottom: 34px;
		right: 36px;
		color: #fff;
	}
	.realizacje-slide-tag {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--gold-light);
		font-weight: 700;
		margin-bottom: 9px;
	}
	.realizacje-slide-caption {
		font-family: 'Newsreader', serif;
		font-size: 28px;
		font-weight: 500;
		line-height: 1.15;
	}
	.realizacje-counter {
		position: absolute;
		top: 20px;
		right: 22px;
		background: rgba(35, 39, 31, 0.6);
		backdrop-filter: blur(4px);
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		padding: 7px 14px;
		border-radius: 999px;
		z-index: 2;
	}
	.rz-arrow-mobile {
		display: none;
	}
	.realizacje-dots {
		display: flex;
		gap: 10px;
		justify-content: center;
		margin-top: 22px;
	}
	.rz-dot {
		width: 34px;
		height: 5px;
		border-radius: 999px;
		border: none;
		padding: 0;
		cursor: pointer;
		background: #d8d1c0;
		transition: background 0.3s;
	}
	.rz-dot.active {
		background: var(--green);
	}
	.realizacje-note {
		font-size: 14px;
		color: var(--label);
		margin-top: 18px;
		text-align: center;
	}

	/* ===== FAQ (na zielonym tle) ===== */
	.faq-green-section {
		padding: 76px 48px 44px;
		background: var(--green);
		color: var(--on-green);
	}
	.faq-grid {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 56px;
		align-items: start;
	}
	.faq-green-h2 {
		color: var(--on-green);
		margin-bottom: 16px;
	}
	.faq-green-lead {
		font-size: 16px;
		line-height: 1.65;
		color: rgba(243, 238, 225, 0.82);
		margin-bottom: 24px;
		max-width: 340px;
	}
	.faq-green-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--gold-light);
		color: var(--green);
		padding: 13px 26px;
		border-radius: 999px;
		font-weight: 700;
		font-size: 15px;
	}
	.faq-green-list {
		border-bottom: 1px solid rgba(243, 238, 225, 0.18);
	}
	.faq-green-item {
		position: relative;
		border-top: 1px solid rgba(243, 238, 225, 0.18);
	}
	.faq-green-item.open {
		background: rgba(233, 209, 154, 0.08);
	}
	.faq-green-q {
		position: relative;
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		border-left: 3px solid transparent;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 22px 18px;
	}
	.faq-green-item.open .faq-green-q {
		border-left-color: var(--gold-light);
	}
	.faq-green-q-text {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 500;
		color: var(--bg-site);
		line-height: 1.3;
	}
	.faq-green-icon {
		flex: 0 0 auto;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid rgba(233, 209, 154, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gold-light);
		font-size: 18px;
		line-height: 1;
	}
	.faq-chevron {
		display: none;
	}
	.faq-green-panel {
		position: relative;
		padding: 0 18px 24px;
	}
	.faq-green-answer {
		font-size: 16px;
		line-height: 1.7;
		color: rgba(243, 238, 225, 0.85);
		max-width: 620px;
	}

	/* ===== CTA / FORMULARZ ===== */
	.lead-section {
		padding-top: 72px;
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
		padding: 44px 40px;
	}
	.lead-info.light {
		background: var(--bg-cream);
		color: var(--text);
	}
	.lead-h2 {
		font-size: 32px;
		line-height: 1.15;
		margin-bottom: 16px;
	}
	.lead-sub {
		font-size: 16px;
		line-height: 1.65;
		margin-bottom: 28px;
	}
	.lead-sub.dark {
		color: var(--muted);
	}
	.lead-contact {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.lead-contact-label {
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 3px;
	}
	.lead-contact-label.light {
		color: var(--label);
	}
	.lead-contact-value {
		font-size: 16px;
		font-weight: 600;
	}
	.lead-contact-value.dark {
		color: var(--text);
	}
	.lead-contact-value.big {
		font-size: 18px;
		font-weight: 700;
		color: var(--green);
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

	.mobile-only {
		display: none;
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
		.zdjecia-grid,
		.film-grid {
			grid-template-columns: 1fr;
			grid-template-areas: 'header' 'media' 'body';
			gap: 16px;
		}
		.channel-media,
		.film-media {
			height: 320px;
		}
		.social-grid {
			grid-template-columns: 1fr;
		}
		.mockups {
			margin-top: 8px;
		}
		.mockup-card.offset {
			margin-left: 0;
		}
		.portale-panel {
			grid-template-columns: 1fr;
		}
		.faq-grid {
			grid-template-columns: 1fr;
		}
		.lead-box {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 760px) {
		.related-grid {
			grid-template-columns: 1fr;
		}
		.lead-field-row {
			grid-template-columns: 1fr;
		}
		.portale-grid {
			grid-template-columns: 1fr 1fr;
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
		.kanaly-bar {
			padding: 20px;
		}
		.channel-section,
		.social-section,
		.portale-section,
		.realizacje-section,
		.lead-section,
		.related-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.channel-media,
		.film-media {
			height: 210px;
		}
		.film-play {
			width: 60px;
			height: 60px;
		}
		.film-play-icon {
			border-width: 10px 0 10px 16px;
		}
		.dron-copy {
			padding: 28px 20px 30px;
		}
		.dron-h2 {
			font-size: 26px;
		}
		.dron-lead {
			font-size: 14px;
		}
		.portale-panel {
			padding: 24px 20px;
		}
		.portale-grid {
			grid-template-columns: 1fr 1fr;
		}
		.realizacje-media {
			height: 300px;
		}
		.realizacje-slide-copy {
			left: 16px;
			right: 16px;
			bottom: 16px;
		}
		.realizacje-slide-caption {
			font-size: 18px;
		}
		.realizacje-counter {
			top: 12px;
			right: 12px;
		}
		.realizacje-arrows.desktop-only {
			display: none;
		}
		.rz-arrow-mobile.mobile-only {
			display: flex;
		}
		.rz-arrow-mobile {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 40px;
			height: 40px;
			border: none;
			background: rgba(251, 248, 242, 0.92);
			box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.5);
			z-index: 2;
		}
		.rz-arrow-mobile.left {
			left: 12px;
		}
		.rz-arrow-mobile.right {
			right: 12px;
		}
		.faq-green-section {
			padding: 36px 20px;
		}
		.faq-green-lead {
			font-size: 13px;
			max-width: none;
		}
		.faq-green-q-text {
			font-size: 15.5px;
		}
		.faq-green-icon {
			display: none;
		}
		.faq-chevron {
			display: block;
			font-size: 18px;
			color: var(--gold-light);
			transition: transform 0.2s ease;
		}
		.faq-chevron.open {
			transform: rotate(180deg);
		}
		.lead-info,
		.lead-form-wrap {
			padding: 26px 22px;
		}
	}
</style>
