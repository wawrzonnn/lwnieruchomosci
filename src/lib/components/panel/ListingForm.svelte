<script lang="ts">
	import { enhance } from '$app/forms';
	import Select from '$lib/components/Select.svelte';
	import {
		AMENITY_GROUPS,
		CATEGORY_LABELS,
		formatPrice,
		locationLabel,
		pricePerM2
	} from '$lib/utils';
	import type { Agent, Listing, ListingImage } from '@prisma/client';

	type FullListing = Listing & { images?: ListingImage[] };
	let {
		listing,
		agenci = [],
		error
	}: { listing?: FullListing; agenci?: Agent[]; error?: string } = $props();

	// ── pola tekstowe (część śledzona dla podglądu) ──
	let title = $state(listing?.title ?? '');
	let referenceNumber = $state(listing?.referenceNumber ?? '');
	let category = $state(listing?.category ?? 'MIESZKANIE');
	let transactionType = $state(listing?.transactionType ?? 'SPRZEDAZ');
	let market = $state(listing?.market ?? '');
	let price = $state(listing?.price != null ? String(listing.price) : '');
	let area = $state(listing?.area != null ? String(listing.area) : '');
	let condition = $state(listing?.condition ?? '');
	let heating = $state(listing?.heating ?? '');
	let voivodeship = $state(listing?.voivodeship ?? 'Dolnośląskie');
	let city = $state(listing?.city ?? '');
	let district = $state(listing?.district ?? '');

	// Select zwraca string; '' = brak opiekuna → parseListingForm zamieni na null.
	let agentId = $state(listing?.agentId != null ? String(listing.agentId) : '');
	const wybranyAgent = $derived(agenci.find((a) => String(a.id) === agentId) ?? null);

	let status = $state(listing?.status ?? 'ACTIVE');
	let isFeatured = $state(listing?.isFeatured ?? false);
	let isHighlighted = $state(listing?.isHighlighted ?? false);
	let isExclusive = $state(listing?.isExclusive ?? false);

	// ── udogodnienia ──
	let amenities = $state<string[]>(listing?.amenities ? [...listing.amenities] : []);
	function toggleAmenity(a: string) {
		amenities = amenities.includes(a) ? amenities.filter((x) => x !== a) : [...amenities, a];
	}

	// ── zdjęcia ──
	type Img = { url: string; isMain: boolean };
	let images = $state<Img[]>(
		listing?.images
			? [...listing.images]
					.sort((a, b) => a.order - b.order)
					.map((i) => ({ url: i.url, isMain: i.isMain }))
			: []
	);
	let uploading = $state(false);
	let uploadError = $state('');
	let pominiete = $state<{ nazwa: string; powod: string }[]>([]);
	let dragIndex = $state<number | null>(null);
	// Zapis w trakcie wysyłki zdjęć zapisywał ofertę BEZ nich, a podwójne
	// kliknięcie „Zapisz" tworzyło dwie oferty.
	let zapisywanie = $state(false);
	const zablokowany = $derived(uploading || zapisywanie);

	async function onFiles(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) return;
		uploading = true;
		uploadError = '';
		pominiete = [];
		try {
			const fd = new FormData();
			for (const f of input.files) fd.append('files', f);
			const res = await fetch('/api/uploads', { method: 'POST', body: fd });
			if (!res.ok) {
				throw new Error(
					(await res.json().catch(() => ({}))).message ||
						'Nie udało się wysłać zdjęć. Sprawdź połączenie i spróbuj ponownie.'
				);
			}
			const dane = await res.json();
			const urls: string[] = dane.urls ?? [];
			pominiete = dane.pominiete ?? [];
			const hadNone = images.length === 0;
			images = [...images, ...urls.map((url: string, i: number) => ({ url, isMain: hadNone && i === 0 }))];
			if (!images.some((i) => i.isMain) && images.length) images[0].isMain = true;
		} catch (err) {
			uploadError =
				err instanceof Error ? err.message : 'Nie udało się wysłać zdjęć. Spróbuj ponownie.';
		} finally {
			uploading = false;
			input.value = '';
		}
	}
	function setMain(idx: number) {
		images = images.map((im, i) => ({ ...im, isMain: i === idx }));
	}
	function removeImage(idx: number) {
		const wasMain = images[idx].isMain;
		images = images.filter((_, i) => i !== idx);
		if (wasMain && images.length) images[0].isMain = true;
	}
	function onDrop(idx: number) {
		if (dragIndex === null || dragIndex === idx) return;
		const next = [...images];
		const [moved] = next.splice(dragIndex, 1);
		next.splice(idx, 0, moved);
		images = next;
		dragIndex = null;
	}

	const mainPreview = $derived(images.find((i) => i.isMain)?.url ?? images[0]?.url ?? null);
	const imagesJson = $derived(
		JSON.stringify(images.map((im, i) => ({ url: im.url, isMain: im.isMain, order: i })))
	);
	const amenitiesJson = $derived(JSON.stringify(amenities));
	const previewPrice = $derived(price ? formatPrice(Number(price)) : '— zł');
	const perM2 = $derived(price && area ? pricePerM2(Number(price), Number(area)) : null);
