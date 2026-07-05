<script lang="ts">
	let {
		value = $bindable(''),
		options,
		placeholder = '',
		id = '',
		name = '',
		required = false,
		onchange
	}: {
		value: string;
		options: { value: string; label: string }[];
		placeholder?: string;
		id?: string;
		name?: string;
		required?: boolean;
		onchange?: (value: string) => void;
	} = $props();

	let open = $state(false);
	let wrapRef: HTMLDivElement | undefined = $state();

	const selectedLabel = $derived(options.find((o) => o.value === value)?.label ?? placeholder);

	function toggle() {
		open = !open;
	}

	function choose(v: string) {
		value = v;
		open = false;
		onchange?.(v);
	}

	function handleNativeChange(e: Event) {
		onchange?.((e.target as HTMLSelectElement).value);
	}

	function handleClickOutside(e: MouseEvent) {
		if (open && wrapRef && !wrapRef.contains(e.target as Node)) open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div class="select-wrap" bind:this={wrapRef}>
	<select class="select-native" {id} {name} {required} bind:value onchange={handleNativeChange}>
		{#if placeholder}<option value="">{placeholder}</option>{/if}
		{#each options as o}
			<option value={o.value}>{o.label}</option>
		{/each}
	</select>

	<div class="select-custom">
		<button type="button" class="select-trigger" class:open onclick={toggle}>
			<span class:placeholder={!value}>{selectedLabel}</span>
			<svg
				class="chevron"
				class:open
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg
			>
		</button>
		{#if open}
			<ul class="select-list" role="listbox">
				{#if placeholder}
					<li class:selected={!value}>
						<button type="button" onclick={() => choose('')}>{placeholder}</button>
					</li>
				{/if}
				{#each options as o}
					<li class:selected={o.value === value}>
						<button type="button" onclick={() => choose(o.value)}>{o.label}</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="scss">
	.select-wrap {
		position: relative;
		width: 100%;
	}

	.select-native {
		width: 100%;
		font-family: inherit;
		font-size: 14px;
		color: var(--c-text);
		background: var(--c-field);
		border: 1px solid var(--c-border-field);
		border-radius: var(--r-sm);
		padding: 12px 36px 12px 14px;
		outline: none;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%236f685c' stroke-width='1.8'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 14px center;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;

		&:focus {
			border-color: var(--c-primary);
			box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.12);
		}
	}

	.select-custom {
		display: none;
	}

	.select-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;
		font-family: inherit;
		font-size: 14px;
		text-align: left;
		color: var(--c-text);
		background: var(--c-field);
		border: 1px solid var(--c-border-field);
		border-radius: var(--r-sm);
		padding: 12px 14px;
		cursor: pointer;
		transition: all 0.15s ease;

		span.placeholder {
			color: var(--c-placeholder);
		}
		&:hover {
			border-color: #c3b79c;
		}
		&.open {
			border-color: var(--c-primary);
			box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.12);
		}
	}

	.chevron {
		color: var(--c-muted);
		flex-shrink: 0;
		display: flex;
		transition: transform 0.15s ease;
		&.open {
			transform: rotate(180deg);
		}
	}

	.select-list {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		z-index: 100;
		max-height: 264px;
		overflow-y: auto;
		margin: 0;
		padding: 6px;
		list-style: none;
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-md);
		box-shadow: var(--sh-pop);

		li {
			list-style: none;
		}
		li button {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			text-align: left;
			padding: 10px 12px;
			font-size: 14px;
			font-family: inherit;
			color: var(--c-text-nav);
			background: transparent;
			border: none;
			border-radius: var(--r-xs);
			cursor: pointer;
			transition: background 0.12s ease, color 0.12s ease;

			&:hover {
				background: var(--c-green-tint);
				color: var(--c-primary);
			}
		}
		li.selected button {
			color: var(--c-primary);
			font-weight: 600;
			background: var(--c-green-tint);

			&::after {
				content: '';
				width: 15px;
				height: 15px;
				flex: none;
				background: no-repeat center / contain
					url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%233a5a40' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
			}
		}
	}

	/* Custom dropdown only on devices with a precise pointer (mouse/trackpad).
	   Touch devices keep the native <select> so the OS shows its own picker. */
	@media (pointer: fine) {
		.select-native {
			display: none;
		}
		.select-custom {
			display: block;
			position: relative;
		}
	}
</style>
