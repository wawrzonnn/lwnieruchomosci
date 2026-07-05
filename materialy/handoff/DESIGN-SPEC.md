# LW Nieruchomości — Design Spec (handoff dla SvelteKit + SCSS)

Ten pakiet to **źródło prawdy** dla wyglądu strony. Makieta HTML pokazuje docelowy efekt, a pliki SCSS zawierają dokładne wartości (kolory, typografia, odstępy, cienie, promienie) i wzorcowe style komponentów.

## Zawartość paczki

```
handoff/
├─ DESIGN-SPEC.md          ← ten plik
├─ BRIEF-dla-programisty.md← zakres funkcjonalny (co budujemy)
├─ makieta.html            ← klikalna makieta (wzorzec 1:1)
├─ scss/
│  ├─ _tokens.scss         ← kolory, spacing, radius, cienie, breakpointy (CSS vars + $scss)
│  ├─ _typography.scss     ← fonty, skala, mixiny nagłówków
│  ├─ _mixins.scss         ← container, section, card-grid, photo-placeholder
│  ├─ _components.scss     ← button, input, badge, karta oferty, sekcja, panel
│  └─ main.scss            ← import + reset (punkt wejścia)
└─ icons/                  ← ikony kategorii (SVG, stroke=currentColor)
   ├─ mieszkania.svg  domy.svg  dzialki.svg  lokale.svg
```

## Jak to podłączyć w SvelteKit

1. Skopiuj `scss/` do np. `src/lib/styles/`.
2. W `src/routes/+layout.svelte` zaimportuj globalnie:
   ```svelte
   <script>import '$lib/styles/main.scss';</script>
   ```
3. Fonty: `<link>` z `_typography.scss` przenieś do `src/app.html` (szybciej niż `@import`).
4. Tokeny są jako **CSS custom properties** (`var(--c-primary)`) — używaj ich wszędzie; zmienne `$scss` są do `@media` i obliczeń.
5. Ikony traktuj jako komponenty inline-SVG (dziedziczą kolor przez `currentColor`).

---

## Fundament wizualny (must-have — tu najczęściej "nie wychodzi")

**Klimat:** ciepły, lokalny, przytulny. Kremowe tła (NIE czysta biel), zieleń butelkowa jako akcent, drobne złote/drewniane detale. Zero zimnego #fff, zero jaskrawych gradientów, zero ostrych korporacyjnych niebieskości.

- **Tło strony to `--c-bg-page` (#f6f1e7)**, nie białe. Karty są jaśniejsze (`--c-surface` #fffdf8) — kontrast jest subtelny i to jest zamierzone.
- **Naprzemienny rytm sekcji:** część sekcji na tle `--c-bg-alt` (#f1ead9) z obrysem góra/dół; pasek statystyk na ciemnym `--c-dark-band`; stopka `--c-footer`.
- **Typografia robi 80% klimatu:** nagłówki ZAWSZE serif (Newsreader), waga 500 (nie bold), z ujemnym letter-spacing -.01em. Jedno słowo w H1 hero jest *kursywą* w kolorze zieleni (`<em>`). Treść = Figtree.
- **Etykieta sekcji (eyebrow):** UPPERCASE 12px, `letter-spacing:.14em`, poprzedzona krótką **złotą kreską** 22×1.5px. To powtarzalny motyw — użyj mixina `@include eyebrow`.
- **Detale-akcenty:** mała **złota kropka** (6px, `--c-gold`) przed lokalizacją w kartach i przy danych kontaktowych.

## Skala i odstępy

- Kontener treści: `max-width: 1180px`, wyśrodkowany.
- Rytm sekcji (pionowo/poziomo) jest **fluid** przez `clamp()` — patrz `$section-py` / `$section-px`. Nie zastępuj sztywnymi wartościami.
- Promienie: karty 16px, duże bloki/CTA 18–22px, pola 11px, pill 999px.
- Cienie są **ciepłe i miękkie** (brązowawa poświata `rgba(60,44,20,...)`, nie szara/czarna). Używaj `--sh-*`.

## Siatki i responsywność

Makieta reflowuje się **bez media queries** — kluczowy wzorzec do skopiowania:

```scss
@include card-grid(290px, 22px);
// = grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
```

- Karty ofert / kategorie / features: `auto-fit` + `minmax` → same się układają 1→2→3→4 kolumny.
- Hero, "O nas", Kontakt: `display:flex; flex-wrap:wrap` z `flex: 1 1 <base>` na kolumnach → zawijają się na mobile.
- Nagłówek: pełne menu na desktop, hamburger na mobile (breakpoint ~`$bp-md`).
- Panel: sidebar 236px na desktop, zwężony do 62px (same ikony) poniżej `$bp-md`.

## Komponenty — anatomia (patrz `_components.scss`)

- **Przyciski:** `.btn--primary` (zielony wypełniony, pill), `.btn--ghost` (obrys `--c-border-btn`), `.btn--light` (jasny na zielonym CTA), `.btn--block` (formularze).
- **Karta oferty (`.offer`):** media 4:3 + badge (lewy-górny) + typ (prawy-górny) → body: lokalizacja z kropką → tytuł serif → cena serif zielona (opcjonalnie `<del>` stara cena) → pasek specs (metraż · pokoje) nad górnym obrysem. Hover: unieś o 3px + mocniejszy cień.
- **Badge/statusy:** warianty w `.badge--*`. Statusy panelu: aktywna (zielona), na wyłączność (złota), szkic (szara), nowe (terakota), w toku (fiolet).
- **Kafel ikony kategorii (`.icon-tile`):** 52px, tło `--c-green-tint`, ikona line 26px stroke `--c-primary`.
- **Pola formularza:** tło `--c-field`, obrys `--c-border-field`, focus = zielony obrys + delikatny glow. `.select` ma własną strzałkę (inline-SVG w tle).

## Mapowanie sekcji strony (kolejność na `/`)

1. Header (sticky, półprzezroczysty, blur)
2. Hero — nagłówek + wyszukiwarka + zdjęcie + pasek zaufania
3. Kategorie (4 kafle z ikonami + liczniki)
4. Polecane oferty (`--alt`) — siatka kart + "Zobacz wszystkie"
5. O nas / historia — zdjęcie + tekst + liczby
6. Pasek statystyk (`--dark`)
7. Region Karkonosze / dlaczego my — 4 kafle
8. Opinie klientów (`--alt`)
9. CTA — dwa bloki ("Zgłoś ofertę" / "Zgłoś czego szukasz")
10. Kontakt + mapa (dane + formularz + placeholder mapy)
11. Stopka (`--footer`)

Podstrony: `/oferty` (filtry + siatka), `/oferta/[slug]` (galeria + parametry + opis + karta agenta). Panel: `/panel` (logowanie → oferty / dodaj / użytkownicy / zgłoszenia).

## Częste błędy do uniknięcia

- ❌ Białe (#fff) tło i szare cienie → gubi ciepły klimat. Trzymaj się tokenów.
- ❌ Nagłówki sans-serif lub bold 700 → mają być serif, waga 500.
- ❌ Sztywne kolumny / brak reflow → używaj `card-grid` i `flex-wrap`.
- ❌ Pomijanie eyebrow ze złotą kreską i kropek przy lokalizacji → to spójny motyw marki.
- ❌ Ostre pill-badge w mocnych kolorach → statusy są pastelowe (tło jasne, tekst nasycony).

W razie wątpliwości: **otwórz `makieta.html` i porównaj 1:1.**
