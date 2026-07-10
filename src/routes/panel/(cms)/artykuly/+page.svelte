<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatPlDate } from '$lib/utils';

	let { data } = $props();

	const statusLabel: Record<string, string> = { PUBLISHED: 'Opublikowany', DRAFT: 'Szkic' };
	const statusClass: Record<string, string> = { PUBLISHED: 'badge--active', DRAFT: 'badge--draft' };
</script>

<svelte:head>
	<title>Blog — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Blog</h1>
	<a href="/panel/artykuly/nowa" class="btn btn--primary">+ Dodaj artykuł</a>
</div>

<div class="stat-row">
	<div class="stat-box"><strong>{data.stats.total}</strong><span>artykułów</span></div>
	<div class="stat-box"><strong>{data.stats.published}</strong><span>opublikowanych</span></div>
	<div class="stat-box"><strong>{data.stats.draft}</strong><span>szkiców</span></div>
</div>

<div class="art-table">
	<div class="art-head">
		<span>Artykuł</span>
		<span>Kategoria</span>
		<span>Data</span>
		<span>Status</span>
		<span class="col-actions">Akcje</span>
	</div>

	{#each data.articles as a (a.id)}
		<div class="art-row">
			<div class="cell-art">
				<div class="thumb" class:has-photo={a.coverImage}>
					{#if a.coverImage}<img src={a.coverImage} alt="" />{/if}
				</div>
				<div class="art-meta">
					<a href="/panel/artykuly/{a.id}" class="art-title">{a.title}</a>
					<span class="art-slug">/blog/{a.slug}</span>
					<div class="art-flags">
						{#if a.featured}<span class="flag flag--featured">Wyróżniony</span>{/if}
					</div>
				</div>
			</div>
			<div class="cell-cat">{a.category}</div>
			<div class="cell-date">{formatPlDate(a.publishedAt) || '—'}</div>
			<div class="cell-status">
				<span class="badge {statusClass[a.status]}">{statusLabel[a.status]}</span>
			</div>
			<div class="cell-actions">
				<a href="/panel/artykuly/{a.id}" class="btn-edit">Edytuj</a>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={a.id} />
					<button
						type="submit"
						class="btn-icon danger"
						title="Usuń"
						onclick={(e) => {
							if (!confirm('Usunąć ten artykuł?')) e.preventDefault();
						}}>×</button
					>
				</form>
			</div>
		</div>
	{:else}
		<div class="empty">Brak artykułów. Dodaj pierwszy wpis.</div>
	{/each}
</div>

<style lang="scss">
	.art-table {
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-lg);
		overflow: hidden;
	}
	.art-head,
	.art-row {
		display: grid;
		grid-template-columns: minmax(280px, 2.6fr) 1fr 1.1fr 1fr auto;
		align-items: center;
		gap: 16px;
		padding: 14px 20px;
	}
	.art-head {
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
	.art-row {
		border-bottom: 1px solid var(--c-border-row);
		transition: background 0.12s ease;
		&:last-child {
			border-bottom: none;
		}
		&:hover {
			background: var(--c-bg-alt);
		}
	}
	.cell-art {
		display: flex;
		align-items: center;
		gap: 14px;
		min-width: 0;
	}
	.thumb {
		flex: none;
		width: 64px;
		height: 46px;
		border-radius: var(--r-xs);
		overflow: hidden;
		background: repeating-linear-gradient(135deg, #efe7d6 0, #efe7d6 8px, #e6dcc7 8px, #e6dcc7 16px);
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.art-meta {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.art-title {
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
	.art-slug {
		font-size: 12px;
		color: var(--c-subtle);
		font-family: var(--font-mono);
	}
	.art-flags {
		display: flex;
		gap: 5px;
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
	.cell-cat {
		font-size: 13.5px;
		color: var(--c-muted);
	}
	.cell-date {
		font-size: 13px;
		color: var(--c-subtle);
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
		.art-head {
			display: none;
		}
		.art-row {
			grid-template-columns: 1fr;
			gap: 10px;
		}
		.cell-cat,
		.cell-date,
		.cell-status {
			padding-left: 78px;
		}
		.cell-actions {
			justify-content: flex-start;
			padding-left: 78px;
		}
	}
</style>
