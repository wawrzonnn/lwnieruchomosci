<script lang="ts">
	// Mobilny pasek kontaktowy przyklejony do dołu ekranu (tylko ≤640px).
	// Pojawia się po przewinięciu poza hero i chowa się nad stopką, żeby nie
	// zasłaniać ostatniej sekcji. Stopka dostaje zapas miejsca (patrz LandingFooter).
	let {
		/** Druga akcja obok „Zadzwoń" — różni się między stroną główną a podstronami. */
		drugaEtykieta = 'Napisz e-mail',
		drugiHref = 'mailto:biuro@lw.nieruchomosci.pl',
		/** Po ilu pikselach przewinięcia pasek ma się pokazać. */
		odslonPo = 520
	}: { drugaEtykieta?: string; drugiHref?: string; odslonPo?: number } = $props();

	let widoczny = $state(false);

	$effect(() => {
		const stopka = document.querySelector('footer');

		function przelicz() {
			const y = window.scrollY;
			const poHero = y > odslonPo;
			// chowamy, gdy stopka wchodzi w dolną część ekranu
			let nadStopka = true;
			if (stopka) {
				const r = stopka.getBoundingClientRect();
				nadStopka = r.top > window.innerHeight - 40;
			}
			widoczny = poHero && nadStopka;
		}

		window.addEventListener('scroll', przelicz, { passive: true });
		window.addEventListener('resize', przelicz, { passive: true });
		przelicz();
		return () => {
			window.removeEventListener('scroll', przelicz);
			window.removeEventListener('resize', przelicz);
		};
	});
</script>

<div class="sticky-bar" class:widoczny aria-hidden={!widoczny}>
	<a class="sb-btn sb-green" href="tel:+48690008273" tabindex={widoczny ? 0 : -1}>Zadzwoń</a>
	<a class="sb-btn sb-ghost" href={drugiHref} tabindex={widoczny ? 0 : -1}>{drugaEtykieta}</a>
</div>

<style>
	.sticky-bar {
		display: none;
	}

	@media (max-width: 640px) {
		.sticky-bar {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 90;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 10px;
			padding: 10px 16px;
			padding-bottom: max(22px, env(safe-area-inset-bottom));
			background: rgba(251, 248, 242, 0.94);
			backdrop-filter: blur(10px);
			border-top: 1px solid var(--nav-border);
			transform: translateY(110%);
			transition: transform 0.28s ease;
		}
		.sticky-bar.widoczny {
			transform: translateY(0);
		}
		.sb-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 48px;
			border-radius: 999px;
			font-size: 15px;
			font-weight: 600;
		}
		.sb-green {
			background: var(--green);
			color: #fff;
		}
		.sb-ghost {
			background: #fff;
			border: 1px solid var(--divider);
			color: var(--text);
		}
		.sb-btn:focus-visible {
			outline: 2px solid var(--gold);
			outline-offset: 3px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sticky-bar {
			transition: none;
		}
	}
</style>
