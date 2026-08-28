<script lang="ts">
	import { enhance } from '$app/forms';
	import { initials, INQUIRY_STATUS_LABELS, INQUIRY_TYPE_LABELS } from '$lib/utils';

	let { data } = $props();

	function statusClass(status: string) {
		if (status === 'NEW') return 'badge--new';
		if (status === 'IN_PROGRESS') return 'badge--progress';
		return 'badge--draft';
	}

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'short' }).format(new Date(date));
	}

	// Pole `contact` to sklejka w rodzaju „tel: +48 690 008 273 · e-mail: a@b.pl"
	// (albo jeden surowy wpis z formularza przy ofercie). Wyciągamy z niego to,
	// w co da się kliknąć — dotąd trzeba było przepisywać numer ręcznie.
	function kontaktLinki(contact: string) {
		const email = contact.match(/[^\s:·]+@[^\s:·]+\.[^\s:·]+/)?.[0] ?? null;
		const telefon = contact.match(/(\+?\d[\d\s-]{7,}\d)/)?.[0]?.trim() ?? null;
		return { email, telefon, surowy: !email && !telefon ? contact : null };
	}
</script>

<svelte:head>
	<title>Zgłoszenia — Panel LW Nieruchomości</title>
</svelte:head>

<div class="page-header">
	<h1 class="h3">Zgłoszenia</h1>
</div>

<p class="hint">Zgłoszenia od klientów ze strony — kliknij status, aby zmienić (Nowe → W toku → Obsłużone).</p>

<div class="inquiry-grid">
	{#each data.inquiries as inquiry}
		<div class="card inquiry-card">
			<div class="inquiry-head">
				<span class="t-avatar">{initials(inquiry.name)}</span>
				<div class="inquiry-title">
					<strong>{inquiry.name}</strong>
					<span>{INQUIRY_TYPE_LABELS[inquiry.type] ?? inquiry.type}{inquiry.subject ? ` · ${inquiry.subject}` : ''}</span>
				</div>
				<div class="inquiry-meta">
					<span class="inquiry-date">{formatDate(inquiry.createdAt)}</span>
					<form method="POST" action="?/cycleStatus" use:enhance>
						<input type="hidden" name="id" value={inquiry.id} />
						<input type="hidden" name="status" value={inquiry.status} />
						<button
							type="submit"
							class="badge status-btn {statusClass(inquiry.status)}"
							title="Kliknij, aby przestawić status"
						>
							{INQUIRY_STATUS_LABELS[inquiry.status]}
						</button>
					</form>
				</div>
			</div>
			<p class="inquiry-message">{inquiry.message}</p>
			<div class="inquiry-contact">
				<span>Kontakt:</span>
				{#each [kontaktLinki(inquiry.contact)] as k}
					{#if k.telefon}<a class="kontakt-link" href="tel:{k.telefon.replace(/\s/g, '')}">{k.telefon}</a>{/if}
					{#if k.email}<a class="kontakt-link" href="mailto:{k.email}">{k.email}</a>{/if}
					{#if k.surowy}<span>{k.surowy}</span>{/if}
				{/each}
			</div>
			{#if inquiry.listing}
				<a class="kontakt-link do-oferty" href="/panel/oferty/{inquiry.listing.id}">
					Dotyczy oferty: {inquiry.listing.title} →
				</a>
			{/if}
		</div>
	{:else}
		<p class="empty">Brak zgłoszeń.</p>
	{/each}
</div>

<style lang="scss">
	.hint {
		font-size: 13.5px;
		color: var(--c-subtle);
		margin-bottom: 24px;
	}
	.inquiry-grid {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.inquiry-card {
		padding: 20px;
	}
	.inquiry-head {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 12px;
	}
	.inquiry-title {
		display: flex;
		flex-direction: column;
		margin-right: auto;
		strong {
			font-size: 14.5px;
			color: var(--c-text);
		}
		span {
			font-size: 12px;
			color: var(--c-subtle);
		}
	}
	.inquiry-date {
		font-size: 12.5px;
		color: var(--c-subtle);
	}
	.inquiry-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
	}
	.status-btn {
		border: 1px solid transparent;
		cursor: pointer;
		/* jedyna akcja na tej stronie miała 26 px wysokości i wyglądała jak
		   zwykła plakietka — teraz widać, że to przycisk, i da się w niego trafić */
		min-height: 34px;
		padding: 7px 14px;
		transition: filter 0.15s ease;

		&:hover {
			filter: brightness(0.95);
			border-color: currentColor;
		}
	}
	.inquiry-message {
		font-size: 14.5px;
		margin-bottom: 10px;
		color: var(--c-text);
		/* treść zgłoszenia jest składana z akapitów i wypunktowania (lead-form.ts),
		   bez tego wszystko zlewało się w jeden blok */
		white-space: pre-wrap;
	}
	.inquiry-contact {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 4px 12px;
		font-size: 13px;
		color: var(--c-muted);
		span {
			color: var(--c-subtle);
		}
	}
	.kontakt-link {
		color: var(--c-primary);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.do-oferty {
		display: inline-block;
		margin-top: 10px;
		font-size: 13px;
	}

	@media (max-width: 640px) {
		.inquiry-head {
			flex-wrap: wrap;
		}
		.inquiry-title {
			/* przy dacie i statusie w tym samym rzędzie podtytuł zgniatał się
			   do czterech linii */
			flex: 1 1 100%;
			order: 2;
			margin-right: 0;
		}
		.t-avatar {
			order: 1;
		}
		.inquiry-meta {
			order: 1;
			margin-left: auto;
		}
		.status-btn {
			min-height: 42px;
			padding: 10px 16px;
			font-size: 13px;
		}
	}
	.empty {
		color: var(--c-subtle);
		padding: 40px 0;
		text-align: center;
	}
</style>
