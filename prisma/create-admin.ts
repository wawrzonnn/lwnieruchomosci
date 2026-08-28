// Zakładanie / resetowanie konta panelu.
//
// Skrypt miał wcześniej zaszyte konta demo (anna@…/admin123, karolina@…/agent123),
// przez co `npm run admin` potrafił je wskrzesić na produkcji. Teraz dane podaje
// się z zewnątrz, a hasło czytamy z terminala, żeby nie zostawało w historii powłoki.
//
//   npm run admin -- biuro@lw.nieruchomosci.pl "Lucyna Wojtoń" ADMIN
//
// Hasło można też podać w ADMIN_PASSWORD (przydatne w skryptach CI/deployu).

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
	const [email, name, roleArg] = process.argv.slice(2);
	const role = (roleArg ?? 'ADMIN').toUpperCase() as 'ADMIN' | 'AGENT';

	if (!email || !name) {
		console.error('Użycie: npm run admin -- <e-mail> "<imię i nazwisko>" [ADMIN|AGENT]');
		process.exit(1);
	}
	if (role !== 'ADMIN' && role !== 'AGENT') {
		console.error(`Nieznana rola: ${roleArg}. Dozwolone: ADMIN, AGENT.`);
		process.exit(1);
	}

	let password = process.env.ADMIN_PASSWORD ?? '';
	if (!password) {
		const rl = readline.createInterface({ input: stdin, output: stdout });
		password = (await rl.question(`Hasło dla ${email}: `)).trim();
		rl.close();
	}
	if (password.length < 10) {
		console.error('Hasło musi mieć co najmniej 10 znaków.');
		process.exit(1);
	}

	const hash = await bcrypt.hash(password, 12);
	const existing = await prisma.user.findUnique({ where: { email } });

	if (existing) {
		await prisma.user.update({ where: { email }, data: { password: hash, name, role } });
		console.log(`Zaktualizowano [${role}] ${email}`);
	} else {
		await prisma.user.create({ data: { email, password: hash, name, role } });
		console.log(`Utworzono [${role}] ${email}`);
	}
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
