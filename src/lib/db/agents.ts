import { prisma } from './prisma';

/** Agenci do listy w panelu — także wyłączeni, żeby dało się ich z powrotem włączyć. */
export function getAllAgents() {
	return prisma.agent.findMany({
		orderBy: [{ order: 'asc' }, { imie: 'asc' }],
		include: { _count: { select: { listings: true } } }
	});
}

/** Agenci do wyboru w formularzu oferty — tylko aktywni. */
export function getActiveAgents() {
	return prisma.agent.findMany({
		where: { aktywny: true },
		orderBy: [{ order: 'asc' }, { imie: 'asc' }]
	});
}

export function getAgentById(id: number) {
	return prisma.agent.findUnique({ where: { id } });
}

export interface AgentData {
	imie: string;
	rola: string | null;
	telefon: string;
	image: string | null;
	aktywny: boolean;
	order: number;
}

export function createAgent(data: AgentData) {
	return prisma.agent.create({ data });
}

export function updateAgent(id: number, data: AgentData) {
	return prisma.agent.update({ where: { id }, data });
}

/**
 * Kasowanie agenta. Oferty zostają — relacja ma onDelete: SetNull, więc tracą
 * tylko przypisanie. Zwracamy liczbę osieroconych ofert, żeby panel mógł o tym
 * powiedzieć wprost zamiast po cichu je odpiąć.
 */
export async function deleteAgent(id: number) {
	const osierocone = await prisma.listing.count({ where: { agentId: id } });
	await prisma.agent.delete({ where: { id } });
	return { osierocone };
}
