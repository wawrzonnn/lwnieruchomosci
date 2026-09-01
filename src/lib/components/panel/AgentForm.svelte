<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Agent } from '@prisma/client';

	let { agent, error }: { agent?: Agent; error?: string } = $props();

	let imie = $state(agent?.imie ?? '');
	let rola = $state(agent?.rola ?? '');
	// Format wyświetlany, ze spacjami — href tel: powstaje z niego przez usunięcie spacji.
	let telefon = $state(agent?.telefon ?? '+48 690 008 273');
	let image = $state(agent?.image ?? '');
	let aktywny = $state(agent?.aktywny ?? true);
	let kolejnosc = $state(String(agent?.order ?? 0));

	let wysylanie = $state(false);
	let bladZdjecia = $state('');
	let zapisywanie = $state(false);

	const inicjaly = $derived(
		imie
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((c) => c[0]?.toUpperCase() ?? '')
			.join('')
	);

	async function wgrajZdjecie(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		if (!input.files?.length) return;
		wysylanie = true;
		bladZdjecia = '';
		try {
			const fd = new FormData();
			fd.append('files', input.files[0]);
			const res = await fetch('/api/uploads', { method: 'POST', body: fd });
			const dane = await res.json().catch(() => ({}));
			if (!res.ok) {
				bladZdjecia = dane.message || 'Nie udało się wysłać zdjęcia.';
				return;
			}
			if (dane.urls?.[0]) image = dane.urls[0];
			if (dane.pominiete?.length) {
				bladZdjecia = dane.pominiete.map((x: { powod: string }) => x.powod).join(' ');
			}
		} catch {
			bladZdjecia = 'Nie udało się wysłać zdjęcia — sprawdź połączenie.';
		} finally {
			wysylanie = false;
			input.value = '';
		}
	}
</script>

<div class="card agent-form-card">
	{#if error}<p class="form-error">{error}</p>{/if}

	<form
		method="POST"
		use:enhance={() => {
			zapisywanie = true;
			return async ({ update }) => {
				await update();
				zapisywanie = false;
			};
		}}
		class="agent-form"
	>
		<input type="hidden" name="image" value={image} />

		<div class="foto-rzad">
			<div class="awatar" class:pusty={!image}>
				{#if image}
					<img src={image} alt="" />
				{:else}
					<span>{inicjaly || '?'}</span>
				{/if}
			</div>
			<div class="foto-akcje">
				<label class="btn btn--ghost wgraj">
					<input type="file" accept="image/*" onchange={wgrajZdjecie} hidden />
					{wysylanie ? 'Wysyłanie…' : image ? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}
				</label>
				{#if image}
					<button type="button" class="btn-icon danger" onclick={() => (image = '')}>Usuń</button>
				{/if}
				<p class="foto-hint">
					Kadr kwadratowy, widoczna twarz i ramiona. Zdjęcie jest przycinane do kółka.
				</p>
			</div>
		</div>
		{#if bladZdjecia}<p class="form-error">{bladZdjecia}</p>{/if}

		<label class="field">
			<span class="field__label">Imię i nazwisko</span>
			<input class="input" type="text" name="imie" bind:value={imie} required />
		</label>

		<label class="field">
			<span class="field__label">Stanowisko</span>
			<input
				class="input"
				type="text"
				name="rola"
				bind:value={rola}
				placeholder="np. Specjalista ds. nieruchomości"
			/>
			<span class="field__hint">Pokazywane pod imieniem na stronie oferty. Można zostawić puste.</span>
		</label>

		<label class="field">
			<span class="field__label">Telefon</span>
			<input
				class="input"
				type="tel"
				name="telefon"
				bind:value={telefon}
				placeholder="+48 690 008 273"
				required
			/>
			<span class="field__hint">Wpisz ze spacjami — link do dzwonienia powstanie automatycznie.</span>
		</label>

		<div class="dwa-pola">
			<label class="field">
				<span class="field__label">Kolejność</span>
				<input class="input" type="number" name="order" min="0" bind:value={kolejnosc} />
			</label>
			<label class="przelacznik">
				<input type="checkbox" name="aktywny" bind:checked={aktywny} />
				<span>
					<strong>Aktywny</strong>
					<small>Wyłączony nie pojawi się na liście wyboru przy ofercie, ale zostaje przy swoich.</small>
				</span>
			</label>
		</div>

		<div class="form-actions">
			<button type="submit" class="btn btn--primary" disabled={zapisywanie || wysylanie}>
				{zapisywanie ? 'Zapisywanie…' : 'Zapisz'}
			</button>
			<a href="/panel/agenci" class="btn btn--ghost">Anuluj</a>
		</div>
	</form>
</div>

<style lang="scss">
	.agent-form-card {
		max-width: 560px;
		padding: 24px;
	}
	.agent-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.foto-rzad {
		display: flex;
		align-items: center;
		gap: 18px;
		padding-bottom: 4px;
	}
	.awatar {
		width: 92px;
		height: 92px;
		flex: none;
		border-radius: 50%;
		overflow: hidden;
		background: var(--c-green-tint);
		display: grid;
		place-items: center;

		img {
			width: 100%;
			height: 100%;
			/* materiał jest pionowy — kadr od góry zostawia twarz, a nie tors */
			object-fit: cover;
			object-position: center top;
		}
		span {
			font-size: 26px;
			font-weight: 700;
			color: var(--c-primary);
		}
	}
	.foto-akcje {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
	}
	.wgraj {
		cursor: pointer;
	}
	.foto-hint {
		flex: 1 1 100%;
		margin: 0;
		font-size: 12px;
		line-height: 1.45;
		color: var(--c-subtle);
	}

	.field__hint {
		margin-top: 5px;
		font-size: 12px;
		line-height: 1.45;
		color: var(--c-subtle);
	}
	.dwa-pola {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 16px;
		align-items: start;
	}
	.przelacznik {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		padding-top: 24px;
		cursor: pointer;

		input {
			margin-top: 2px;
			width: 18px;
			height: 18px;
			accent-color: var(--c-primary);
		}
		strong {
			display: block;
			font-size: 13.5px;
			font-weight: 600;
			color: var(--c-text);
		}
		small {
			display: block;
			font-size: 12px;
			line-height: 1.45;
			color: var(--c-subtle);
		}
	}

	.form-actions {
		display: flex;
		gap: 10px;
		margin-top: 6px;
	}
	button:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	@media (max-width: 560px) {
		.dwa-pola {
			grid-template-columns: 1fr;
		}
		.przelacznik {
			padding-top: 0;
		}
	}
</style>
