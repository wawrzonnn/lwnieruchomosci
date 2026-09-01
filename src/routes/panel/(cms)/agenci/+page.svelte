<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	const inicjaly = (imie: string) =>
		imie
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((c) => c[0]?.toUpperCase() ?? '')
			.join('');
</script>

<svelte:head>
	<title>Agenci — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Agenci</h1>
	<a href="/panel/agenci/nowy" class="btn btn--primary">+ Dodaj agenta</a>
</div>

<p class="hint">
	Osoby przypisywane do ofert. Agent widoczny jest na stronie oferty — ze zdjęciem, stanowiskiem
	i klikalnym telefonem.
</p>

{#if form?.error}<p class="form-error">{form.error}</p>{/if}
{#if form?.info}<p class="form-info">{form.info}</p>{/if}

<div class="agenci">
	{#each data.agenci as a (a.id)}
		<div class="agent-karta" class:wylaczony={!a.aktywny}>
			<div class="awatar" class:pusty={!a.image}>
				{#if a.image}
					<img src={a.image} alt="" />
				{:else}
					<span>{inicjaly(a.imie)}</span>
				{/if}
			</div>

			<div class="agent-dane">
				<strong class="agent-imie">{a.imie}</strong>
				{#if a.rola}<span class="agent-rola">{a.rola}</span>{/if}
				<a class="agent-tel" href="tel:{a.telefon.replace(/\s/g, '')}">{a.telefon}</a>
			</div>

			<div class="agent-meta">
				<span class="plakietka" class:zero={a._count.listings === 0}>
					{a._count.listings}
					{a._count.listings === 1 ? 'oferta' : 'ofert'}
				</span>
				{#if !a.aktywny}<span class="plakietka zero">Wyłączony</span>{/if}
			</div>

			<div class="agent-akcje">
				<a href="/panel/agenci/{a.id}" class="btn-edit">Edytuj</a>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={a.id} />
					<button
						type="submit"
						class="btn-icon danger"
						onclick={(e) => {
							const ile = a._count.listings;
							const tresc = ile
								? `Usunąć agenta ${a.imie}?\n\n${ile} ${ile === 1 ? 'oferta zostanie' : 'ofert zostanie'} bez opiekuna — same oferty NIE zostaną usunięte.`
								: `Usunąć agenta ${a.imie}?`;
							if (!confirm(tresc)) e.preventDefault();
						}}>Usuń</button
					>
				</form>
			</div>
		</div>
	{:else}
		<p class="empty">
			Nie ma jeszcze żadnego agenta. <a href="/panel/agenci/nowy">Dodaj pierwszego</a>, żeby móc
			przypisywać opiekunów do ofert.
		</p>
	{/each}
</div>

<style lang="scss">
	.hint {
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--c-subtle);
		margin: 0 0 20px;
		max-width: 62ch;
	}
	.form-info {
		margin-bottom: 16px;
		padding: 10px 14px;
		border-radius: var(--r-sm);
		font-size: 13px;
		background: var(--c-green-tint);
		border: 1px solid var(--c-primary);
		color: var(--c-primary);
	}

	.agenci {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.agent-karta {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto auto;
		align-items: center;
		gap: 16px;
		padding: 14px 18px;
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-lg);

		&.wylaczony {
			opacity: 0.62;
		}
	}
	.awatar {
		width: 54px;
		height: 54px;
		flex: none;
		border-radius: 50%;
		overflow: hidden;
		background: var(--c-green-tint);
		display: grid;
		place-items: center;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center top;
		}
		span {
			font-size: 16px;
			font-weight: 700;
			color: var(--c-primary);
		}
	}
	.agent-dane {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.agent-imie {
		font-size: 15px;
		color: var(--c-text);
	}
	.agent-rola {
		font-size: 12.5px;
		color: var(--c-subtle);
	}
	.agent-tel {
		font-size: 13px;
		font-weight: 600;
		color: var(--c-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
		justify-self: start;
	}
	.agent-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
	}
	.plakietka {
		font-size: 11.5px;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: var(--r-pill);
		white-space: nowrap;
		background: var(--c-green-tint);
		color: var(--c-primary);

		&.zero {
			background: var(--c-bg-alt);
			color: var(--c-subtle);
		}
	}
	.agent-akcje {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.empty {
		padding: 40px;
		text-align: center;
		color: var(--c-subtle);
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-lg);

		a {
			color: var(--c-primary);
			font-weight: 600;
			text-decoration: underline;
		}
	}

	@media (max-width: 767px) {
		.agent-karta {
			grid-template-columns: auto minmax(0, 1fr);
			align-items: start;
			row-gap: 12px;
		}
		.agent-meta {
			grid-column: 1 / -1;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}
		.agent-akcje {
			grid-column: 1 / -1;

			.btn-edit {
				flex: 1;
			}
		}
	}
</style>
