<script lang="ts">
	import logo from '$lib/assets/lw-logo.png';
	import { kontakt } from '$lib/data/landing';

	let menuOpen = $state(false);

	const links = [
		{ href: '/oferty', label: 'Oferty' },
		{ href: '/#uslugi', label: 'Usługi' },
		{ href: '/#o-nas', label: 'O nas' },
		{ href: '/#region', label: 'Region' },
		{ href: '/kontakt', label: 'Kontakt' }
	];

	const phoneHref = `tel:${kontakt.telefon.replace(/\s/g, '')}`;
</script>

<header class="nav">
	<a href="/" class="brand">
		<img class="brand-logo" src={logo} alt="LW Nieruchomości" />
		<span class="brand-text">
			<span class="brand-name">LW Nieruchomości</span>
			<span class="brand-sub">Jelenia Góra · Karkonosze</span>
		</span>
	</a>
	<nav class="nav-links">
		{#each links as link}
			<a href={link.href}>{link.label}</a>
		{/each}
	</nav>
	<div class="nav-right">
		<a href={phoneHref} class="nav-phone">{kontakt.telefon}</a>
		<a href="/kontakt#formularz" class="nav-cta">Zgłoś ofertę</a>
	</div>
	<button class="nav-burger" class:open={menuOpen} aria-label="Menu" onclick={() => (menuOpen = !menuOpen)}>
		<span></span><span></span><span></span>
	</button>
</header>

{#if menuOpen}
	<div class="mobile-menu">
		{#each links as link}
			<a href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
		{/each}
		<a href={phoneHref} onclick={() => (menuOpen = false)}>{kontakt.telefon}</a>
	</div>
{/if}

<style>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 22px 48px;
		background: rgba(251, 248, 242, 0.9);
		border-bottom: 1px solid var(--nav-border);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.brand-logo {
		width: 46px;
		height: 46px;
		object-fit: contain;
		flex-shrink: 0;
	}
	.brand-text {
		line-height: 1.15;
		display: flex;
		flex-direction: column;
	}
	.brand-name {
		font-family: 'Newsreader', serif;
		font-size: 20px;
		font-weight: 600;
	}
	.brand-sub {
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--label);
	}
	.nav-links {
		display: flex;
		gap: 34px;
		font-size: 15px;
		color: var(--text-nav, #4a4e42);
	}
	.nav-links a:hover {
		color: var(--green);
	}
	.nav-right {
		display: flex;
		align-items: center;
		gap: 18px;
	}
	.nav-phone {
		font-weight: 600;
		font-size: 15px;
	}
	.nav-cta {
		background: var(--green);
		color: #fff;
		padding: 11px 20px;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 600;
	}
	.nav-cta:hover {
		opacity: 0.9;
		color: #fff;
	}
	.nav-burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		width: 26px;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
	.nav-burger span {
		display: block;
		height: 2px;
		width: 100%;
		background: var(--green);
		border-radius: 2px;
		transition: all 0.25s ease;
	}
	.nav-burger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.nav-burger.open span:nth-child(2) {
		opacity: 0;
	}
	.nav-burger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}
	.mobile-menu {
		display: none;
		flex-direction: column;
		gap: 2px;
		padding: 8px 48px 20px;
		background: rgba(251, 248, 242, 0.98);
		border-bottom: 1px solid var(--nav-border);
	}
	.mobile-menu a {
		padding: 12px 4px;
		font-size: 16px;
		color: var(--text-nav, #4a4e42);
		border-bottom: 1px solid var(--nav-border);
	}
	.mobile-menu a:last-child {
		border-bottom: none;
		color: var(--green);
		font-weight: 600;
	}

	@media (max-width: 980px) {
		.nav-links,
		.nav-right {
			display: none;
		}
		.nav-burger {
			display: flex;
		}
		.mobile-menu {
			display: flex;
		}
	}
	@media (max-width: 640px) {
		.nav,
		.mobile-menu {
			padding-left: 20px;
			padding-right: 20px;
		}
	}
</style>
