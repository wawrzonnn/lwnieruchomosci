<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import { seo, breadcrumbs, hero, kategorie, newsletter } from '$lib/data/blog';

	let { data } = $props();
	const artykuly = data.artykuly;

	let activeCat = $state('Wszystkie');
	let query = $state('');
	let newsletterSubmitted = $state(false);

	const featured = artykuly.find((a) => a.featured) ?? artykuly[0];

	// Czy działa jakiś filtr (kategoria inna niż „Wszystkie" albo szukanie)?
	const filtrujeAktywny = $derived(activeCat !== 'Wszystkie' || query.trim() !== '');

	const filtered = $derived(
		artykuly.filter((a) => {
			const catOk = activeCat === 'Wszystkie' || a.cat === activeCat;
			const q = query.trim().toLowerCase();
			const qOk = !q || `${a.title} ${a.excerpt}`.toLowerCase().includes(q);
			return catOk && qOk;
		})
	);

	// W widoku domyślnym wyróżniony jest w dużej karcie na górze — nie powtarzamy go w siatce.
	// Przy aktywnym filtrze chowamy dużą kartę i pokazujemy w siatce wszystkie pasujące.
	const gridArticles = $derived(
		filtrujeAktywny ? filtered : filtered.filter((a) => a.slug !== featured?.slug)
	);

	let newsletterError = $state("");
	const onSubmitNewsletter: SubmitFunction = () => async ({ result }) => {
		if (result.type === "success") {
			newsletterSubmitted = true;
			newsletterError = "";
		} else if (result.type === "failure") {
			newsletterError = String(result.data?.error ?? "Nie udało się zapisać.");
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

		<!-- ============ HERO (wyśrodkowany, bez zdjęcia w tle) ============ -->
		<section class="blog-hero">
			<div class="eyebrow">{hero.eyebrow}</div>
			<h1 class="blog-hero-h1">
				{hero.tytul.split(hero.tytulEmfaza)[0]}<em>{hero.tytulEmfaza}</em>{hero.tytul.split(
					hero.tytulEmfaza
				)[1]}
			</h1>
			<p class="blog-hero-lead">{hero.podtytul}</p>
		</section>

		<!-- ============ POLECANY WPIS (tylko w widoku domyślnym) ============ -->
		{#if featured && !filtrujeAktywny}
			<section class="section featured-section">
				<a href="/blog/{featured.slug}" class="featured-card">
					<div class="featured-media">
						<img src={featured.img} alt={featured.title} />
						<span class="featured-badge">Polecany wpis</span>
					</div>
					<div class="featured-body">
						<div class="featured-meta">{featured.cat} · {featured.date}</div>
						<div class="featured-title">{featured.title}</div>
						<p class="featured-excerpt">{featured.excerpt}</p>
						<span class="read-more">Czytaj artykuł →</span>
					</div>
				</a>
			</section>
		{/if}

		<!-- ============ WYSZUKIWARKA + KATEGORIE ============ -->
		<section class="section filters-bar">
			<div class="chips">
				{#each kategorie as cat}
					<button
						type="button"
						class="chip"
						class:active={cat === activeCat}
						onclick={() => (activeCat = cat)}>{cat}</button
					>
				{/each}
			</div>
			<div class="search-wrap">
				<span class="search-icon" aria-hidden="true">⌕</span>
				<input type="text" placeholder="Szukaj w blogu…" bind:value={query} />
			</div>
		</section>

		<!-- ============ LISTA ARTYKUŁÓW ============ -->
		<section class="section articles-section">
			{#if gridArticles.length}
				<div class="articles-grid">
					{#each gridArticles as a}
						<a href="/blog/{a.slug}" class="article-card">
							<div class="article-media">
								<img src={a.img} alt={a.title} loading="lazy" />
								<span class="article-cat">{a.cat}</span>
							</div>
							<div class="article-body">
								<div class="article-date">{a.date}</div>
								<div class="article-title">{a.title}</div>
								<p class="article-excerpt">{a.excerpt}</p>
								<span class="read-more">Czytaj →</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-title">Brak wyników</div>
					<p>Nie znaleźliśmy artykułów dla wybranych filtrów. Spróbuj innej kategorii lub frazy.</p>
				</div>
			{/if}
		</section>

		<!-- ============ NEWSLETTER ============ -->
		<section class="section newsletter-section">
			<div class="newsletter-box">
				<div class="newsletter-copy">
					<div class="eyebrow eyebrow-green">{newsletter.eyebrow}</div>
					<h2 class="h2 newsletter-h2">{newsletter.tytul}</h2>
					<p class="newsletter-lead">{newsletter.podtytul}</p>
				</div>
				<div class="newsletter-form-wrap">
					{#if !newsletterSubmitted}
						<form class="newsletter-form" method="POST" action="?/newsletter" use:enhance={onSubmitNewsletter}>
							<input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0;width:0;" />
							<input type="email" name="email" required placeholder="Twój e-mail" />
							<button type="submit">{newsletter.przycisk}</button>
						</form>
					{:else}
						<div class="newsletter-thanks">
							<span class="newsletter-thanks-icon">✓</span>
							<span>{newsletter.potwierdzenie}</span>
						</div>
					{/if}
				</div>
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
	.blog-hero {
		padding: 64px 48px 40px;
		text-align: center;
	}
	.blog-hero-h1 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 48px;
		line-height: 1.08;
		letter-spacing: -0.01em;
		margin-bottom: 16px;
		em {
			font-style: italic;
			color: var(--gold);
		}
	}
	.blog-hero-lead {
		font-size: 18px;
		line-height: 1.6;
		color: var(--muted);
		max-width: 600px;
		margin: 0 auto;
	}

	/* ===== POLECANY WPIS ===== */
	.featured-section {
		padding-top: 0;
		padding-bottom: 40px;
	}
	.featured-card {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 26px 54px -32px rgba(30, 40, 30, 0.55);
	}
	.featured-media {
		position: relative;
		min-height: 360px;
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.featured-badge {
		position: absolute;
		top: 18px;
		left: 18px;
		background: var(--gold);
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		padding: 6px 13px;
		border-radius: 999px;
	}
	.featured-body {
		padding: 44px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.featured-meta {
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 700;
		margin-bottom: 12px;
	}
	.featured-title {
		font-family: 'Newsreader', serif;
		font-size: 32px;
		font-weight: 500;
		line-height: 1.2;
		margin-bottom: 14px;
	}
	.featured-excerpt {
		font-size: 16px;
		line-height: 1.7;
		color: var(--muted);
		margin-bottom: 22px;
	}
	.read-more {
		color: var(--green);
		font-weight: 600;
		font-size: 15px;
		border-bottom: 1.5px solid var(--gold);
		display: inline-block;
		padding-bottom: 2px;
		align-self: flex-start;
	}

	/* ===== FILTRY ===== */
	.filters-bar {
		padding-bottom: 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
	}
	.chips {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.chip {
		border: 1px solid var(--divider);
		background: #fff;
		color: var(--text-nav, #4a4e42);
		padding: 9px 18px;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
	}
	.chip.active {
		border: none;
		background: var(--green);
		color: #fff;
		font-weight: 700;
	}
	.search-wrap {
		position: relative;
	}
	.search-icon {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--label);
		font-size: 15px;
		pointer-events: none;
	}
	.search-wrap input {
		width: 280px;
		border: 1px solid var(--divider);
		border-radius: 999px;
		padding: 11px 18px 11px 42px;
		font-size: 15px;
		color: var(--text);
		background: #fff;
		font-family: inherit;
	}
	.search-wrap input::placeholder {
		color: var(--label);
	}

	/* ===== LISTA ARTYKUŁÓW ===== */
	.articles-section {
		padding-bottom: 20px;
	}
	.articles-grid {
		display: grid;
		/* auto-fill zamiast repeat(3): 4 wpisy (po wyróżnionym) wchodzą w jeden rząd,
		   a przy filtrze 1–2 wyniki zostają w rozmiarze karty, nie rozciągają się. */
		grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
		gap: 24px;
	}
	.article-card {
		display: flex;
		flex-direction: column;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 18px;
		overflow: hidden;
		box-shadow: 0 16px 30px -24px rgba(30, 40, 30, 0.5);
	}
	.article-media {
		position: relative;
		height: 200px;
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.article-cat {
		position: absolute;
		top: 14px;
		left: 14px;
		background: rgba(251, 248, 242, 0.92);
		color: var(--green);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 5px 11px;
		border-radius: 999px;
	}
	.article-body {
		padding: 20px 22px 22px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.article-date {
		font-size: 12px;
		color: var(--label);
		margin-bottom: 8px;
	}
	.article-title {
		font-family: 'Newsreader', serif;
		font-size: 21px;
		font-weight: 500;
		line-height: 1.25;
		margin-bottom: 10px;
	}
	.article-excerpt {
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--muted);
		margin-bottom: 16px;
	}
	.article-body .read-more {
		margin-top: auto;
		font-size: 14px;
	}
	.empty-state {
		text-align: center;
		padding: 60px 20px;
		color: var(--muted);
	}
	.empty-title {
		font-family: 'Newsreader', serif;
		font-size: 24px;
		color: var(--text);
		margin-bottom: 8px;
	}

	/* ===== NEWSLETTER ===== */
	.newsletter-section {
		padding-top: 20px;
		padding-bottom: 64px;
	}
	.newsletter-box {
		background: var(--green);
		color: var(--on-green);
		border-radius: 20px;
		padding: 52px 48px;
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 40px;
		align-items: center;
	}
	.newsletter-h2 {
		color: var(--on-green);
		font-size: 32px;
		line-height: 1.15;
		margin-bottom: 12px;
	}
	.newsletter-lead {
		font-size: 16px;
		line-height: 1.6;
		color: rgba(243, 238, 225, 0.82);
	}
	.newsletter-form {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.newsletter-form input {
		flex: 1;
		min-width: 200px;
		border: 1px solid rgba(243, 238, 225, 0.3);
		border-radius: 12px;
		padding: 14px 16px;
		font-size: 15px;
		color: #fff;
		background: rgba(255, 255, 255, 0.08);
		font-family: inherit;
	}
	.newsletter-form input::placeholder {
		color: rgba(243, 238, 225, 0.6);
	}
	.newsletter-form button {
		background: var(--gold-light);
		color: var(--green);
		border: none;
		border-radius: 12px;
		padding: 14px 26px;
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		font-family: inherit;
	}
	.newsletter-form button:hover {
		opacity: 0.9;
	}
	.newsletter-thanks {
		display: flex;
		align-items: center;
		gap: 12px;
		background: rgba(233, 209, 154, 0.12);
		border: 1px solid rgba(233, 209, 154, 0.4);
		border-radius: 12px;
		padding: 18px 20px;
		font-size: 15px;
	}
	.newsletter-thanks-icon {
		flex: none;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(233, 209, 154, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gold-light);
		font-size: 18px;
	}

	/* ===== RESPONSYWNOŚĆ ===== */
	@media (max-width: 980px) {
		.featured-card {
			grid-template-columns: 1fr;
		}
		.featured-media {
			min-height: 260px;
		}
		.articles-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.newsletter-box {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 760px) {
		.articles-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.breadcrumbs {
			padding-left: 20px;
			padding-right: 20px;
		}
		.blog-hero {
			padding: 40px 20px 28px;
		}
		.blog-hero-h1 {
			font-size: 28px;
		}
		.blog-hero-lead {
			font-size: 14.5px;
		}
		.featured-section,
		.filters-bar,
		.articles-section,
		.newsletter-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.featured-media {
			min-height: 180px;
		}
		.featured-body {
			padding: 28px 22px;
		}
		.featured-title {
			font-size: 21px;
		}
		.filters-bar {
			flex-direction: column;
			align-items: stretch;
		}
		.search-wrap input {
			width: 100%;
		}
		.newsletter-box {
			padding: 32px 22px;
		}
	}
</style>
