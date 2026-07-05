<script lang="ts">
	import ListingForm from '$lib/components/panel/ListingForm.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Edytuj ofertę — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Edytuj ofertę</h1>
</div>

<ListingForm listing={data.listing} error={form?.error} />
