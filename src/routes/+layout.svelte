<script lang="ts">
	import favicon from '$lib/assets/lw-favicon.png';
	import '$lib/styles/handoff/main.scss';
	import '$lib/styles/panel-extra.scss';
	import '$lib/styles/landing-shared.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
