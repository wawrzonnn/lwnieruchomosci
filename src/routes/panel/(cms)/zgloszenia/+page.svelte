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
					<span>{INQUIRY_TYPE_LABELS[inquiry.type]}</span>
				</div>
				<span class="inquiry-date">{formatDate(inquiry.createdAt)}</span>
				<form method="POST" action="?/cycleStatus" use:enhance>
					<input type="hidden" name="id" value={inquiry.id} />
					<input type="hidden" name="status" value={inquiry.status} />
					<button type="submit" class="badge status-btn {statusClass(inquiry.status)}">
						{INQUIRY_STATUS_LABELS[inquiry.status]}
					</button>
				</form>
			</div>
			<p class="inquiry-message">{inquiry.message}</p>
			<div class="inquiry-contact"><span>Kontakt:</span> {inquiry.contact}</div>
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
	.status-btn {
		border: none;
		cursor: pointer;
	}
	.inquiry-message {
		font-size: 14.5px;
		margin-bottom: 10px;
		color: var(--c-text);
	}
	.inquiry-contact {
		font-size: 13px;
		color: var(--c-muted);
		span {
			color: var(--c-subtle);
			margin-right: 4px;
		}
	}
	.empty {
		color: var(--c-subtle);
		padding: 40px 0;
		text-align: center;
	}
</style>
