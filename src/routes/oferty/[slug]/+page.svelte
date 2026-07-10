<script lang="ts">
	import LandingNav from '$lib/components/landing/LandingNav.svelte';
	import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
	import ListingCard from '$lib/components/ListingCard.svelte';
	import {
		CATEGORY_LABELS,
		CONDITION_LABELS,
		formatArea,
		formatPrice,
		HEATING_LABELS,
		locationLabel,
		pricePerM2
	} from '$lib/utils';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	const listing = $derived(data.listing);

	const images = $derived(listing.images ?? []);
	const sortedImages = $derived([...images].sort((a, b) => Number(b.isMain) - Number(a.isMain) || a.order - b.order));
	let activeImage = $state(0);

	const isSold = $derived(listing.status === 'SOLD');

	const galleryBadges = $derived(
		(() => {
			const b: { text: string; cls: string }[] = [];
			if (isSold) b.push({ text: 'Sprzedane', cls: 'gb-sold' });
			else if (listing.status === 'RESERVED') b.push({ text: 'Rezerwacja', cls: 'gb-reserved' });
			else if (listing.isDeal) b.push({ text: 'Okazja', cls: 'gb-deal' });
			if (listing.isExclusive && !isSold) b.push({ text: 'Na wyłączność', cls: 'gb-exclusive' });
			return b;
		})()
	);

	const params = $derived(
		[
			listing.area ? { label: 'Powierzchnia', value: formatArea(listing.area) } : null,
			listing.rooms ? { label: 'Pokoje', value: String(listing.rooms) } : null,
			listing.floor != null ? { label: 'Piętro', value: String(listing.floor) } : null,
			listing.yearBuilt ? { label: 'Rok budowy', value: String(listing.yearBuilt) } : null,
			listing.condition ? { label: 'Stan', value: CONDITION_LABELS[listing.condition] } : null,
			listing.heating ? { label: 'Ogrzewanie', value: HEATING_LABELS[listing.heating] } : null
		].filter(Boolean) as { label: string; value: string }[]
	);
</script>

