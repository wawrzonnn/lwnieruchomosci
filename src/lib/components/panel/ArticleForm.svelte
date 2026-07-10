<script lang="ts">
	import { enhance } from '$app/forms';
	import Select from '$lib/components/Select.svelte';
	import type { Article } from '@prisma/client';
	import { BLOK_LABELS, type Blok } from '$lib/blog/types';

	let { article, error }: { article?: Article; error?: string } = $props();

	// ── Pola tekstowe / meta ──
	let title = $state(article?.title ?? '');
	let titleEmphasis = $state(article?.titleEmphasis ?? '');
	let category = $state(article?.category ?? 'Rynek');
	let excerpt = $state(article?.excerpt ?? '');
	let lead = $state(article?.lead ?? '');
	let readTime = $state(article?.readTime ?? '');
	let coverImage = $state(article?.coverImage ?? '');
	let coverAlt = $state(article?.coverAlt ?? '');
	let coverCaption = $state(article?.coverCaption ?? '');
	let authorName = $state(article?.authorName ?? 'Lidia Wolańska');
	let authorRole = $state(article?.authorRole ?? 'Właścicielka biura · LW Nieruchomości');
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
				return { typ: 'sekcja', id: '', naglowek2: '' };
			case 'akapit':
				return { typ: 'akapit', html: '', dropCap: false };
			case 'cytat':
				return { typ: 'cytat', tekst: '', autor: '' };
			case 'lista':
				return { typ: 'lista', pozycje: [{ mocne: '', reszta: '' }] };
			case 'zdjecie':
				return { typ: 'zdjecie', src: '', alt: '', podpis: '' };
			case 'statystyki':
				return { typ: 'statystyki', uwaga: '', pozycje: [{ wartosc: '', opis: '' }] };
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
	function addItem(b: Extract<Blok, { typ: 'lista' }> | Extract<Blok, { typ: 'statystyki' }>) {
		if (b.typ === 'lista') b.pozycje = [...b.pozycje, { mocne: '', reszta: '' }];
		else b.pozycje = [...b.pozycje, { wartosc: '', opis: '' }];
	}
	function removeItem(
		b: Extract<Blok, { typ: 'lista' }> | Extract<Blok, { typ: 'statystyki' }>,
		j: number
	) {
		b.pozycje = b.pozycje.filter((_, idx: number) => idx !== j) as never;
	}

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

	const ADD_BUTTONS: Blok['typ'][] = ['sekcja', 'akapit', 'lista', 'cytat', 'zdjecie', 'statystyki'];
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
								{ value: 'Rynek', label: 'Rynek' },
								{ value: 'Sprzedaż', label: 'Sprzedaż' },
								{ value: 'Kupno', label: 'Kupno' },
								{ value: 'Kredyty', label: 'Kredyty' },
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
								<input class="input" placeholder="Nagłówek sekcji (H2)" bind:value={block.naglowek2} />
							{:else if block.typ === 'akapit'}
								<textarea class="input" rows="4" placeholder="Treść akapitu (dozwolone &lt;strong&gt; i &lt;a href&gt;)" bind:value={block.html}></textarea>
								<label class="inline-check">
									<input type="checkbox" bind:checked={block.dropCap} /> inicjał (duża pierwsza litera)
								</label>
							{:else if block.typ === 'cytat'}
								<textarea class="input" rows="2" placeholder="Treść cytatu" bind:value={block.tekst}></textarea>
								<input class="input" placeholder="Autor cytatu" bind:value={block.autor} />
							{:else if block.typ === 'lista'}
								{#each block.pozycje as _, j}
									<div class="item-row">
										<input class="input item-strong" placeholder="Wyróżnienie" bind:value={block.pozycje[j].mocne} />
										<input class="input" placeholder="Opis pozycji" bind:value={block.pozycje[j].reszta} />
										<button type="button" class="btn-icon danger" onclick={() => removeItem(block, j)}>×</button>
									</div>
								{/each}
								<button type="button" class="btn-add-item" onclick={() => addItem(block)}>+ pozycja</button>
							{:else if block.typ === 'zdjecie'}
								<div class="img-row">
									<input class="input" placeholder="URL zdjęcia (np. Unsplash) lub prześlij →" bind:value={block.src} />
									<label class="btn-upload">
										{uploading === `img-${i}` ? '…' : 'Prześlij'}
										<input type="file" accept="image/*" hidden onchange={(e) => uploadInto(`img-${i}`, (u) => (block.src = u), e)} />
									</label>
								</div>
								{#if block.src}<img class="img-preview" src={block.src} alt="" />{/if}
								<input class="input" placeholder="Opis alternatywny (alt)" bind:value={block.alt} />
								<input class="input" placeholder="Podpis pod zdjęciem" bind:value={block.podpis} />
							{:else if block.typ === 'statystyki'}
								<input class="input" placeholder="Uwaga / przypis pod statystykami" bind:value={block.uwaga} />
								{#each block.pozycje as _, j}
									<div class="item-row">
										<input class="input item-strong" placeholder="Wartość (np. „~45 dni”)" bind:value={block.pozycje[j].wartosc} />
										<input class="input" placeholder="Opis" bind:value={block.pozycje[j].opis} />
										<button type="button" class="btn-icon danger" onclick={() => removeItem(block, j)}>×</button>
									</div>
								{/each}
								<button type="button" class="btn-add-item" onclick={() => addItem(block)}>+ statystyka</button>
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
		grid-template-columns: minmax(90px, 0.5fr) 1fr auto;
		gap: 6px;
		align-items: center;
	}
	.item-strong {
		font-weight: 600;
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
	.img-preview {
		width: 100%;
		max-height: 160px;
		object-fit: cover;
		border-radius: var(--r-sm);
		border: 1px solid var(--c-border);
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
