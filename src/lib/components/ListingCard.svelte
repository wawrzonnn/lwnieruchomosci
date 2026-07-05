<script lang="ts">
	import type { Listing, ListingImage } from '@prisma/client';
	import { CATEGORY_LABELS, formatArea, formatPrice, locationLabel } from '$lib/utils';

	let { listing }: { listing: Listing & { images?: ListingImage[] } } = $props();

	const mainImage = $derived(
		listing.images?.find((i) => i.isMain)?.url ?? listing.images?.[0]?.url ?? null
	);

	const isSold = $derived(listing.status === 'SOLD');
	const isReserved = $derived(listing.status === 'RESERVED');

	// Etykiety na zdjęciu — status (sprzedane/rezerwacja/okazja) ma pierwszeństwo,
	// a „Na wyłączność" pokazujemy dodatkowo (chyba że oferta jest już sprzedana).
	const badges = $derived(
		(() => {
			const b: { text: string; cls: string }[] = [];
			if (isSold) b.push({ text: 'Sprzedane', cls: 'b-sold' });
			else if (isReserved) b.push({ text: 'Rezerwacja', cls: 'b-reserved' });
			else if (listing.isDeal) b.push({ text: 'Okazja', cls: 'b-deal' });
			if (listing.isExclusive && !isSold) b.push({ text: 'Na wyłączność', cls: 'b-exclusive' });
			return b;
		})()
	);
</script>

<a
	href="/oferty/{listing.slug}"
	class="offer-link"
	class:highlighted={listing.isHighlighted}
	class:is-sold={isSold}
>
	<article class="offer">
		<div
			class="offer__media"
			class:has-photo={mainImage}
			data-label={`zdjęcie · ${CATEGORY_LABELS[listing.category].toLowerCase()}`}
		>
			{#if mainImage}<img src={mainImage} alt={listing.title} loading="lazy" />{/if}
			{#if badges.length}
				<div class="offer__badges">
					{#each badges as b}
						<span class="badge {b.cls}">{b.text}</span>
					{/each}
				</div>
			{/if}
			<span class="badge badge--type offer__type">{CATEGORY_LABELS[listing.category]}</span>
		</div>
		<div class="offer__body">
			<div class="offer__loc">{locationLabel(listing.city, listing.district)}</div>
			<h3 class="offer__title">{listing.title}</h3>
			<div class="offer__price">
				<b>{formatPrice(listing.price)}</b>
				{#if listing.oldPrice}<del>{formatPrice(listing.oldPrice)}</del>{/if}
			</div>
			<div class="offer__specs">
				{#if listing.area}<span>{formatArea(listing.area)}</span>{/if}
				{#if listing.rooms}<span>{listing.rooms} pok.</span>{/if}
			</div>
		</div>
	</article>
</a>

<style lang="scss">
	.offer-link {
		display: block;
		height: 100%;
	}
	.offer {
		height: 100%;
	}
	.offer-link.highlighted .offer {
		border-color: var(--c-gold);
		box-shadow: 0 0 0 1px var(--c-gold);
	}
	.offer__media.has-photo {
		background: var(--c-photo-bg, #e6dcc7);
		&::after {
			display: none;
		}
	}
	.offer__media img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* stos etykiet w lewym górnym rogu */
	.offer__badges {
		position: absolute;
		top: 12px;
		left: 12px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		z-index: 2;
	}
	.badge {
		font-size: 11px;
		font-weight: 600;
		padding: 5px 11px;
		border-radius: var(--r-pill);
	}
	.b-sold {
		background: rgba(32, 41, 31, 0.9);
		color: #f3efe4;
	}
	.b-reserved {
		background: var(--c-gold);
		color: #fff;
	}
	.b-deal,
	.b-exclusive {
		background: var(--c-primary);
		color: #f3efe4;
	}

	/* sprzedane — wyszarzenie zdjęcia + ukośna wstęga, ale oferta wciąż widoczna */
	.is-sold .offer__media img {
		filter: grayscale(0.7);
		opacity: 0.7;
	}
	.is-sold .offer__title,
	.is-sold .offer__price b {
		color: var(--c-muted);
	}
	.is-sold .offer__price del {
		display: none;
	}
</style>
