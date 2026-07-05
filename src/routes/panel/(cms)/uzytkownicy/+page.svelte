<script lang="ts">
	import { enhance } from '$app/forms';
	import Select from '$lib/components/Select.svelte';
	import { initials } from '$lib/utils';

	let { data, form } = $props();
	let role = $state('AGENT');
</script>

<svelte:head>
	<title>Użytkownicy — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Użytkownicy</h1>
</div>

<div class="table-wrap">
	<table class="data-table">
		<thead>
			<tr>
				<th>Użytkownik</th>
				<th>E-mail</th>
				<th>Rola</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user}
				<tr>
					<td>
						<div class="name-cell">
							<span class="t-avatar">{initials(user.name)}</span>
							<strong>{user.name}</strong>
						</div>
					</td>
					<td>{user.email}</td>
					<td>{user.role === 'ADMIN' ? 'Administrator' : 'Agent'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="card add-user-card">
	<h3 class="h3" style="font-size: 16px;">Dodaj użytkownika</h3>
	{#if form?.success}
		<p class="form-success">Użytkownik dodany.</p>
	{/if}
	{#if form?.error}
		<p class="form-error">{form.error}</p>
	{/if}
	<form method="POST" use:enhance class="add-user-form">
		<label class="field">
			<span class="field__label">Imię i nazwisko</span>
			<input class="input" type="text" name="name" required />
		</label>
		<label class="field">
			<span class="field__label">E-mail</span>
			<input class="input" type="email" name="email" required />
		</label>
		<label class="field">
			<span class="field__label">Rola</span>
			<Select
				name="role"
				bind:value={role}
				options={[
					{ value: 'AGENT', label: 'Agent' },
					{ value: 'ADMIN', label: 'Administrator' }
				]}
			/>
		</label>
		<button type="submit" class="btn btn--primary">Dodaj</button>
	</form>
</div>

<style lang="scss">
	.add-user-card {
		margin-top: 28px;
		max-width: 640px;
	}
	.add-user-form {
		display: flex;
		align-items: end;
		gap: 12px;
		flex-wrap: wrap;
	}
	.add-user-form .field {
		flex: 1;
		min-width: 160px;
	}
</style>