<svelte:head>
	<title>{listing.title} — LW Nieruchomości</title>
	<meta name="description" content={data.seo.description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={listing.title} />
	<meta property="og:description" content={data.seo.description} />
	<meta property="og:image" content={data.seo.ogImage} />
	{@html data.seo.jsonLd}
</svelte:head>

<LandingNav />

<main class="section">
	<div class="container">
		<span class="breadcrumb">
			<a href="/">Strona główna</a> · <a href="/oferty">Oferty</a> · {listing.title}
		</span>

		<div class="listing-detail">
			<div class="gallery">
				<div class="gallery-main" class:has-photo={sortedImages.length} class:is-sold={isSold}>
					{#if sortedImages.length}
						<img src={sortedImages[activeImage]?.url} alt={listing.title} />
					{:else}
						<div class="ph" data-label={`zdjęcie · ${CATEGORY_LABELS[listing.category].toLowerCase()}`}></div>
					{/if}
					{#if galleryBadges.length}
						<div class="gallery-badges">
							{#each galleryBadges as b}
								<span class="badge {b.cls}">{b.text}</span>
							{/each}
						</div>
					{/if}
				</div>
				{#if sortedImages.length > 1}
					<div class="gallery-thumbs">
						{#each sortedImages as img, i}
							<button
								type="button"
								class="thumb"
								class:active={i === activeImage}
								onclick={() => (activeImage = i)}
							>
								<img src={img.url} alt="" />
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="detail-info">
				<span class="category-chip">{CATEGORY_LABELS[listing.category]}</span>
				{#if listing.referenceNumber}
					<span class="ref-number">Nr oferty: {listing.referenceNumber}</span>
				{/if}
				<h1 class="h-page">{listing.title}</h1>
				<span class="location">
					<span class="location-dot"></span>{locationLabel(listing.city, listing.district)}
				</span>

				<div class="price-block">
					<strong>{formatPrice(listing.price)}</strong>
					{#if listing.oldPrice}<span class="old-price">{formatPrice(listing.oldPrice)}</span>{/if}
					{#if pricePerM2(listing.price, listing.area)}
						<span class="per-m2">{pricePerM2(listing.price, listing.area)}</span>
					{/if}
				</div>

				{#if params.length}
					<div class="params">
						{#each params as p}
							<div class="param">
								<span class="param-label">{p.label}</span>
								<span class="param-value">{p.value}</span>
							</div>
						{/each}
					</div>
				{/if}

				{#if listing.amenities.length}
					<div class="amenities">
						{#each listing.amenities as a}
							<span class="amenity">{a}</span>
						{/each}
					</div>
				{/if}

				<p class="body description">{listing.description}</p>

				<div class="card contact-card">
					<h3 class="h3">Zapytaj o tę ofertę</h3>
					{#if form?.success}
						<p class="form-success">Dziękujemy! Odezwiemy się wkrótce.</p>
					{:else}
						<form method="POST" use:enhance class="lead-form">
							<input class="input" type="text" name="name" placeholder="Imię i nazwisko" required />
							<input class="input" type="text" name="contact" placeholder="Telefon lub e-mail" required />
							<textarea class="textarea" name="message" placeholder="Wiadomość (opcjonalnie)" rows="3"
							></textarea>
							<button type="submit" class="btn btn--primary btn--block">Wyślij zapytanie</button>
						</form>
					{/if}
				</div>
			</div>
		</div>

		{#if data.similar.length > 0}
			<div class="similar-section">
				<h2 class="h2">Podobne oferty</h2>
				<div class="listing-grid">
					{#each data.similar as item}
						<ListingCard listing={item} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</main>

<LandingFooter />

<style lang="scss">
	.breadcrumb {
		font-size: 13px;
		color: var(--c-subtle);
		a {
			color: var(--c-subtle);
			&:hover {
				color: var(--c-primary);
			}
		}
	}

	.listing-detail {
		display: flex;
		flex-wrap: wrap;
		gap: 48px;
		margin: 28px 0 72px;
	}
	.gallery {
		flex: 1.1 1 380px;
		min-width: 290px;
	}
	.gallery-main {
		position: relative;
		aspect-ratio: 4/3;
		border-radius: var(--r-2xl);
		overflow: hidden;
		background: #e6dcc7;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&.is-sold img {
			filter: grayscale(0.7);
			opacity: 0.72;
		}
	}
	.gallery-badges {
		position: absolute;
		top: 18px;
		left: 18px;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}
	.gallery-badges .badge {
		font-size: 12px;
		font-weight: 600;
		padding: 6px 13px;
		border-radius: var(--r-pill);
	}
	.gb-sold {
		background: rgba(32, 41, 31, 0.9);
		color: #f3efe4;
	}
	.gb-reserved {
		background: var(--c-gold);
		color: #fff;
	}
	.gb-deal,
	.gb-exclusive {
		background: var(--c-primary);
		color: #f3efe4;
	}
	.gallery-thumbs {
		display: flex;
		gap: 10px;
		margin-top: 12px;
		flex-wrap: wrap;
	}
	.thumb {
		width: 84px;
		height: 64px;
		border-radius: var(--r-sm);
		overflow: hidden;
		border: 2px solid transparent;
		padding: 0;
		cursor: pointer;
		background: none;
		transition: border-color 0.15s ease;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&.active {
			border-color: var(--c-primary);
		}
	}

	.detail-info {
		flex: 0.9 1 320px;
		min-width: 290px;
	}
	.category-chip {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--c-primary);
	}
	.ref-number {
		margin-left: 10px;
		font-size: 12px;
		color: var(--c-subtle);
	}
	.detail-info h1 {
		margin: 6px 0 6px;
	}
	.location {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		color: var(--c-subtle);
	}
	.location-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--c-gold);
		flex: none;
	}

	.price-block {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 12px;
		margin: 20px 0 20px;
		strong {
			font-family: var(--font-serif);
			font-size: 2rem;
			font-weight: 600;
			color: var(--c-primary);
		}
	}
	.old-price {
		font-size: 16px;
		color: var(--c-subtle);
		text-decoration: line-through;
	}
	.per-m2 {
		font-size: 13px;
		color: var(--c-subtle);
		font-family: var(--font-mono);
	}

	.params {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1px;
		background: var(--c-border);
		border: 1px solid var(--c-border);
		border-radius: var(--r-md);
		overflow: hidden;
		margin-bottom: 20px;
	}
	.param {
		background: var(--c-surface);
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.param-label {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--c-subtle);
	}
	.param-value {
		font-size: 15px;
		font-weight: 600;
		color: var(--c-text);
	}

	.amenities {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 24px;
	}
	.amenity {
		font-size: 13px;
		padding: 6px 13px;
		border-radius: var(--r-pill);
		background: var(--c-green-tint);
		color: var(--c-primary);
		font-weight: 500;
	}

	.description {
		font-size: 15px;
		line-height: 1.7;
		margin-bottom: 32px;
	}

	.contact-card h3 {
		margin-bottom: 16px;
	}
	.lead-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.form-success {
		font-weight: 600;
		color: var(--c-primary);
	}

	.similar-section h2 {
		margin-bottom: 28px;
	}
	.listing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
		gap: 22px;
	}
</style>
