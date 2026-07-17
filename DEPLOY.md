# Deploy — LW Nieruchomości

Aplikacja stoi na **VPS 83.168.107.228**, w `/opt/lwnieruchomosci`, pod PM2 jako
`lwnieruchomosci`, na porcie **3011**. Na tym samym serwerze działa Postgres i kilka innych
projektów (`platform`, `platform-sell`, `otomotok`, `boskanora`) — ich nie ruszamy.

> **Dlaczego nie Netlify.** Panel zapisuje wgrane zdjęcia na dysk (`$lib/server/uploads.ts`
> → `/uploads/<uuid>.jpg`). Na Netlify (serverless) dysk jest ulotny, więc zdjęcia wgrane przez
> klientkę znikałyby przy najbliższym wdrożeniu. Na VPS dysk jest trwały. Przy okazji baza
> przestała być odpytywana przez internet — jest na tym samym serwerze (`localhost`).

## Adres

- Teraz: <http://83.168.107.228:3011>
- Docelowo: domena przez OVH + nginx jako proxy + certyfikat (do zrobienia).
  **Uwaga:** rekord A `lw.nieruchomosci.pl` wciąż wskazuje stary serwer IMO (5.135.168.230).

## Wdrożenie zmian

```bash
ssh root@83.168.107.228
cd /opt/lwnieruchomosci
git pull
npm install            # NIE `npm ci` — sharp ma zależności zależne od platformy, a lock
                       # powstaje na Windowsie i nie zawiera linuksowych (@emnapi/*)
npx prisma generate    # po zmianach w schema.prisma
npx prisma db push     # po zmianach w schema.prisma
npm run build
pm2 restart lwnieruchomosci
```

## Pułapki, które już nas ugryzły

- **PM2 nie ładuje `.env` sam, a `adapter-node` czyta wyłącznie `process.env`.** Dlatego proces
  startuje z `--node-args="-r dotenv/config"`. Bez tego serwer wstaje na domyślnym porcie 3000
  i nie widzi `DATABASE_URL` ani `ORIGIN`.

  Pierwsze uruchomienie:
  ```bash
  pm2 start build/index.js --name lwnieruchomosci --node-args="-r dotenv/config"
  pm2 save
  ```

- **`ORIGIN` jest wymagany** przez `adapter-node` — bez niego POST-y formularzy lecą na błąd CSRF.
  Po podpięciu domeny zmień `ORIGIN` i `APP_URL` w `.env` i zrestartuj PM2.

## `.env` na serwerze

```
DATABASE_URL="postgresql://lwadmin:...@localhost:5432/lwnieruchomosci"   # baza jest lokalna
APP_URL, ORIGIN     # po podpięciu domeny → https://<domena>
AUTH_SECRET         # losowy, podpisuje sesje panelu
PORT=3011
```

## Zdjęcia

- `static/oferty-media/<idOferty>/<n>.jpg` — zdjęcia ofert, **w repo** (183 szt.).
- `static/regiony/<slug>.jpg` — zdjęcia startowe regionów, **w repo** (9 szt.).
- `/opt/lwnieruchomosci/uploads/` — to, co klientka wgra panelem. **Poza repo (gitignore),
  nie kasować przy wdrożeniach — to jedyna kopia.**

## Jednorazowe skrypty

```bash
npx tsx prisma/seed-regiony.ts            # regiony → baza (upsert po slug, bezpieczny ponownie)
node scripts/pobierz-oryginaly-zdjec.mjs  # oryginały zdjęć ze starej strony (bez --zapis = próbnie)
```
