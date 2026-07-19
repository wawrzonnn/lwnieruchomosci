// Import/aktualizacja 5 wpisów bloga wg handoffu designera (refinement 22 + 23).
// Upsert po slug — bezpieczny do ponownego uruchomienia. Dane w articles-seed.json
// (scalone: karta z /blog + treść bloków z /blog/[slug]).
//
// Uruchom z katalogu projektu (czyta DATABASE_URL z .env):
//   node prisma/seed-articles.mjs
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const dir = path.dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(fs.readFileSync(path.join(dir, 'articles-seed.json'), 'utf8'));

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

try {
	for (const a of seed) {
		const data = { ...a, publishedAt: new Date(a.publishedAt) };
		await prisma.article.upsert({ where: { slug: a.slug }, update: data, create: data });
		console.log(`  upsert ${a.featured ? '★' : ' '} ${a.slug}`);
	}
	const n = await prisma.article.count();
	console.log(`OK — w bazie ${n} artykułów`);
} finally {
	await prisma.$disconnect();
	await pool.end();
}
