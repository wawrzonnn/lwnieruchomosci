<script lang="ts">
	import logo from '$lib/assets/lw-logo.png';
</script>

<footer class="footer">
	<div class="container footer-grid">
		<div class="footer-brand">
			<div class="brand-row">
				<img class="brand-mark" src={logo} alt="LW Nieruchomości" />
				<strong>LW Nieruchomości</strong>
			</div>
			<p>Mobilne biuro nieruchomości z sercem do ludzi i domów. Jelenia Góra i Kotlina Jeleniogórska.</p>
			<div class="socials">
				<a href="https://www.facebook.com/profile.php?id=61564944833164" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
					</svg>
				</a>
				<a href="https://www.instagram.com/lw.nieruchomoscijg" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
						<rect x="2" y="2" width="20" height="20" rx="5" />
						<circle cx="12" cy="12" r="4" />
						<circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
					</svg>
				</a>
				<a href="https://www.tiktok.com/@lw.nieruchomosci" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
						<path d="M14 3v10.8a3.2 3.2 0 1 1-2.4-3.1" />
						<path d="M14 3c.4 2.4 2.2 4.2 4.6 4.5" />
					</svg>
				</a>
			</div>
		</div>

		<div class="footer-col">
			<h4>Nawigacja</h4>
			<a href="/">Strona główna</a>
			<a href="/oferty">Oferty</a>
			<a href="/#o-nas">O nas</a>
			<a href="/#kontakt">Kontakt</a>
			<a href="/panel" class="footer-highlight">Panel logowania</a>
		</div>

		<div class="footer-col">
			<h4>Kategorie</h4>
			<a href="/oferty?category=MIESZKANIE">Mieszkania</a>
			<a href="/oferty?category=DOM">Domy</a>
			<a href="/oferty?category=DZIALKA">Działki</a>
			<a href="/oferty?category=LOKAL">Lokale</a>
		</div>

		<div class="footer-col">
			<h4>Kontakt</h4>
			<a href="tel:+48690008273">+48 690 008 273</a>
			<a href="mailto:biuro@lw.nieruchomosci.pl">biuro@lw.nieruchomosci.pl</a>
			<span>58-506 Jelenia Góra</span>
		</div>
	</div>

	<div class="container footer-bottom">
		<span>© 2026 LW Nieruchomości. Wszelkie prawa zastrzeżone.</span>
		<a href="/polityka-prywatnosci">Polityka prywatności</a>
	</div>
</footer>

<style lang="scss">
	.footer {
		background: var(--c-footer);
		padding: 64px clamp(20px, 4vw, 52px) 0;
	}
	.footer-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		padding-bottom: 48px;
	}
	.footer-brand {
		flex: 1 1 280px;
		p {
			margin: 14px 0 18px;
			font-size: 14px;
			max-width: 320px;
			color: var(--c-dark-text-2);
		}
	}
	.brand-row {
		display: flex;
		align-items: center;
		gap: 10px;
		strong {
			font-family: var(--font-serif);
			font-size: 18px;
			font-weight: 500;
			color: #f3efe4;
		}
	}
	.brand-mark {
		width: 36px;
		height: 36px;
		object-fit: contain;
		flex-shrink: 0;
	}
	.socials {
		display: flex;
		gap: 6px;
		a {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			color: var(--c-green-soft);
			transition: all 0.15s ease;
			&:hover {
				color: var(--c-gold-light);
				background: var(--c-dark-elev);
			}
		}
	}

	.footer-col {
		flex: 1 1 150px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		h4 {
			font-family: var(--font-sans);
			font-size: 12px;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: var(--c-gold-light);
			margin-bottom: 4px;
		}
		a,
		span {
			font-size: 14.5px;
			color: var(--c-dark-text);
		}
		a:hover {
			color: var(--c-gold-light);
		}
		.footer-highlight {
			color: var(--c-gold-light);
		}
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px;
		padding: 20px 0;
		border-top: 1px solid var(--c-dark-border);
		font-size: 13px;
		color: var(--c-dark-text-3);
		a:hover {
			color: var(--c-gold-light);
		}
	}
</style>
