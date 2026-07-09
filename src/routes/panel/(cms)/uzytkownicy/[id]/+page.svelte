<script lang="ts">
	import { enhance } from '$app/forms';
	import Select from '$lib/components/Select.svelte';

	let { data, form } = $props();
	let role = $state(data.user.role);
</script>

<svelte:head>
	<title>Edytuj użytkownika — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Edytuj użytkownika</h1>
</div>

<div class="card user-form-card">
	{#if form?.error}
		<p class="form-error">{form.error}</p>
	{/if}
	<form method="POST" use:enhance class="user-form">
		<label class="field">
			<span class="field__label">Imię i nazwisko</span>
			<input class="input" type="text" name="name" value={data.user.name} required />
		</label>
		<label class="field">
			<span class="field__label">E-mail</span>
			<input class="input" type="email" name="email" value={data.user.email} required />
		</label>
		<label class="field">
			<span class="field__label">Nowe hasło</span>
			<input class="input" type="text" name="password" placeholder="zostaw puste, aby nie zmieniać" />
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

		<div class="form-actions">
			<button type="submit" class="btn btn--primary">Zapisz</button>
			<a href="/panel/uzytkownicy" class="btn btn--ghost">Anuluj</a>
		</div>
	</form>
</div>

<style lang="scss">
	.user-form-card {
		max-width: 480px;
		padding: 24px;
	}
	.user-form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.form-actions {
		display: flex;
		gap: 10px;
		margin-top: 6px;
	}
</style>
