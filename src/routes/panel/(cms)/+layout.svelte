<script lang="ts">
	import { page } from '$app/stores';
	import { initials } from '$lib/utils';

	let { children, data } = $props();
	let mobileOpen = $state(false);

	const navItems = [
		{ href: '/panel/oferty', label: 'Oferty' },
		{ href: '/panel/oferty/nowa', label: 'Dodaj ofertę' },
		{ href: '/panel/uzytkownicy', label: 'Użytkownicy' },
		{ href: '/panel/zgloszenia', label: 'Zgłoszenia', badge: data.newInquiries }
	];

	function isActive(href: string) {
		if (href === '/panel/oferty') return $page.url.pathname === '/panel/oferty';
		return $page.url.pathname.startsWith(href);
	}
</script>

<div class="admin">
	<div class="mobile-topbar">
		<button class="hamburger-btn" aria-label="Menu" onclick={() => (mobileOpen = !mobileOpen)}>
			<span class:open={mobileOpen}></span>
			<span class:open={mobileOpen}></span>
			<span class:open={mobileOpen}></span>
		</button>
		<span class="mobile-logo">LW Nieruchomości</span>
	</div>

	{#if mobileOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="sidebar-overlay" onclick={() => (mobileOpen = false)}></div>
	{/if}

	<aside class="admin__sidebar" class:open={mobileOpen}>
		<div class="sidebar-header">
			<a href="/" class="sidebar-logo">
				<span class="logo-mark">LW</span>
				<span class="logo-text">Panel<br />LW Nieruchomości</span>
			</a>
		</div>

		<nav class="sidebar-nav">
			{#each navItems as item}
				<a
					href={item.href}
					class="admin__nav-item"
					class:is-active={isActive(item.href)}
					onclick={() => (mobileOpen = false)}
				>
					<span class="link-label">{item.label}</span>
					{#if item.badge}<span class="link-badge">{item.badge}</span>{/if}
				</a>
			{/each}
		</nav>

		<div class="sidebar-footer">
			<div class="user-card">
				<span class="user-avatar">{initials(data.user.name)}</span>
				<div class="user-info">
					<span class="user-name">{data.user.name}</span>
					<span class="user-role">{data.user.role === 'ADMIN' ? 'Administrator' : 'Agent'}</span>
				</div>
			</div>
			<a href="/" class="sidebar-btn">Zobacz stronę</a>
			<form method="POST" action="/panel/wyloguj">
				<button type="submit" class="sidebar-btn logout">⏻ Wyloguj</button>
			</form>
		</div>
	</aside>

	<main class="panel-main">
		{@render children()}
	</main>
</div>

<style lang="scss">
	.admin {
		min-height: 100vh;
	}

	.admin__sidebar {
		width: 236px;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		background: var(--c-footer);
	}
	.sidebar-header {
		padding: 22px 20px 18px;
		border-bottom: 1px solid var(--c-dark-border);
	}
	.sidebar-logo {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.logo-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: var(--r-md);
		flex-shrink: 0;
		background: var(--c-primary);
		color: #f3efe4;
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: 13px;
	}
	.logo-text {
		font-size: 13px;
		font-weight: 600;
		color: #f3efe4;
		line-height: 1.35;
	}

	.sidebar-nav {
		flex: 1;
		padding: 16px 12px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	:global(.admin__nav-item) {
		justify-content: space-between;
		text-decoration: none;
		transition: all 0.2s ease;
		&:hover {
			color: #f3efe4;
			background: rgba(255, 255, 255, 0.06);
		}
	}
	.link-badge {
		font-size: 11px;
		font-weight: 700;
		padding: 1px 8px;
		border-radius: var(--r-pill);
		background: var(--c-gold);
		color: #20291f;
	}

	.sidebar-footer {
		padding: 16px 14px;
		border-top: 1px solid var(--c-dark-border);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.user-card {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 4px;
	}
	.user-avatar {
		width: 36px;
		height: 36px;
		border-radius: var(--r-md);
		flex-shrink: 0;
		background: var(--c-dark-elev);
		color: #f3efe4;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 700;
	}
	.user-info {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.user-name {
		font-size: 13px;
		font-weight: 600;
		color: #f3efe4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.user-role {
		font-size: 11px;
		color: var(--c-dark-text-3);
	}

	.sidebar-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		width: 100%;
		padding: 9px 12px;
		border-radius: var(--r-sm);
		font-size: 12.5px;
		font-weight: 600;
		color: var(--c-dark-text-2);
		background: var(--c-dark-elev);
		border: 1px solid var(--c-dark-border);
		cursor: pointer;
		&:hover {
			color: #f3efe4;
			background: var(--c-primary);
		}
	}

	.panel-main {
		margin-left: 236px;
		padding: 36px;
		background: #f3ecdd;
		min-height: 100vh;
	}

	.mobile-topbar {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 40;
		height: 56px;
		padding: 0 16px;
		background: var(--c-footer);
		align-items: center;
		gap: 12px;
	}
	.mobile-logo {
		font-size: 15px;
		font-weight: 700;
		color: #f3efe4;
	}
	.hamburger-btn {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 22px;
		background: none;
		border: none;
		cursor: pointer;
	}
	.hamburger-btn span {
		display: block;
		height: 2px;
		width: 100%;
		background: #f3efe4;
		border-radius: 1px;
		transition: all 0.3s ease;
		&.open:nth-child(1) {
			transform: translateY(6px) rotate(45deg);
		}
		&.open:nth-child(2) {
			opacity: 0;
		}
		&.open:nth-child(3) {
			transform: translateY(-6px) rotate(-45deg);
		}
	}
	.sidebar-overlay {
		display: none;
		position: fixed;
		inset: 0;
		z-index: 45;
		background: rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 767px) {
		.mobile-topbar {
			display: flex;
		}
		.admin__sidebar {
			transform: translateX(-100%);
			transition: transform 0.3s ease;
			&.open {
				transform: translateX(0);
			}
		}
		.sidebar-overlay {
			display: block;
		}
		.panel-main {
			margin-left: 0;
			padding: 72px 16px 24px;
		}
	}
</style>
