<script lang="ts">
	import logo from '$lib/assets/lw-logo.png';
	import { kontakt } from '$lib/data/landing';
	import { godziny, social } from '$lib/data/kontakt-strona';
</script>

<footer class="footer">
	<div class="footer-grid">
		<div>
			<div class="footer-brand">
				<img class="footer-logo" src={logo} alt="LW Nieruchomości" />
				<span class="footer-name">LW Nieruchomości</span>
			</div>
			<p class="footer-desc">
				Mobilne biuro nieruchomości z sercem do ludzi i domów. Jelenia Góra i Kotlina Jeleniogórska.
			</p>
			<div class="footer-social">
				{#each social as s}
					<a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.nazwa}>{s.znak}</a>
				{/each}
			</div>
		</div>
		<div class="footer-col">
			<div class="footer-col-title">Nawigacja</div>
			<a href="/">Strona główna</a><a href="/oferty">Oferty</a><a href="/o-nas">O nas</a><a
				href="/blog">Blog</a
			><a href="/kontakt">Kontakt</a>
		</div>
		<div class="footer-col">
			<div class="footer-col-title">Usługi</div>
			<a href="/sprzedaz-nieruchomosci">Sprzedaż nieruchomości</a><a href="/kupno-nieruchomosci"
				>Kupno nieruchomości</a
			><a href="/wycena-nieruchomosci">Wycena nieruchomości</a><a href="/marketing-nieruchomosci"
				>Marketing nieruchomości</a
			><a href="/doradztwo-kredytowe">Doradztwo kredytowe</a>
		</div>
		<div class="footer-col muted">
			<div class="footer-col-title">Kontakt</div>
			<span>{kontakt.telefon}</span><span>{kontakt.email}</span><span>{kontakt.adres}</span>
			<div class="footer-hours">
				{#each godziny as g}
					<div class="footer-hours-row"><span>{g.d}</span><span>{g.h}</span></div>
				{/each}
			</div>
		</div>
	</div>
	<div class="footer-bottom">
		<span>© 2026 LW Nieruchomości. Wszelkie prawa zastrzeżone.</span>
		<a href="/polityka-prywatnosci">Polityka prywatności</a>
	</div>
</footer>

<style>
	.footer {
		background: var(--green-ink);
		color: #cfcbbe;
		padding: 52px 48px 34px;
	}
	.footer-grid {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr 1fr;
		gap: 40px;
	}
	.footer-brand {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}
	.footer-logo {
		width: 42px;
		height: 42px;
		object-fit: contain;
		flex-shrink: 0;
	}
	.footer-name {
		font-family: 'Newsreader', serif;
		font-size: 18px;
		color: #fff;
	}
	.footer-desc {
		font-size: 14px;
		line-height: 1.6;
		color: #8f8b7e;
		max-width: 280px;
	}
	.footer-social {
		display: flex;
		gap: 10px;
		margin-top: 16px;
	}
	.footer-social a {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: rgba(233, 209, 154, 0.1);
		border: 1px solid rgba(233, 209, 154, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		color: var(--gold-light, #e9c8a2);
	}
	.footer-social a:hover {
		background: rgba(233, 209, 154, 0.2);
		color: var(--gold-light, #e9c8a2);
	}
	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 9px;
		font-size: 14px;
	}
	.footer-col-title {
		color: #fff;
		font-weight: 600;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.footer-col a:hover {
		color: #fff;
	}
	.footer-col.muted {
		color: #8f8b7e;
	}
	.footer-hours {
		margin-top: 6px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.footer-hours-row {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-size: 13px;
	}
	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		border-top: 1px solid var(--green-border, #363a2e);
		margin-top: 34px;
		padding-top: 20px;
		font-size: 13px;
		color: #7c7869;
	}
	.footer-bottom a:hover {
		color: #cfcbbe;
	}

	@media (max-width: 980px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 640px) {
		.footer {
			padding-left: 20px;
			padding-right: 20px;
		}
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 16px;
		}
		.footer-grid > div:first-child,
		.footer-col.muted {
			grid-column: 1 / -1;
		}
	}
</style>
