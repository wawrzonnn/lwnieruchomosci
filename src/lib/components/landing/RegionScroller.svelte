<script lang="ts">
	import { miniatura } from '$lib/utils';

	// Kształt kafla z $lib/db/regions — powtórzony tutaj, żeby komponent nie
	// ciągnął importu z modułu serwerowego (Prisma).
	type Kafel = {
		slug: string;
		nazwa: string;
		image: string | null;
		size: 'BIG' | 'SMALL';
		focalX: number;
		focalY: number;
		count: number;
	};

	let {
		tiles = [],
		eyebrow,
		tytul,
		hint = 'Przeciągnij, aby zobaczyć więcej',
		wariant = 'ciemny',
		id
	}: {
		tiles?: Kafel[];
		eyebrow: string;
		tytul: string;
		hint?: string;
		/** ciemny = zielona wstęga na stronie głównej, jasny = sekcja w treści strony */
		wariant?: 'ciemny' | 'jasny';
		id?: string;
	} = $props();

	// ── Pozioma galeria (drag / wheel / strzałki, BEZ auto-play i BEZ scroll-jackingu) ──
	let scroller: HTMLDivElement | undefined = $state();
	let progress = $state(10);
	let scrollable = $state(false);
	let dragging = false;
	let startX = 0;
	let startScroll = 0;
	let wheelCooldown = false;

	function updateProgress() {
		if (!scroller) return;
		const max = scroller.scrollWidth - scroller.clientWidth;
		// Przy małej liczbie kafli mieszczą się one w całości na szerokim ekranie i nie ma czego
		// przewijać — wtedy chowamy strzałki, podpowiedź i pasek, żeby nie obiecywały ruchu,
		// którego nie będzie. Tolerancja 4px na zaokrąglenia sub-pikselowe.
		scrollable = max > 4;
		const pct = max > 0 ? Math.min(Math.max(scroller.scrollLeft / max, 0), 1) : 0;
		progress = 10 + pct * 90;
	}
	$effect(() => {
		tiles; // przelicz też, gdy zmieni się liczba kafli
		if (!scroller) return;
		updateProgress();
		// ResizeObserver zamiast nasłuchu `resize` na oknie: odpala się dopiero po przeliczeniu
		// układu, więc pomiar jest już aktualny (przy `resize` mierzylibyśmy sprzed reflow
		// i strzałki zostałyby ukryte mimo zwężenia okna).
		const ro = new ResizeObserver(() => updateProgress());
		ro.observe(scroller);
		return () => ro.disconnect();
	});
	function onWheel(e: WheelEvent) {
		if (!scroller) return;
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			e.preventDefault();
			// Drobny ruch kółkiem (np. jeden "click" myszy) to za mało, by natywny scroll-snap
			// przesunął widok o cały kafel — mandatory snap potrafi wtedy cofnąć widok do punktu
			// startowego, co wygląda jak "nie działa". Zamiast swobodnego scrolla + zgadywania przez
			// przeglądarkę, każdy gest kółkiem przesuwa dokładnie o jedną pozycję (jak strzałki),
			// z krótkim wyciszeniem, by seria eventów z jednego obrotu/swipe'a nie przewinęła kilku na raz.
			if (wheelCooldown) return;
			wheelCooldown = true;
			if (e.deltaY > 0) nastepny();
			else poprzedni();
			setTimeout(() => {
				wheelCooldown = false;
			}, 500);
		}
	}
	function onMouseDown(e: MouseEvent) {
		if (!scroller) return;
		dragging = true;
		startX = e.pageX;
		startScroll = scroller.scrollLeft;
		scroller.style.cursor = 'grabbing';
		scroller.style.scrollSnapType = 'none';
	}
	function onWindowMouseMove(e: MouseEvent) {
		if (!dragging || !scroller) return;
		e.preventDefault();
		scroller.scrollLeft = startScroll - (e.pageX - startX);
	}
	function onWindowMouseUp() {
		if (!dragging || !scroller) return;
		dragging = false;
		scroller.style.cursor = 'grab';
		scroller.style.scrollSnapType = 'x mandatory';
	}
	// Celujemy w krawędź sąsiedniego kafla, a nie w stałe 580px: kafle mają różne szerokości
	// (big/small), więc stały skok lądował między punktami zaczepienia — a `scroll-snap-type:
	// x mandatory` potrafi wtedy ściągnąć widok z powrotem, co wygląda jak "nie działa".
	// Krawędź kafla jest punktem zaczepienia (scroll-snap-align: start), więc snap nie ma z czym walczyć.
	function przewinDo(kierunek: 1 | -1) {
		const el = scroller;
		if (!el) return;
		const baza = el.getBoundingClientRect().left - el.scrollLeft;
		const krawedzie = [...el.querySelectorAll<HTMLElement>('.region-tile')].map((t) =>
			Math.round(t.getBoundingClientRect().left - baza)
		);
		const teraz = el.scrollLeft;
		const cel =
			kierunek > 0
				? krawedzie.find((o) => o > teraz + 8)
				: [...krawedzie].reverse().find((o) => o < teraz - 8);
		if (cel === undefined) return;
		el.scrollTo({ left: cel, behavior: 'smooth' });
	}
	const poprzedni = () => przewinDo(-1);
	const nastepny = () => przewinDo(1);

	function offerWord(n: number) {
		if (n === 1) return 'oferta';
		const d = n % 10;
		const dd = n % 100;
		return d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14) ? 'oferty' : 'ofert';
	}
