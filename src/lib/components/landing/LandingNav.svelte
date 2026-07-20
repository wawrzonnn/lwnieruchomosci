<script lang="ts">
	// Emblemat (złoto+biel) zaprojektowany na ciemne tło — w jasnym headerze osadzamy
	// go na zielonym kaflu (handoff refinement 20).
	import logo from '$lib/assets/logo-emblem.png';

	let menuOpen = $state(false);
	let mobileOfertySubOpen = $state(false);
	let mobileUslugiSubOpen = $state(false);

	const ofertyLinks = [
		{ href: '/oferty', label: 'Wszystkie oferty' },
		{ href: '/oferty?category=MIESZKANIE', label: 'Mieszkania' },
		{ href: '/oferty?category=DOM', label: 'Domy' },
		{ href: '/oferty?category=DZIALKA', label: 'Działki' },
		{ href: '/oferty?category=LOKAL', label: 'Lokale' },
		{ href: '/oferty?featured=1', label: 'Oferty premium' }
	];

	const uslugiLinks = [
		{ href: '/sprzedaz-nieruchomosci', label: 'Sprzedaż nieruchomości' },
		{ href: '/kupno-nieruchomosci', label: 'Kupno nieruchomości' },
		{ href: '/wycena-nieruchomosci', label: 'Wycena nieruchomości' },
		{ href: '/marketing-nieruchomosci', label: 'Marketing nieruchomości' },
		{ href: '/doradztwo-kredytowe', label: 'Doradztwo kredytowe' }
	];

	const simpleLinks = [
		// „Region" wg paczki lokalizacji designerki („nawigacja (aktywna: Region)") — na szkielecie
		// strony tej pozycji nie narysowała, ale bez niej podstrony miejscowości nie mają wejścia.
		{ href: '/lokalizacje', label: 'Region' },
		{ href: '/o-nas', label: 'O nas' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/kontakt', label: 'Kontakt' }
	];

	function closeMobile() {
		menuOpen = false;
		mobileOfertySubOpen = false;
		mobileUslugiSubOpen = false;
	}
</script>

<header class="nav">
	<a href="/" class="brand">
		<span class="brand-tile">
			<img src={logo} alt="LW Nieruchomości" />
		</span>
		<span class="brand-text">
			<span class="brand-name">LW Nieruchomości</span>
			<span class="brand-sub">Jelenia Góra · Karkonosze</span>
		</span>
	</a>

	<nav class="nav-links">
		<div class="nav-item has-dropdown">
			<button type="button" class="nav-trigger">
				Znajdź nieruchomość
				<svg class="chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
					<path d="M1 1l4.5 4.5L10 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				</svg>
			</button>
			<div class="dropdown">
				<div class="dropdown-inner">
					{#each ofertyLinks as link}
						<a href={link.href}>{link.label}</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="nav-item has-dropdown">
			<button type="button" class="nav-trigger">
				Usługi
				<svg class="chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
					<path d="M1 1l4.5 4.5L10 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				</svg>
			</button>
			<div class="dropdown">
				<div class="dropdown-inner">
					{#each uslugiLinks as link}
						<a href={link.href}>{link.label}</a>
					{/each}
				</div>
			</div>
		</div>

		{#each simpleLinks as link}
			<a href={link.href} class="nav-item">{link.label}</a>
		{/each}
	</nav>

	<div class="nav-right">
		<a href="/kontakt#formularz" class="nav-cta">Umów konsultację</a>
	</div>

	<button class="nav-burger" class:open={menuOpen} aria-label="Menu" onclick={() => (menuOpen = !menuOpen)}>
		<span></span><span></span><span></span>
	</button>
</header>

{#if menuOpen}
	<div class="mobile-menu">
		<button
			type="button"
			class="mobile-toggle"
			class:open={mobileOfertySubOpen}
			onclick={() => (mobileOfertySubOpen = !mobileOfertySubOpen)}
		>
			Znajdź nieruchomość
			<svg class="chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
				<path d="M1 1l4.5 4.5L10 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
			</svg>
		</button>
		{#if mobileOfertySubOpen}
			<div class="mobile-submenu">
				{#each ofertyLinks as link}
					<a href={link.href} onclick={closeMobile}>{link.label}</a>
				{/each}
			</div>
		{/if}

		<button
			type="button"
			class="mobile-toggle"
			class:open={mobileUslugiSubOpen}
			onclick={() => (mobileUslugiSubOpen = !mobileUslugiSubOpen)}
		>
			Usługi
			<svg class="chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
				<path d="M1 1l4.5 4.5L10 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
			</svg>
		</button>
		{#if mobileUslugiSubOpen}
			<div class="mobile-submenu">
				{#each uslugiLinks as link}
					<a href={link.href} onclick={closeMobile}>{link.label}</a>
				{/each}
			</div>
		{/if}

		{#each simpleLinks as link}
			<a href={link.href} onclick={closeMobile}>{link.label}</a>
		{/each}
		<a href="/kontakt#formularz" class="mobile-cta" onclick={closeMobile}>Umów konsultację</a>
	</div>
{/if}

<style>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* niski pionowy padding: duże logo (78px) nie rozpycha wysokości headera */
		padding: 8px 48px;
		background: rgba(251, 248, 242, 0.9);
		border-bottom: 1px solid var(--nav-border);
		position: relative;
		z-index: 50;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	/* Zielony kafel z emblematem. Wersja designera (50px/padding 8) była za mała,
	   by odczytać szczegółową kreskę — większy kafel, minimalny padding. */
	.brand-tile {
		width: 78px;
		height: 78px;
		flex-shrink: 0;
		padding: 4px;
		background: var(--green);
		display: grid;
		place-items: center;
	}
	.brand-tile img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
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
		align-items: center;
		gap: 6px;
		font-size: 15px;
		color: var(--text-nav, #4a4e42);
	}
	.nav-item {
		padding: 10px 12px;
		border-radius: 8px;
	}
	a.nav-item:hover {
		color: var(--green);
	}
	.nav-item.has-dropdown {
		position: relative;
	}
	.nav-trigger {
		display: flex;
		align-items: center;
		gap: 6px;
		font: inherit;
		color: inherit;
		background: none;
		border: none;
		cursor: pointer;
		padding: 10px 12px;
		border-radius: 8px;
	}
	.chevron {
		flex: none;
		transition: transform 0.15s ease;
	}
	.has-dropdown:hover .nav-trigger,
	.has-dropdown:focus-within .nav-trigger {
		color: var(--green);
	}
	.has-dropdown:hover .chevron,
	.has-dropdown:focus-within .chevron {
		transform: rotate(180deg);
	}
	/* .dropdown zaczyna się od razu pod triggerem (top:100%, bez przerwy) i jest
	   przezroczystym „mostkiem" hover — samo padding-top daje wizualny odstęp,
	   ale kursor cały czas pozostaje nad elementem-potomkiem .has-dropdown,
	   więc nie traci hover między przyciskiem a kartą menu. */
	.dropdown {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		padding-top: 6px;
		min-width: 240px;
	}
	.has-dropdown:hover .dropdown,
	.has-dropdown:focus-within .dropdown {
		display: block;
	}
	.dropdown-inner {
		display: flex;
		flex-direction: column;
		background: var(--bg-site);
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 8px;
		box-shadow: 0 24px 44px -22px rgba(30, 40, 30, 0.35);
	}
	.dropdown-inner a {
		padding: 10px 12px;
		border-radius: 8px;
		font-size: 14.5px;
	}
	.dropdown-inner a:hover {
		background: var(--bg-cream-2);
		color: var(--green);
	}
	.nav-right {
		display: flex;
		align-items: center;
		gap: 18px;
	}
	.nav-cta {
		background: var(--green);
		color: #fff;
		padding: 11px 20px;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 600;
		white-space: nowrap;
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
	.mobile-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font: inherit;
		font-size: 16px;
		color: var(--text-nav, #4a4e42);
		background: none;
		border: none;
		border-bottom: 1px solid var(--nav-border);
		padding: 12px 4px;
		cursor: pointer;
	}
	.mobile-toggle .chevron {
		transition: transform 0.2s ease;
	}
	.mobile-toggle.open .chevron {
		transform: rotate(180deg);
	}
	.mobile-submenu {
		display: flex;
		flex-direction: column;
		padding-left: 14px;
		background: var(--bg-cream-2);
		border-radius: 10px;
		margin: 4px 0;
	}
	.mobile-submenu a {
		border-bottom: 1px solid var(--nav-border);
		font-size: 15px;
	}
	.mobile-submenu a:last-child {
		border-bottom: none;
	}
	.mobile-menu a:last-of-type {
		border-bottom: none;
	}
	.mobile-cta {
		margin-top: 10px;
		text-align: center;
		background: var(--green);
		color: #fff;
		border-radius: 999px;
		font-weight: 600;
		border-bottom: none !important;
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
		.brand-tile {
			width: 58px;
			height: 58px;
			padding: 3px;
		}
	}
</style>
