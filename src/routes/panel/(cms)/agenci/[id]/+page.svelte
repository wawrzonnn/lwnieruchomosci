<script lang="ts">
	import AgentForm from '$lib/components/panel/AgentForm.svelte';
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Edytuj agenta — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Edytuj agenta</h1>
	<a href="/panel/agenci" class="btn btn--ghost">← Lista</a>
</div>

<AgentForm agent={data.agent} error={form?.error} />
