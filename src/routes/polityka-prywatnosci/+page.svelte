<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const sections = [
		{
			title: 'Administrator danych osobowych',
			body: [
				'Administratorem Twoich danych osobowych jest LW Nieruchomości z siedzibą w Jeleniej Górze (58-500). Dbamy o to, aby Twoje dane były przetwarzane w sposób bezpieczny, przejrzysty i zgodny z obowiązującymi przepisami.'
			]
		},
		{
			title: 'Kontakt w sprawach danych',
			body: [
				'We wszystkich sprawach związanych z przetwarzaniem danych osobowych możesz skontaktować się z nami:'
			],
			contacts: true
		},
		{
			title: 'Jakie dane przetwarzamy',
			body: [
				'Gromadzimy dane, które przekazujesz nam dobrowolnie za pośrednictwem formularzy kontaktowych oraz podczas bezpośredniego kontaktu, tj. imię, nazwisko, adres e-mail oraz numer telefonu.'
			]
		},
		{
			title: 'Podstawy prawne przetwarzania',
			body: [
				'Przetwarzanie danych odbywa się w oparciu o Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO), na następujących podstawach:'
			],
			list: [
				'Twojej zgody — art. 6 ust. 1 lit. a RODO,',
				'prawnie uzasadnionych interesów administratora — art. 6 ust. 1 lit. f RODO.'
			]
		},
		{
			title: 'Cele przetwarzania',
			body: ['Twoje dane wykorzystujemy w celu:'],
			list: [
				'udzielania odpowiedzi na zapytania i prowadzenia korespondencji,',
				'komunikacji marketingowej oraz wysyłania biuletynów,',
				'badania preferencji i potrzeb klientów,',
				'ewentualnego rozstrzygania sporów.'
			]
		},
		{
			title: 'Odbiorcy danych',
			body: [
				'Twoje dane mogą być udostępniane wyłącznie zaufanym podmiotom: partnerskim biurom nieruchomości, dostawcom usług IT i obsługi telefonicznej, agencjom marketingowym oraz organom uprawnionym na podstawie przepisów prawa.'
			]
		},
		{
			title: 'Twoje prawa',
			body: ['W związku z przetwarzaniem danych masz prawo do:'],
			list: [
				'dostępu do swoich danych oraz ich sprostowania,',
				'żądania usunięcia lub ograniczenia przetwarzania,',
				'wycofania zgody w dowolnym momencie,',
				'wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.'
			]
		},
		{
			title: 'Polityka cookies',
			body: [
				'Nasza strona wykorzystuje pliki cookies w celach funkcjonalnych, personalizacyjnych, marketingowych oraz analitycznych. Możesz zarządzać plikami cookies z poziomu ustawień swojej przeglądarki.'
			]
		}
	];
</script>

<svelte:head>
	<title>Polityka prywatności — LW Nieruchomości</title>
	<meta
		name="description"
		content="Polityka prywatności LW Nieruchomości — zasady przetwarzania danych osobowych zgodnie z RODO."
	/>
</svelte:head>

<Navbar />

<main>
	<section class="policy-hero">
		<div class="container">
			<div class="eyebrow">Informacje prawne</div>
			<h1 class="h-page">Polityka prywatności</h1>
			<p class="lead">
				Twoja prywatność jest dla nas ważna. Poniżej wyjaśniamy, jakie dane zbieramy, w jakim celu i
				jakie masz prawa — prosto i po ludzku.
			</p>
			<span class="updated">Ostatnia aktualizacja: lipiec 2026</span>
		</div>
	</section>

	<section class="policy-body">
		<div class="container policy-grid">
			<article class="policy-content">
				{#each sections as section, i}
					<section class="policy-section" id={`sekcja-${i + 1}`}>
						<div class="section-num">{String(i + 1).padStart(2, '0')}</div>
						<div class="section-text">
							<h2>{section.title}</h2>
							{#each section.body as p}
								<p>{p}</p>
							{/each}

							{#if section.contacts}
								<div class="contact-card">
									<a href="mailto:biuro@lw.nieruchomosci.pl">
										<span class="dot"></span>biuro@lw.nieruchomosci.pl
									</a>
									<a href="tel:+48690008273"><span class="dot"></span>+48 690 008 273</a>
									<span class="addr"><span class="dot"></span>58-500 Jelenia Góra</span>
								</div>
							{/if}

							{#if section.list}
								<ul>
									{#each section.list as item}
										<li>{item}</li>
									{/each}
								</ul>
							{/if}
						</div>
					</section>
				{/each}
			</article>
		</div>
	</section>
</main>

<Footer />

<style lang="scss">
	.container {
		width: 100%;
		max-width: 1180px;
		margin-inline: auto;
	}

	.policy-hero {
		padding: clamp(48px, 6vw, 88px) clamp(20px, 4vw, 52px) clamp(32px, 4vw, 48px);
		background: linear-gradient(135deg, #efe9d9 0%, #f6f1e7 60%, #faf7f0 100%);
		border-bottom: 1px solid var(--c-border);

		.h-page {
			margin: 12px 0 18px;
		}
		.lead {
			max-width: 60ch;
		}
	}
	.updated {
		display: inline-block;
		margin-top: 20px;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		color: var(--c-subtle);
	}

	.policy-body {
		padding: clamp(40px, 5vw, 72px) clamp(20px, 4vw, 52px) clamp(56px, 6vw, 96px);
	}
	.policy-content {
		max-width: 760px;
	}

	.policy-section {
		display: flex;
		gap: 24px;
		padding: 28px 0;
		border-top: 1px solid var(--c-border);

		&:first-child {
			border-top: none;
			padding-top: 0;
		}
	}
	.section-num {
		flex: none;
		font-family: var(--font-serif);
		font-size: 20px;
		font-weight: 500;
		color: var(--c-gold);
		line-height: 1.4;
		width: 40px;
	}
	.section-text {
		h2 {
			font-family: var(--font-serif);
			font-size: clamp(20px, 2.4vw, 26px);
			font-weight: 500;
			letter-spacing: -0.01em;
			color: var(--c-text);
			margin: 0 0 12px;
		}
		p {
			font-size: 15.5px;
			line-height: 1.7;
			color: var(--c-muted);
			margin: 0 0 12px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		ul {
			margin: 4px 0 0;
			padding: 0;
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: 9px;
		}
		li {
			position: relative;
			padding-left: 20px;
			font-size: 15.5px;
			line-height: 1.6;
			color: var(--c-muted);

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 9px;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background: var(--c-gold);
			}
		}
	}

	.contact-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 4px;
		padding: 20px 22px;
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--r-lg);

		a,
		.addr {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 15px;
			color: var(--c-text);
		}
		a:hover {
			color: var(--c-primary);
		}
		.dot {
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: var(--c-gold);
			flex: none;
		}
	}

	@media (max-width: 560px) {
		.policy-section {
			flex-direction: column;
			gap: 8px;
		}
		.section-num {
			width: auto;
			font-size: 16px;
		}
	}
</style>
