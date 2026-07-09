<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import ListingCard from '$lib/components/ListingCard.svelte';
	import Select from '$lib/components/Select.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();

	let category = $state(data.filters.category);
	let location = $state(data.filters.location);
	let maxPrice = $state(data.filters.maxPrice);
	let sort = $state(data.filters.sort);

	function applyFilters() {
		const params = new URLSearchParams();
		if (category) params.set('category', category);
		if (location) params.set('location', location);
		if (maxPrice) params.set('maxPrice', maxPrice);
		if (sort !== 'newest') params.set('sort', sort);
		goto(`/oferty?${params.toString()}`);
	}
</script>

<svelte:head>
	<title>Oferty — LW Nieruchomości</title>
</svelte:head>

<LandingNav />

<main class="section">
	<div class="container">
		<span class="breadcrumb">Strona główna · Oferty</span>
		<h1 class="h-page">Wszystkie oferty</h1>
		<p class="lead">{data.listings.length} nieruchomości w Jeleniej Górze i okolicach</p>

		<div class="filters-bar">
			<div class="filter-select">
				<Select
					bind:value={category}
					placeholder="Wszystkie rodzaje"
					onchange={applyFilters}
					options={[
						{ value: 'MIESZKANIE', label: 'Mieszkania' },
						{ value: 'DOM', label: 'Domy' },
						{ value: 'DZIALKA', label: 'Działki' },
						{ value: 'LOKAL', label: 'Lokale' }
					]}
				/>
			</div>
			<div class="filter-select">
				<Select
					bind:value={location}
					placeholder="Cały region"
					onchange={applyFilters}
					options={[
						{ value: 'Jelenia Góra', label: 'Jelenia Góra' },
						{ value: 'Sosnówka', label: 'Sosnówka' },
						{ value: 'Mysłakowice', label: 'Mysłakowice' },
						{ value: 'Cieplice', label: 'Cieplice' }
					]}
				/>
			</div>
			<div class="filter-select">
				<Select
					bind:value={maxPrice}
					placeholder="Cena: dowolna"
					onchange={applyFilters}
					options={[
						{ value: '400000', label: 'do 400 000 zł' },
						{ value: '700000', label: 'do 700 000 zł' },
						{ value: '1500000', label: 'do 1 500 000 zł' }
					]}
				/>
			</div>
			<div class="sort-label">
				<span>Sortuj:</span>
				<div class="filter-select sort-select">
					<Select
						bind:value={sort}
						onchange={applyFilters}
						options={[
							{ value: 'newest', label: 'Najnowsze' },
							{ value: 'price-asc', label: 'Cena rosnąco' },
							{ value: 'price-desc', label: 'Cena malejąco' }
						]}
					/>
				</div>
			</div>
		</div>

		{#if data.listings.length > 0}
			<div class="listing-grid">
				{#each data.listings as listing}
					<ListingCard {listing} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">Brak ofert spełniających wybrane kryteria.</p>
		{/if}
	</div>
</main>

<LandingFooter />

<style lang="scss">
	.breadcrumb { font-size: 13px; color: var(--c-subtle); }
	h1 { margin: 8px 0 6px; }
	.lead { margin-bottom: 28px; }

	.filters-bar {
		display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
		margin-bottom: 36px; padding-bottom: 28px; border-bottom: 1px solid var(--c-border);
	}
	.filter-select { width: 190px; }
	.sort-label {
		display: flex; align-items: center; gap: 8px; margin-left: auto;
		font-size: 13px; color: var(--c-muted);
	}
	.sort-select { width: 170px; }

	.listing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr)); gap: 22px; }
	.empty-state { padding: 60px 0; text-align: center; color: var(--c-subtle); }

	@media (max-width: 639px) {
		.filter-select, .sort-select { width: 100%; }
		.sort-label { margin-left: 0; width: 100%; }
	}
</style>
