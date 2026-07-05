# Deploy na Netlify — LW Nieruchomości

## Co jest gotowe
- **Adapter**: `@sveltejs/adapter-netlify` (SSR w funkcjach serverless) — skonfigurowany w `vite.config.ts`.
- **`netlify.toml`**: komenda build, Node 22, cele Prisma.
- **Build**: `npm run build` = `prisma generate && vite build` (klient Prisma generowany automatycznie).
- **Baza danych**: PostgreSQL 15 na VPS `83.168.107.228`, baza `lwnieruchomosci`, użytkownik `lwadmin`.
  Schemat wgrany, dane demo zseedowane (12 ofert — w tym 1 zarezerwowana i 1 sprzedana, 4 zgłoszenia, 2 konta).
- Klient Prisma używa **WASM query compiler** — działa na serverless bez natywnych binariów.

## Zmienna środowiskowa (dodaj na Netlify)
Site settings → **Environment variables** → dodaj:

```
DATABASE_URL = postgresql://lwadmin:lwR7kQ2mP9xT4vB8@83.168.107.228:5432/lwnieruchomosci
```

(Ta sama wartość jest w `.env.example`.)

## Kroki deployu
1. Wypchnij repo na GitHub/GitLab (git jest już zainicjowany, pierwszy commit zrobiony).
2. Na Netlify: **Add new site → Import from Git** → wskaż repo.
3. Build settings wykryją się z `netlify.toml` (Build command `npm run build`, Publish `build`).
4. Dodaj zmienną `DATABASE_URL` (jak wyżej) → **Deploy**.

## Logowanie do panelu (po deployu)
- `anna@lw.nieruchomosci.pl` / `admin123` (Administrator)
- `karolina@lw.nieruchomosci.pl` / `agent123` (Agent)

## ⚠️ Zdjęcia (upload)
Na Netlify (serverless) system plików jest ulotny — **upload zdjęć nie utrzyma się między żądaniami**.
Podgląd działa na danych demo (placeholdery). Do trwałego przechowywania zdjęć trzeba podpiąć
zewnętrzny storage (Netlify Blobs lub S3/Cloudinary) — do zrobienia później.
Lokalnie oraz przy deployu na VPS (adapter-node) upload działa normalnie (folder `uploads/`).
