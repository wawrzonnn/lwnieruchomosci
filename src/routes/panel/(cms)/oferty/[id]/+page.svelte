<script lang="ts">
	import ListingForm from '$lib/components/panel/ListingForm.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Edytuj ofertę — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Edytuj ofertę</h1>
	<div class="header-tools">
		{#if data.listing.status === 'ACTIVE'}
			<a href="/oferty/{data.listing.slug}" target="_blank" rel="noopener" class="btn btn--ghost">
				Podgląd →
			</a>
		{/if}
		<a href="/panel/oferty" class="btn btn--ghost">← Lista</a>
	</div>
</div>

<ListingForm listing={data.listing} agenci={data.agenci} error={form?.error} />

<style>
	.header-tools {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
</style>
