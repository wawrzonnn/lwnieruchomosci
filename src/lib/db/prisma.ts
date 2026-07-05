import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { env } from '$env/dynamic/private';

// DATABASE_URL czytany w runtime (nie zapiekany w buildzie) — bezpieczne dla
// serverless na Netlify: zmienna środowiskowa działa bez ponownego buildu.
const pool = new pg.Pool({
	connectionString: env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
