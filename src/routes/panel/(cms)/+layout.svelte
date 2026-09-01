<script lang="ts">
	import { page } from '$app/stores';
	import { initials } from '$lib/utils';
	import logo from '$lib/assets/lw-logo.png';

	let { children, data } = $props();
	let mobileOpen = $state(false);

	// Bez tego tło przewijało się pod otwartym menu i po zamknięciu lądowało się
	// w zupełnie innym miejscu listy.
	$effect(() => {
		if (!mobileOpen) return;
		const poprzedni = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const naEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') mobileOpen = false;
		};
		window.addEventListener('keydown', naEsc);
		return () => {
			document.body.style.overflow = poprzedni;
			window.removeEventListener('keydown', naEsc);
		};
	});

	const navItems = [
		{ href: '/panel/oferty', label: 'Oferty' },
		{ href: '/panel/oferty/nowa', label: 'Dodaj ofertę' },
		{ href: '/panel/artykuly', label: 'Blog' },
		{ href: '/panel/regiony', label: 'Regiony' },
		{ href: '/panel/agenci', label: 'Agenci' },
		{ href: '/panel/uzytkownicy', label: 'Użytkownicy' },
		{ href: '/panel/zgloszenia', label: 'Zgłoszenia', badge: data.newInquiries }
	];

	function isActive(href: string) {
		const sciezka = $page.url.pathname;
		// „Dodaj ofertę" jest osobną pozycją, więc /panel/oferty/nowa nie może
		// podświetlać obu. Za to /panel/oferty/12 (edycja) należy do „Ofert" —
		// wcześniej przy edycji nie świeciła się żadna pozycja menu.
		if (href === '/panel/oferty') {
			return sciezka.startsWith('/panel/oferty') && sciezka !== '/panel/oferty/nowa';
		}
		if (href === '/panel/oferty/nowa') return sciezka === '/panel/oferty/nowa';
		if (href === '/panel/artykuly') return sciezka.startsWith('/panel/artykuly');
		return sciezka.startsWith(href);
	}

	// Potwierdzenie zapisu. Akcje panelu kończą się przekierowaniem na listę,
	// więc do tej pory po kliknięciu „Zapisz" nie było ŻADNEGO znaku, że
	// cokolwiek się stało — poza tym, że strona się zmieniła.
	const KOMUNIKATY: Record<string, string> = {
		'oferta-nowa': 'Oferta została dodana.',
		oferta: 'Zmiany w ofercie zapisane.',
		'artykul-nowy': 'Artykuł został dodany.',
		artykul: 'Zmiany w artykule zapisane.',
		uzytkownik: 'Konto zostało utworzone.',
		'agent-nowy': 'Agent został dodany.',
		agent: 'Zmiany u agenta zapisane.'
	};
	let potwierdzenie = $state('');

	$effect(() => {
		const klucz = $page.url.searchParams.get('zapisano');
		if (!klucz) return;
		potwierdzenie = KOMUNIKATY[klucz] ?? 'Zapisano.';
		// zdejmujemy parametr, żeby odświeżenie strony nie pokazywało go znowu
		const czysty = new URL($page.url);
		czysty.searchParams.delete('zapisano');
		history.replaceState(history.state, '', czysty.pathname + czysty.search);
		const t = setTimeout(() => (potwierdzenie = ''), 5000);
		return () => clearTimeout(t);
	});
</script>

<div class="admin">
	<div class="mobile-topbar">
		<button
			class="hamburger-btn"
			aria-label={mobileOpen ? 'Zamknij menu' : 'Menu'}
			aria-expanded={mobileOpen}
			aria-controls="panel-sidebar"
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="hamburger-lines">
				<span class:open={mobileOpen}></span>
				<span class:open={mobileOpen}></span>
				<span class:open={mobileOpen}></span>
			</span>
		</button>
		<span class="mobile-logo">LW Nieruchomości</span>
	</div>

	{#if mobileOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="sidebar-overlay" onclick={() => (mobileOpen = false)}></div>
	{/if}

	<aside class="admin__sidebar" id="panel-sidebar" class:open={mobileOpen}>
		<div class="sidebar-header">
			<a href="/" class="sidebar-logo">
				<img class="logo-mark" src={logo} alt="LW Nieruchomości" />
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
		{#if potwierdzenie}
			<div class="potwierdzenie" role="status">
				<span>{potwierdzenie}</span>
				<button type="button" aria-label="Zamknij" onclick={() => (potwierdzenie = '')}>×</button>
			</div>
		{/if}
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
		/* Na niskim ekranie (telefon w poziomie, przeglądarka z paskami) menu jest
		   wyższe niż widok — bez tego „Zgłoszenia" i „Wyloguj" były nieosiągalne. */
		overflow-y: auto;
		overscroll-behavior: contain;
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
		width: 34px;
		height: 34px;
		object-fit: contain;
		flex-shrink: 0;
	}
	.logo-text {
		font-size: 13px;
		font-weight: 600;
		color: #f3efe4;
		line-height: 1.35;
	}

	.sidebar-nav {
		flex: 1;
		/* element flex nie skurczy się poniżej treści bez tego */
		min-height: 0;
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
		/* .admin jest flexem (z paczki handoff), a element flex domyślnie ma
		   min-width:auto i nie kurczy się poniżej swojej treści. Bez tego szeroka
		   tabela rozpychała CAŁĄ stronę zamiast przewijać się w .table-wrap. */
		min-width: 0;
	}

	.potwierdzenie {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
		padding: 12px 16px;
		border-radius: var(--r-sm);
		background: var(--c-green-tint, #e8efe6);
		border: 1px solid var(--c-primary);
		color: var(--c-primary);
		font-size: 14px;
		font-weight: 600;

		span {
			margin-right: auto;
		}
		button {
			flex: none;
			width: 28px;
			height: 28px;
			border: none;
			background: none;
			color: inherit;
			font-size: 20px;
			line-height: 1;
			cursor: pointer;
			opacity: 0.7;

			&:hover {
				opacity: 1;
			}
		}
	}

	.mobile-topbar {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		/* nad przyciemnieniem (45) i nad sidebarem (50) — inaczej przy otwartym
		   menu przycisk zamykania był przykryty i nie dało się go kliknąć */
		z-index: 60;
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
		/* 44x44 to minimalny cel dotykowy; same kreski zostają 22 px szerokie */
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		margin-left: -11px;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
	.hamburger-lines {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 22px;
	}
	.hamburger-lines span {
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

	/* Do 1023 px sidebar zjadałby 236 px z 768 px szerokości iPada — na treść
	   zostawało 445 px. Tablet dostaje ten sam układ co telefon. */
	@media (max-width: 1023px) {
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
		.admin__sidebar {
			/* pasek górny ma z-index 60 i przykrywa górę sidebara */
			padding-top: 56px;
		}
		.sidebar-header {
			display: none;
		}
		.panel-main {
			margin-left: 0;
			padding: 72px 16px 24px;
		}
	}
</style>
