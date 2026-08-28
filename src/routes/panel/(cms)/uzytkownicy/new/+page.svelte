<script lang="ts">
	import { enhance } from '$app/forms';
	import Select from '$lib/components/Select.svelte';

	let { form } = $props();
	let role = $state('AGENT');
	let zapisywanie = $state(false);
</script>

<svelte:head>
	<title>Dodaj użytkownika — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Dodaj użytkownika</h1>
</div>

<div class="card user-form-card">
	{#if form?.error}
		<p class="form-error">{form.error}</p>
	{/if}
	<form
		method="POST"
		use:enhance={() => {
			zapisywanie = true;
			return async ({ update }) => {
				await update();
				zapisywanie = false;
			};
		}}
		class="user-form"
	>
		<label class="field">
			<span class="field__label">Imię i nazwisko</span>
			<input class="input" type="text" name="name" value={form?.name ?? ''} required />
		</label>
		<label class="field">
			<span class="field__label">E-mail</span>
			<input
				class="input"
				type="email"
				name="email"
				value={form?.email ?? ''}
				autocapitalize="none"
				spellcheck="false"
				required
			/>
		</label>
		<label class="field">
			<span class="field__label">Hasło</span>
			<input
				class="input"
				type="text"
				name="password"
				minlength="10"
				placeholder="min. 10 znaków"
				required
			/>
			<span class="field__hint">
				Widoczne podczas wpisywania — zapisz je i przekaż użytkownikowi. Potem można je zmienić
				tylko przez edycję konta.
			</span>
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
			<button type="submit" class="btn btn--primary" disabled={zapisywanie}>
				{zapisywanie ? 'Dodawanie…' : 'Dodaj'}
			</button>
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
	.field__hint {
		margin-top: 5px;
		font-size: 12px;
		line-height: 1.45;
		color: var(--c-subtle);
	}
	button:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
</style>
