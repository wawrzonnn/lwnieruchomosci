import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import type { Role } from '@prisma/client';

export function getAllUsers() {
	return prisma.user.findMany({ orderBy: { createdAt: 'asc' } });
}

export function getUserByEmail(email: string) {
	return prisma.user.findUnique({ where: { email } });
}

export async function verifyPassword(email: string, password: string) {
	const user = await getUserByEmail(email);
	if (!user) return null;
	const valid = await bcrypt.compare(password, user.password);
	return valid ? user : null;
}

export async function createUser(data: { email: string; password: string; name: string; role: Role }) {
	const hash = await bcrypt.hash(data.password, 12);
	return prisma.user.create({ data: { ...data, password: hash } });
}
