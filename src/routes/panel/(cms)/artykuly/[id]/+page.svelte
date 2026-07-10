<script lang="ts">
	import ArticleForm from '$lib/components/panel/ArticleForm.svelte';
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Edytuj: {data.article.title} — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Edytuj artykuł</h1>
	<div class="header-tools">
		<a href="/blog/{data.article.slug}" target="_blank" rel="noopener" class="btn btn--ghost">Podgląd →</a>
		<a href="/panel/artykuly" class="btn btn--ghost">← Lista</a>
	</div>
</div>

<ArticleForm article={data.article} error={form?.error} />

<style>
	.header-tools {
		display: flex;
		gap: 8px;
	}
</style>
