# Handoff: LW Nieruchomości — Landing Page (wariant 1a „ciepły / ludzki")

## Przegląd
Strona główna (landing page) dla lokalnego biura nieruchomości **LW Nieruchomości** z Jeleniej Góry (region Karkonosze / Kotlina Jeleniogórska). Celem strony jest: zaprezentować kategorie nieruchomości, polecane oferty, usługi biura i region, zbudować zaufanie (opinie, statystyki, „O nas") oraz zebrać kontakt (zgłoszenie nieruchomości / poszukiwanie oferty).

Docelowa technologia: **SvelteKit**. Ten dokument + pliki referencyjne pozwalają odtworzyć projekt **1:1**.

---

## O plikach w tej paczce
Pliki w tej paczce to **referencje projektowe stworzone w HTML** — pokazują docelowy wygląd i zachowanie, **nie są kodem produkcyjnym do skopiowania wprost**. Zadanie: **odtworzyć ten design w SvelteKit**, używając komponentów `.svelte`, plików `+page.svelte`/`+layout.svelte` i normalnego CSS (zmienne z `tokens/design-tokens.css`).

- `reference/lw-landing-1a.html` — **statyczny podgląd 1:1**. Otwórz w przeglądarce, żeby zobaczyć dokładnie docelowy wygląd i interakcję usług. Sekcje unikalne są zapisane wprost w HTML; siatki powtarzalne (kategorie, oferty, usługi, opinie, statystyki) są renderowane z tablic w `<script>` na dole pliku — te tablice to gotowy model danych (identyczny z `data/content.json`).
- `tokens/design-tokens.css` — zmienne CSS (kolory, typografia, odstępy, promienie, cienie). Wklej do globalnego CSS.
- `tokens/design-tokens.js` — te same tokeny jako obiekt JS/TS (gdyby wygodniej było w Svelte).
- `data/content.json` — cała treść (teksty, oferty, usługi, opinie…) jako JSON.
- `data/images-manifest.md` — spis zdjęć (lokalne + Unsplash placeholdery).
- `assets/` — zdjęcia regionu należące do klientki (gotowe do użycia).
- `PROMPT_dla_Claude_Code.md` — gotowy prompt do wklejenia w Claude Code.

---

## Fidelity: **HIGH-FIDELITY**
To jest projekt hi-fi — finalne kolory, typografia, odstępy i interakcje. Odtwórz UI **pixel-perfect**. Wszystkie dokładne wartości są w `tokens/` i w opisie sekcji poniżej.

Ważny kontekst wizualny:
- **Paleta:** ciepła zieleń lasu (`#2C4A38`) + złoto/mosiądz (`#B4894C`, jaśniejsze `#E9D19A`), na kremowym tle (`#FBF8F2`). Biała treść, mocne zielone sekcje jako akcenty.
- **Typografia:** nagłówki **Newsreader** (serif, waga 500/600, italic do emfazy), tekst i UI **Hanken Grotesk** (sans).
- **Charakter:** elegancki, ludzki, „butikowy" — dużo powietrza, zaokrąglone karty, miękkie cienie, zdjęcia z ciemnymi nakładkami i białym tekstem.
- Projekt zbudowany na siatce **1440px** (desktop). Responsywność trzeba dodać (patrz sekcja Responsywność).

---

## Układ strony (kolejność sekcji, od góry)
1. **Nav** (sticky opcjonalnie)
2. **Hero** ze zdjęciem na całą szerokość + nachodzącą kartą wyszukiwarki
3. **Pasek zaufania** (ocena / transakcje / na wyłączność)
4. **Kategorie** (4 kafle)
5. **Polecane oferty** (chipy filtrów + 3-kolumnowa siatka kart)
6. **O nas** (zielona sekcja: tekst + statystyki + zdjęcie agentki)
7. **Usługi** (interaktywne: lista + panel ze zdjęciem/opisem)
8. **Region Karkonosze** (mozaika zdjęć)
9. **Opinie** (3 karty)
10. **Dual CTA** (zgłoś nieruchomość / szukam oferty)
11. **Kontakt + mapa Google**
12. **Stopka**

---

## Sekcje — szczegóły

Wszystkie kolory/rozmiary odnoszą się do zmiennych z `tokens/design-tokens.css`. Padding poziomy każdej sekcji: **48px** (`--pad-section-x`). Kontener strony: `max-width:1440px; margin:0 auto; background:#FBF8F2`.

### 1. Nav
- Układ: `flex; align-items:center; justify-content:space-between`; padding `22px 48px`; tło `rgba(251,248,242,.9)` (dodaj `backdrop-filter:blur` jeśli sticky); dolna linia `1px solid #ECE6D9`.
- Lewa: kwadrat logo 46×46, `border-radius:12px`, tło `#2C4A38`, litery „LW" `#E9D9AE` Newsreader 20px/600. Obok: nazwa „LW Nieruchomości" (Newsreader 20px/600) + podpis „Jelenia Góra · Karkonosze" (12px, uppercase, `letter-spacing:.14em`, `#9A8F6E`).
- Środek: linki „Oferty · Usługi · O nas · Region · Kontakt" (15px, `#4A4E42`, `gap:34px`).
- Prawa: telefon „+48 690 008 273" (15px/600) + przycisk **Zgłoś ofertę** (tło `#2C4A38`, tekst biały, `padding:11px 20px`, `border-radius:999px`, 14px/600).

### 2. Hero
- Wysokość **660px**, `position:relative`. Tło: gradient `linear-gradient(105deg, rgba(18,26,20,.66) 0%, rgba(18,26,20,.3) 48%, rgba(18,26,20,.12) 100%)` nałożony na `assets/sniezka-sunset.png` (`background-size:cover; background-position:center`). Treść wyśrodkowana pionowo, padding `0 72px`.
- Eyebrow „Lokalne biuro nieruchomości": inline pill, tło `rgba(255,255,255,.16)`, `border:1px solid rgba(255,255,255,.3)`, `backdrop-filter:blur(6px)`, 13px uppercase `letter-spacing:.16em`, biały.
- H1 (Newsreader 500, **64px**, line-height 1.04, letter-spacing -.01em, biały): „Znajdź swój dom / w sercu **Karkonoszy**". Słowo „Karkonoszy" w `<em>` italic, kolor `#E9D19A`.
- Akapit: 18px/1.6, `rgba(255,255,255,.9)`, max-width 520px.
- **Karta wyszukiwarki** (nachodzi na dół hero): `position:absolute; left:72px; right:72px; bottom:-56px`; tło białe; `border-radius:18px`; cień `--shadow-search`; `border:1px solid #EFEADD`; padding `22px 24px`; `display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:18px; align-items:end`.
  - 3 pola (label nad selectem): labelka 12px uppercase `.1em` `#9A8F6E`/600; select tło `#FBF8F2`, `border:1px solid #E8E2D5`, `border-radius:12px`, `padding:13px 15px`, 15px, własna strzałka (SVG w `background`). Pola: **Rodzaj**, **Lokalizacja**, **Cena do** (opcje w `content.json → wyszukiwarka`).
  - Przycisk **Szukaj**: tło `#2C4A38`, biały, `border-radius:12px`, `padding:14px 30px`, 16px/600, height 50px.
- ⚠️ Uwaga na odstęp: następna sekcja ma górny padding **92px**, żeby zrobić miejsce na wystającą kartę.

### 3. Pasek zaufania
- `flex; justify-content:center; gap:56px`; padding `92px 48px 46px`. 3 pozycje rozdzielone pionową kreską 1px `#E8E2D5`:
  - „★ 4,9 ocena Google" (gwiazdka `#B4894C`), „120+ transakcji", „Na wyłączność · wiele ofert". Liczby 18px/700; opis `#6C7064`.

### 4. Kategorie
- Nadtytuł „Przeglądaj" (eyebrow — patrz styl niżej) + H2 „Kategorie nieruchomości" (Newsreader 500, 38px).
- Siatka `grid-template-columns:repeat(4,1fr); gap:20px`. 4 kafle (dane: `content.json → kategorie`).
- **Kafel** (styl ASARI): `height:300px; border-radius:16px; overflow:hidden; position:relative`; cień `--shadow-cat`. Warstwy:
  1. zdjęcie tła (`cover center`),
  2. gradient `linear-gradient(180deg, rgba(20,30,22,.14), rgba(20,30,22,.34))`,
  3. **środkowy pasek** wyśrodkowany pionowo (`top:50%; transform:translateY(-50%)`): tło `rgba(18,26,20,.44)`, `backdrop-filter:blur(2px)`, górna+dolna linia `1px solid rgba(255,255,255,.16)`, padding `16px 18px`, tekst wyśrodkowany, biały. W środku: nazwa (Newsreader 25px/600) + podtytuł transakcji (11px uppercase `.16em`, `rgba(255,255,255,.88)`).

### 5. Polecane oferty
- Nagłówek: eyebrow „Wybrane dla Ciebie" + H2 „Polecane oferty" (Newsreader 500, 38px); po prawej link „Zobacz wszystkie oferty →" (600, `#2C4A38`, dolna linia `1.5px solid #B4894C`).
- **Chipy filtrów** (`flex; gap:10px; wrap; margin-bottom:24px`): aktywny „Wszystkie" — tło `#2C4A38`, biały, pill, 14px/600; pozostałe (Mieszkania/Domy/Działki/Lokale) — białe, `border:1px solid #E8E2D5`, `#4A4E42`, pill, 14px/500. (Filtry są wizualne; logika filtrowania opcjonalna.)
- Siatka `repeat(3,1fr); gap:24px`. 6 kart (dane: `content.json → oferty`).
- **Karta oferty** (duża, styl ASARI): tło białe; `border-radius:18px`; `border:1px solid #EFEADD`; cień `--shadow-offer`; `display:flex; flex-direction:column`.
  - **Zdjęcie** `height:290px; position:relative`:
    - badge (jeśli jest): lewy-górny, tło `#B4894C`, biały, 12px/700 `.04em`, `padding:6px 13px`, pill, subtelny cień. Wartości: „Polecana" / „Na wyłączność".
    - serduszko: prawy-górny, koło 38×38 `rgba(255,255,255,.92)`, `#2C4A38`, znak `♡`.
    - strzałki galerii ‹ › : koła 34×34 `rgba(255,255,255,.8)` przy krawędziach, pion `top:42%` (wizualne).
    - **przyciemniany pasek na dole** (najważniejszy element wg klientki): `rgba(18,26,20,.62)`, `backdrop-filter:blur(3px)`, górna linia `1px solid rgba(255,255,255,.14)`, `padding:13px 18px`, biały, `flex; justify-content:space-between`. Lewa: miasto (17px/700) + ulica (12px `rgba(255,255,255,.82)`). Prawa (z lewą kreską-separatorem `1px rgba(255,255,255,.32)`, `padding-left:14px`, `text-align:right`): cena (18px/800) + cena/m² (12px).
  - **Treść** `padding:20px 22px 22px; flex:1`:
    - podtytuł typu (11px uppercase `.08em`, `#B4894C`/700),
    - tytuł oferty (Newsreader 500, 21px, line-height 1.25),
    - **3 kolumny parametrów** (`grid repeat(3,1fr)`, `padding:16px 0`, górna+dolna linia `1px #EFEADD`, `margin-top:auto`): etykieta (11px uppercase `.05em` `#9A8F6E`) + wartość (15px/700 `#2C3A2E`). Parametry różnią się per oferta (Pokoje/Powierzchnia/Piętro/Działka/Przeznaczenie/Media/…).
    - przycisk **Zobacz ofertę →** pełna szerokość, tło `#2C4A38`, biały, `border-radius:12px`, `padding:13px`, 15px/600.

### 6. O nas (zielona sekcja)
- `margin-top:64px; padding:64px 48px; background:#2C4A38; color:#F3EEE1`.
- Siatka `grid-template-columns:1.05fr .95fr; gap:56px; align-items:center`.
- Lewa: eyebrow „O nas" (kolor `#D9BE84`) → H2 „Z sercem do ludzi i domów" (Newsreader 500, 42px, line-height 1.1) → 2 akapity (17px/1.65, `rgba(243,238,225,.82)`) → **statystyki** `grid repeat(4,1fr); gap:20px; margin-top:34px`: liczba (Newsreader 600, 34px, `#E9D19A`) + etykieta (13px, `rgba(243,238,225,.7)`). Dane: `content.json → statystyki`.
- Prawa: zdjęcie agentki `height:440px; border-radius:18px`, `border:1px solid rgba(255,255,255,.14)`, cień `--shadow-photo`; dolny gradient `linear-gradient(0deg, rgba(20,30,22,.74), transparent)` wys. 130px; podpis lewy-dolny: „Poznajmy się osobiście" (Newsreader 21px) + „LW NIERUCHOMOŚCI · JELENIA GÓRA" (12px, `#E9D19A`, `.08em`). **Zdjęcie to placeholder z Unsplash — podmień na realne.**

### 7. Usługi (INTERAKTYWNE)
- `padding:76px 48px 28px`. Nagłówek (max-width 600): eyebrow „Usługi" → H2 „Kompleksowa obsługa — od wyceny po klucze" (Newsreader 500, 41px) → podtytuł „Wybierz usługę z listy…" (15px `#6C7064`).
- Siatka `grid-template-columns:1fr 1.05fr; gap:44px; align-items:start`.
- **Lewa — lista** (6 wierszy, dolna linia całości `1px #E8E2D5`): każdy wiersz `cursor:pointer; display:flex; gap:22px; padding:20px 18px; border-top:1px solid #E8E2D5`. Aktywny wiersz ma nakładkę tła `#F5F1E7` z lewą krawędzią `3px solid #B4894C`. Numer (Newsreader 500, 30px, `#B4894C`, min-width 44px) + tytuł (Newsreader 500, 22px) + krótki opis „d" (13.5px `#6C7064`).
- **Prawa — panel**: białe pudełko `border:1px solid #EFEADD; border-radius:20px`; cień `--shadow-panel`.
  - Górą zdjęcie `height:340px` (aktywnej usługi, `cover center`, `transition:opacity .3s`), na nim dolny gradient `linear-gradient(0deg, rgba(20,30,22,.58), rgba(20,30,22,0) 58%)` i tytuł usługi (biały, Newsreader 25px, lewy-dolny).
  - Pod spodem `padding:26px 28px 30px`: label „Usługa 0X" (11px uppercase `.14em` `#B4894C`/700) → długi opis „long" (16px/1.7 `#3B3F34`) → przycisk **Zapytaj o tę usługę →** (pill, tło `#2C4A38`, biały, `padding:12px 24px`).
- Dane: `content.json → uslugi.lista` (pola: `no, t, d, long, img`).

### 8. Region Karkonosze — pozioma galeria (przeciągana/przewijana)
- Sekcja na ciemnym tle `#23271F`, `padding:56px 0 28px`.
- Nagłówek (`padding:0 48px 28px`, flex space-between): eyebrow „Region Karkonosze" (kolor `#D9BE84` na ciemnym tle) + H2 „Rozejrzyj się po Karkonoszach" (Newsreader 500, 40px, kolor `#FBF8F2`) po lewej; podpowiedź „PRZECIĄGNIJ / PRZEWIŃ →" (12px, `rgba(243,238,225,.6)`) po prawej.
- **Galeria** (`content.json → region.galeria`, 6 pozycji): `display:flex; gap:20px; overflow-x:auto; scroll-snap-type:x mandatory; padding:4px 48px 10px; cursor:grab`. Kafle na przemian duże (560×440px) i małe (340×440px), `scroll-snap-align:start`, `border-radius:18px`, zdjęcie + dolny gradient `linear-gradient(0deg, rgba(18,26,20,.6), transparent 45%)` + podpis biały lewy-dolny (duże: Newsreader 22px; małe: 15px/600).
- **WAŻNE — to NIE jest karuzela automatyczna i NIE jest scroll-jacking (position:sticky).** Wcześniejsza wersja używała pinning na scrollu strony — **celowo porzucona**, bo nie renderuje się poprawnie w statycznych/paginowanych podglądach (pusta przestrzeń zamiast treści). Aktualna wersja to zwykły poziomo przewijany kontener, obsługiwany na 3 sposoby (patrz „Interakcje" niżej): kółko myszy, przeciąganie kursorem, strzałki.
- Pod galerią: cienki pasek postępu (`height:2px`, tło `rgba(243,238,225,.18)`, wypełnienie `#E9D19A`), szerokość aktualizowana na podstawie `scrollLeft / (scrollWidth - clientWidth)`, formuła `10% + procent*90%` (nigdy nie znika do zera, zawsze widoczny sliver na starcie).
- Dwie okrągłe strzałki (46×46px, `rgba(255,255,255,.88)`, ikony `‹ ›`) nałożone na krawędziach galerii, `scrollBy({left: ±580, behavior:'smooth'})`.

### 9. Opinie — pojedynczy rotujący cytat (NIE siatka kart)
- Pełnoszerokościowa sekcja, tło = zdjęcie `assets/sunset-dolina.png` z ciemną zieloną nakładką `linear-gradient(rgba(18,26,20,.82), rgba(18,26,20,.88))`, `padding:100px 48px`, tekst wyśrodkowany.
- Eyebrow „Opinie klientów" (`#D9BE84`) → duży znak cudzysłowu „”" (Newsreader 70px, `#D9BE84`, opacity .6) → **jeden** cytat naraz (Newsreader italic 500, 32px, `#FBF8F2`, max-width 760, wyśrodkowany) → autor „Imię · Lokalizacja" (14px, `rgba(243,238,225,.72)`).
- **Auto-rotacja co 6,5 sekundy** między 3 opiniami (`content.json → opinie.lista`) + rząd klikalnych kropek pod spodem: aktywna kropka = pigułka 26×8px koloru `#E9D19A`; nieaktywne = kropki 8×8px `rgba(243,238,225,.3)`. Kliknięcie kropki ustawia opinię i restartuje timer.

### 10. Dual CTA — przekątny podział (NIE dwie karty obok siebie)
- Pełnoszerokościowa sekcja `height:440px; overflow:hidden` (bez paddingu — bleeduje do krawędzi).
- Lewy panel: `width:58%`, tło `#F1EFE6` (kremowe), `clip-path:polygon(0 0,100% 0,84% 100%,0 100%)` (przekątne cięcie z prawej strony), tekst `#23271F`. H3 „Zgłoś nieruchomość do sprzedaży lub wynajęcia" (Newsreader 500, 32px) + opis (15px `#5C6054`) + przycisk zielony (pill, `#2C4A38`/biały).
- Prawy panel: nachodzi od `left:45%`, `width:55%`, tło `#2C4A38`, `clip-path:polygon(15% 0,100% 0,100% 100%,0% 100%)` (przekątna dopasowana do lewego cięcia, tworząc jedną spójną ukośną linię podziału), `z-index:2` (na wierzchu lewego). Tekst `#F3EEE1`. H3 „Szukasz oferty zakupu lub najmu?" + opis + przycisk **złoty** (`#E9D19A`/`#2C4A38`, 700).
- Na przecięciu obu paneli, wyśrodkowana odznaka obrócona o -7°: tło `#23271F`, tekst `#FBF8F2`, „Wybierz swoją ścieżkę" (11px uppercase, pill).

### 11. Kontakt + mapa
- `padding:20px 48px 64px`. Siatka `grid-template-columns:1fr 1.1fr`; wspólne `border:1px solid #EFEADD; border-radius:20px; overflow:hidden`.
- Lewa (białe, `padding:44px 40px`): eyebrow „Kontakt" → H2 „Porozmawiajmy o Twojej nieruchomości" (Newsreader 500, 32px) → 3 bloki (Telefon/E-mail/Biuro mobilne): etykieta 12px uppercase `.1em` `#9A8F6E` + wartość (telefon 18px/700 `#2C4A38`; reszta 16px/600). Przycisk **Wyślij wiadomość** (`#2C4A38`/biały, `border-radius:12px`, `padding:14px 30px`).
- Prawa: `<iframe>` Google Maps (`content.json → kontakt.mapaEmbed`), `min-height:360px`, `filter:saturate(.9)`.

### 12. Stopka
- `background:#23271F; color:#CFCBBE; padding:52px 48px 34px`. Siatka `grid-template-columns:1.6fr 1fr 1fr 1fr; gap:40px`.
- Kolumna 1: logo (kwadrat 42×42 `#2C4A38`, „LW" `#E9D19A` Newsreader) + nazwa (Newsreader 18px, biała) + opis (14px/1.6 `#8F8B7E`, max-width 280).
- Kolumny 2–4: „Nazwa" (biała 14px/600) + linki (14px). Nawigacja / Kategorie / Kontakt (dane: `content.json → stopka`).
- Dół: linia `1px #363A2E`, copyright 13px `#7C7869`.

### Wspólny styl „eyebrow" (nadtytuł sekcji)
`font-size:12px; letter-spacing:.16em; text-transform:uppercase; font-weight:600; color:#B4894C` (na zielonym tle: `#D9BE84`). Margines dolny ~8–14px.

---

## Interakcje i zachowanie
- **Usługi:** klik w wiersz listy ustawia aktywną usługę → podmienia w panelu: zdjęcie (`transition:opacity .3s`), tytuł na zdjęciu, label „Usługa 0X", długi opis; aktywny wiersz dostaje podświetlenie `#F5F1E7` + złotą lewą krawędź. Domyślnie aktywna usługa 01. (Svelte: `let active = 0;` + `on:click={() => active = i}`.)
- **Galeria Regionu (ważna interakcja, 3 tryby, żaden automatyczny):**
  1. **Kółko myszy** — nasłuchuj `wheel` na kontenerze; jeśli `|deltaY| > |deltaX|` (typowy pionowy gest myszy), zrób `event.preventDefault()` i `scroller.scrollLeft += event.deltaY`. Dzięki temu zwykłe przewijanie myszą (bez Shift) rusza galerię w bok.
  2. **Przeciąganie kursorem** — `mousedown` zapisuje punkt startowy + `scrollLeft`; `mousemove` (nasłuchiwany na `window`, nie na elemencie, żeby drag nie urywał się przy szybkim ruchu) liczy przesunięcie i ustawia `scrollLeft`; `mouseup` (też na `window`) kończy przeciąganie. W trakcie przeciągania wyłącz `scroll-snap-type` (na `none`) i przywróć po puszczeniu — inaczej przeglądarka "wyrywa" kursor do najbliższego snap-poola w trakcie ruchu.
  3. **Strzałki ‹ ›** — `scroller.scrollBy({ left: ±580, behavior: 'smooth' })`.
  4. CSS `scroll-snap-type:x mandatory` na kontenerze + `scroll-snap-align:start` na każdym kaflu — daje przyjemne "zatrzaskiwanie" niezależnie od metody przewijania.
  5. Pasek postępu aktualizowany na evencie `scroll` kontenera (nie na scrollu strony!): `width = 10% + (scrollLeft / (scrollWidth - clientWidth)) * 90%`.
  - **Nie implementuj tego jako `position:sticky` + scroll strony ("scroll-jacking").** Ten wariant był wcześniej wypróbowany i **celowo wycofany** — w statycznych/wydrukowanych/paginowanych podglądach (np. eksport PDF, narzędzia do prezentacji) `position:sticky` bez aktywnego scrollowania renderuje się w jednej, statycznej pozycji, zostawiając resztę wysokiego kontenera pustą. Zwykły `overflow-x:auto` nie ma tego problemu i wygląda poprawnie w każdym kontekście.
- **Opinie:** auto-rotacja co 6,5s (`setInterval`) między 3 cytatami + klikalne kropki, które ustawiają indeks i restartują timer. Pamiętaj o `clearInterval` przy odmontowaniu komponentu.
- **Hover:** linki/przyciski lekko przygaszone (`opacity ~.82`) lub ciemniejsza zieleń — do uznania, delikatnie.
- **Wyszukiwarka i chipy filtrów:** w mocku wizualne. Możesz podłączyć realne filtrowanie ofert (opcjonalne).
- **Galeria w kartach ofert (strzałki ‹ ›):** wizualne; realny slider opcjonalny.
- **Mapa:** statyczny `<iframe>` Google Maps embed.

## Zarządzanie stanem
- **Usługi:** indeks aktywnej usługi (`activeService: number`, domyślnie 0).
- **Galeria Regionu:** brak stanu Svelte potrzebnego — steruj bezpośrednio DOM-em (`scrollLeft`) przez referencję do elementu (`bind:this`); pasek postępu też aktualizuj imperatywnie w handlerze `on:scroll`, nie przez reaktywną zmienną (unikniesz zbędnych re-renderów przy każdej klatce scrolla).
- **Opinie:** indeks aktywnej opinii (`activeTestimonial: number`, domyślnie 0) + referencja do interval timera do sprzątnięcia w `onDestroy`.
- Reszta to statyczna treść z `content.json`. Jeśli podłączysz filtry ofert — dojdzie stan wybranej kategorii.

## Responsywność (do zaprojektowania — mock jest desktop 1440px)
Sugerowane punkty:
- **≥1200px:** jak w mocku (oferty 3 kolumny, kategorie 4).
- **768–1199px:** kategorie 2 kolumny, oferty 2 kolumny; hero H1 ~48px; sekcje 2-kolumnowe (O nas, Usługi, Kontakt) → 1 kolumna; wyszukiwarka z hero → pod hero (nie absolutna) lub 2×2.
- **<768px:** wszystko 1 kolumna; nav → hamburger; hero H1 ~36–40px, padding boczny 20–24px; pasek zaufania w pionie; mozaika Region → 1 kolumna; parametry oferty mogą zostać 3 kolumny (są wąskie) lub 3 w rzędzie.
- Zamień sztywną szerokość 1440px na `max-width` + płynne paddingi.

---

## Design tokens
Pełna lista w `tokens/design-tokens.css` (zmienne CSS) oraz `tokens/design-tokens.js` (obiekt). Skrót:
- **Zieleń:** `#2C4A38` (podstawowa), `#23271F` (tekst/stopka).
- **Złoto:** `#B4894C` (akcent), `#E9D19A` (jasne), `#D9BE84` (miękkie), `#E9D9AE` (logo).
- **Tła:** `#FBF8F2` (strona), `#FFFFFF` (karty), `#F1EFE6`/`#F5F1E7` (kremowe panele).
- **Tekst:** `#23271F`, muted `#6C7064`, etykiety `#9A8F6E`.
- **Obramowania:** `#EFEADD`, `#E8E2D5`, `#ECE6D9`.
- **Fonty:** Newsreader (serif, nagłówki), Hanken Grotesk (sans, tekst).
- **Promienie:** pill 999px, karta 16–20px, przycisk/pole 12px.
- **Cienie:** patrz `--shadow-*`.

## Zasoby (assets)
- Lokalne zdjęcia regionu w `assets/` (własność klientki, gotowe): `sniezka-sunset.png`, `karkonosze-panorama.png`, `sunset-dolina.png`, `jelenia-gora-zima.png`, `schronisko-staw.png`. W SvelteKit umieść w `static/` i odwołuj się `/sniezka-sunset.png` itd.
- Zdjęcia ofert / agentki / usług = **placeholdery z Unsplash** (pełne URL-e w `content.json` i `data/images-manifest.md`). **Do podmiany na realne.** Docelowo pobierz je do `static/` zamiast linkować z Unsplash.
- Ikony (serduszko `♡`, strzałki `‹ › →`, gwiazdka `★`) to znaki Unicode — możesz zostawić lub zamienić na ikony SVG (np. lucide-svelte).
- Fonty z Google Fonts (link w `<head>` referencji) — w SvelteKit użyj `@fontsource/newsreader` + `@fontsource/hanken-grotesk` lub linka do Google Fonts.

## Pliki w tej paczce
```
design_handoff_lw_landing/
├── README.md                     ← ten plik
├── PROMPT_dla_Claude_Code.md     ← prompt do wklejenia w Claude Code
├── reference/
│   └── lw-landing-1a.html        ← statyczny podgląd 1:1 (otwórz w przeglądarce)
├── tokens/
│   ├── design-tokens.css         ← zmienne CSS
│   └── design-tokens.js          ← tokeny jako obiekt JS/TS
├── data/
│   ├── content.json              ← cała treść (teksty, oferty, usługi…)
│   └── images-manifest.md        ← spis zdjęć
└── assets/                       ← lokalne zdjęcia regionu (klientki)
    ├── sniezka-sunset.png
    ├── karkonosze-panorama.png
    ├── sunset-dolina.png
    ├── jelenia-gora-zima.png
    └── schronisko-staw.png
```

## Uwagi końcowe
- To jest **wariant 1a** (ciepły/ludzki, serif + krem). Istnieje też wariant 1b (nowoczesny minimalizm) — nie jest przedmiotem tego handoffu.
- Klientka szczególnie ceniła: **kafle kategorii z przyciemnianą labelką**, **duże karty ofert z przyciemnianym paskiem lokalizacja+cena** (styl ASARI), oraz — po zobaczeniu innej eksploracji — **poziomą galerię zdjęć regionu**, **pojedynczy rotujący cytat w Opiniach** i **przekątny podział w Dual CTA**. Zadbaj, by te elementy były wierne.
- Ta wersja handoffu zastępuje wcześniejszą — sekcje Region/Opinie/Dual CTA zostały przeprojektowane (patrz opisy w sekcjach 8–10 powyżej). Region celowo NIE używa `position:sticky`/scroll-jackingu — patrz uzasadnienie w „Interakcje i zachowanie".
- CMS: strona ma docelowo działać z CMS-em — model danych z `content.json` dobrze mapuje się na kolekcje (Oferty, Usługi, Opinie, Kategorie, Galeria regionu).
