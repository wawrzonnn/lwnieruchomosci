import { prisma } from './prisma';
import type { InquiryStatus, InquiryType } from '@prisma/client';

export function getAllInquiries() {
	return prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, include: { listing: true } });
}

export function getNewInquiriesCount() {
	return prisma.inquiry.count({ where: { status: 'NEW' } });
}

export function createInquiry(data: {
	type: InquiryType;
	name: string;
	message: string;
	contact: string;
	subject?: string;
	listingId?: number;
}) {
	return prisma.inquiry.create({ data });
}

export function updateInquiryStatus(id: number, status: InquiryStatus) {
	return prisma.inquiry.update({ where: { id }, data: { status } });
}
