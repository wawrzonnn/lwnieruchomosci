<script lang="ts">
	import ListingForm from '$lib/components/panel/ListingForm.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>Dodaj ofertę — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Dodaj ofertę</h1>
</div>

<ListingForm error={form?.error} />
