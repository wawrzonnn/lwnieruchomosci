<script lang="ts">
	import { enhance } from '$app/forms';
	import Select from '$lib/components/Select.svelte';
	import type { Article } from '@prisma/client';
	import { BLOK_LABELS, type Blok } from '$lib/blog/types';

	let { article, error }: { article?: Article; error?: string } = $props();

	// ── Pola tekstowe / meta ──
	let title = $state(article?.title ?? '');
	let titleEmphasis = $state(article?.titleEmphasis ?? '');
	let category = $state(article?.category ?? 'Porady');
	let excerpt = $state(article?.excerpt ?? '');
	let lead = $state(article?.lead ?? '');
	let readTime = $state(article?.readTime ?? '');
	let coverImage = $state(article?.coverImage ?? '');
	let coverAlt = $state(article?.coverAlt ?? '');
	let coverCaption = $state(article?.coverCaption ?? '');
	let authorName = $state(article?.authorName ?? 'Lucyna Wojtoń');
	let authorRole = $state(article?.authorRole ?? 'Pośredniczka w obrocie nieruchomościami');
	let authorInitials = $state(article?.authorInitials ?? '');
	let authorBio = $state(article?.authorBio ?? '');
	let seoTitle = $state(article?.seoTitle ?? '');
	let seoDescription = $state(article?.seoDescription ?? '');
	let ogImage = $state(article?.ogImage ?? '');
	let featured = $state(article?.featured ?? false);

	function toDateInput(d: Date | string | null | undefined) {
		if (!d) return '';
		const dt = typeof d === 'string' ? new Date(d) : d;
		if (Number.isNaN(dt.getTime())) return '';
		return dt.toISOString().slice(0, 10);
	}
	let publishedAt = $state(toDateInput(article?.publishedAt));

	// ── Tagi ──
	let tags = $state<string[]>(article?.tags ? [...article.tags] : []);
	let tagInput = $state('');
	function addTag() {
		const t = tagInput.trim();
		if (t && !tags.includes(t)) tags = [...tags, t];
		tagInput = '';
	}
	function removeTag(t: string) {
		tags = tags.filter((x) => x !== t);
	}

	// ── Bloki treści ──
	let blocks = $state<Blok[]>(
		Array.isArray(article?.content) ? structuredClone(article!.content as unknown as Blok[]) : []
	);

	function newBlock(typ: Blok['typ']): Blok {
		switch (typ) {
			case 'sekcja':
				return { typ: 'sekcja', id: '', tocLabel: '', numer: '', naglowek: '', akapity: [''], dropCap: false };
			case 'lista':
				return { typ: 'lista', id: '', tocLabel: '', naglowek: '', wstep: '', punkty: [''] };
			case 'bledy':
				return { typ: 'bledy', id: '', tocLabel: '', naglowek: '', punkty: [''] };
			case 'podsumowanie':
				return { typ: 'podsumowanie', id: '', tocLabel: '', naglowek: '', akapity: [''] };
			case 'cytat':
				return { typ: 'cytat', tekst: '', autor: '' };
		}
	}
	function addBlock(typ: Blok['typ']) {
		blocks = [...blocks, newBlock(typ)];
	}
	function removeBlock(i: number) {
		blocks = blocks.filter((_, idx) => idx !== i);
	}
	function moveBlock(i: number, dir: -1 | 1) {
		const j = i + dir;
		if (j < 0 || j >= blocks.length) return;
		const copy = [...blocks];
		[copy[i], copy[j]] = [copy[j], copy[i]];
		blocks = copy;
	}
	// Edycja list tekstowych bloku (akapity / punkty).
	function addLine(b: Blok, field: 'akapity' | 'punkty') {
		const arr = (b as Record<string, unknown>)[field] as string[] | undefined;
		(b as Record<string, unknown>)[field] = [...(arr ?? []), ''];
	}
	function removeLine(b: Blok, field: 'akapity' | 'punkty', j: number) {
		const arr = (b as Record<string, unknown>)[field] as string[] | undefined;
		(b as Record<string, unknown>)[field] = (arr ?? []).filter((_, idx) => idx !== j);
	}

	// Box „W skrócie" — punkty jako tekst (jeden na linię).
	let summaryText = $state(article?.summaryPoints?.join('\n') ?? '');

	const blocksJson = $derived(JSON.stringify(blocks));
	const tagsJson = $derived(JSON.stringify(tags));

	// ── Upload zdjęć (cover + bloki zdjecie) ──
	let uploading = $state('');
	async function uploadInto(key: string, setter: (url: string) => void, e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const files = input.files;
		if (!files?.length) return;
		uploading = key;
		try {
			const fd = new FormData();
			for (const f of files) fd.append('files', f);
			const res = await fetch('/api/uploads', { method: 'POST', body: fd });
			if (res.ok) {
				const { urls } = await res.json();
				if (urls?.[0]) setter(urls[0]);
			}
		} finally {
			uploading = '';
			input.value = '';
		}
	}

	const ADD_BUTTONS: Blok['typ'][] = ['sekcja', 'lista', 'bledy', 'podsumowanie', 'cytat'];
