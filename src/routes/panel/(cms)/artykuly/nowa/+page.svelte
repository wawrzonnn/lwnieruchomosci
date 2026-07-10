<script lang="ts">
	import ArticleForm from '$lib/components/panel/ArticleForm.svelte';
	let { form } = $props();
</script>

<svelte:head>
	<title>Nowy artykuł — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Nowy artykuł</h1>
	<a href="/panel/artykuly" class="btn btn--ghost">← Wróć do listy</a>
</div>

<ArticleForm error={form?.error} />
