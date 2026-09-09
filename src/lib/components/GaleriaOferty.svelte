<script lang="ts">
	import type { ListingImage } from '@prisma/client';
	import { miniatura } from '$lib/utils';

	let {
		images = [],
		tytul,
		badges = [],
		sprzedane = false,
		kategoria = ''
	}: {
		images?: ListingImage[];
		tytul: string;
		badges?: { text: string; cls: string }[];
		sprzedane?: boolean;
		kategoria?: string;
	} = $props();

	// Główne zdjęcie zawsze pierwsze, reszta wg `order`.
	const zdjecia = $derived(
		[...images].sort((a, b) => Number(b.isMain) - Number(a.isMain) || a.order - b.order)
	);

	let aktywne = $state(0);
	let pasek: HTMLDivElement | undefined = $state();

	// SvelteKit reużywa komponent między ofertami. Bez tego przejście z oferty
	// o 27 zdjęciach na ofertę o 2 zostawiało indeks 14 i pusty kadr.
	$effect(() => {
		zdjecia.length;
		aktywne = 0;
	});

	function pokaz(i: number) {
		if (!zdjecia.length) return;
		aktywne = (i + zdjecia.length) % zdjecia.length;
	}

	// Miniatura aktywnego zdjęcia musi zostać w polu widzenia paska.
	$effect(() => {
		const i = aktywne;
		if (!pasek) return;
		const mini = pasek.children[i] as HTMLElement | undefined;
		mini?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
	});

	// ── Lightbox ──────────────────────────────────────────────────────────────
	let otwarty = $state(false);
	let przesuniecie = $state(0); // px, przesunięcie palcem/myszą w trakcie gestu
	let ciagnie = $state(false);
	let szerokosc = $state(0);
	let startX = 0;
	let startY = 0;
	let poziomy: boolean | null = null; // czy gest jest poziomy (dopiero po kilku px)

	function otworz(i: number) {
		aktywne = i;
		otwarty = true;
	}
	function zamknij() {
		otwarty = false;
		przesuniecie = 0;
		ciagnie = false;
	}

	// Blokada przewijania tła + obsługa klawiatury, sprzątane przy zamknięciu.
	$effect(() => {
		if (!otwarty) return;
		const poprzedni = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const naKlawisz = (e: KeyboardEvent) => {
			if (e.key === 'Escape') zamknij();
			else if (e.key === 'ArrowRight') pokaz(aktywne + 1);
			else if (e.key === 'ArrowLeft') pokaz(aktywne - 1);
		};
		window.addEventListener('keydown', naKlawisz);
		return () => {
			document.body.style.overflow = poprzedni;
			window.removeEventListener('keydown', naKlawisz);
		};
	});

	function start(e: PointerEvent) {
		if (zdjecia.length < 2) return;
		startX = e.clientX;
		startY = e.clientY;
		poziomy = null;
		ciagnie = true;
		szerokosc = (e.currentTarget as HTMLElement).clientWidth;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function ruch(e: PointerEvent) {
		if (!ciagnie) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;

		// Do 8 px nie wiadomo, czy to przesuwanie zdjęć, czy przewijanie strony.
		if (poziomy === null) {
			if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
			poziomy = Math.abs(dx) > Math.abs(dy);
			if (!poziomy) {
				ciagnie = false;
				return;
			}
		}

		// Opór na krańcach — widać, że dalej nic nie ma.
		const naKrancu = (dx > 0 && aktywne === 0) || (dx < 0 && aktywne === zdjecia.length - 1);
		przesuniecie = naKrancu ? dx * 0.32 : dx;
	}

	function koniec() {
		if (!ciagnie) return;
		ciagnie = false;
		const prog = Math.min(90, szerokosc * 0.18);
		if (przesuniecie <= -prog) pokaz(aktywne + 1);
		else if (przesuniecie >= prog) pokaz(aktywne - 1);
		przesuniecie = 0;
	}

	// Ładujemy tylko sąsiadów — przy 27 zdjęciach reszta czekałaby niepotrzebnie.
	const blisko = (i: number) => Math.abs(i - aktywne) <= 1;
</script>

<div class="galeria">
	<div class="galeria-glowna" class:sprzedane>
		{#if zdjecia.length}
			<button
				type="button"
				class="glowna-przycisk"
				onclick={() => otworz(aktywne)}
				aria-label="Powiększ zdjęcie {aktywne + 1} z {zdjecia.length}"
			>
				<img src={miniatura(zdjecia[aktywne]?.url, 900)} alt="{tytul} — zdjęcie {aktywne + 1}" />
			</button>

			{#if zdjecia.length > 1}
				<button
					type="button"
					class="strzalka lewa"
					onclick={() => pokaz(aktywne - 1)}
					aria-label="Poprzednie zdjęcie"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
				</button>
				<button
					type="button"
					class="strzalka prawa"
					onclick={() => pokaz(aktywne + 1)}
					aria-label="Następne zdjęcie"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
				</button>
				<span class="licznik">{aktywne + 1} / {zdjecia.length}</span>
			{/if}
		{:else}
			<div class="ph" data-label={`zdjęcie · ${kategoria}`}></div>
		{/if}

		{#if badges.length}
			<div class="galeria-badges">
				{#each badges as b}
					<span class="badge {b.cls}">{b.text}</span>
				{/each}
			</div>
		{/if}
	</div>

	{#if zdjecia.length > 1}
		<div class="pasek" bind:this={pasek}>
			{#each zdjecia as img, i}
				<button
					type="button"
					class="mini"
					class:aktywna={i === aktywne}
					onclick={() => pokaz(i)}
					aria-label="Pokaż zdjęcie {i + 1}"
					aria-current={i === aktywne}
				>
					<img src={miniatura(img.url, 320)} alt="" loading="lazy" />
				</button>
			{/each}
		</div>
	{/if}
</div>

{#if otwarty}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div class="lb" role="dialog" aria-modal="true" aria-label="Galeria zdjęć — {tytul}">
		<button type="button" class="lb-tlo" onclick={zamknij} aria-label="Zamknij galerię"></button>

		<div class="lb-gora">
			<span class="lb-licznik">{aktywne + 1} / {zdjecia.length}</span>
			<button type="button" class="lb-zamknij" onclick={zamknij} aria-label="Zamknij galerię">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
			</button>
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="lb-scena"
			onpointerdown={start}
			onpointermove={ruch}
			onpointerup={koniec}
			onpointercancel={koniec}
		>
			<div
				class="lb-tor"
				class:ciagnie
				style="transform: translate3d(calc({-aktywne * 100}% + {przesuniecie}px), 0, 0)"
			>
				{#each zdjecia as img, i}
					<div class="lb-slajd">
						{#if blisko(i)}
							<img src={miniatura(img.url, 1400)} alt="{tytul} — zdjęcie {i + 1}" draggable="false" />
						{/if}
					</div>
				{/each}
			</div>
		</div>

		{#if zdjecia.length > 1}
			<button
				type="button"
				class="lb-strzalka lewa"
				onclick={() => pokaz(aktywne - 1)}
				aria-label="Poprzednie zdjęcie"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
			</button>
			<button
				type="button"
				class="lb-strzalka prawa"
				onclick={() => pokaz(aktywne + 1)}
				aria-label="Następne zdjęcie"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
			</button>
		{/if}
	</div>
{/if}

<style lang="scss">
	.galeria {
		min-width: 0;
	}

	.galeria-glowna {
		position: relative;
		aspect-ratio: 4 / 3;
		border-radius: var(--r-2xl);
		overflow: hidden;
		background: #e6dcc7;

		&.sprzedane img {
			filter: grayscale(0.7);
			opacity: 0.72;
		}
	}
	.glowna-przycisk {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.strzalka {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
		color: #23271f;
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 0.18s ease,
			background 0.18s ease;

		&.lewa {
			left: 12px;
		}
		&.prawa {
			right: 12px;
		}
		&:hover {
			background: #fff;
		}
		svg {
			width: 20px;
			height: 20px;
			fill: none;
			stroke: currentColor;
			stroke-width: 2.2;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
	}
	.galeria-glowna:hover .strzalka,
	.strzalka:focus-visible {
		opacity: 1;
	}

	.licznik {
		position: absolute;
		right: 14px;
		bottom: 14px;
		padding: 5px 11px;
		border-radius: var(--r-pill);
		background: rgba(20, 26, 20, 0.72);
		color: #f3efe4;
		font-size: 12px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		pointer-events: none;
	}

	.galeria-badges {
		position: absolute;
		top: 18px;
		left: 18px;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		pointer-events: none;
	}
	.galeria-badges .badge {
		font-size: 12px;
		font-weight: 600;
		padding: 6px 13px;
		border-radius: var(--r-pill);
	}

	/* ── Pasek miniatur ─────────────────────────────────────────────────────
	   Poziomy, przewijany. Dawniej flex-wrap: przy 27 zdjęciach robiło się
	   9 rzędów na telefonie, a w każdym zostawało 78 px martwego marginesu. */
	.pasek {
		display: flex;
		gap: 10px;
		margin-top: 12px;
		overflow-x: auto;
		scroll-snap-type: x proximity;
		overscroll-behavior-x: contain;
		scrollbar-width: thin;
		scrollbar-color: var(--c-border) transparent;
		padding-bottom: 4px;

		&::-webkit-scrollbar {
			height: 6px;
		}
		&::-webkit-scrollbar-thumb {
			background: var(--c-border);
			border-radius: 99px;
		}
	}
	.mini {
		flex: 0 0 auto;
		width: 92px;
		height: 68px;
		scroll-snap-align: start;
		border-radius: var(--r-sm);
		overflow: hidden;
		border: 2px solid transparent;
		padding: 0;
		background: none;
		cursor: pointer;
		opacity: 0.72;
		transition:
			border-color 0.15s ease,
			opacity 0.15s ease;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&:hover {
			opacity: 1;
		}
		&.aktywna {
			border-color: var(--c-primary);
			opacity: 1;
		}
	}

	/* ── Lightbox ───────────────────────────────────────────────────────────
	   z-index ponad wszystkim na stronach publicznych (menu mobilne 120,
	   pasek postępu bloga 200). */
	.lb {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: grid;
		place-items: center;
		background: rgba(14, 18, 14, 0.94);
		touch-action: none;
	}
	.lb-tlo {
		position: absolute;
		inset: 0;
		border: none;
		background: none;
		cursor: zoom-out;
	}
	.lb-gora {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 16px calc(14px + env(safe-area-inset-top));
		color: #f3efe4;
	}
	.lb-licznik {
		font-size: 14px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		padding: 6px 12px;
		border-radius: var(--r-pill);
		background: rgba(255, 255, 255, 0.12);
	}
	.lb-zamknij {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.12);
		color: #f3efe4;
		cursor: pointer;

		&:hover {
			background: rgba(255, 255, 255, 0.22);
		}
		svg {
			width: 20px;
			height: 20px;
			fill: none;
			stroke: currentColor;
			stroke-width: 2.2;
			stroke-linecap: round;
		}
	}

	.lb-scena {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
		overflow: hidden;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}
	}
	.lb-tor {
		display: flex;
		height: 100%;
		/* Bez animacji w trakcie ciągnięcia — zdjęcie ma iść za palcem 1:1. */
		transition: transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1);

		&.ciagnie {
			transition: none;
		}
	}
	.lb-slajd {
		flex: 0 0 100%;
		display: grid;
		place-items: center;
		padding: 68px 16px calc(24px + env(safe-area-inset-bottom));

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			border-radius: 6px;
			user-select: none;
			-webkit-user-drag: none;
		}
	}

	.lb-strzalka {
		position: absolute;
		top: 50%;
		z-index: 2;
		transform: translateY(-50%);
		width: 48px;
		height: 48px;
		display: grid;
		place-items: center;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.14);
		color: #f3efe4;
		cursor: pointer;

		&.lewa {
			left: 16px;
		}
		&.prawa {
			right: 16px;
		}
		&:hover {
			background: rgba(255, 255, 255, 0.26);
		}
		svg {
			width: 22px;
			height: 22px;
			fill: none;
			stroke: currentColor;
			stroke-width: 2.2;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
	}

	@media (max-width: 767px) {
		/* Na dotyku strzałki na zdjęciu tylko zasłaniają — od tego jest gest. */
		.strzalka {
			display: none;
		}
		.mini {
			width: 78px;
			height: 58px;
		}
		.lb-strzalka {
			display: none;
		}
		.lb-slajd {
			padding: 62px 8px calc(20px + env(safe-area-inset-bottom));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.lb-tor {
			transition: none;
		}
	}
</style>
