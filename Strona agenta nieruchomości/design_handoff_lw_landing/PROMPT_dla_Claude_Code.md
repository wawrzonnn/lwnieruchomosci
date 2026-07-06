# Prompt do wklejenia w Claude Code

Skopiuj poniższy tekst i wklej jako pierwszą wiadomość w Claude Code (w katalogu Twojego projektu SvelteKit). Do kontekstu dołącz cały folder `design_handoff_lw_landing/`.

---

Buduję landing page dla biura nieruchomości **LW Nieruchomości** (Jelenia Góra / Karkonosze) w **SvelteKit**. W folderze `design_handoff_lw_landing/` masz komplet referencji projektu. Odtwórz projekt **1:1** (hi-fi, pixel-perfect).

## Zanim zaczniesz — przeczytaj
1. `design_handoff_lw_landing/README.md` — pełna specyfikacja każdej sekcji (wymiary, kolory, typografia, interakcje). To źródło prawdy.
2. `design_handoff_lw_landing/reference/lw-landing-1a.html` — otwórz w przeglądarce; to dokładny docelowy wygląd i działająca interakcja usług. Podejrzyj też jego markup i tablice danych w `<script>` na dole.
3. `design_handoff_lw_landing/tokens/design-tokens.css` — zmienne CSS (kolory/typografia/odstępy/promienie/cienie).
4. `design_handoff_lw_landing/data/content.json` — cała treść i dane.
5. `design_handoff_lw_landing/data/images-manifest.md` — zdjęcia.

## Stack i konwencje
- **SvelteKit** (jeśli projekt jeszcze nie istnieje: `npm create svelte@latest`, wybierz Skeleton + TypeScript wg uznania).
- Routing: strona główna w `src/routes/+page.svelte`, layout w `src/routes/+layout.svelte`.
- Styl: **normalny CSS** ze zmiennymi z tokenów. Wklej zawartość `design-tokens.css` do globalnego `src/app.css` (zaimportowanego w `+layout.svelte`). Używaj `var(--...)` zamiast wklejać hexy na sztywno.
- Fonty: dodaj `@fontsource/newsreader` i `@fontsource/hanken-grotesk` (wagi: Newsreader 400/500/600 + italic; Hanken 400/500/600/700/800) albo link do Google Fonts w `app.html`.
- Zdjęcia lokalne: skopiuj `design_handoff_lw_landing/assets/*` do `static/` i odwołuj się `/sniezka-sunset.png` itd.
- Zdjęcia Unsplash (oferty/agentka/usługi) to **placeholdery** — na razie zostaw URL-e z `content.json`, ale przygotuj kod tak, by łatwo je podmienić na realne (dane z propsów/JSON, nie hardkod w markupie).

## Architektura komponentów
Rozbij stronę na komponenty w `src/lib/components/`:
- `Nav.svelte`, `Hero.svelte` (z `SearchBar.svelte` w środku), `TrustBar.svelte`
- `Categories.svelte` + `CategoryCard.svelte`
- `Offers.svelte` (chipy filtrów) + `OfferCard.svelte`
- `About.svelte`
- `Services.svelte` (interaktywne — patrz niżej) + `ServiceRow.svelte`
- `Region.svelte`, `Testimonials.svelte` + `TestimonialCard.svelte`
- `DualCta.svelte`, `Contact.svelte`, `Footer.svelte`
Dane wczytaj z `content.json` (skopiuj do `src/lib/content.json` lub `src/lib/data.ts`) i przekaż propsami. `+page.svelte` tylko składa sekcje.

## Kluczowe elementy (nie uprość ich!)
Klientka wybrała ten projekt m.in. za te detale — odwzoruj wiernie:
1. **Kafel kategorii** — zdjęcie + środkowy, przyciemniony pasek (`rgba(18,26,20,.44)` + blur, linie góra/dół) z nazwą (serif) i podtytułem transakcji.
2. **Karta oferty (duża)** — na zdjęciu **przyciemniany pasek na dole**: po lewej miasto+ulica, po prawej (za pionową kreską) cena + cena/m². Pod zdjęciem: podtytuł typu, tytuł (serif), **3 kolumny parametrów** między liniami, przycisk „Zobacz ofertę" na całą szerokość. Badge „Polecana"/„Na wyłączność", serduszko, strzałki galerii.
3. **Sekcja Usługi — interaktywna:** lista 6 usług po lewej; klik ustawia aktywną (stan `let active = 0`) i podmienia w panelu po prawej zdjęcie (`transition:opacity .3s`), tytuł, label „Usługa 0X" i długi opis; aktywny wiersz ma tło `#F5F1E7` + złotą lewą krawędź `3px #B4894C`.

## Design system (skrót — pełnia w tokenach)
- Zieleń `#2C4A38` (marka), złoto `#B4894C` / `#E9D19A` (akcent), tło `#FBF8F2`, karty białe.
- Nagłówki: **Newsreader** (serif, 500/600, italic do emfazy). Tekst/UI: **Hanken Grotesk**.
- Nadtytuły sekcji („eyebrow"): 12px, uppercase, `letter-spacing:.16em`, `#B4894C`.
- Promienie: pill 999px (przyciski/badge/chipy), karty 16–20px, pola/przyciski 12px.
- Kolejność sekcji: Nav → Hero(+wyszukiwarka) → Trust → Kategorie → Oferty → O nas → Usługi → Region → Opinie → Dual CTA → Kontakt+mapa → Stopka.

## Responsywność
Mock jest desktopowy (1440px). Zamień sztywną szerokość na `max-width:1440px; margin:0 auto` + płynne paddingi i dodaj breakpointy (patrz sekcja „Responsywność" w README): tablet — kolumny 2; mobile — 1 kolumna, nav→hamburger, wyszukiwarka pod hero, mniejszy H1.

## Kolejność pracy
1. Setup: tokeny do `app.css`, fonty, `content.json` do `src/lib`, zdjęcia do `static/`.
2. Zbuduj sekcje od góry (Nav → …) jako komponenty, pixel-perfect na desktopie, porównując z `reference/lw-landing-1a.html`.
3. Dodaj interakcję Usług.
4. Dodaj responsywność.
5. Na końcu: sprawdź, że wygląd zgadza się 1:1 z referencją.

Pytaj, jeśli coś w specyfikacji jest niejednoznaczne. Nie dodawaj treści ani sekcji spoza tej specyfikacji.
