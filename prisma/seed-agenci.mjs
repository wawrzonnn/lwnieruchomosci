/**
 * Zakłada agentów biura i przypisuje opiekuna do ofert bez przypisania.
 *
 *   node prisma/seed-agenci.mjs            # zakłada/aktualizuje agentów
 *   node prisma/seed-agenci.mjs --przypisz # dodatkowo przypisuje Lucynę ofertom bez agenta
 *
 * Idempotentny: dopasowuje po imieniu i nazwisku, więc ponowne uruchomienie
 * niczego nie duplikuje. Przypisanie NIE nadpisuje ofert, które już mają agenta.
 */
import pg from 'pg';
import 'dotenv/config';

const TELEFON = '+48 690 008 273';

const AGENCI = [
	{
		imie: 'Lucyna Wojtoń',
		rola: 'Właścicielka i specjalistka ds. nieruchomości',
		telefon: TELEFON,
		image: '/agenci/lucyna.webp',
		order: 0
	},
	{
		imie: 'Jarosław Zięba',
		rola: 'Specjalista ds. nieruchomości',
		telefon: TELEFON,
		image: '/agenci/jaroslaw.webp',
		order: 1
	}
];

const DOMYSLNY = 'Lucyna Wojtoń';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
	for (const a of AGENCI) {
		const istnieje = await pool.query('select id from agents where imie = $1', [a.imie]);
		if (istnieje.rows.length) {
			await pool.query(
				'update agents set rola = $1, telefon = $2, image = $3, "order" = $4, aktywny = true, "updatedAt" = now() where imie = $5',
				[a.rola, a.telefon, a.image, a.order, a.imie]
			);
			console.log('zaktualizowano:', a.imie);
		} else {
			await pool.query(
				'insert into agents (imie, rola, telefon, image, aktywny, "order", "createdAt", "updatedAt") values ($1,$2,$3,$4,true,$5, now(), now())',
				[a.imie, a.rola, a.telefon, a.image, a.order]
			);
			console.log('utworzono:', a.imie);
		}
	}

	if (process.argv.includes('--przypisz')) {
		const r = await pool.query('select id from agents where imie = $1', [DOMYSLNY]);
		if (!r.rows.length) throw new Error(`Brak agenta „${DOMYSLNY}" w bazie`);
		const id = r.rows[0].id;
		const upd = await pool.query(
			'update listings set "agentId" = $1 where "agentId" is null returning id',
			[id]
		);
		console.log(`przypisano „${DOMYSLNY}" do ${upd.rowCount} ofert bez opiekuna`);
	}

	const stan = await pool.query(
		'select a.imie, count(l.id)::int as ofert from agents a left join listings l on l."agentId" = a.id group by a.imie order by a.imie'
	);
	console.log('stan:', JSON.stringify(stan.rows));
	const bez = await pool.query('select count(*)::int as n from listings where "agentId" is null');
	console.log('ofert bez opiekuna:', bez.rows[0].n);
} catch (e) {
	console.error('BŁĄD:', e.message);
	process.exitCode = 1;
} finally {
	await pool.end();
}
