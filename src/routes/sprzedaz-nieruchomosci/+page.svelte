<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import {
		seo,
		breadcrumbs,
		hero,
		opis,
		proces,
		zakres,
		korzysci,
		opinie,
		faq,
		formularz,
		powiazane
	} from '$lib/data/sprzedaz-nieruchomosci';

	// ── Opinie: pojedynczy rotujący cytat, auto-rotacja co 6,5s + kropki ──
	let testiIndex = $state(0);
	$effect(() => {
		testiIndex;
		const id = setInterval(() => {
			testiIndex = (testiIndex + 1) % opinie.lista.length;
		}, 6500);
		return () => clearInterval(id);
	});

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

		<!-- ============ PROCES 6 KROKÓW ============ -->
		<section class="section proces-section" id="proces">
			<div class="section-head col">
				<div class="eyebrow">{proces.eyebrow}</div>
				<h2 class="h2">{proces.tytul}</h2>
			</div>
			<div class="proces-grid">
				{#each proces.kroki as krok}
					<div class="proces-card">
						<div class="proces-no">{krok.no}</div>
						<div class="proces-t">{krok.t}</div>
						<p class="proces-d">{krok.d}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ ZAKRES USŁUGI ============ -->
		<section class="zakres-section">
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
			<p class="zakres-note">{zakres.uwaga}</p>
		</section>

		<!-- ============ KORZYŚCI ============ -->
		<section class="section korzysci-section">
			<div class="section-head col">
				<div class="eyebrow">{korzysci.eyebrow}</div>
				<h2 class="h2">{korzysci.tytul}</h2>
			</div>
			<div class="korzysci-grid">
				{#each korzysci.lista as k}
					<div class="korzysci-card">
						<div class="korzysci-star">★</div>
						<div class="korzysci-t">{k.t}</div>
						<p class="korzysci-d">{k.d}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- ============ OPINIE ============ -->
		<section class="testi-section-v2">
			<div class="testi-bg" style="background-image:url('/sunset-dolina.png')"></div>
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

		<!-- ============ FAQ ============ -->
		<section class="section faq-section" id="faq">
			<div class="faq-grid">
				<div class="faq-intro">
					<div class="eyebrow">{faq.eyebrow}</div>
					<h2 class="h2 faq-h2">{faq.tytul}</h2>
					<p class="faq-lead">
						Najczęstsze pytania sprzedających. Nie znalazłeś swojego? Zadzwoń lub napisz — odpowiemy bez
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

	/* ===== PROCES ===== */
	.proces-section {
		padding-top: 8px;
		padding-bottom: 76px;
	}
	.proces-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}
	.proces-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: 28px 26px;
		box-shadow: 0 16px 30px -22px rgba(30, 40, 30, 0.5);
	}
	.proces-no {
		font-family: 'Newsreader', serif;
		font-size: 40px;
		font-weight: 500;
		color: var(--gold);
		line-height: 1;
	}
	.proces-t {
		font-family: 'Newsreader', serif;
		font-size: 22px;
		font-weight: 500;
		line-height: 1.2;
		margin-top: 14px;
	}
	.proces-d {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted);
		margin-top: 10px;
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
	.zakres-note {
		font-size: 14px;
		color: var(--gold-soft);
		margin-top: 26px;
	}

	/* ===== KORZYŚCI ===== */
	.korzysci-section {
		padding-top: 76px;
		padding-bottom: 76px;
	}
	.korzysci-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
	.korzysci-card {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: 26px 24px;
		box-shadow: 0 16px 30px -22px rgba(30, 40, 30, 0.5);
	}
	.korzysci-star {
		color: var(--gold);
		font-size: 26px;
		line-height: 1;
	}
	.korzysci-t {
		font-family: 'Newsreader', serif;
		font-size: 21px;
		font-weight: 500;
		line-height: 1.2;
		margin-top: 14px;
	}
	.korzysci-d {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted);
		margin-top: 9px;
	}

	/* ===== OPINIE (jak na stronie głównej) ===== */
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

	/* ===== FAQ (jak na stronie głównej) ===== */
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
		.proces-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.korzysci-grid,
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
		.lead-box {
			grid-template-columns: 1fr;
		}
		.opis-photo {
			order: -1;
			height: 300px;
		}
		.zakres-grid {
			grid-template-columns: 1fr;
		}
		.faq-grid {
			grid-template-columns: 1fr;
		}
		.testi-quote-text {
			font-size: 26px;
		}
	}
	@media (max-width: 760px) {
		.proces-grid,
		.korzysci-grid,
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
		.opis-section,
		.proces-section,
		.korzysci-section,
		.faq-section,
		.lead-section,
		.related-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.zakres-section {
			padding: 36px 20px;
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
