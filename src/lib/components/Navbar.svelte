<script lang="ts">
	let mobileOpen = $state(false);

	const links = [
		{ href: '/oferty', label: 'Oferty' },
		{ href: '/#o-nas', label: 'O nas' },
		{ href: '/#region', label: 'Region' },
		{ href: '/#kontakt', label: 'Kontakt' }
	];
</script>

<header class="navbar">
	<div class="container navbar-inner">
		<a href="/" class="brand">
			<span class="brand-mark">LW</span>
			<span class="brand-text">
				<strong>LW Nieruchomości</strong>
				<span class="brand-sub">Jelenia Góra · Karkonosze</span>
			</span>
		</a>

		<nav class="nav-links">
			{#each links as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<div class="navbar-actions">
			<a href="tel:+48690008273" class="phone-link">+48 690 008 273</a>
			<a href="/panel" class="panel-link">Panel</a>
			<a href="/#zglos-oferte" class="btn btn--primary">Zgłoś ofertę</a>
		</div>

		<button class="burger" aria-label="Menu" onclick={() => (mobileOpen = !mobileOpen)}>
			<span class:open={mobileOpen}></span>
			<span class:open={mobileOpen}></span>
			<span class:open={mobileOpen}></span>
		</button>
	</div>

	{#if mobileOpen}
		<div class="mobile-menu">
			{#each links as link}
				<a href={link.href} onclick={() => (mobileOpen = false)}>{link.label}</a>
			{/each}
			<a href="/panel" onclick={() => (mobileOpen = false)}>Panel</a>
			<a href="/#zglos-oferte" class="btn btn--primary" onclick={() => (mobileOpen = false)}>Zgłoś ofertę</a>
		</div>
	{/if}
</header>

<style lang="scss">
	.navbar {
		position: sticky;
		top: 0;
		z-index: 40;
		background: rgba(246, 241, 231, 0.9);
		backdrop-filter: blur(14px);
		border-bottom: 1px solid var(--c-border-2);
	}
	.navbar-inner {
		display: flex;
		align-items: center;
		gap: 32px;
		height: var(--header-h);
		padding-inline: clamp(20px, 4vw, 52px);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-right: auto;
	}
	.brand-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: var(--r-md);
		background: var(--c-primary);
		color: #f3efe4;
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: 16px;
		flex-shrink: 0;
	}
	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
		strong {
			font-family: var(--font-serif);
			font-size: 17px;
			font-weight: 500;
			color: var(--c-text);
		}
	}
	.brand-sub {
		font-size: 10.5px;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--c-subtle);
		text-transform: uppercase;
	}

	.nav-links {
		display: flex;
		gap: 28px;
		a {
			font-size: 14.5px;
			font-weight: 500;
			color: var(--c-text-nav);
			&:hover {
				color: var(--c-primary);
			}
		}
	}

	.navbar-actions {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.phone-link {
		font-size: 14px;
		font-weight: 600;
		color: var(--c-text);
	}
	.panel-link {
		font-size: 14px;
		font-weight: 500;
		color: var(--c-text-nav);
		&:hover {
			color: var(--c-primary);
		}
	}

	.burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		width: 24px;
		span {
			display: block;
			height: 2px;
			width: 100%;
			background: var(--c-text);
			border-radius: 1px;
			transition: all 0.25s ease;
			&.open:nth-child(1) {
				transform: translateY(7px) rotate(45deg);
			}
			&.open:nth-child(2) {
				opacity: 0;
			}
			&.open:nth-child(3) {
				transform: translateY(-7px) rotate(-45deg);
			}
		}
	}

	.mobile-menu {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 12px 20px 24px;
		border-top: 1px solid var(--c-border-2);
		a {
			padding: 10px 4px;
			font-size: 15px;
			font-weight: 500;
			color: var(--c-text);
		}
		.btn {
			margin-top: 8px;
		}
	}

	/* $bp-md: 900px */
	@media (max-width: 899px) {
		.nav-links,
		.phone-link {
			display: none;
		}
	}
	/* $bp-sm: 640px */
	@media (max-width: 639px) {
		.navbar-actions .panel-link,
		.navbar-actions .btn {
			display: none;
		}
		.burger {
			display: flex;
		}
	}
</style>
