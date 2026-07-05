<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Panel — LW Nieruchomości</title>
</svelte:head>

<div class="login-screen">
	<div class="card login-card">
		<div class="brand-row">
			<span class="brand-mark">LW</span>
			<strong>LW Nieruchomości</strong>
		</div>
		<h1 class="h3">Panel zarządzania</h1>
		<p class="lead">Zaloguj się, aby zarządzać ofertami</p>

		{#if form?.error}
			<p class="form-error">{form.error}</p>
		{/if}

		<form method="POST" use:enhance class="login-form">
			<label class="field">
				<span class="field__label">Adres e-mail</span>
				<input
					class="input"
					type="email"
					name="email"
					value={form?.email ?? 'anna@lw.nieruchomosci.pl'}
					required
				/>
			</label>
			<label class="field">
				<span class="field__label">Hasło</span>
				<input class="input" type="password" name="password" value="admin123" required />
			</label>
			<button type="submit" class="btn btn--primary btn--block">Zaloguj się</button>
		</form>

		<p class="hint">Demo — kliknij „Zaloguj się", aby wejść</p>
		<a href="/" class="back-link">← Wróć do strony</a>
	</div>
</div>

<style lang="scss">
	.login-screen {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #efe9d9 0%, #f6f1e7 60%, #faf7f0 100%);
		padding: 24px;
	}
	.login-card {
		width: 100%;
		max-width: 400px;
		border-radius: var(--r-2xl);
		padding: 40px;
		box-shadow: var(--sh-pop);
		text-align: center;
	}
	.brand-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-bottom: 28px;
		strong {
			font-family: var(--font-serif);
			font-size: 17px;
			font-weight: 500;
			color: var(--c-text);
		}
	}
	.brand-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--r-md);
		background: var(--c-primary);
		color: #f3efe4;
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: 14px;
	}
	h1 {
		margin-bottom: 6px;
	}
	.lead {
		font-size: 14px;
		margin-bottom: 28px;
	}
	.login-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		text-align: left;
	}
	.login-form .btn {
		margin-top: 6px;
	}
	.form-error {
		padding: 10px 14px;
		border-radius: var(--r-sm);
		font-size: 13px;
		margin-bottom: 20px;
		background: var(--c-danger-bg);
		border: 1px solid var(--c-danger-border);
		color: var(--c-danger);
	}
	.hint {
		font-size: 12.5px;
		color: var(--c-subtle);
		margin-top: 20px;
	}
	.back-link {
		display: inline-block;
		margin-top: 12px;
		font-size: 13px;
		color: var(--c-muted);
		&:hover {
			color: var(--c-primary);
		}
	}
</style>
