<script lang="ts">
	import favicon from '$lib/assets/lw-favicon.png';
	import '$lib/styles/handoff/main.scss';
	import '$lib/styles/panel-extra.scss';
	import '$lib/styles/landing-shared.css';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';

	let { children } = $props();

	// Kanoniczny URL i og:url — dostosowują się do hosta (Netlify teraz, VPS docelowo);
	// można pinować domenę zmienną PUBLIC_SITE_URL.
	const base = $derived((env.PUBLIC_SITE_URL || '').replace(/\/+$/, '') || $page.url.origin);
	const canonical = $derived(base + $page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content="LW Nieruchomości" />
	<meta property="og:locale" content="pl_PL" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{@render children()}