</script>

<form method="POST" use:enhance class="article-form">
	<input type="hidden" name="content" value={blocksJson} />
	<input type="hidden" name="tags" value={tagsJson} />

	{#if error}<div class="form-alert">{error}</div>{/if}

	<div class="form-layout">
		<!-- ── GŁÓWNA KOLUMNA ── -->
		<div class="form-main">
			<section class="card">
				<h2 class="card-title">Podstawowe informacje</h2>
				<div class="grid">
					<label class="field span-2">
						<span class="field__label">Tytuł artykułu</span>
						<input class="input" name="title" bind:value={title} required />
					</label>
					<label class="field span-2">
						<span class="field__label">Wyróżnione słowo w tytule (złoty akcent w H1)</span>
						<input class="input" name="titleEmphasis" bind:value={titleEmphasis} placeholder="np. „trendy 2026”" />
					</label>
					<label class="field">
						<span class="field__label">Kategoria</span>
						<Select
							name="category"
							bind:value={category}
							options={[
								{ value: 'Sprzedaż', label: 'Sprzedaż' },
								{ value: 'Wycena', label: 'Wycena' },
								{ value: 'Marketing', label: 'Marketing' },
								{ value: 'Porady', label: 'Porady' }
							]}
						/>
					</label>
					<label class="field">
						<span class="field__label">Czas czytania</span>
						<input class="input" name="readTime" bind:value={readTime} placeholder="np. „5 min czytania”" />
					</label>
					<label class="field">
						<span class="field__label">Data publikacji</span>
						<input class="input" type="date" name="publishedAt" bind:value={publishedAt} />
					</label>
					<label class="field checkbox-field">
						<input type="checkbox" name="featured" bind:checked={featured} />
						<span>Wyróżniony (duża karta na górze bloga)</span>
					</label>
					<label class="field span-2">
						<span class="field__label">Zajawka (na liście /blog)</span>
						<textarea class="input" name="excerpt" rows="2" bind:value={excerpt} required></textarea>
					</label>
					<label class="field span-2">
						<span class="field__label">Lead (wprowadzenie pod tytułem)</span>
						<textarea class="input" name="lead" rows="3" bind:value={lead}></textarea>
						</label>
						<label class="field span-2">
							<span class="field__label">W skrócie (kluczowe punkty nad treścią — jeden na linię, opcjonalne)</span>
							<textarea class="input" name="summaryPoints" rows="4" bind:value={summaryText}></textarea>
					</label>
				</div>
			</section>

			<!-- ── EDYTOR BLOKÓW ── -->
			<section class="card">
				<h2 class="card-title">Treść artykułu</h2>

				{#if !blocks.length}
					<p class="editor-empty">Dodaj pierwszy blok treści przyciskami poniżej.</p>
				{/if}

				<div class="blocks">
					{#each blocks as block, i (block)}
						<div class="block">
							<div class="block-head">
								<span class="block-type">{BLOK_LABELS[block.typ]}</span>
								<div class="block-tools">
									<button type="button" class="btn-icon" title="W górę" disabled={i === 0} onclick={() => moveBlock(i, -1)}>↑</button>
									<button type="button" class="btn-icon" title="W dół" disabled={i === blocks.length - 1} onclick={() => moveBlock(i, 1)}>↓</button>
									<button type="button" class="btn-icon danger" title="Usuń blok" onclick={() => removeBlock(i)}>×</button>
								</div>
							</div>

							{#if block.typ === 'sekcja'}
								<div class="num-row">
									<input class="input" placeholder="Nr (np. 01)" bind:value={block.numer} />
									<input class="input" placeholder="Nagłówek sekcji (H2)" bind:value={block.naglowek} />
								</div>
								<input class="input" placeholder="Etykieta w spisie treści (opcjonalnie — domyślnie nagłówek)" bind:value={block.tocLabel} />
								{#each block.akapity as _, j}
									<div class="item-row">
										<textarea class="input" rows="3" placeholder="Akapit (dozwolone &lt;strong&gt; i &lt;a href&gt;)" bind:value={block.akapity[j]}></textarea>
										<button type="button" class="btn-icon danger" onclick={() => removeLine(block, 'akapity', j)}>×</button>
									</div>
								{/each}
								<button type="button" class="btn-add-item" onclick={() => addLine(block, 'akapity')}>+ akapit</button>
								<label class="inline-check">
									<input type="checkbox" bind:checked={block.dropCap} /> inicjał (duża pierwsza litera pierwszego akapitu)
								</label>
							{:else if block.typ === 'cytat'}
								<textarea class="input" rows="2" placeholder="Treść cytatu" bind:value={block.tekst}></textarea>
								<input class="input" placeholder="Autor cytatu" bind:value={block.autor} />
							{:else if block.typ === 'lista'}
								<input class="input" placeholder="Nagłówek listy (H2)" bind:value={block.naglowek} />
								<input class="input" placeholder="Etykieta w spisie treści (opcjonalnie)" bind:value={block.tocLabel} />
								<textarea class="input" rows="2" placeholder="Wstęp nad listą (opcjonalnie)" bind:value={block.wstep}></textarea>
								{#each block.punkty as _, j}
									<div class="item-row">
										<input class="input" placeholder="Punkt listy" bind:value={block.punkty[j]} />
										<button type="button" class="btn-icon danger" onclick={() => removeLine(block, 'punkty', j)}>×</button>
									</div>
								{/each}
								<button type="button" class="btn-add-item" onclick={() => addLine(block, 'punkty')}>+ punkt</button>
							{:else if block.typ === 'bledy'}
								<input class="input" placeholder="Nagłówek (np. Najczęstsze błędy)" bind:value={block.naglowek} />
								<input class="input" placeholder="Etykieta w spisie treści (opcjonalnie)" bind:value={block.tocLabel} />
								{#each block.punkty as _, j}
									<div class="item-row">
										<input class="input" placeholder="Błąd / punkt" bind:value={block.punkty[j]} />
										<button type="button" class="btn-icon danger" onclick={() => removeLine(block, 'punkty', j)}>×</button>
									</div>
								{/each}
								<button type="button" class="btn-add-item" onclick={() => addLine(block, 'punkty')}>+ punkt</button>
							{:else if block.typ === 'podsumowanie'}
								<input class="input" placeholder="Nagłówek (np. Podsumowanie)" bind:value={block.naglowek} />
								<input class="input" placeholder="Etykieta w spisie treści (opcjonalnie)" bind:value={block.tocLabel} />
								{#each block.akapity as _, j}
									<div class="item-row">
										<textarea class="input" rows="3" placeholder="Akapit (dozwolone &lt;strong&gt; i &lt;a href&gt;)" bind:value={block.akapity[j]}></textarea>
										<button type="button" class="btn-icon danger" onclick={() => removeLine(block, 'akapity', j)}>×</button>
									</div>
								{/each}
								<button type="button" class="btn-add-item" onclick={() => addLine(block, 'akapity')}>+ akapit</button>
							{/if}
						</div>
					{/each}
				</div>

				<div class="add-bar">
					{#each ADD_BUTTONS as typ}
						<button type="button" class="btn-add" onclick={() => addBlock(typ)}>+ {BLOK_LABELS[typ].split(' ')[0]}</button>
					{/each}
				</div>
			</section>
		</div>

		<!-- ── PANEL BOCZNY ── -->
		<aside class="form-side">
			<section class="card">
				<h2 class="card-title">Zdjęcie główne</h2>
				<div class="cover-preview" class:empty={!coverImage}>
					{#if coverImage}<img src={coverImage} alt="" />{/if}
				</div>
				<div class="img-row">
					<input class="input" placeholder="URL zdjęcia" bind:value={coverImage} />
					<label class="btn-upload">
						{uploading === 'cover' ? '…' : 'Prześlij'}
						<input type="file" accept="image/*" hidden onchange={(e) => uploadInto('cover', (u) => (coverImage = u), e)} />
					</label>
				</div>
				<input type="hidden" name="coverImage" value={coverImage} />
				<label class="field">
					<span class="field__label">Alt zdjęcia</span>
					<input class="input" name="coverAlt" bind:value={coverAlt} />
				</label>
				<label class="field">
					<span class="field__label">Podpis pod zdjęciem głównym</span>
					<input class="input" name="coverCaption" bind:value={coverCaption} />
				</label>
			</section>

			<section class="card">
				<h2 class="card-title">Tagi</h2>
				<div class="tag-input">
					<input
						class="input"
						bind:value={tagInput}
						placeholder="Dodaj tag + Enter"
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								addTag();
							}
						}}
					/>
					<button type="button" class="btn-add-item" onclick={addTag}>+</button>
				</div>
				{#if tags.length}
					<div class="tag-chips">
						{#each tags as t}
							<span class="tag-chip">{t}<button type="button" onclick={() => removeTag(t)}>×</button></span>
						{/each}
					</div>
				{/if}
			</section>

			<section class="card">
				<h2 class="card-title">Autor</h2>
				<label class="field">
					<span class="field__label">Imię i nazwisko</span>
					<input class="input" name="authorName" bind:value={authorName} />
				</label>
				<label class="field">
					<span class="field__label">Rola</span>
					<input class="input" name="authorRole" bind:value={authorRole} />
				</label>
				<label class="field">
					<span class="field__label">Inicjały (auto z imienia jeśli puste)</span>
					<input class="input" name="authorInitials" bind:value={authorInitials} maxlength="3" />
				</label>
				<label class="field">
					<span class="field__label">Bio</span>
					<textarea class="input" name="authorBio" rows="3" bind:value={authorBio}></textarea>
				</label>
			</section>

			<section class="card">
				<h2 class="card-title">SEO (opcjonalnie)</h2>
				<label class="field">
					<span class="field__label">Tytuł SEO</span>
					<input class="input" name="seoTitle" bind:value={seoTitle} placeholder="domyślnie: tytuł artykułu" />
				</label>
				<label class="field">
					<span class="field__label">Opis SEO</span>
					<textarea class="input" name="seoDescription" rows="2" bind:value={seoDescription} placeholder="domyślnie: zajawka"></textarea>
				</label>
				<label class="field">
					<span class="field__label">OG image (domyślnie zdjęcie główne)</span>
					<input class="input" name="ogImage" bind:value={ogImage} />
				</label>
			</section>
		</aside>
	</div>

	<div class="form-actions">
		<button type="submit" name="intent" value="draft" class="btn btn--ghost">Zapisz szkic</button>
		<button type="submit" name="intent" value="publish" class="btn btn--primary">Opublikuj</button>
	</div>
</form>

<style lang="scss">
	.article-form {
		max-width: 1200px;
	}
	.form-alert {
		background: #fdecea;
		border: 1px solid #f5c6c2;
		color: #a3271b;
		padding: 12px 16px;
		border-radius: var(--r-md);
		margin-bottom: 16px;
		font-size: 14px;
	}
	.form-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 320px;
		gap: 20px;
		align-items: start;
	}
	.form-main {
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-width: 0;
	}
	.form-side {
		display: flex;
		flex-direction: column;
		gap: 20px;
		position: sticky;
		top: 20px;
	}
	.card {
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-lg);
		padding: 22px;
	}
	.card-title {
		font-size: 15px;
		font-weight: 700;
		color: var(--c-text);
		margin: 0 0 16px;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}
	.span-2 {
		grid-column: 1 / -1;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.field__label {
		font-size: 12px;
		font-weight: 600;
		color: var(--c-subtle);
	}
	.checkbox-field {
		flex-direction: row;
		align-items: center;
		gap: 8px;
		font-size: 13.5px;
		color: var(--c-text);
	}
	:global(.article-form .input) {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid var(--c-border);
		border-radius: var(--r-sm);
		font-size: 14px;
		font-family: inherit;
		color: var(--c-text);
		background: var(--c-bg-alt);
	}
	:global(.article-form textarea.input) {
		resize: vertical;
	}

	/* ── Bloki ── */
	.editor-empty {
		font-size: 13.5px;
		color: var(--c-subtle);
		margin: 0 0 14px;
	}
	.blocks {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.block {
		border: 1px solid var(--c-border);
		border-radius: var(--r-md);
		padding: 14px;
		background: var(--c-bg-alt);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.block-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.block-type {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--c-primary);
	}
	.block-tools {
		display: flex;
		gap: 4px;
	}
	.btn-icon {
		width: 28px;
		height: 28px;
		border: 1px solid var(--c-border);
		background: var(--c-surface);
		border-radius: var(--r-sm);
		cursor: pointer;
		font-size: 14px;
		color: var(--c-muted);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		&:hover:not(:disabled) {
			background: var(--c-bg-alt);
			color: var(--c-text);
		}
		&:disabled {
			opacity: 0.35;
			cursor: default;
		}
		&.danger:hover {
			background: #fdecea;
			color: #a3271b;
			border-color: #f5c6c2;
		}
	}
	.inline-check {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12.5px;
		color: var(--c-subtle);
	}
	.item-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 6px;
		align-items: start;
	}
	.num-row {
		display: grid;
		grid-template-columns: minmax(80px, 110px) 1fr;
		gap: 6px;
		align-items: center;
	}
	.btn-add-item {
		align-self: flex-start;
		border: 1px dashed var(--c-border);
		background: none;
		color: var(--c-primary);
		font-size: 12.5px;
		font-weight: 600;
		padding: 6px 12px;
		border-radius: var(--r-sm);
		cursor: pointer;
		&:hover {
			background: var(--c-surface);
		}
	}
	.img-row {
		display: flex;
		gap: 6px;
	}
	.btn-upload {
		flex: none;
		display: inline-flex;
		align-items: center;
		padding: 0 14px;
		border: 1px solid var(--c-border);
		border-radius: var(--r-sm);
		font-size: 13px;
		font-weight: 600;
		color: var(--c-text);
		background: var(--c-bg-alt);
		cursor: pointer;
		white-space: nowrap;
		&:hover {
			background: var(--c-surface);
		}
	}
	.add-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 16px;
		padding-top: 16px;
		border-top: 1px solid var(--c-border);
	}
	.btn-add {
		border: 1px solid var(--c-border);
		background: var(--c-bg-alt);
		color: var(--c-text);
		font-size: 13px;
		font-weight: 600;
		padding: 8px 14px;
		border-radius: var(--r-pill);
		cursor: pointer;
		&:hover {
			background: var(--c-primary);
			color: #fff;
			border-color: var(--c-primary);
		}
	}

	/* ── Cover / tagi ── */
	.cover-preview {
		aspect-ratio: 16 / 10;
		border-radius: var(--r-sm);
		overflow: hidden;
		margin-bottom: 10px;
		background: repeating-linear-gradient(135deg, #efe7d6 0, #efe7d6 8px, #e6dcc7 8px, #e6dcc7 16px);
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.tag-input {
		display: flex;
		gap: 6px;
		margin-bottom: 10px;
	}
	.tag-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.tag-chip {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 12.5px;
		background: var(--c-bg-alt);
		border: 1px solid var(--c-border);
		border-radius: var(--r-pill);
		padding: 4px 6px 4px 10px;
		button {
			border: none;
			background: none;
			cursor: pointer;
			color: var(--c-subtle);
			font-size: 14px;
			line-height: 1;
			&:hover {
				color: #a3271b;
			}
		}
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 20px;
		position: sticky;
		bottom: 0;
		background: linear-gradient(to top, #f3ecdd 60%, transparent);
		padding: 14px 0 4px;
	}

	@media (max-width: 900px) {
		.form-layout {
			grid-template-columns: 1fr;
		}
		.form-side {
			position: static;
		}
	}
</style>