</script>

<form
	method="POST"
	use:enhance={() => {
		zapisywanie = true;
		return async ({ update }) => {
			await update();
			zapisywanie = false;
		};
	}}
	class="listing-form"
>
	<input type="hidden" name="images" value={imagesJson} />
	<input type="hidden" name="amenities" value={amenitiesJson} />

	<div class="form-layout">
		<!-- ── LEWA KOLUMNA ── -->
		<div class="form-main">
			<!-- Podstawowe informacje -->
			<section class="card form-card">
				<h2 class="card-title">Podstawowe informacje</h2>
				<div class="grid">
					<label class="field span-2">
						<span class="field__label">Tytuł oferty</span>
						<input class="input" name="title" bind:value={title} required />
					</label>

					<label class="field span-2">
						<span class="field__label">Numer oferty</span>
						<input
							class="input"
							name="referenceNumber"
							bind:value={referenceNumber}
							placeholder="np. numer z systemu pośrednika (opcjonalnie)"
						/>
					</label>

					<label class="field">
						<span class="field__label">Kategoria</span>
						<Select
							name="category"
							bind:value={category}
							options={[
								{ value: 'MIESZKANIE', label: 'Mieszkanie' },
								{ value: 'DOM', label: 'Dom' },
								{ value: 'DZIALKA', label: 'Działka' },
								{ value: 'LOKAL', label: 'Lokal' }
							]}
						/>
					</label>
					<label class="field">
						<span class="field__label">Typ transakcji</span>
						<Select
							name="transactionType"
							bind:value={transactionType}
							options={[
								{ value: 'SPRZEDAZ', label: 'Sprzedaż' },
								{ value: 'WYNAJEM', label: 'Wynajem' },
								{ value: 'DZIERZAWA', label: 'Dzierżawa' }
							]}
						/>
					</label>
					<label class="field">
						<span class="field__label">Rynek</span>
						<Select
							name="market"
							bind:value={market}
							placeholder="—"
							options={[
								{ value: 'WTORNY', label: 'Wtórny' },
								{ value: 'PIERWOTNY', label: 'Pierwotny' }
							]}
						/>
					</label>

					<label class="field">
						<span class="field__label">Cena (zł)</span>
						<input class="input" type="number" name="price" bind:value={price} required />
					</label>
					<label class="field">
						<span class="field__label">Cena za m² (zł)</span>
						<input class="input" value={perM2 ? perM2.replace(' zł/m²', '') : ''} readonly placeholder="auto" />
					</label>
					<label class="field">
						<span class="field__label">Powierzchnia (m²)</span>
						<input class="input" type="number" step="0.1" name="area" bind:value={area} />
					</label>
					<label class="field">
						<span class="field__label">Liczba pokoi</span>
						<input class="input" type="number" name="rooms" value={listing?.rooms ?? ''} />
					</label>
					<label class="field">
						<span class="field__label">Piętro</span>
						<input class="input" type="number" name="floor" value={listing?.floor ?? ''} />
					</label>
					<label class="field">
						<span class="field__label">Liczba pięter</span>
						<input class="input" type="number" name="totalFloors" value={listing?.totalFloors ?? ''} />
					</label>
					<label class="field">
						<span class="field__label">Rok budowy</span>
						<input class="input" type="number" name="yearBuilt" value={listing?.yearBuilt ?? ''} />
					</label>
					<label class="field">
						<span class="field__label">Stan</span>
						<Select
							name="condition"
							bind:value={condition}
							placeholder="—"
							options={[
								{ value: 'DO_ZAMIESZKANIA', label: 'Do zamieszkania' },
								{ value: 'DO_ODSWIEZENIA', label: 'Do odświeżenia' },
								{ value: 'DO_REMONTU', label: 'Do remontu' },
								{ value: 'DEWELOPERSKI', label: 'Deweloperski' },
								{ value: 'SUROWY_ZAMKNIETY', label: 'Surowy zamknięty' }
							]}
						/>
					</label>
					<label class="field">
						<span class="field__label">Ogrzewanie</span>
						<Select
							name="heating"
							bind:value={heating}
							placeholder="—"
							options={[
								{ value: 'MIEJSKIE', label: 'Miejskie' },
								{ value: 'GAZOWE', label: 'Gazowe' },
								{ value: 'POMPA_CIEPLA', label: 'Pompa ciepła' },
								{ value: 'ELEKTRYCZNE', label: 'Elektryczne' },
								{ value: 'KOMINKOWE', label: 'Kominkowe' }
							]}
						/>
					</label>
				</div>
			</section>

			<!-- Lokalizacja -->
			<section class="card form-card">
				<h2 class="card-title">Lokalizacja</h2>
				<div class="grid">
					<label class="field">
						<span class="field__label">Województwo</span>
						<Select
							name="voivodeship"
							bind:value={voivodeship}
							options={[
								{ value: 'Dolnośląskie', label: 'Dolnośląskie' },
								{ value: 'Inne', label: 'Inne' }
							]}
						/>
					</label>
					<label class="field">
						<span class="field__label">Miejscowość</span>
						<input class="input" name="city" bind:value={city} required />
					</label>
					<label class="field">
						<span class="field__label">Dzielnica / ulica</span>
						<input class="input" name="district" bind:value={district} />
					</label>
					<label class="field">
						<span class="field__label">Kod pocztowy</span>
						<input class="input" name="postalCode" value={listing?.postalCode ?? ''} placeholder="58-500" />
					</label>
				</div>
			</section>

			<!-- Zdjęcia -->
			<section class="card form-card">
				<h2 class="card-title">Zdjęcia</h2>
				<p class="card-hint">
					Zdjęcie oznaczone jako <b>Główne</b> będzie miniaturą oferty. Przeciągnij, aby zmienić kolejność.
				</p>
				<div class="photo-grid">
					<label class="photo-add">
						<input type="file" accept="image/*" multiple onchange={onFiles} hidden />
						<span class="plus">+</span>
						<span>{uploading ? 'wysyłanie…' : 'dodaj zdjęcia'}</span>
					</label>
					{#each images as img, i (img.url)}
						<div
							class="photo-tile"
							class:main={img.isMain}
							draggable="true"
							role="listitem"
							ondragstart={() => (dragIndex = i)}
							ondragover={(e) => e.preventDefault()}
							ondrop={() => onDrop(i)}
						>
							<img src={img.url} alt="" />
							{#if img.isMain}
								<span class="main-badge">Główne</span>
							{:else}
								<button type="button" class="set-main" onclick={() => setMain(i)}>Ustaw główne</button>
							{/if}
							<button type="button" class="photo-remove" title="Usuń" onclick={() => removeImage(i)}>×</button>
						</div>
					{/each}
				</div>
				{#if uploadError}<p class="form-error">{uploadError}</p>{/if}
				{#if pominiete.length}
					<p class="form-warn">
						Pominięto {pominiete.length}
						{pominiete.length === 1 ? 'plik' : 'pliki'}:
						{#each pominiete as p}<br /><b>{p.nazwa}</b> — {p.powod}{/each}
					</p>
				{/if}
			</section>

			<!-- Udogodnienia -->
			<section class="card form-card">
				<h2 class="card-title">Udogodnienia</h2>
				<p class="card-hint">
					Zaznacz, co wyróżnia tę nieruchomość. Możesz łączyć udogodnienia z dowolnych kategorii.
				</p>
				{#each AMENITY_GROUPS as group}
					<div class="amenity-group">
						<span class="amenity-group__label">{group.label}</span>
						<div class="amenity-grid">
							{#each group.items as a}
								<button
									type="button"
									class="amenity-chip"
									class:on={amenities.includes(a)}
									onclick={() => toggleAmenity(a)}
								>
									{#if amenities.includes(a)}<span class="check">✓</span>{/if}
									{a}
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</section>

			<!-- Opis -->
			<section class="card form-card">
				<h2 class="card-title">Opis</h2>
				<textarea class="textarea textarea--lg" name="description" rows="14" placeholder="Opisz nieruchomość…"
					>{listing?.description ?? ''}</textarea
				>
			</section>
		</div>

		<!-- ── PRAWA KOLUMNA (sticky) ── -->
		<aside class="form-side">
			<div class="side-sticky">
				<!-- Podgląd karty -->
				<div class="card preview-card">
					<span class="side-eyebrow">Podgląd karty</span>
					<div class="preview-offer">
						<div class="preview-media" class:has-photo={mainPreview}>
							{#if mainPreview}<img src={mainPreview} alt="" />{/if}
							<span class="badge badge--type preview-type">{CATEGORY_LABELS[category]}</span>
						</div>
						<div class="preview-body">
							<div class="preview-loc"><span class="dot"></span>{locationLabel(city || '—', district)}</div>
							<div class="preview-title">{title || 'Tytuł oferty'}</div>
							<div class="preview-price">{previewPrice}</div>
						</div>
					</div>
				</div>

				<!-- Opiekun oferty -->
				<div class="card publish-card">
					<h3 class="card-title">Opiekun oferty</h3>
					{#if agenci.length}
						<label class="field">
							<span class="field__label">Agent</span>
							<Select
								name="agentId"
								bind:value={agentId}
								placeholder="Bez opiekuna"
								options={agenci.map((a) => ({ value: String(a.id), label: a.imie }))}
							/>
						</label>
						{#if wybranyAgent}
							<div class="agent-podglad">
								<span class="agent-awatar" class:pusty={!wybranyAgent.image}>
									{#if wybranyAgent.image}
										<img src={wybranyAgent.image} alt="" />
									{:else}
										{wybranyAgent.imie
											.split(/\s+/)
											.slice(0, 2)
											.map((c) => c[0])
											.join('')}
									{/if}
								</span>
								<span class="agent-tekst">
									<strong>{wybranyAgent.imie}</strong>
									<small>{wybranyAgent.telefon}</small>
								</span>
							</div>
						{:else}
							<p class="card-hint">
								Bez opiekuna na stronie oferty nie pojawi się karta z telefonem — zostanie sam
								formularz.
							</p>
						{/if}
					{:else}
						<p class="card-hint">
							Nie ma jeszcze żadnego agenta. <a href="/panel/agenci/nowy">Dodaj agenta</a>, żeby móc
							przypisać go do oferty.
						</p>
					{/if}
				</div>

				<!-- Publikacja -->
				<div class="card publish-card">
					<h3 class="card-title">Publikacja</h3>
					<label class="field">
						<span class="field__label">Status</span>
						<Select
							name="status"
							bind:value={status}
							options={[
								{ value: 'ACTIVE', label: 'Aktywna' },
								{ value: 'DRAFT', label: 'Szkic' },
								{ value: 'RESERVED', label: 'Zarezerwowana' },
								{ value: 'SOLD', label: 'Sprzedana' }
							]}
						/>
					</label>

					<label class="toggle">
						<input type="checkbox" name="isFeatured" bind:checked={isFeatured} />
						<span class="toggle-text">
							<strong>Polecana oferta</strong>
							<small>Widoczna w sekcji „Polecane" na stronie głównej</small>
						</span>
					</label>
					<label class="toggle">
						<input type="checkbox" name="isHighlighted" bind:checked={isHighlighted} />
						<span class="toggle-text">
							<strong>Wyróżniona</strong>
							<small>Ramka i etykieta na liście ofert</small>
						</span>
					</label>
					<label class="toggle">
						<input type="checkbox" name="isExclusive" bind:checked={isExclusive} />
						<span class="toggle-text">
							<strong>Na wyłączność</strong>
							<small>Oferta prowadzona wyłącznie przez LW</small>
						</span>
					</label>

					{#if error}<p class="form-error">{error}</p>{/if}

					<div class="publish-actions">
						<button
							type="submit"
							class="btn btn--primary btn--block"
							name="intent"
							value="publish"
							disabled={zablokowany}
						>
							{zapisywanie ? 'Zapisywanie…' : 'Zapisz i opublikuj'}
						</button>
						<button
							type="submit"
							class="btn btn--ghost btn--block"
							name="intent"
							value="draft"
							disabled={zablokowany}
						>
							Zapisz szkic
						</button>
						<a href="/panel/oferty" class="btn btn--ghost btn--block">Anuluj</a>
						{#if uploading}
							<p class="akcje-hint">Trwa wysyłanie zdjęć — poczekaj, żeby nie zapisać oferty bez nich.</p>
						{/if}
					</div>
				</div>
			</div>
		</aside>
	</div>
</form>

<style lang="scss">
	.form-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 340px;
		gap: 24px;
		align-items: start;
	}
	.form-main {
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-width: 0;
	}
	.form-card {
		padding: 24px;
	}
	.textarea--lg {
		min-height: 260px;
		resize: vertical;
	}
	.card-title {
		font-family: var(--font-serif);
		font-size: 18px;
		font-weight: 500;
		color: var(--c-text);
		margin: 0 0 16px;
	}
	.card-hint {
		font-size: 13px;
		color: var(--c-subtle);
		margin: -8px 0 16px;
		b {
			color: var(--c-text);
			font-weight: 600;
		}
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}
	.span-2 {
		grid-column: span 2;
	}

	/* ── zdjęcia ── */
	.photo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 12px;
	}
	.photo-add {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		aspect-ratio: 4 / 3;
		border: 1.5px dashed var(--c-border-field);
		border-radius: var(--r-md);
		background: var(--c-field);
		cursor: pointer;
		font-size: 12.5px;
		color: var(--c-subtle);
		transition: border-color 0.15s ease, color 0.15s ease;
		&:hover {
			border-color: var(--c-primary);
			color: var(--c-primary);
		}
		.plus {
			font-size: 26px;
			line-height: 1;
			font-weight: 300;
		}
	}
	.photo-tile {
		position: relative;
		aspect-ratio: 4 / 3;
		border-radius: var(--r-md);
		overflow: hidden;
		background: #e6dcc7;
		cursor: grab;
		&.main {
			box-shadow: 0 0 0 2px var(--c-primary);
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.main-badge {
		position: absolute;
		top: 6px;
		left: 6px;
		font-size: 10px;
		font-weight: 600;
		padding: 3px 8px;
		border-radius: 100px;
		background: var(--c-primary);
		color: #f3efe4;
	}
	.set-main {
		position: absolute;
		bottom: 6px;
		left: 6px;
		font-size: 10px;
		font-weight: 600;
		padding: 3px 8px;
		border-radius: 100px;
		border: none;
		background: rgba(255, 253, 248, 0.92);
		color: var(--c-text);
		cursor: pointer;
		&:hover {
			background: #fff;
		}
	}
	.photo-remove {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: none;
		background: rgba(32, 41, 31, 0.72);
		color: #f3efe4;
		font-size: 15px;
		line-height: 1;
		cursor: pointer;
		&:hover {
			background: var(--c-danger);
		}
	}

	/* ── udogodnienia ── */
	.amenity-group {
		margin-bottom: 18px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.amenity-group__label {
		display: block;
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--c-subtle);
		margin-bottom: 8px;
	}
	.amenity-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.amenity-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 13px;
		border-radius: var(--r-pill);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		border: 1px solid var(--c-border-field);
		background: var(--c-field);
		color: var(--c-text-nav);
		transition: all 0.14s ease;
		&:hover {
			border-color: var(--c-border-btn);
		}
		&.on {
			background: var(--c-green-tint);
			border-color: var(--c-primary);
			color: var(--c-primary);
		}
		.check {
			font-size: 11px;
		}
	}

	/* ── prawa kolumna ── */
	.side-sticky {
		position: sticky;
		top: 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.side-eyebrow {
		display: block;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--c-subtle);
		margin-bottom: 12px;
	}
	.preview-card {
		padding: 18px;
	}
	.preview-offer {
		border: 1px solid var(--c-border);
		border-radius: var(--r-lg);
		overflow: hidden;
		background: var(--c-surface);
	}
	.preview-media {
		position: relative;
		aspect-ratio: 4 / 3;
		background: repeating-linear-gradient(135deg, #efe7d6 0, #efe7d6 11px, #e6dcc7 11px, #e6dcc7 22px);
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.preview-type {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.preview-body {
		padding: 14px 16px 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.preview-loc {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: var(--c-subtle);
		.dot {
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background: var(--c-gold);
		}
	}
	.preview-title {
		font-family: var(--font-serif);
		font-size: 16px;
		font-weight: 500;
		color: var(--c-text);
		line-height: 1.25;
	}
	.preview-price {
		font-family: var(--font-serif);
		font-size: 18px;
		font-weight: 600;
		color: var(--c-primary);
	}

	.publish-card {
		padding: 20px;
		.card-title {
			font-size: 17px;
			margin-bottom: 14px;
		}
	}
	.toggle {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 0;
		border-top: 1px solid var(--c-border-row);
		cursor: pointer;
		input {
			margin-top: 2px;
			width: 16px;
			height: 16px;
			accent-color: var(--c-primary);
			cursor: pointer;
			flex: none;
		}
	}
	.toggle-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
		strong {
			font-size: 13.5px;
			font-weight: 600;
			color: var(--c-text);
		}
		small {
			font-size: 12px;
			color: var(--c-subtle);
			line-height: 1.4;
		}
	}
	.agent-podglad {
		display: flex;
		align-items: center;
		gap: 11px;
		margin-top: 12px;
		padding: 10px 12px;
		border-radius: var(--r-sm);
		background: var(--c-bg-alt);
	}
	.agent-awatar {
		width: 38px;
		height: 38px;
		flex: none;
		border-radius: 50%;
		overflow: hidden;
		background: var(--c-green-tint);
		color: var(--c-primary);
		display: grid;
		place-items: center;
		font-size: 13px;
		font-weight: 700;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center top;
		}
	}
	.agent-tekst {
		display: flex;
		flex-direction: column;
		min-width: 0;

		strong {
			font-size: 13.5px;
			color: var(--c-text);
		}
		small {
			font-size: 12px;
			color: var(--c-subtle);
		}
	}

	.publish-actions {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 18px;
	}
	.akcje-hint {
		margin: 2px 0 0;
		font-size: 12.5px;
		line-height: 1.45;
		color: var(--c-gold-deep, #9a7433);
	}
	.form-warn {
		margin-top: 12px;
		padding: 10px 14px;
		border-radius: var(--r-sm);
		font-size: 13px;
		line-height: 1.55;
		background: var(--c-gold-tint, #f7efdf);
		border: 1px solid var(--c-border);
		color: var(--c-text);
	}
	button:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	@media (max-width: 1024px) {
		.form-layout {
			grid-template-columns: 1fr;
		}
		.side-sticky {
			position: static;
		}
		/* Na wąskim ekranie panel boczny ląduje POD całym formularzem, więc do
		   „Zapisz" trzeba było przewinąć kilkanaście pól. Pasek akcji przykleja
		   się do dołu ekranu — tak jak w formularzu artykułu. */
		.publish-actions {
			position: sticky;
			bottom: 0;
			z-index: 5;
			margin: 18px -18px -18px;
			padding: 14px 18px calc(14px + env(safe-area-inset-bottom));
			background: var(--c-surface);
			border-top: 1px solid var(--c-border);
			box-shadow: 0 -10px 24px -20px rgba(30, 40, 30, 0.7);
		}
	}
	@media (max-width: 560px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.span-2 {
			grid-column: span 1;
		}
		/* kciukiem trudno trafić w chip 33 px */
		.amenity-chip {
			min-height: 42px;
		}
	}
</style>
