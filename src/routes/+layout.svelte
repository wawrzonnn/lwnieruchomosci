<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/handoff/main.scss';
	import '$lib/styles/panel-extra.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
