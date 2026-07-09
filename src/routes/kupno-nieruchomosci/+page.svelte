<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import {
		seo,
		breadcrumbs,
		hero,
		opis,
		pomagamy,
		etapy,
		formalnosci,
		faq,
		formularz,
		powiazane
	} from '$lib/data/kupno-nieruchomosci';

	// ── FAQ: akordeon z pojedynczym rozwinięciem ──
	let faqOpen = $state(0);
	function toggleFaq(i: number) {
		faqOpen = faqOpen === i ? -1 : i;
	}

	// ── Formularz: potwierdzenie po wysłaniu (podłącz pod backend/e-mail) ──
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

		<!-- ============ HERO ============ -->
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

		<!-- ============ OPIS USŁUGI ============ -->
		<section class="section opis-section">
			<div class="opis-grid">
				<div>
					<div class="eyebrow">{opis.eyebrow}</div>
					<h2 class="h2">{opis.tytul}</h2>
					{#each opis.akapity as p}<p class="opis-p">{p}</p>{/each}
				</div>
				<div class="opis-photo">
					<img src={opis.zdjecie} alt={opis.podpis} />
					<span class="opis-badge">{opis.badge}</span>
					<div class="opis-photo-grad"></div>
					<div class="opis-photo-cap">{opis.podpis}</div>
				</div>
			</div>
		</section>

		<!-- ============ JAK POMAGAMY ============ -->
		<section class="section pomagamy-section">
			<div class="section-head col">
				<div class="eyebrow">{pomagamy.eyebrow}</div>
				<h2 class="h2">{pomagamy.tytul}</h2>
			</div>
			<div class="pomagamy-grid">
				{#each pomagamy.lista as p}
					<div class="pomagamy-card">
						<div class="pomagamy-badge">✓</div>
						<div class="pomagamy-t">{p.t}</div>
						<p class="pomagamy-d">{p.d}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ ETAPY (oś czasu) ============ -->
		<section class="section etapy-section" id="etapy">
			<div class="section-head col">
				<div class="eyebrow">{etapy.eyebrow}</div>
				<h2 class="h2">{etapy.tytul}</h2>
			</div>
			<div class="timeline">
				{#each etapy.kroki as krok, i}
					<div class="timeline-row">
						<div class="timeline-marker">
							<div class="timeline-no">{krok.no}</div>
							{#if i < etapy.kroki.length - 1}<div class="timeline-line"></div>{/if}
						</div>
						<div class="timeline-body">
							<div class="timeline-t">{krok.t}</div>
							<p class="timeline-d">{krok.d}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ FORMALNOŚCI ============ -->
		<section class="formalnosci-section">
			<div class="formalnosci-grid">
				<div>
					<div class="eyebrow eyebrow-green">{formalnosci.eyebrow}</div>
					<h2 class="h2 formalnosci-h2">{formalnosci.tytul}</h2>
					<p class="formalnosci-lead">{formalnosci.podtytul}</p>
				</div>
				<div class="formalnosci-list">
					{#each formalnosci.lista as item}
						<div class="formalnosci-item">
							<span class="formalnosci-check">✓</span>
							<span class="formalnosci-text">{item}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ============ FAQ ============ -->
		<section class="section faq-section" id="faq">
			<div class="faq-grid">
				<div class="faq-intro">
					<div class="eyebrow">{faq.eyebrow}</div>
					<h2 class="h2 faq-h2">{faq.tytul}</h2>
					<p class="faq-lead">
						Najczęstsze pytania kupujących. Nie znalazłeś swojego? Zadzwoń lub napisz — odpowiemy bez
						zobowiązań.
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
									Budżet
									<select name="budget">
										<option>do 400 000 zł</option>
										<option>400–700 000 zł</option>
										<option>700 000–1 000 000 zł</option>
										<option>powyżej 1 000 000 zł</option>
									</select>
								</label>
							</div>
							<label class="lead-field">
								Czego szukasz?
								<textarea
									name="message"
									rows="4"
									placeholder="Lokalizacja, metraż, liczba pokoi, must-have…"
								></textarea>
							</label>
							<button type="submit" class="lead-submit">{formularz.przycisk}</button>
							<p class="lead-fineprint">
								Wysyłając formularz, zgadzasz się na kontakt w sprawie poszukiwań. Nie wysyłamy spamu.
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

	/* ===== OPIS USŁUGI ===== */
	.opis-section {
		padding-top: 72px;
		padding-bottom: 72px;
	}
	.opis-grid {
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: 56px;
		align-items: center;
	}
	.opis-p {
		font-size: 17px;
		line-height: 1.7;
		color: var(--muted);
		margin-top: 16px;
	}
	.opis-photo {
		position: relative;
		height: 420px;
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: 0 30px 60px -34px rgba(30, 40, 30, 0.5);
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.opis-badge {
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
	}
	.opis-photo-grad {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 120px;
		background: linear-gradient(0deg, rgba(20, 30, 22, 0.72), transparent);
	}
	.opis-photo-cap {
		position: absolute;
		left: 22px;
		bottom: 18px;
		color: #fff;
		font-family: 'Newsreader', serif;
		font-size: 20px;
	}

	/* ===== JAK POMAGAMY ===== */
	.pomagamy-section {
		padding-top: 8px;
		padding-bottom: 76px;
	}
	.pomagamy-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
	.pomagamy-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: 26px 24px;
		box-shadow: 0 16px 30px -22px rgba(30, 40, 30, 0.5);
	}
	.pomagamy-badge {
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
		font-weight: 700;
	}
	.pomagamy-t {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.2;
		margin-top: 16px;
	}
	.pomagamy-d {
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--muted);
		margin-top: 9px;
	}

	/* ===== ETAPY (oś czasu) ===== */
	.etapy-section {
		padding-top: 8px;
		padding-bottom: 76px;
	}
	.timeline {
		max-width: 760px;
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
	}
	.timeline-no {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--bg-cream-2);
		border: 1px solid #e7d8be;
		color: var(--gold);
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.timeline-line {
		width: 2px;
		flex: 1;
		background: var(--divider);
		margin-top: 6px;
		min-height: 30px;
	}
	.timeline-body {
		padding-bottom: 28px;
	}
	.timeline-t {
		font-family: 'Newsreader', serif;
		font-size: 23px;
		font-weight: 500;
		line-height: 1.2;
	}
	.timeline-d {
		font-size: 16px;
		line-height: 1.65;
		color: var(--muted);
		margin-top: 8px;
		max-width: 560px;
	}

	/* ===== FORMALNOŚCI ===== */
	.formalnosci-section {
		padding: 64px 48px;
		background: var(--green);
		color: var(--on-green);
	}
	.formalnosci-grid {
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 56px;
		align-items: start;
	}
	.formalnosci-h2 {
		color: var(--on-green);
		margin-bottom: 16px;
	}
	.formalnosci-lead {
		font-size: 16px;
		line-height: 1.65;
		color: rgba(243, 238, 225, 0.82);
	}
	.formalnosci-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px 36px;
	}
	.formalnosci-item {
		display: flex;
		align-items: flex-start;
		gap: 13px;
		padding: 11px 0;
		border-bottom: 1px solid rgba(243, 238, 225, 0.14);
	}
	.formalnosci-check {
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
	.formalnosci-text {
		font-size: 15.5px;
		line-height: 1.45;
	}

	/* ===== FAQ ===== */
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
		.pomagamy-grid,
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
		.opis-grid,
		.lead-box,
		.formalnosci-grid {
			grid-template-columns: 1fr;
		}
		.opis-photo {
			order: -1;
			height: 300px;
		}
		.formalnosci-list {
			grid-template-columns: 1fr;
			margin-top: 24px;
		}
		.faq-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 760px) {
		.pomagamy-grid,
		.related-grid {
			grid-template-columns: 1fr;
		}
		.lead-field-row {
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
		.opis-section,
		.pomagamy-section,
		.etapy-section,
		.faq-section,
		.lead-section,
		.related-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.formalnosci-section {
			padding: 36px 20px;
		}
		.timeline-row {
			gap: 16px;
		}
		.timeline-no {
			width: 40px;
			height: 40px;
			font-size: 17px;
		}
		.timeline-line {
			min-height: 24px;
			margin-top: 5px;
		}
		.timeline-t {
			font-size: 19px;
		}
		.timeline-d {
			font-size: 14px;
		}
		.faq-lead {
			font-size: 13px;
			max-width: none;
		}
		.faq-q-text {
			font-size: 15.5px;
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
		.lead-info,
		.lead-form-wrap {
			padding: 26px 22px;
		}
	}
</style>
