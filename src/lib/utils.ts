export function formatPrice(price: number): string {
	return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(price) + ' zł';
}

export function formatArea(area: number): string {
	const formatted = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 1 }).format(area);
	return `${formatted} m²`;
}

export function pricePerM2(price: number, area?: number | null): string | null {
	if (!area || area <= 0) return null;
	return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(price / area) + ' zł/m²';
}

export const CATEGORY_LABELS: Record<string, string> = {
	MIESZKANIE: 'Mieszkanie',
	DOM: 'Dom',
	DZIALKA: 'Działka',
	LOKAL: 'Lokal'
};

export const CATEGORY_LABELS_PLURAL: Record<string, string> = {
	MIESZKANIE: 'Mieszkania',
	DOM: 'Domy',
	DZIALKA: 'Działki',
	LOKAL: 'Lokale'
};

export const STATUS_LABELS: Record<string, string> = {
	ACTIVE: 'Aktywna',
	DRAFT: 'Szkic',
	RESERVED: 'Zarezerwowana',
	SOLD: 'Sprzedana'
};

export const TRANSACTION_LABELS: Record<string, string> = {
	SPRZEDAZ: 'Sprzedaż',
	WYNAJEM: 'Wynajem',
	DZIERZAWA: 'Dzierżawa'
};

export const MARKET_LABELS: Record<string, string> = {
	WTORNY: 'Wtórny',
	PIERWOTNY: 'Pierwotny'
};

export const CONDITION_LABELS: Record<string, string> = {
	DO_ZAMIESZKANIA: 'Do zamieszkania',
	DO_ODSWIEZENIA: 'Do odświeżenia',
	DO_REMONTU: 'Do remontu',
	DEWELOPERSKI: 'Deweloperski',
	SUROWY_ZAMKNIETY: 'Surowy zamknięty'
};

export const HEATING_LABELS: Record<string, string> = {
	MIEJSKIE: 'Miejskie',
	GAZOWE: 'Gazowe',
	POMPA_CIEPLA: 'Pompa ciepła',
	ELEKTRYCZNE: 'Elektryczne',
	KOMINKOWE: 'Kominkowe'
};

export const AMENITIES: string[] = [
	'Balkon',
	'Taras',
	'Ogród',
	'Garaż',
	'Miejsce postojowe',
	'Winda',
	'Piwnica',
	'Klimatyzacja',
	'Ogrzewanie miejskie',
	'Kominek',
	'Umeblowane',
	'Monitoring',
	'Ochrona',
	'Nowe budownictwo'
];

export const INQUIRY_TYPE_LABELS: Record<string, string> = {
	OFFER: 'Zgłoszenie oferty',
	SEARCH: 'Poszukiwanie'
};

export const INQUIRY_STATUS_LABELS: Record<string, string> = {
	NEW: 'Nowe',
	IN_PROGRESS: 'W toku',
	DONE: 'Obsłużone'
};

export const INQUIRY_STATUS_FLOW: Record<string, string> = {
	NEW: 'IN_PROGRESS',
	IN_PROGRESS: 'DONE',
	DONE: 'NEW'
};

export function locationLabel(city: string, district?: string | null): string {
	return district ? `${city}, ${district}` : city;
}

export function initials(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.slice(0, 2)
		.join('')
		.toUpperCase();
}

const DIACRITICS = new RegExp('[̀-ͯ]', 'g');

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(DIACRITICS, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
