// Jednorazowo: zamiana pauzy „—" na polski myślnik „–" w polach tekstowych
// artykułów, które nie pochodzą z articles-seed.json (seoTitle/seoDescription/
// coverAlt/coverCaption). Bezpieczne do ponownego uruchomienia.
//
//   node prisma/fix-dashes-db.mjs
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const POLA = ['seoTitle', 'seoDescription', 'coverAlt', 'coverCaption', 'excerpt', 'lead', 'title'];
const popraw = (v) => (typeof v === 'string' && v.includes('—') ? v.replaceAll('—', '–') : null);

try {
	const artykuly = await prisma.article.findMany();
	let zmienionych = 0;
	for (const a of artykuly) {
		const dane = {};
		for (const p of POLA) {
			const nowa = popraw(a[p]);
			if (nowa !== null) dane[p] = nowa;
		}
		if (Object.keys(dane).length) {
			await prisma.article.update({ where: { id: a.id }, data: dane });
			console.log(`  ${a.slug}: ${Object.keys(dane).join(', ')}`);
			zmienionych++;
		}
	}
	console.log(zmienionych ? `Poprawiono ${zmienionych} artykuł(ów)` : 'Nic do poprawy');
} finally {
	await prisma.$disconnect();
	await pool.end();
}
