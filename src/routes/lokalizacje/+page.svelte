<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';

	let { data } = $props();

	function offerWord(n: number) {
		if (n === 1) return 'oferta';
		const d = n % 10;
		const dd = n % 100;
		return d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14) ? 'oferty' : 'ofert';
	}
</script>

<svelte:head>
	<title>Region Karkonosze — nieruchomości w Jeleniej Górze i okolicy | LW Nieruchomości</title>
	<meta
		name="description"
		content="Miejscowości, w których działamy: Jelenia Góra, Karpacz, Szklarska Poręba, Kowary, Piechowice, Podgórzyn i okolice. Poznaj lokalizację i zobacz dostępne nieruchomości."
	/>
</svelte:head>

<div class="lw-page">
	<div class="lw-landing">
		<LandingNav />

		<nav class="breadcrumbs section" aria-label="Ścieżka nawigacji">
			<a href="/">Strona główna</a>
			<span class="crumb-sep">/</span>
			<span class="crumb-current">Region</span>
		</nav>

		<header class="head section">
			<div class="eyebrow">Region Karkonosze</div>
			<h1 class="h1">Gdzie działamy</h1>
			<p class="lead">
				Znamy Kotlinę Jeleniogórską i Karkonosze od podszewki — od miejskich kamienic po działki
				z widokiem na Śnieżkę. Wybierz miejscowość, poznaj okolicę i zobacz, co mamy w ofercie.
			</p>
		</header>

		<section class="section grid-sec">
			<div class="grid">
				{#each data.regiony as r}
					<a class="karta" href="/lokalizacje/{r.slug}">
						<div
							class="foto"
							style="background-image:url('{r.image}'); background-position:{r.focalX}% {r.focalY}%"
						></div>
						<div class="body">
							<h2 class="nazwa">{r.nazwa}</h2>
							{#if r.lead}<p class="opis">{r.lead}</p>{/if}
							<span class="link">
								{r.count ? `${r.count} ${offerWord(r.count)}` : 'Zobacz region'} →
							</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<LandingFooter />
	</div>
</div>

<style lang="scss">
	.breadcrumbs {
		padding-top: 22px;
		padding-bottom: 6px;
		font-size: 13px;
		color: var(--muted);
	}
	.crumb-sep {
		margin: 0 7px;
		color: var(--divider);
	}
	.crumb-current {
		color: var(--text);
	}
	.head {
		padding-top: 26px;
		padding-bottom: 34px;
		max-width: 720px;
	}
	.h1 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 44px;
		line-height: 1.1;
		margin: 0 0 14px;
	}
	.lead {
		margin: 0;
		font-size: 16px;
		line-height: 1.7;
		color: var(--muted);
	}
	.grid-sec {
		padding-bottom: 88px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 22px;
	}
	.karta {
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 16px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
	}
	.karta:hover {
		transform: translateY(-3px);
		box-shadow: 0 18px 36px -22px rgba(0, 0, 0, 0.45);
	}
	.foto {
		height: 190px;
		background-color: var(--bg-cream);
		background-size: cover;
	}
	.body {
		padding: 18px 20px 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}
	.nazwa {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 22px;
	}
	.opis {
		margin: 0;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--muted);
		flex: 1;
	}
	.link {
		font-weight: 600;
		font-size: 13.5px;
		color: var(--green);
		border-bottom: 1.5px solid var(--gold);
		padding-bottom: 2px;
		align-self: flex-start;
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 640px) {
		.h1 {
			font-size: 32px;
		}
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
