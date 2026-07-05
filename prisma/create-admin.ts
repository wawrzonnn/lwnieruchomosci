import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function upsertUser(email: string, password: string, name: string, role: 'ADMIN' | 'AGENT') {
	const hash = await bcrypt.hash(password, 12);
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		await prisma.user.update({ where: { email }, data: { password: hash, name, role } });
		console.log(`✅ Updated  [${role}] ${email}`);
	} else {
		await prisma.user.create({ data: { email, password: hash, name, role } });
		console.log(`✅ Created  [${role}] ${email}`);
	}
}

async function main() {
	await upsertUser('anna@lw.nieruchomosci.pl', 'admin123', 'Anna Wolska', 'ADMIN');
	await upsertUser('karolina@lw.nieruchomosci.pl', 'agent123', 'Karolina Nowak', 'AGENT');

	console.log('\n📋 Dane logowania:');
	console.log('   anna@lw.nieruchomosci.pl     / admin123 → Administrator');
	console.log('   karolina@lw.nieruchomosci.pl / agent123 → Agent');
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
