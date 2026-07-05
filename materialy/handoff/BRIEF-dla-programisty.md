# LW Nieruchomości — brief dla programisty

**Stack docelowy:** SvelteKit
**Materiał wejściowy:** makieta w jednym pliku HTML (`LW-Nieruchomosci-strona.html`) — otwiera się w przeglądarce, klikalna. Traktuj ją jako *wzorzec wyglądu i zachowania*, nie jako kod do wklejenia (jest zbudowana w Reactcie na potrzeby prototypu).

---

## Co jest w makiecie (do odwzorowania 1:1 wizualnie)

### Strona publiczna
- **Nagłówek** – logo, menu (Oferty, O nas, Region, Kontakt), telefon, link „Panel" (logowanie), przycisk „Zgłoś ofertę". Wersja mobilna = hamburger.
- **Hero** – nagłówek + wyszukiwarka (rodzaj / lokalizacja / cena) + zdjęcie.
- **Kategorie** – Mieszkania / Domy / Działki / Lokale z licznikami ofert.
- **Polecane oferty** – siatka kart (zdjęcie, cena, lokalizacja, metraż, pokoje, badge „Na wyłączność").
- **O nas / historia** – tekst + liczby (lata, sprzedane).
- **Pasek statystyk**, **Region Karkonosze / dlaczego my**, **Opinie klientów**.
- **CTA** – „Zgłoś ofertę" / „Zgłoś czego szukasz".
- **Kontakt + mapa** – dane, formularz kontaktowy, miejsce na mapę.
- **Stopka** – nawigacja, kategorie, kontakt, social.
- **Lista ofert** (`/oferty`) – filtry (rodzaj, lokalizacja, cena, sortowanie) + siatka kart.
- **Szczegóły oferty** (`/oferta/[id]`) – galeria, parametry, opis, karta agenta z kontaktem.

### Panel / CMS (dostęp przez „Panel logowania")
- **Logowanie**
- **Oferty** – lista z edycją i usuwaniem, liczniki (wszystkich / aktywnych)
- **Dodaj ofertę** – formularz: tytuł, kategoria, status, cena, powierzchnia, pokoje, lokalizacja, opis, zdjęcia (upload)
- **Użytkownicy** – lista + dodawanie (imię, e-mail, rola: Agent / Administrator)
- **Zgłoszenia** – skrzynka zgłoszeń od klientów ze strony, ze statusem (Nowe → W toku → Obsłużone)

### Wygląd / design system
- Kolory: tło beż `#f6f1e7`, akcent zielony `#3a5a40`, złoto/drewno `#b08d57`, tekst `#2c2822`.
- Typografia: nagłówki **Newsreader** (serif), treść **Figtree** (sans), dane techniczne **IBM Plex Mono**.
- Zaokrąglenia ~14–18px, ciepłe, miękkie cienie. Bez ostrych/korporacyjnych akcentów.
- Wszystkie zdjęcia w makiecie to placeholdery — do podmiany na realne.

---

## Co masz zbudować w SvelteKit

**Frontend (publiczny):**
- Strony: `/`, `/oferty`, `/oferta/[slug]`, `/kontakt` (+ ewentualnie `/o-nas`).
- Responsywność: desktop + mobile (breakpointy zamiast przełącznika z makiety — w makiecie „Desktop/Mobil" na dolnym pasku to tylko podgląd, NIE część strony).
- Filtry i wyszukiwarka ofert działające na realnych danych (SSR / load functions).
- SEO: meta tagi, ładne slugi ofert, sitemap.

**Panel (CMS):**
- Autoryzacja (logowanie, sesje, role: Administrator / Agent).
- CRUD ofert + upload i zarządzanie zdjęciami.
- Zarządzanie użytkownikami (dodawanie/usuwanie, role).
- Skrzynka zgłoszeń: formularze ze strony („Zgłoś ofertę", „Zgłoś czego szukasz", kontakt) zapisują się do bazy i pojawiają w panelu ze statusami.

**Backend / dane:**
- Baza danych (oferta: tytuł, kategoria, status, cena, cena_stara, powierzchnia, pokoje, lokalizacja, opis, zdjęcia[], badge, slug, data).
- Model użytkownika (imię, e-mail, hasło/hash, rola).
- Model zgłoszenia (typ, imię, kontakt, treść, status, data).
- Storage na zdjęcia (upload z panelu, thumbnaile).

**Uwagi:**
- Dane w makiecie (oferty, ceny, opinie, statystyki) są przykładowe — do zastąpienia realnymi.
- Domena docelowa: strona przechodzi na **nw.nieruchomosci.pl** (obecnie lw.nieruchomosci.pl) — uwzględnij przekierowania.
- Logika interakcji w panelu (usuwanie, dodawanie użytkownika, zmiana statusu zgłoszenia) w makiecie jest tylko poglądowa — w SvelteKit ma działać na bazie.

To jest MVP — priorytet: publiczna strona z ofertami + panel do dodawania ofert i użytkowników.
