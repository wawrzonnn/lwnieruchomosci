<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	// Lokalna kopia — pozwala klikać kadr i widzieć efekt przed zapisem.
	let stan = $state(
		data.regiony.map((r) => ({
			id: r.id,
			nazwa: r.nazwa,
			slug: r.slug,
			image: r.image ?? '',
			focalX: r.focalX,
			focalY: r.focalY,
			size: r.size as 'BIG' | 'SMALL',
			order: r.order,
			visible: r.visible,
			ofert: r.ofert,
			wgrywanie: false
		}))
	);

	// Kliknięcie w podgląd = punkt, który ma zostać widoczny po przycięciu kafelka.
	function ustawKadr(i: number, e: MouseEvent) {
		const el = e.currentTarget as HTMLElement;
		const r = el.getBoundingClientRect();
		stan[i].focalX = Math.round(((e.clientX - r.left) / r.width) * 100);
		stan[i].focalY = Math.round(((e.clientY - r.top) / r.height) * 100);
	}

	async function wgraj(i: number, e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const plik = input.files?.[0];
		if (!plik) return;
		stan[i].wgrywanie = true;
		try {
			const fd = new FormData();
			fd.append('files', plik);
			const res = await fetch('/api/uploads', { method: 'POST', body: fd });
			if (!res.ok) throw new Error('Nie udało się wgrać pliku');
			const { urls } = await res.json();
			stan[i].image = urls[0];
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Błąd wgrywania');
		} finally {
			stan[i].wgrywanie = false;
			input.value = '';
		}
	}
</script>

<svelte:head><title>Regiony — panel</title></svelte:head>

<div class="head">
	<div>
		<h1>Regiony</h1>
		<p class="sub">
			Kafelki sekcji „Rozejrzyj się po Karkonoszach" na stronie głównej.
		</p>
	</div>
	<a class="link" href="/#region" target="_blank" rel="noopener">Zobacz sekcję na stronie →</a>
</div>

