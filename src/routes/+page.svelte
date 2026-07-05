<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ListingCard from '$lib/components/ListingCard.svelte';
	import Select from '$lib/components/Select.svelte';
	import { CATEGORY_LABELS_PLURAL, formatPrice } from '$lib/utils';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let { data, form } = $props();

	let category = $state('');
	let location = $state('');
	let maxPrice = $state('');

	function search(e: Event) {
		e.preventDefault();
		const params = new URLSearchParams();
		if (category) params.set('category', category);
		if (location) params.set('location', location);
		if (maxPrice) params.set('maxPrice', maxPrice);
		goto(`/oferty?${params.toString()}`);
	}

	const categoryTiles = [
		{
			key: 'MIESZKANIE',
			icon: `<rect x="5" y="3" width="14" height="18" rx="1.5"></rect><rect x="8.3" y="6.5" width="2" height="2" rx="0.3"></rect><rect x="13.7" y="6.5" width="2" height="2" rx="0.3"></rect><rect x="8.3" y="11" width="2" height="2" rx="0.3"></rect><rect x="13.7" y="11" width="2" height="2" rx="0.3"></rect><rect x="10" y="16" width="4" height="5"></rect>`
		},
		{
			key: 'DOM',
			icon: `<path d="M4 11l8-6 8 6"></path><path d="M6 10v9h12v-9"></path><path d="M10 19v-5h4v5"></path>`
		},
		{
			key: 'DZIALKA',
			icon: `<path d="M12 21s6.3-5.6 6.3-10.4A6.3 6.3 0 1 0 5.7 10.6C5.7 15.4 12 21 12 21z"></path><circle cx="12" cy="10" r="2.3"></circle>`
		},
		{
			key: 'LOKAL',
			icon: `<path d="M4 9l1.3-4h13.4L20 9"></path><path d="M5.2 9v10h13.6V9"></path><path d="M10 19v-6h4v6"></path>`
		}
	];

	const features = [
		{
			title: 'Lokalni na wskroś',
			text: 'Mieszkamy i pracujemy w Kotlinie Jeleniogórskiej. Znamy każdą dzielnicę, drogę i widok na Karkonosze.'
		},
		{
			title: 'Mobilne biuro',
			text: 'Przyjeżdżamy do Ciebie — na nieruchomość, do domu, do kawiarni. Wygodnie i bez pośpiechu.'
		},
		{
			title: 'Oferty na wyłączność',
			text: 'Wiele naszych nieruchomości znajdziesz tylko u nas. Dbamy o nie jak o własne.'
		},
		{
			title: 'Z sercem do ludzi',
			text: 'Słuchamy, doradzamy i prowadzimy przez cały proces — uczciwie i spokojnie.'
		}
	];

	const stats = [
		{ value: '120+', label: 'sprzedanych nieruchomości' },
		{ value: '8 lat', label: 'na lokalnym rynku' },
		{ value: '250+', label: 'zadowolonych klientów' },
		{ value: '4,9', label: 'średnia ocena Google' }
	];

	const testimonials = [
		{
			text: 'Sprzedaż mieszkania poszła sprawnie i bez stresu. Czułam, że ktoś naprawdę o mnie dba.',
			author: 'Joanna K.',
			place: 'Jelenia Góra'
		},
		{
			text: 'Znaleźli nam działkę z widokiem na góry — dokładnie taką, o jakiej marzyliśmy.',
			author: 'Michał i Ola',
			place: 'Sosnówka'
		},
		{
			text: 'Profesjonalnie, ciepło i konkretnie. Cały czas wiedziałem, co dzieje się z moją ofertą.',
			author: 'Robert W.',
			place: 'Cieplice'
		}
	];
</script>

<svelte:head>
	<title>LW Nieruchomości — biuro nieruchomości Jelenia Góra i Karkonosze</title>
</svelte:head>

<Navbar />

