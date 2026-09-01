<script lang="ts">
	import ListingForm from '$lib/components/panel/ListingForm.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Dodaj ofertę — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Dodaj ofertę</h1>
	<a href="/panel/oferty" class="btn btn--ghost">← Wróć do listy</a>
</div>

<ListingForm agenci={data.agenci} error={form?.error} />