<div class="info">
	<strong>Kiedy kafelek jest widoczny na stronie?</strong>
	<p>
		Decyduje wyłącznie przełącznik <em>Widoczny</em> — kafelek pokazuje się także wtedy, gdy region
		nie ma żadnej oferty. Kafelek prowadzi na stronę regionu, a to ona pokazuje oferty (albo
		informację, że w tej okolicy chwilowo ich nie ma). Dzięki temu strony miejscowości bez ofert
		wciąż są dostępne dla klientów i wyszukiwarek.
	</p>
	<p>
		<strong>Liczba ofert</strong> pod nazwą regionu liczy się sama i służy tylko jako podpis: oferta
		trafia do regionu, jeśli jej miasto zawiera nazwę regionu (np. <em>Podgórzyn</em> zbiera oferty
		z Sosnówki i Staniszowa, bo mają wpisane miasto „Podgórzyn"). Gdy ofert nie ma, kafelek mówi
		po prostu „Zobacz region".
	</p>
	<p>
		<strong>Kadr zdjęcia:</strong> kliknij na podglądzie miejsce, które ma zostać widoczne. Kafelki są
		różnej wielkości i zdjęcie jest przycinane — punkt, który wskażesz, zawsze zostanie w kadrze.
	</p>
</div>

<div class="lista">
	{#each stan as r, i (r.id)}
		<form method="POST" action="?/zapisz" use:enhance class="karta" class:ukryty={!r.visible}>
			<input type="hidden" name="id" value={r.id} />
			<input type="hidden" name="image" value={r.image} />
			<input type="hidden" name="focalX" value={r.focalX} />
			<input type="hidden" name="focalY" value={r.focalY} />

			<div class="podglad-kol">
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div
					class="podglad {r.size === 'BIG' ? 'duzy' : 'maly'}"
					style={r.image
						? `background-image:url('${r.image}'); background-position:${r.focalX}% ${r.focalY}%`
						: ''}
					onclick={(e) => ustawKadr(i, e)}
					title="Kliknij, aby ustawić punkt ostrości"
				>
					{#if !r.image}<span class="brak">Brak zdjęcia</span>{/if}
					{#if r.image}
						<span class="celownik" style="left:{r.focalX}%; top:{r.focalY}%"></span>
					{/if}
					<span class="podpis">{r.nazwa}</span>
				</div>
				<div class="kadr-info">Kadr: {r.focalX}% / {r.focalY}%</div>
				<label class="wgraj">
					{r.wgrywanie ? 'Wgrywanie…' : 'Zmień zdjęcie'}
					<input type="file" accept="image/*" onchange={(e) => wgraj(i, e)} hidden />
				</label>
			</div>

			<div class="pola">
				<div class="rzad">
					<label class="pole">
						<span>Nazwa</span>
						<input class="input" name="nazwa" bind:value={r.nazwa} required />
					</label>
					<label class="pole waski">
						<span>Kolejność</span>
						<input class="input" name="order" type="number" min="0" bind:value={r.order} />
					</label>
				</div>

				<div class="rzad">
					<label class="pole waski">
						<span>Rozmiar kafelka</span>
						<select class="input" name="size" bind:value={r.size}>
							<option value="BIG">Duży</option>
							<option value="SMALL">Mały</option>
						</select>
					</label>
					<label class="przelacznik">
						<input type="checkbox" name="visible" bind:checked={r.visible} />
						<span>Widoczny</span>
					</label>
				</div>

				<div class="status">
					{#if !r.visible}
						<span class="plakietka zero">Ukryty — nie pokazuje się na stronie głównej</span>
					{:else if r.ofert === 0}
						<span class="plakietka ok">Widoczny · brak ofert — kafelek mówi „Zobacz region"</span>
					{:else}
						<span class="plakietka ok">Widoczny · {r.ofert} ofert w tym regionie</span>
					{/if}
					<span class="sciezka">/lokalizacje/{r.slug}</span>
				</div>

				<button class="zapisz" type="submit">Zapisz</button>
			</div>
		</form>
	{/each}
</div>

<style>
	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 18px;
	}
	h1 {
		margin: 0 0 4px;
		font-size: 24px;
	}
	.sub {
		margin: 0;
		color: #6c7064;
		font-size: 14px;
	}
	.link {
		color: #2c4a38;
		font-weight: 600;
		font-size: 14px;
		white-space: nowrap;
	}
	.info {
		background: #f5f1e7;
		border: 1px solid #e8e2d5;
		border-radius: 12px;
		padding: 14px 16px;
		margin-bottom: 22px;
		font-size: 13.5px;
		line-height: 1.65;
		color: #3b3f34;
	}
	.info p {
		margin: 6px 0 0;
	}
	.lista {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.karta {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 20px;
		background: #fff;
		border: 1px solid #e8e2d5;
		border-radius: 14px;
		padding: 16px;
	}
	.karta.ukryty {
		opacity: 0.62;
	}
	.podglad {
		position: relative;
		border-radius: 10px;
		background-color: #e6dcc7;
		background-size: cover;
		cursor: crosshair;
		overflow: hidden;
	}
	.podglad.duzy {
		aspect-ratio: 4 / 3;
	}
	.podglad.maly {
		aspect-ratio: 3 / 4;
	}
	.brak {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		color: #6c7064;
		font-size: 13px;
	}
	.celownik {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: -8px 0 0 -8px;
		border: 2px solid #fff;
		border-radius: 50%;
		box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.5);
		pointer-events: none;
	}
	.podpis {
		position: absolute;
		left: 10px;
		bottom: 8px;
		color: #fff;
		font-weight: 600;
		font-size: 14px;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
	}
	.kadr-info {
		margin-top: 6px;
		font-size: 12px;
		color: #6c7064;
	}
	.wgraj {
		display: block;
		margin-top: 8px;
		text-align: center;
		border: 1px solid #e8e2d5;
		border-radius: 8px;
		padding: 7px;
		font-size: 13px;
		cursor: pointer;
	}
	.wgraj:hover {
		background: #f5f1e7;
	}
	.pola {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.rzad {
		display: flex;
		gap: 12px;
		align-items: flex-end;
	}
	.pole {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		font-size: 12.5px;
		color: #6c7064;
	}
	.pole.waski {
		max-width: 150px;
	}
	.input {
		border: 1px solid #e8e2d5;
		border-radius: 8px;
		padding: 8px 10px;
		font: inherit;
		font-size: 14px;
		color: #23271f;
	}
	.przelacznik {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 14px;
		padding-bottom: 8px;
		cursor: pointer;
	}
	.status {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
	.plakietka {
		font-size: 12px;
		font-weight: 600;
		border-radius: 999px;
		padding: 4px 10px;
	}
	.plakietka.ok {
		background: rgba(44, 74, 56, 0.1);
		color: #2c4a38;
	}
	.plakietka.zero {
		background: rgba(108, 112, 100, 0.14);
		color: #6c7064;
	}
	.sciezka {
		font-size: 12px;
		color: #9a8f6e;
	}
	.zapisz {
		align-self: flex-start;
		margin-top: auto;
		background: #2c4a38;
		color: #f3eee1;
		border: none;
		border-radius: 8px;
		padding: 9px 22px;
		font: inherit;
		font-weight: 600;
		font-size: 14px;
		cursor: pointer;
	}
	.zapisz:hover {
		opacity: 0.9;
	}
	@media (max-width: 720px) {
		.karta {
			grid-template-columns: 1fr;
		}
	}
</style>
