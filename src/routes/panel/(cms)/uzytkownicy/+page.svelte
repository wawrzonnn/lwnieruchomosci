<script lang="ts">
	import { enhance } from '$app/forms';
	import { initials } from '$lib/utils';

	let { data, form } = $props();

	let selected = $state<number[]>([]);
	const allChecked = $derived(data.users.length > 0 && selected.length === data.users.length);

	function toggleAll() {
		selected = allChecked ? [] : data.users.map((u) => u.id);
	}
	function toggleOne(id: number) {
		selected = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
	}
</script>

<svelte:head>
	<title>Użytkownicy — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Użytkownicy</h1>
	<a href="/panel/uzytkownicy/new" class="btn btn--primary">+ Dodaj użytkownika</a>
</div>

{#if form?.error}
	<p class="form-error">{form.error}</p>
{/if}

<div class="table-wrap">
	<table class="data-table">
		<thead>
			<tr>
				<th class="col-check">
					<input type="checkbox" checked={allChecked} onchange={toggleAll} aria-label="Zaznacz wszystkich" />
				</th>
				<th>Użytkownik</th>
				<th>E-mail</th>
				<th>Rola</th>
				<th class="col-actions">Akcje</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user (user.id)}
				<tr>
					<td class="col-check">
						<input
							type="checkbox"
							checked={selected.includes(user.id)}
							onchange={() => toggleOne(user.id)}
							aria-label="Zaznacz {user.name}"
						/>
					</td>
					<td>
						<div class="name-cell">
							<span class="t-avatar">{initials(user.name)}</span>
							<strong>{user.name}</strong>
						</div>
					</td>
					<td>{user.email}</td>
					<td>{user.role === 'ADMIN' ? 'Administrator' : 'Agent'}</td>
					<td class="col-actions">
						<a href="/panel/uzytkownicy/{user.id}" class="btn-edit">Edytuj</a>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="5" class="empty">Brak użytkowników.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<form
	method="POST"
	action="?/delete"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success') selected = [];
			await update();
		};
	}}
	class="bulk-actions"
>
	{#each selected as id}
		<input type="hidden" name="ids" value={id} />
	{/each}
	<button
		type="submit"
		class="btn-icon danger"
		disabled={!selected.length}
		onclick={(e) => {
			if (!confirm(`Usunąć ${selected.length} użytkownik(ów)?`)) e.preventDefault();
		}}
	>
		Usuń zaznaczonych{selected.length ? ` (${selected.length})` : ''}
	</button>
</form>

<style lang="scss">
	.col-check {
		width: 36px;
	}
	.col-actions {
		text-align: right;
	}
	input[type='checkbox'] {
		width: 16px;
		height: 16px;
		accent-color: var(--c-primary);
		cursor: pointer;
	}
	.bulk-actions {
		margin-top: 16px;
	}
	.btn-icon:disabled {
		opacity: 0.45;
		cursor: not-allowed;
		&:hover {
			color: var(--c-muted);
			border-color: var(--c-border);
			background: var(--c-bg-alt);
		}
	}
</style>
