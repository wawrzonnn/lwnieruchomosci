<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import { getArticleBySlug, type Blok } from '$lib/data/blog-artykuly';

	let { data } = $props();
	const article = data.article;

	// ── Grupowanie bloków treści: 'sekcja' otwiera nowy wrapper z kotwicą
	// dla spisu treści, 'statystyki' renderuje się samodzielnie (poza sekcją). ──
	type SectionGroup = { kind: 'section'; id: string; heading: string; children: Blok[] };
	type StatsGroup = { kind: 'statystyki'; block: Extract<Blok, { typ: 'statystyki' }> };
	function groupBlocks(bloki: Blok[]): (SectionGroup | StatsGroup)[] {
		const groups: (SectionGroup | StatsGroup)[] = [];
		let current: SectionGroup | null = null;
		for (const b of bloki) {
			if (b.typ === 'sekcja') {
				current = { kind: 'section', id: b.id, heading: b.naglowek2, children: [] };
				groups.push(current);
			} else if (b.typ === 'statystyki') {
				groups.push({ kind: 'statystyki', block: b });
			} else if (current) {
				current.children.push(b);
			}
		}
		return groups;
	}
	const groups = groupBlocks(article.tresc.bloki);

	// ── Pasek postępu czytania ──
	let progress = $state(0);
	$effect(() => {
		function onScroll() {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight || 1;
			progress = Math.min(1, Math.max(0, (window.scrollY || h.scrollTop || 0) / max));
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		onScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	// ── Spis treści: podświetlenie aktywnej sekcji (IntersectionObserver) ──
	let activeSection = $state(article.spisTresci.pozycje[0]?.id ?? '');
	$effect(() => {
		if (!('IntersectionObserver' in window)) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting && e.target.id) activeSection = e.target.id;
				}
			},
			{ rootMargin: '-18% 0px -72% 0px', threshold: 0 }
		);
		document.querySelectorAll('[data-section]').forEach((s) => io.observe(s));
		return () => io.disconnect();
	});

	// ── Kopiuj link + udostępnianie ──
	let pageUrl = $state('');
	$effect(() => {
		pageUrl = window.location.href;
	});
	const facebookShareHref = $derived(
		pageUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` : undefined
	);
	const emailShareHref = $derived(
		pageUrl
			? `mailto:?subject=${encodeURIComponent(article.naglowek.tytul)}&body=${encodeURIComponent(pageUrl)}`
			: undefined
	);

	let copyHint = $state('');
	let copyTimeout: ReturnType<typeof setTimeout> | undefined;
	function copyLink() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(window.location.href).catch(() => {});
		}
		copyHint = 'Skopiowano link ✓';
		clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => (copyHint = ''), 2200);
	}

	// ── Newsletter ──
	let newsletterSubmitted = $state(false);
	function onSubmitNewsletter(e: SubmitEvent) {
		e.preventDefault();
		newsletterSubmitted = true;
	}

	function relatedHref(slug: string) {
		return getArticleBySlug(slug) ? `/blog/${slug}` : undefined;
	}
</script>

<svelte:head>
	<title>{article.seo.title}</title>
	<meta name="description" content={article.seo.description} />
	<meta property="og:image" content={article.seo.ogImage} />
</svelte:head>

<div class="lw-page">
	<div class="lw-landing site">
		<!-- ============ PASEK POSTĘPU CZYTANIA ============ -->
		<div class="progress-track">
			<div class="progress-bar" style="transform:scaleX({progress})"></div>
		</div>

		<LandingNav />

		<!-- ============ BREADCRUMBS ============ -->
		<div class="breadcrumbs">
			{#each article.breadcrumbs as crumb, i}
				{#if crumb.href}
					<a href={crumb.href}>{crumb.label}</a>
				{:else}
					<span class="crumb-current">{crumb.label}</span>
				{/if}
				{#if i < article.breadcrumbs.length - 1}<span class="crumb-sep">/</span>{/if}
			{/each}
		</div>

		<!-- ============ NAGŁÓWEK ARTYKUŁU ============ -->
		<header class="article-header">
			<div class="article-meta-row">
				<span class="article-cat-pill">{article.naglowek.kategoria}</span>
				<span class="article-readtime">{article.naglowek.czasCzytania}</span>
			</div>
			<h1 class="article-h1">
				{article.naglowek.tytul.split(article.naglowek.tytulEmfaza)[0]}<em
					>{article.naglowek.tytulEmfaza}</em
				>{article.naglowek.tytul.split(article.naglowek.tytulEmfaza)[1]}
			</h1>
			<p class="article-lead">{article.naglowek.lead}</p>
			<div class="article-author-row">
				<div class="author-avatar">{article.naglowek.autor.inicjaly}</div>
				<div class="author-info">
					<div class="author-name">{article.naglowek.autor.imie}</div>
					<div class="author-sub">{article.naglowek.autor.rola} · {article.naglowek.data}</div>
				</div>
			</div>
		</header>

		<!-- ============ ZDJĘCIE GŁÓWNE ============ -->
		<div class="section main-image-wrap">
			<div class="main-image">
				<img src={article.zdjecieGlowne.src} alt={article.zdjecieGlowne.alt} />
			</div>
			<div class="main-image-caption">{article.zdjecieGlowne.podpis}</div>
		</div>

		<!-- ============ TREŚĆ + SPIS TREŚCI ============ -->
		<div class="content-grid">
			<aside class="toc-sidebar">
				<div class="toc-title">{article.spisTresci.tytul}</div>
				<nav class="toc-list">
					{#each article.spisTresci.pozycje as pos, i}
						<a
							href="#{pos.id}"
							class="toc-link"
							class:active={activeSection === pos.id}
						>
							<span class="toc-num">0{i + 1}</span>{pos.label}
						</a>
					{/each}
				</nav>
				<div class="share-block">
					<div class="share-title">Udostępnij</div>
					<div class="share-row">
						<button type="button" class="share-btn" title="Kopiuj link" onclick={copyLink}>🔗</button>
						<a href={facebookShareHref} target="_blank" rel="noopener noreferrer" class="share-btn" title="Facebook">f</a>
						<a href={emailShareHref} class="share-btn" title="E-mail">✉</a>
					</div>
					{#if copyHint}<div class="copy-hint">{copyHint}</div>{/if}
				</div>
			</aside>

			<article class="prose">
				{#each groups as g}
					{#if g.kind === 'section'}
						<div data-section id={g.id}>
							<h2>{g.heading}</h2>
							{#each g.children as child}
								{#if child.typ === 'akapit'}
									<p class:lead-cap={child.dropCap}>{@html child.html}</p>
								{:else if child.typ === 'cytat'}
									<blockquote>
										„{child.tekst}"
										<span class="quote-author">— {child.autor}</span>
									</blockquote>
								{:else if child.typ === 'lista'}
									<ul class="prose-list">
										{#each child.pozycje as item}
											<li>
												<span class="dot"></span>
												<span><strong>{item.mocne}</strong> — {item.reszta}</span>
											</li>
										{/each}
									</ul>
								{:else if child.typ === 'zdjecie'}
									<figure>
										<div class="prose-figure-media">
											<img src={child.src} alt={child.alt} />
										</div>
										<figcaption>{child.podpis}</figcaption>
									</figure>
								{/if}
							{/each}
						</div>
					{:else if g.kind === 'statystyki'}
						<div class="stats-callout">
							<div class="stats-callout-grid">
								{#each g.block.pozycje as s}
									<div class="stats-callout-item">
										<div class="v">{s.wartosc}</div>
										<div class="l">{s.opis}</div>
									</div>
								{/each}
							</div>
							<div class="stats-callout-note">{g.block.uwaga}</div>
						</div>
					{/if}
				{/each}

				<div class="tags-row">
					{#each article.tagi as tag}
						<span class="tag-pill">#{tag}</span>
					{/each}
				</div>

				<div class="share-row-mobile">
					<span class="share-title">Udostępnij</span>
					<button type="button" class="share-btn" title="Kopiuj link" onclick={copyLink}>🔗</button>
					<a href={facebookShareHref} target="_blank" rel="noopener noreferrer" class="share-btn" title="Facebook">f</a>
					<a href={emailShareHref} class="share-btn" title="E-mail">✉</a>
					{#if copyHint}<span class="copy-hint">{copyHint}</span>{/if}
				</div>
			</article>
		</div>

		<!-- ============ BOX AUTORA ============ -->
		<div class="author-box-wrap">
			<div class="author-box">
				<div class="author-box-avatar">{article.autor.inicjaly}</div>
				<div class="author-box-body">
					<div class="eyebrow">O autorce</div>
					<div class="author-box-name">{article.autor.imie}</div>
					<div class="author-box-role">{article.autor.rola}</div>
					<p class="author-box-bio">{article.autor.bio}</p>
				</div>
				<a href={article.autor.cta.href} class="author-box-cta">{article.autor.cta.label}</a>
			</div>
		</div>

		<!-- ============ PRZECZYTAJ RÓWNIEŻ ============ -->
		<div class="related-wrap">
			<div class="related-head">
				<div>
					<div class="eyebrow">Przeczytaj również</div>
					<h2 class="h2">{article.powiazane.tytul}</h2>
				</div>
				<a href={article.powiazane.linkWszystkie.href} class="head-link"
					>{article.powiazane.linkWszystkie.label}</a
				>
			</div>
			<div class="related-grid">
				{#each article.powiazane.wpisy as w}
					<svelte:element this={relatedHref(w.slug) ? 'a' : 'div'} href={relatedHref(w.slug)} class="related-card">
						<div class="related-media">
							<img src={w.img} alt={w.title} loading="lazy" />
							<span class="related-cat">{w.cat}</span>
						</div>
						<div class="related-body">
							<div class="related-date">{w.date}</div>
							<div class="related-title">{w.title}</div>
							<p class="related-excerpt">{w.excerpt}</p>
							<span class="read-more">Czytaj →</span>
						</div>
					</svelte:element>
				{/each}
			</div>
		</div>

		<!-- ============ NEWSLETTER ============ -->
		<section class="section newsletter-section">
			<div class="newsletter-box">
				<div class="newsletter-copy">
					<div class="eyebrow eyebrow-green">{article.newsletter.eyebrow}</div>
					<h2 class="h2 newsletter-h2">{article.newsletter.tytul}</h2>
					<p class="newsletter-lead">{article.newsletter.podtytul}</p>
				</div>
				<div class="newsletter-form-wrap">
					{#if !newsletterSubmitted}
						<form class="newsletter-form" onsubmit={onSubmitNewsletter}>
							<input type="email" name="email" required placeholder="Twój e-mail" />
							<button type="submit">{article.newsletter.przycisk}</button>
						</form>
					{:else}
						<div class="newsletter-thanks">
							<span class="newsletter-thanks-icon">✓</span>
							<span>{article.newsletter.potwierdzenie}</span>
						</div>
					{/if}
				</div>
			</div>
		</section>

		<LandingFooter />
	</div>
</div>

<style lang="scss">
	.site {
		position: relative;
		width: 1440px;
		max-width: 100%;
		margin: 0 auto;
	}

	/* ===== PASEK POSTĘPU ===== */
	.progress-track {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		z-index: 200;
		background: rgba(35, 39, 31, 0.07);
	}
	.progress-bar {
		height: 100%;
		width: 100%;
		background: var(--gold);
		transform-origin: left center;
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

	/* ===== NAGŁÓWEK ===== */
	.article-header {
		padding: 60px 48px 34px;
		max-width: 840px;
		margin: 0 auto;
		text-align: center;
	}
	.article-meta-row {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 18px;
	}
	.article-cat-pill {
		background: var(--green);
		color: var(--gold-light);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 6px 14px;
		border-radius: 999px;
	}
	.article-readtime {
		font-size: 13px;
		color: var(--label);
	}
	.article-h1 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 46px;
		line-height: 1.12;
		letter-spacing: -0.015em;
		margin-bottom: 20px;
		em {
			font-style: italic;
			color: var(--gold);
		}
	}
	.article-lead {
		font-size: 19px;
		line-height: 1.65;
		color: var(--muted);
		max-width: 680px;
		margin: 0 auto 30px;
	}
	.article-author-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14px;
	}
	.author-avatar {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		background: var(--green);
		color: var(--gold-logo, #e9d9ae);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Newsreader', serif;
		font-size: 17px;
		flex: none;
	}
	.author-info {
		text-align: left;
		line-height: 1.3;
	}
	.author-name {
		font-size: 15px;
		font-weight: 700;
		color: var(--text);
	}
	.author-sub {
		font-size: 13px;
		color: var(--label);
	}

	/* ===== ZDJĘCIE GŁÓWNE ===== */
	.main-image-wrap {
		padding-bottom: 8px;
	}
	.main-image {
		position: relative;
		height: 480px;
		border-radius: 22px;
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
	.main-image-caption {
		max-width: 840px;
		margin: 12px auto 0;
		font-size: 13px;
		color: var(--label);
		text-align: center;
	}

	/* ===== TREŚĆ + SPIS TREŚCI ===== */
	.content-grid {
		max-width: 1160px;
		margin: 0 auto;
		padding: 48px 48px 8px;
		display: grid;
		grid-template-columns: 230px minmax(0, 720px);
		gap: 64px;
		justify-content: center;
		align-items: start;
	}
	.toc-sidebar {
		position: sticky;
		top: 40px;
	}
	.toc-title {
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--gold);
		font-weight: 700;
		margin-bottom: 16px;
	}
	.toc-list {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.toc-link {
		display: block;
		padding: 7px 0 7px 16px;
		font-size: 14.5px;
		line-height: 1.35;
		color: var(--muted);
		font-weight: 500;
		border-left: 2px solid var(--divider);
		transition: all 0.2s ease;
	}
	.toc-link.active {
		color: var(--green);
		font-weight: 700;
		border-left-color: var(--gold);
	}
	.toc-num {
		display: none;
	}
	.share-block {
		margin-top: 26px;
		padding-top: 22px;
		border-top: 1px solid var(--border);
	}
	.share-title {
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--label);
		font-weight: 700;
		margin-bottom: 12px;
	}
	.share-row {
		display: flex;
		gap: 8px;
	}
	.share-btn {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		border: 1px solid var(--divider);
		background: #fff;
		color: var(--green);
		font-size: 15px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Newsreader', serif;
		font-weight: 700;
	}
	.copy-hint {
		font-size: 12px;
		color: #7c9a78;
		margin-top: 10px;
		min-height: 16px;
	}
	.share-row-mobile {
		display: none;
	}

	/* ===== PROSE (treść artykułu) ===== */
	.prose {
		:global(h2) {
			font-family: 'Newsreader', serif;
			font-weight: 500;
			font-size: 30px;
			line-height: 1.2;
			letter-spacing: -0.01em;
			margin: 46px 0 16px;
			scroll-margin-top: 90px;
		}
		:global(p) {
			font-size: 18px;
			line-height: 1.85;
			color: #3a3e33;
			margin-bottom: 22px;
		}
		:global(strong) {
			color: var(--text);
		}
		:global(a) {
			color: var(--green);
			font-weight: 600;
			border-bottom: 1.5px solid var(--gold);
		}
	}
	.lead-cap::first-letter {
		float: left;
		font-family: 'Newsreader', serif;
		font-size: 66px;
		line-height: 0.7;
		color: var(--green);
		margin: 8px 12px 0 0;
	}
	blockquote {
		border-left: 3px solid var(--gold);
		padding: 4px 0 4px 28px;
		margin: 32px 0;
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 26px;
		line-height: 1.4;
		color: var(--green);
	}
	.quote-author {
		display: block;
		font-family: 'Hanken Grotesk', sans-serif;
		font-style: normal;
		font-size: 14px;
		font-weight: 600;
		color: var(--label);
		margin-top: 14px;
	}
	.prose-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin: 8px 0 28px;
		li {
			display: flex;
			gap: 14px;
			font-size: 17px;
			line-height: 1.55;
			color: #3a3e33;
		}
		.dot {
			flex: 0 0 auto;
			width: 9px;
			height: 9px;
			border-radius: 50%;
			background: var(--gold);
			margin-top: 9px;
		}
		strong {
			color: var(--text);
		}
	}
	figure {
		margin: 8px 0 28px;
	}
	.prose-figure-media {
		height: 340px;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--border);
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	figcaption {
		font-size: 13px;
		color: var(--label);
		margin-top: 10px;
		text-align: center;
	}
	.stats-callout {
		background: var(--bg-cream);
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: 32px 34px;
		margin: 8px 0 34px;
	}
	.stats-callout-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	.stats-callout-item {
		border-left: 1px solid #e4decf;
		padding-left: 24px;
		&:first-child {
			border-left: none;
			padding-left: 0;
		}
		.v {
			font-family: 'Newsreader', serif;
			font-size: 38px;
			color: var(--green);
			line-height: 1;
		}
		.l {
			font-size: 13.5px;
			color: var(--muted);
			line-height: 1.4;
			margin-top: 8px;
		}
	}
	.stats-callout-note {
		font-size: 12px;
		color: #a79c82;
		margin-top: 18px;
	}
	.tags-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 30px 0 8px;
		padding-top: 26px;
		border-top: 1px solid var(--border);
	}
	.tag-pill {
		background: var(--bg-cream);
		border: 1px solid var(--border);
		color: var(--muted);
		font-size: 13px;
		font-weight: 500;
		padding: 7px 14px;
		border-radius: 999px;
	}

	/* ===== BOX AUTORA ===== */
	.author-box-wrap {
		max-width: 1160px;
		margin: 34px auto 0;
		padding: 0 48px;
	}
	.author-box {
		background: var(--bg-cream);
		border: 1px solid var(--border);
		border-radius: 20px;
		padding: 36px 40px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 28px;
		align-items: center;
	}
	.author-box-avatar {
		width: 82px;
		height: 82px;
		border-radius: 50%;
		background: var(--green);
		color: var(--gold-logo, #e9d9ae);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Newsreader', serif;
		font-size: 32px;
		flex: none;
	}
	.author-box-name {
		font-family: 'Newsreader', serif;
		font-size: 24px;
		font-weight: 500;
		line-height: 1.2;
	}
	.author-box-role {
		font-size: 14px;
		color: var(--label);
		margin-bottom: 10px;
	}
	.author-box-bio {
		font-size: 15px;
		line-height: 1.65;
		color: var(--muted);
		max-width: 560px;
	}
	.author-box-cta {
		flex: 0 0 auto;
		background: var(--green);
		color: #fff;
		padding: 13px 26px;
		border-radius: 999px;
		font-size: 15px;
		font-weight: 600;
		white-space: nowrap;
	}

	/* ===== PRZECZYTAJ RÓWNIEŻ ===== */
	.related-wrap {
		max-width: 1160px;
		margin: 0 auto;
		padding: 60px 48px 20px;
	}
	.related-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 26px;
		flex-wrap: wrap;
	}
	.head-link {
		color: var(--green);
		font-weight: 600;
		font-size: 15px;
		border-bottom: 1.5px solid var(--gold);
		padding-bottom: 2px;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	.related-card {
		display: flex;
		flex-direction: column;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 18px;
		overflow: hidden;
		box-shadow: 0 16px 30px -24px rgba(30, 40, 30, 0.5);
	}
	.related-media {
		position: relative;
		height: 190px;
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.related-cat {
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
	.related-body {
		padding: 20px 22px 22px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.related-date {
		font-size: 12px;
		color: var(--label);
		margin-bottom: 8px;
	}
	.related-title {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.25;
		margin-bottom: 10px;
	}
	.related-excerpt {
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted);
		margin-bottom: 16px;
	}
	.read-more {
		margin-top: auto;
		color: var(--green);
		font-weight: 600;
		font-size: 14px;
		border-bottom: 1.5px solid var(--gold);
		display: inline-block;
		padding-bottom: 2px;
		align-self: flex-start;
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
	@media (max-width: 1199px) {
		.related-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 980px) {
		.content-grid {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.toc-sidebar {
			position: static;
			background: var(--bg-cream);
			border: 1px solid var(--border);
			border-radius: 14px;
			padding: 18px 20px;
			margin-bottom: 8px;
		}
		.toc-link {
			display: flex;
			gap: 10px;
			padding: 7px 0;
			border-left: none;
			border-bottom: 1px solid rgba(200, 195, 180, 0.4);
			color: #3a3e33;
			font-size: 15px;
		}
		.toc-link.active {
			border-left: none;
		}
		.toc-num {
			display: inline;
			color: var(--gold);
			font-weight: 700;
		}
		.share-block {
			display: none;
		}
		.share-row-mobile {
			display: flex;
			align-items: center;
			gap: 10px;
			margin-top: 6px;
		}
		.main-image {
			height: 320px;
		}
		.newsletter-box {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 760px) {
		.related-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.breadcrumbs {
			padding-left: 20px;
			padding-right: 20px;
		}
		.article-header {
			padding: 32px 20px 22px;
			text-align: left;
		}
		.article-meta-row {
			display: flex;
		}
		.article-h1 {
			font-size: 31px;
			line-height: 1.14;
		}
		.article-lead {
			font-size: 16px;
			margin: 0 0 20px;
		}
		.article-author-row {
			justify-content: flex-start;
		}
		.main-image-wrap {
			padding: 0 20px 6px;
		}
		.main-image {
			height: 230px;
		}
		.content-grid {
			padding: 20px 20px 4px;
		}
		.prose {
			:global(h2) {
				font-size: 23px;
				margin: 32px 0 12px;
				scroll-margin-top: 16px;
			}
			:global(p) {
				font-size: 16px;
				line-height: 1.75;
				margin-bottom: 18px;
			}
		}
		.lead-cap::first-letter {
			font-size: 52px;
			margin: 6px 10px 0 0;
		}
		.author-box-wrap {
			padding: 0 20px;
		}
		.author-box {
			grid-template-columns: auto 1fr;
			padding: 24px 22px;
		}
		.author-box-avatar {
			width: 56px;
			height: 56px;
			font-size: 22px;
		}
		.author-box-cta {
			grid-column: 1 / -1;
			text-align: center;
		}
		.related-wrap {
			padding: 34px 20px 4px;
		}
		.newsletter-section {
			padding-left: 20px;
			padding-right: 20px;
		}
		.newsletter-box {
			padding: 28px 22px;
		}
	}
</style>
