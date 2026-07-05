<script lang="ts">
	import { enhance } from '$app/forms';
	import Select from '$lib/components/Select.svelte';
	import { CATEGORY_LABELS, formatPrice, locationLabel, pricePerM2, STATUS_LABELS } from '$lib/utils';

	let { data } = $props();

	let categoryFilter = $state('');
	let statusFilter = $state('');

	const filtered = $derived(
		data.listings.filter(
			(l) =>
				(!categoryFilter || l.category === categoryFilter) &&
				(!statusFilter || l.status === statusFilter)
		)
	);

	const statusBadgeClass: Record<string, string> = {
		ACTIVE: 'badge--active',
		DRAFT: 'badge--draft',
		RESERVED: 'badge--new',
		SOLD: 'badge--draft'
	};

	function mainImage(l: (typeof data.listings)[number]) {
		return l.images?.find((i) => i.isMain)?.url ?? l.images?.[0]?.url ?? null;
	}
</script>

<svelte:head>
	<title>Oferty — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Oferty</h1>
	<div class="header-tools">
		<div class="filter-select">
			<Select
				bind:value={categoryFilter}
				placeholder="Wszystkie kategorie"
				options={[
					{ value: 'MIESZKANIE', label: 'Mieszkanie' },
					{ value: 'DOM', label: 'Dom' },
					{ value: 'DZIALKA', label: 'Działka' },
					{ value: 'LOKAL', label: 'Lokal' }
				]}
			/>
		</div>
		<div class="filter-select">
			<Select
				bind:value={statusFilter}
				placeholder="Każdy status"
				options={[
					{ value: 'ACTIVE', label: 'Aktywna' },
					{ value: 'DRAFT', label: 'Szkic' },
					{ value: 'RESERVED', label: 'Zarezerwowana' },
					{ value: 'SOLD', label: 'Sprzedana' }
				]}
			/>
		</div>
		<a href="/panel/oferty/nowa" class="btn btn--primary">+ Dodaj ofertę</a>
	</div>
</div>

<div class="stat-row">
	<div class="stat-box"><strong>{data.stats.total}</strong><span>ofert</span></div>
	<div class="stat-box"><strong>{data.stats.active}</strong><span>aktywnych</span></div>
	<div class="stat-box"><strong>{data.stats.featured}</strong><span>polecanych</span></div>
</div>

