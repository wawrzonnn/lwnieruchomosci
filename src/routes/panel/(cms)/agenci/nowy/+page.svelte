<script lang="ts">
	import AgentForm from '$lib/components/panel/AgentForm.svelte';
	let { form } = $props();
</script>

<svelte:head>
	<title>Dodaj agenta — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Dodaj agenta</h1>
	<a href="/panel/agenci" class="btn btn--ghost">← Wróć do listy</a>
</div>

<AgentForm error={form?.error} />
