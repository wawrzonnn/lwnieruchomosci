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

export function getUserById(id: number) {
	return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(
	id: number,
	data: { name: string; email: string; role: Role; password?: string }
) {
	const { password, ...rest } = data;
	return prisma.user.update({
		where: { id },
		data: password ? { ...rest, password: await bcrypt.hash(password, 12) } : rest
	});
}

export function deleteUsers(ids: number[]) {
	return prisma.user.deleteMany({ where: { id: { in: ids } } });
}