</script>

<svelte:window onmousemove={onWindowMouseMove} onmouseup={onWindowMouseUp} />

{#if tiles.length}
	<section class="region-section {wariant}" {id}>
		<div class="region-head">
			<div class="region-head-text">
				<div class="eyebrow">{eyebrow}</div>
				<h2 class="region-h2">{tytul}</h2>
			</div>
			{#if scrollable}
				<div class="region-hint">{hint}</div>
			{/if}
		</div>
		<div class="region-gallery-wrap">
			<div
				class="region-scroller"
				bind:this={scroller}
				onscroll={updateProgress}
				onwheel={onWheel}
				onmousedown={onMouseDown}
			>
				{#each tiles as tile}
					{@const rozmiar = tile.size === 'BIG' ? 'big' : 'small'}
					<a href="/lokalizacje/{tile.slug}" class="region-tile {rozmiar}">
						<div
							class="region-img"
							style="{tile.image
								? `background-image:url('${miniatura(tile.image, 900)}');`
								: ''} background-position:{tile.focalX}% {tile.focalY}%"
						></div>
						<div class="region-cap {rozmiar}">{tile.nazwa}</div>
						<span class="region-link">
							{tile.count ? `${tile.count} ${offerWord(tile.count)}` : 'Zobacz region'} →
						</span>
					</a>
				{/each}
			</div>
			{#if scrollable}
				<button class="region-arrow left" aria-label="Poprzednia lokalizacja" onclick={poprzedni}>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M15 5 8 12l7 7" />
					</svg>
				</button>
				<button class="region-arrow right" aria-label="Następna lokalizacja" onclick={nastepny}>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="m9 5 7 7-7 7" />
					</svg>
				</button>
			{/if}
		</div>
		{#if scrollable}
			<div class="region-progress-track">
				<div class="region-progress-bar" style="width:{progress}%"></div>
			</div>
		{/if}
	</section>
{/if}

<style>
	/* ===== REGION — pozioma przeciągana galeria ===== */
	.region-section {
		padding: 56px 0 28px;
	}
	.region-section.ciemny {
		background: var(--green-ink);
	}
	.region-section.jasny {
		/* Wariant w treści strony: bez pełnowymiarowej wstęgi, sam nagłówek i kafle. */
		background: transparent;
		padding: 8px 0 28px;
	}
	.region-head {
		padding: 0 48px 28px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
	}
	/* W wariancie jasnym karuzela nie jest pełnoszerokościową wstęgą, tylko
	   siedzi w treści strony — kafle muszą zaczynać się równo z resztą sekcji.
	   To ten sam rachunek co `.section` w landing-shared.css. */
	.region-section.jasny .region-head,
	.region-section.jasny .region-scroller {
		padding-left: max(var(--gutter), calc((100% - var(--container)) / 2));
		padding-right: max(var(--gutter), calc((100% - var(--container)) / 2));
	}
	.region-section.jasny .region-scroller {
		scroll-padding-left: max(var(--gutter), calc((100% - var(--container)) / 2));
	}
	.region-section.jasny .region-progress-track {
		margin-left: max(var(--gutter), calc((100% - var(--container)) / 2));
		margin-right: max(var(--gutter), calc((100% - var(--container)) / 2));
	}
	.region-section.jasny .region-head {
		padding-bottom: 20px;
	}
	.region-head-text {
		max-width: 520px;
	}
	.eyebrow {
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.ciemny .eyebrow {
		color: var(--gold-soft);
	}
	.jasny .eyebrow {
		color: var(--label);
	}
	.region-h2 {
		font-family: 'Newsreader', serif;
		font-weight: 500;
		font-size: 40px;
		line-height: 1.1;
	}
	.ciemny .region-h2 {
		color: var(--bg-site);
	}
	.jasny .region-h2 {
		color: var(--text);
	}
	.region-hint {
		font-size: 12px;
		letter-spacing: 0.08em;
		white-space: nowrap;
		padding-bottom: 6px;
	}
	.ciemny .region-hint {
		color: rgba(243, 238, 225, 0.6);
	}
	.jasny .region-hint {
		color: var(--muted);
	}
	.region-gallery-wrap {
		position: relative;
	}
	.region-scroller {
		display: flex;
		gap: 20px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding: 4px 48px 10px;
		/* Bez tego `scroll-snap-align: start` równa kafel do krawędzi pola
		   przewijania, a nie do jego wnętrza — przeglądarka przy wczytaniu
		   sama przewija o wartość lewego paddingu i pierwszy kafel przykleja
		   się do brzegu ekranu zamiast stać równo z nagłówkiem. */
		scroll-padding-left: 48px;
		cursor: grab;
		/* pasek postępu pod galerią zastępuje natywny scrollbar — ukrywamy go */
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.region-scroller::-webkit-scrollbar {
		display: none;
		height: 0;
	}
	.region-tile {
		display: block;
		flex: 0 0 340px;
		height: 440px;
		scroll-snap-align: start;
		position: relative;
		border-radius: 18px;
		overflow: hidden;
	}
	.region-tile.big {
		flex: 0 0 560px;
	}
	.region-img {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		transition: transform 0.5s ease;
	}
	.region-tile:hover .region-img {
		transform: scale(1.045);
	}
	.region-tile::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(18, 26, 20, 0.64), transparent 48%);
	}
	.region-cap {
		position: absolute;
		left: 18px;
		bottom: 40px;
		color: #fff;
		font-size: 15px;
		font-weight: 600;
		z-index: 1;
	}
	.region-cap.big {
		left: 22px;
		bottom: 48px;
		font-family: 'Newsreader', serif;
		font-size: 22px;
		font-weight: 500;
	}
	.region-link {
		position: absolute;
		left: 18px;
		bottom: 16px;
		z-index: 1;
		font-size: 12.5px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.82);
		border-bottom: 1px solid rgba(233, 209, 154, 0.55);
		padding-bottom: 1px;
		transition: color 0.2s ease;
	}
	.region-tile.big .region-link {
		left: 22px;
	}
	.region-tile:hover .region-link {
		color: var(--gold-light);
		border-bottom-color: var(--gold-light);
	}
	/* Dyskretne jak znak wodny: w spoczynku ledwo widoczne, wyraźnieją nad galerią,
	   a pod kursorem dostają złoto marki. Mrożone szkło zamiast białego krążka —
	   czyta się tak samo na jasnym i ciemnym zdjęciu. */
	.region-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 48px;
		height: 48px;
		padding: 0;
		border-radius: 50%;
		border: 1px solid rgba(243, 238, 225, 0.24);
		background: rgba(35, 39, 31, 0.32);
		-webkit-backdrop-filter: blur(12px) saturate(115%);
		backdrop-filter: blur(12px) saturate(115%);
		color: var(--on-green);
		cursor: pointer;
		display: grid;
		place-items: center;
		/* zawsze widoczne, nie tylko pod kursorem (na dotyku hover nie istnieje) */
		opacity: 0.88;
		box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.6);
		transition:
			opacity 0.18s ease,
			background 0.18s ease,
			border-color 0.18s ease,
			color 0.18s ease;
	}
	.region-arrow svg {
		width: 18px;
		height: 18px;
	}
	.region-gallery-wrap:hover .region-arrow {
		opacity: 0.92;
	}
	.region-arrow:hover {
		opacity: 1;
		background: rgba(35, 39, 31, 0.6);
		border-color: rgba(180, 137, 76, 0.85);
		color: var(--gold-light);
	}
	.region-arrow:active {
		background: rgba(35, 39, 31, 0.75);
	}
	.region-arrow:focus-visible {
		opacity: 1;
		outline: 2px solid var(--gold);
		outline-offset: 3px;
	}
	.region-arrow.left {
		left: 20px;
	}
	.region-arrow.right {
		right: 20px;
	}
	/* W wariancie jasnym nie ma ciemnej wstęgi, na której strzałka mogłaby usiąść
	   — poza kaflami wisiałaby na pustym kremowym tle. Wsuwamy je na zdjęcia. */
	.region-section.jasny .region-arrow.left {
		left: calc(max(var(--gutter), (100% - var(--container)) / 2) + 12px);
	}
	.region-section.jasny .region-arrow.right {
		right: calc(max(var(--gutter), (100% - var(--container)) / 2) + 12px);
	}
	.region-progress-track {
		margin: 18px 48px 0;
		height: 2px;
		border-radius: 2px;
		overflow: hidden;
	}
	.ciemny .region-progress-track {
		background: rgba(243, 238, 225, 0.18);
	}
	.jasny .region-progress-track {
		background: var(--divider);
	}
	.region-progress-bar {
		height: 100%;
	}
	.ciemny .region-progress-bar {
		background: var(--gold-light);
	}
	.jasny .region-progress-bar {
		background: var(--gold);
	}

	/* Te same progi co na stronie głównej — karuzela ma wyglądać identycznie. */
	@media (max-width: 980px) {
		.region-tile {
			flex-basis: 300px;
			height: 380px;
		}
		.region-tile.big {
			flex-basis: 460px;
		}
	}
	@media (max-width: 640px) {
		.region-h2 {
			font-size: 32px;
		}
		.region-head {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
			padding: 0 20px 20px;
		}
		.region-scroller {
			padding: 4px 20px 10px;
			scroll-padding-left: 20px;
		}
		.region-progress-track {
			margin: 18px 20px 0;
		}
		.region-section.jasny .region-head,
		.region-section.jasny .region-scroller {
			padding-left: 20px;
			padding-right: 20px;
		}
		.region-section.jasny .region-scroller {
			scroll-padding-left: 20px;
		}
		.region-section.jasny .region-progress-track {
			margin-left: 20px;
			margin-right: 20px;
		}
		.region-tile {
			flex-basis: 160px;
			height: 280px;
		}
		.region-tile.big {
			flex-basis: 240px;
		}
		.region-arrow {
			display: none;
		}
	}
</style>
