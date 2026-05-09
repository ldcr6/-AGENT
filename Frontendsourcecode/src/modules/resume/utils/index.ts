export function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

export function genUid(): string {
	return Math.random().toString(36).substr(2, 9) + Date.now();
}