<main>
	<!-- HERO -->
	<section class="hero">
		<div class="container hero-grid">
			<div class="hero-copy">
				<div class="hero-kicker"><span class="hero-kicker-dot"></span>Lokalne biuro nieruchomości</div>
				<h1 class="h-hero">Znajdź swój dom w&nbsp;sercu <em>Karkonoszy</em></h1>
				<p class="lead">
					Z sercem do ludzi i domów. Pomagamy kupić, sprzedać i wynająć nieruchomości w Jeleniej Górze i całej
					Kotlinie Jeleniogórskiej — uczciwie, spokojnie, po ludzku.
				</p>

				<form class="search-box" onsubmit={search}>
					<div class="field">
						<span class="field__label">Rodzaj</span>
						<Select
							bind:value={category}
							placeholder="Wszystkie"
							options={[
								{ value: 'MIESZKANIE', label: 'Mieszkania' },
								{ value: 'DOM', label: 'Domy' },
								{ value: 'DZIALKA', label: 'Działki' },
								{ value: 'LOKAL', label: 'Lokale' }
							]}
						/>
					</div>
					<div class="field">
						<span class="field__label">Lokalizacja</span>
						<Select
							bind:value={location}
							placeholder="Cały region"
							options={[
								{ value: 'Jelenia Góra', label: 'Jelenia Góra' },
								{ value: 'Sosnówka', label: 'Sosnówka' },
								{ value: 'Mysłakowice', label: 'Mysłakowice' },
								{ value: 'Cieplice', label: 'Cieplice' }
							]}
						/>
					</div>
					<div class="field">
						<span class="field__label">Cena do</span>
						<Select
							bind:value={maxPrice}
							placeholder="Bez limitu"
							options={[
								{ value: '400000', label: '400 000 zł' },
								{ value: '700000', label: '700 000 zł' },
								{ value: '1000000', label: '1 000 000 zł' },
								{ value: '2000000', label: '2 000 000 zł' }
							]}
						/>
					</div>
					<button type="submit" class="btn btn--primary">Szukaj</button>
				</form>

				<div class="hero-stats">
					<div class="stat"><strong>4,9</strong><span>ocena Google</span></div>
					<div class="stat"><strong>120+</strong><span>transakcji</span></div>
					<div class="stat pill"><strong>Na wyłączność</strong><span>wiele ofert</span></div>
				</div>
			</div>

			<div class="hero-visual">
				<div class="hero-photo"><div class="ph" data-label="zdjęcie · dom w Karkonoszach"></div></div>
				{#if data.featured}
					<a href="/oferty/{data.featured.slug}" class="hero-card">
						<span class="hero-card-label">Polecana oferta</span>
						<strong>{data.featured.title}</strong>
						<span class="hero-card-price">{formatPrice(data.featured.price)}</span>
					</a>
				{/if}
			</div>
		</div>
	</section>

	<!-- CATEGORY TILES -->
	<section class="categories">
		<div class="container category-grid">
			{#each categoryTiles as tile}
				<a href="/oferty?category={tile.key}" class="card category-tile">
					<div class="icon-tile">
						<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
							{@html tile.icon}
						</svg>
					</div>
					<div>
						<div class="tile-name">{CATEGORY_LABELS_PLURAL[tile.key]}</div>
						<div class="tile-count">
							{data.categoryCounts[tile.key as keyof typeof data.categoryCounts] > 0
								? `${data.categoryCounts[tile.key as keyof typeof data.categoryCounts]} ofert`
								: 'Wkrótce'}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- FEATURED LISTINGS -->
	<section class="section section--alt">
		<div class="section__inner">
			<div class="section-header">
				<div>
					<div class="eyebrow">Wybrane dla ciebie</div>
					<h2 class="h2">Polecane oferty</h2>
				</div>
				<a href="/oferty" class="btn btn--ghost">Zobacz wszystkie oferty</a>
			</div>
			<div class="listing-grid">
				{#each data.listings as listing}
					<ListingCard {listing} />
				{/each}
			</div>
		</div>
	</section>

	<!-- O NAS -->
	<section class="section about" id="o-nas">
		<div class="container about-grid">
			<div class="about-photo"><div class="ph" data-label="zdjęcie · zespół LW"></div></div>
			<div class="about-copy">
				<div class="eyebrow">O nas</div>
				<h2 class="h2">Z sercem do ludzi i domów</h2>
				<p class="body">
					Jesteśmy lokalnym biurem nieruchomości z Jeleniej Góry, które powstało z pasji do pracy z ludźmi i
					miłości do miejsc, w których można naprawdę poczuć się jak w domu.
				</p>
				<p class="body">
					Stawiamy na uczciwość, empatię i elastyczne podejście. Słuchamy, doradzamy i prowadzimy Cię krok po
					kroku przez cały proces — byś na każdym etapie czuł się pewnie i spokojnie.
				</p>
			</div>
		</div>
	</section>

	<!-- STATS BAND -->
	<section class="section--dark stats-band">
		<div class="stats-grid">
			{#each stats as stat}
				<div class="stat-block">
					<div class="stat-value">{stat.value}</div>
					<div class="stat-label">{stat.label}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- REGION -->
	<section class="section region" id="region">
		<div class="container">
			<div class="section-header center">
				<div class="eyebrow">Region Karkonosze</div>
				<h2 class="h2">Dlaczego warto z nami</h2>
				<p class="lead">
					Mieszkamy i pracujemy w Kotlinie Jeleniogórskiej. To nie jest dla nas tylko rynek — to nasze
					miejsce na ziemi.
				</p>
			</div>
			<div class="feature-grid">
				{#each features as feature}
					<div class="card">
						<h3 class="h3">{feature.title}</h3>
						<p class="body">{feature.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- TESTIMONIALS -->
	<section class="section section--alt testimonials">
		<div class="container">
			<div class="section-header center">
				<div class="eyebrow">Opinie klientów</div>
				<h2 class="h2">Mówią o nas</h2>
			</div>
			<div class="testimonial-grid">
				{#each testimonials as item}
					<div class="card testimonial-card">
						<span class="quote-mark">”</span>
						<p class="body">{item.text}</p>
						<div class="testimonial-author">
							<span class="avatar">{item.author.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
							<div>
								<strong>{item.author}</strong>
								<span>{item.place}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA CARDS -->
	<section class="section cta-section" id="zglos-oferte">
		<div class="container cta-grid">
			<div class="cta-card">
				<h3>Chcesz sprzedać<br />nieruchomość?</h3>
				<p>
					Zgłoś swoją ofertę — wycenimy ją, przygotujemy prezentację i znajdziemy kupca. Wiele naszych
					ofert prowadzimy na wyłączność.
				</p>
				<a href="#kontakt" class="btn btn--light">Zgłoś ofertę</a>
			</div>
			<div class="cta-card-alt">
				<h3>Szukasz czegoś<br />konkretnego?</h3>
				<p>
					Powiedz nam, czego szukasz. Odezwiemy się, gdy tylko pojawi się nieruchomość pasująca do Twoich
					marzeń i budżetu.
				</p>
				<a href="#kontakt" class="btn btn--ghost">Zgłoś czego szukasz</a>
			</div>
		</div>
	</section>

	<!-- KONTAKT -->
	<section class="section contact" id="kontakt">
		<div class="container contact-grid">
			<div class="contact-info">
				<div class="eyebrow">Kontakt</div>
				<h2 class="h2">Porozmawiajmy o Twojej nieruchomości</h2>
				<div class="contact-row">
					<span class="contact-label">Telefon</span>
					<a href="tel:+48690008273">+48 690 008 273</a>
				</div>
				<div class="contact-row">
					<span class="contact-label">E-mail</span>
					<a href="mailto:biuro@lw.nieruchomosci.pl">biuro@lw.nieruchomosci.pl</a>
				</div>
				<div class="contact-row">
					<span class="contact-label">Biuro mobilne</span>
					<span>58-506 Jelenia Góra</span>
				</div>

				{#if form?.success && form.type === 'contact'}
					<p class="form-success">Dziękujemy za wiadomość!</p>
				{:else}
					<form method="POST" action="?/contact" use:enhance class="lead-form">
						<input class="input" type="text" name="name" placeholder="Imię i nazwisko" required />
						<input class="input" type="text" name="contact" placeholder="Telefon lub e-mail" required />
						<textarea class="textarea" name="message" placeholder="Wiadomość" rows="3" required></textarea>
						<button type="submit" class="btn btn--primary btn--block">Wyślij wiadomość</button>
					</form>
				{/if}
			</div>
			<div class="contact-map">
				<iframe
					title="Mapa — Jelenia Góra"
					src="https://maps.google.com/maps?q=Jelenia+G%C3%B3ra,+58-506&z=12&output=embed"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	</section>
</main>

<Footer />

<style lang="scss">
	.section {
		padding: clamp(48px, 6vw, 92px) clamp(20px, 4vw, 52px);
	}
	.section__inner,
	.container {
		max-width: 1180px;
		margin-inline: auto;
	}

	/* ─── HERO ─── */
	.hero {
		padding: clamp(36px, 4vw, 52px) clamp(20px, 4vw, 52px) 64px;
		background: linear-gradient(135deg, #efe9d9 0%, #f6f1e7 60%, #faf7f0 100%);
	}
	.hero-grid {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(32px, 4vw, 51px);
		align-items: center;
	}
	.hero-copy {
		flex: 1 1 380px;
		min-width: 290px;
	}
	.hero-kicker {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		background: var(--c-green-tint);
		border: 1px solid #dde3d2;
		color: var(--c-primary);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.05em;
		padding: 7px 14px;
		border-radius: var(--r-pill);
	}
	.hero-kicker-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--c-primary);
	}
	.hero-copy .h-hero {
		margin-top: 20px;
	}
	.hero-copy .lead {
		margin-top: 20px;
		max-width: 47ch;
		margin-bottom: 0;
	}

	.search-box {
		display: flex;
		align-items: end;
		gap: 12px;
		flex-wrap: wrap;
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-xl);
		padding: 18px;
		box-shadow: var(--sh-raised);
		margin-top: 32px;
	}
	.field {
		flex: 1;
		min-width: 140px;
	}
	.search-box .btn {
		flex-shrink: 0;
		border-radius: var(--r-xl);
		padding: 13px 26px;
	}

	.hero-stats {
		display: flex;
		gap: 28px;
		margin-top: 32px;
		align-items: center;
		flex-wrap: wrap;
	}
	.stat {
		display: flex;
		flex-direction: column;
		strong {
			font-family: var(--font-serif);
			font-size: 22px;
			font-weight: 500;
			color: var(--c-text);
		}
		span {
			font-size: 12.5px;
			color: var(--c-subtle);
		}
	}
	.stat.pill {
		background: var(--c-green-tint);
		border-radius: var(--r-lg);
		padding: 8px 16px;
		strong {
			color: var(--c-primary);
			font-size: 15px;
		}
	}

	.hero-visual {
		position: relative;
		flex: 1 1 380px;
		min-width: 290px;
	}
	.hero-photo {
		aspect-ratio: 4/5;
		border-radius: var(--r-2xl);
		box-shadow: var(--sh-hero);
		overflow: hidden;
	}
	.hero-card {
		position: absolute;
		bottom: -28px;
		left: -28px;
		max-width: 240px;
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-xl);
		padding: 18px 20px;
		box-shadow: var(--sh-pop);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.hero-card-label {
		font-size: 10.5px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--c-primary);
	}
	.hero-card strong {
		font-family: var(--font-serif);
		font-size: 16px;
		font-weight: 500;
		line-height: 1.3;
		color: var(--c-text);
	}
	.hero-card-price {
		font-family: var(--font-serif);
		font-size: 18px;
		font-weight: 600;
		color: var(--c-primary);
	}

	/* ─── CATEGORY TILES ─── */
	.categories {
		padding: 40px clamp(20px, 4vw, 52px) 0;
	}
	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
		gap: 16px;
	}
	.category-tile {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 20px;
		transition: transform 0.15s ease;
		&:hover {
			transform: translateY(-3px);
		}
	}
	.tile-name {
		font-family: var(--font-serif);
		font-size: 20px;
		font-weight: 600;
		color: var(--c-text);
	}
	.tile-count {
		color: var(--c-subtle);
		font-size: 13.5px;
		margin-top: 3px;
	}

	/* ─── SECTION HEADER ─── */
	.section-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 40px;
		gap: 20px;
		flex-wrap: wrap;
	}
	.section-header.center {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.section-header h2 {
		margin-top: 4px;
	}

	.listing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
		gap: 22px;
	}

	/* ─── ABOUT ─── */
	.about {
		background: var(--c-bg-page);
	}
	.about-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 56px;
		align-items: center;
	}
	.about-photo {
		flex: 1 1 380px;
		min-width: 290px;
		aspect-ratio: 4/3;
		border-radius: var(--r-2xl);
		overflow: hidden;
	}
	.about-copy {
		flex: 1 1 380px;
		min-width: 290px;
	}
	.about-copy .body {
		margin: 16px 0;
		max-width: 540px;
	}

	/* ─── STATS BAND ─── */
	.stats-band {
		padding: clamp(36px, 4vw, 56px) clamp(20px, 4vw, 52px);
	}
	.stats-grid {
		max-width: 1180px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
		gap: 24px;
	}
	.stat-block {
		text-align: center;
		color: #e9ecdf;
	}
	.stat-value {
		font-family: var(--font-serif);
		font-size: clamp(34px, 4.5vw, 52px);
		font-weight: 600;
		color: var(--c-gold-light);
		line-height: 1;
	}
	.stat-label {
		color: var(--c-green-soft);
		font-size: 14px;
		margin-top: 10px;
	}

	/* ─── REGION FEATURES ─── */
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
		gap: 20px;
	}

	/* ─── TESTIMONIALS ─── */
	.testimonial-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
		gap: 22px;
	}
	.testimonial-card {
		padding: 26px;
		.quote-mark {
			font-family: var(--font-serif);
			font-size: 44px;
			color: var(--c-quote);
			line-height: 1;
		}
		p {
			margin: 8px 0 20px;
			font-size: 15px;
		}
	}
	.testimonial-author {
		display: flex;
		align-items: center;
		gap: 10px;
		strong {
			display: block;
			font-size: 14px;
			color: var(--c-text);
			font-weight: 600;
		}
		span {
			font-size: 12.5px;
			color: var(--c-subtle);
		}
	}
	.avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		flex-shrink: 0;
		background: var(--c-green-tint);
		color: var(--c-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
	}

	/* ─── CTA ─── */
	.cta-section {
		padding-top: 0;
	}
	.cta-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
	}
	.cta-card,
	.cta-card-alt {
		flex: 1 1 380px;
		min-width: 290px;
		padding: clamp(30px, 4vw, 46px);
		border-radius: var(--r-2xl);
	}
	.cta-card h3,
	.cta-card-alt h3 {
		font-family: var(--font-serif);
		font-size: clamp(24px, 3vw, 32px);
		font-weight: 600;
		line-height: 1.16;
		margin-bottom: 14px;
	}
	.cta-card p,
	.cta-card-alt p {
		margin-bottom: 24px;
		font-size: 15px;
		line-height: 1.65;
	}
	.cta-card {
		background: var(--c-primary);
		color: #eef1e8;
		position: relative;
		overflow: hidden;
		h3 {
			color: #eef1e8;
		}
		p {
			color: rgba(238, 241, 232, 0.85);
		}
	}
	.cta-card-alt {
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		h3 {
			color: var(--c-text);
		}
		p {
			color: var(--c-muted);
		}
	}
	.form-success-light {
		font-weight: 600;
		color: #eef1e8;
	}

	/* ─── CONTACT ─── */
	.contact-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 56px;
	}
	.contact-info {
		flex: 1 1 380px;
		min-width: 290px;
	}
	.contact-row {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin: 16px 0;
	}
	.contact-label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--c-subtle);
	}
	.contact-info a,
	.contact-info span {
		font-size: 15px;
		color: var(--c-text);
	}
	.lead-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.contact-info .lead-form {
		margin-top: 28px;
		max-width: 420px;
	}
	.contact-map {
		flex: 1 1 380px;
		min-width: 290px;
		aspect-ratio: 4/3;
		border-radius: var(--r-2xl);
		overflow: hidden;
		box-shadow: var(--sh-raised);
		border: 1px solid var(--c-border);

		iframe {
			width: 100%;
			height: 100%;
			border: 0;
			display: block;
			filter: grayscale(0.15) contrast(1.02);
		}
	}

	@media (max-width: 899px) {
		.hero-card {
			position: static;
			margin-top: 20px;
			max-width: none;
		}
	}
	@media (max-width: 639px) {
		.search-box {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
