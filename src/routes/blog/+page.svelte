<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
</script>

<svelte:head>
	<title>Blog — LW Nieruchomości</title>
	<meta name="description" content="Blog LW Nieruchomości — porady o kupnie, sprzedaży i wycenie nieruchomości w Jeleniej Górze i Karkonoszach. Wkrótce." />
</svelte:head>

<div class="lw-page">
	<div class="lw-landing site">
		<LandingNav />

		<section class="blog-placeholder">
			<span class="eyebrow">Blog</span>
			<h1 class="h2">Wkrótce pojawią się tu nasze artykuły</h1>
			<p class="lead">
				Pracujemy nad poradnikami o kupnie, sprzedaży i wycenie nieruchomości w Jeleniej Górze i
				Karkonoszach. Zajrzyj tu wkrótce.
			</p>
			<a href="/kontakt" class="cta">Masz pytanie już teraz? Napisz do nas →</a>
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
	.blog-placeholder {
		padding: 100px 48px;
		text-align: center;
		max-width: 640px;
		margin: 0 auto;
	}
	.lead {
		font-size: 17px;
		line-height: 1.7;
		color: var(--muted);
		margin: 16px 0 28px;
	}
	.cta {
		display: inline-flex;
		font-weight: 600;
		color: var(--green);
		border-bottom: 1.5px solid var(--gold);
		padding-bottom: 2px;
	}
	.cta:hover {
		opacity: 0.82;
	}
	@media (max-width: 640px) {
		.blog-placeholder {
			padding: 60px 20px;
		}
	}
</style>