<div class="offers-table">
	<div class="offers-head">
		<span>Oferta</span>
		<span>Kategoria</span>
		<span>Cena</span>
		<span>Status</span>
		<span class="col-actions">Akcje</span>
	</div>

	{#each filtered as listing (listing.id)}
		<div class="offer-row" class:highlighted={listing.isHighlighted}>
			<div class="cell-offer">
				<div class="thumb" class:has-photo={mainImage(listing)}>
					{#if mainImage(listing)}
						<img src={mainImage(listing)} alt="" />
					{/if}
					{#if listing.images?.length}<span class="thumb-count">{listing.images.length} zdj.</span>{/if}
				</div>
				<div class="offer-meta">
					<a href="/panel/oferty/{listing.id}" class="offer-title">{listing.title}</a>
					<span class="offer-loc">{locationLabel(listing.city, listing.district)}</span>
					<div class="offer-flags">
						{#if listing.isFeatured}<span class="flag flag--featured">Polecana</span>{/if}
						{#if listing.isHighlighted}<span class="flag flag--highlight">Wyróżniona</span>{/if}
						{#if listing.isExclusive}<span class="flag flag--exclusive">Na wyłączność</span>{/if}
					</div>
				</div>
			</div>
			<div class="cell-cat">{CATEGORY_LABELS[listing.category]}</div>
			<div class="cell-price">
				<strong>{formatPrice(listing.price)}</strong>
				{#if pricePerM2(listing.price, listing.area)}
					<span>{pricePerM2(listing.price, listing.area)}</span>
				{/if}
			</div>
			<div class="cell-status">
				<span class="badge {statusBadgeClass[listing.status]}">{STATUS_LABELS[listing.status]}</span>
			</div>
			<div class="cell-actions">
				<a href="/panel/oferty/{listing.id}" class="btn-edit">Edytuj</a>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={listing.id} />
					<button
						type="submit"
						class="btn-icon danger"
						title="Usuń"
						onclick={(e) => {
							if (!confirm('Usunąć tę ofertę?')) e.preventDefault();
						}}>×</button
					>
				</form>
			</div>
		</div>
	{:else}
		<div class="empty">Brak ofert spełniających kryteria.</div>
	{/each}
</div>

<style lang="scss">
	.page-header {
		align-items: flex-start;
	}
	.header-tools {
		display: flex;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;
	}
	.filter-select {
		width: 190px;
	}

	.offers-table {
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-lg);
		overflow: hidden;
	}
	.offers-head,
	.offer-row {
		display: grid;
		grid-template-columns: minmax(280px, 2.4fr) 1fr 1.1fr 1fr auto;
		align-items: center;
		gap: 16px;
		padding: 14px 20px;
	}
	.offers-head {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--c-subtle);
		font-weight: 700;
		background: var(--c-bg-alt);
		border-bottom: 1px solid var(--c-border);
	}
	.col-actions {
		text-align: right;
	}
	.offer-row {
		border-bottom: 1px solid var(--c-border-row);
		transition: background 0.12s ease;
		&:last-child {
			border-bottom: none;
		}
		&:hover {
			background: var(--c-bg-alt);
		}
		&.highlighted {
			box-shadow: inset 3px 0 0 var(--c-gold);
		}
	}

	.cell-offer {
		display: flex;
		align-items: center;
		gap: 14px;
		min-width: 0;
	}
	.thumb {
		position: relative;
		flex: none;
		width: 64px;
		height: 52px;
		border-radius: var(--r-xs);
		overflow: hidden;
		background: repeating-linear-gradient(135deg, #efe7d6 0, #efe7d6 8px, #e6dcc7 8px, #e6dcc7 16px);
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.thumb-count {
		position: absolute;
		bottom: 3px;
		right: 3px;
		font-size: 9px;
		font-weight: 600;
		padding: 1px 5px;
		border-radius: 100px;
		background: rgba(32, 41, 31, 0.72);
		color: #f3efe4;
	}
	.offer-meta {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.offer-title {
		font-weight: 600;
		font-size: 14px;
		color: var(--c-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		&:hover {
			color: var(--c-primary);
		}
	}
	.offer-loc {
		font-size: 12.5px;
		color: var(--c-subtle);
	}
	.offer-flags {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
		margin-top: 2px;
	}
	.flag {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 100px;
	}
	.flag--featured {
		background: var(--c-green-tint-2);
		color: var(--c-primary);
	}
	.flag--highlight {
		background: var(--c-gold-tint);
		color: var(--c-gold-deep);
	}
	.flag--exclusive {
		background: var(--c-status-prog-bg);
		color: var(--c-status-prog-fg);
	}

	.cell-cat {
		font-size: 13.5px;
		color: var(--c-muted);
	}
	.cell-price {
		display: flex;
		flex-direction: column;
		gap: 2px;
		strong {
			font-size: 14px;
			color: var(--c-text);
			font-weight: 600;
		}
		span {
			font-size: 11.5px;
			color: var(--c-subtle);
			font-family: var(--font-mono);
		}
	}

	.cell-actions {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		justify-content: flex-end;
	}

	.empty {
		padding: 48px;
		text-align: center;
		color: var(--c-subtle);
	}

	@media (max-width: 900px) {
		.offers-head {
			display: none;
		}
		.offer-row {
			grid-template-columns: 1fr;
			gap: 10px;
		}
		.cell-cat,
		.cell-price,
		.cell-status {
			padding-left: 78px;
		}
		.cell-actions {
			justify-content: flex-start;
			padding-left: 78px;
		}
	}
</style>
