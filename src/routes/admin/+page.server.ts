import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const totalVehicles = (db.prepare('SELECT COUNT(*) as count FROM vehicles').get() as { count: number }).count;
	const activeListings = (db.prepare('SELECT COUNT(*) as count FROM vehicles WHERE is_sold = 0').get() as { count: number }).count;
	const soldVehicles = (db.prepare('SELECT COUNT(*) as count FROM vehicles WHERE is_sold = 1').get() as { count: number }).count;
	const totalSubmissions = (db.prepare('SELECT COUNT(*) as count FROM contact_submissions').get() as { count: number }).count;

	const recentVehicles = db
		.prepare('SELECT id, year, make, model, price, is_sold FROM vehicles ORDER BY created_at DESC LIMIT 5')
		.all() as { id: number; year: number; make: string; model: string; price: number; is_sold: number }[];

	const recentSubmissions = db
		.prepare('SELECT id, name, email, inquiry_type, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 5')
		.all() as { id: number; name: string; email: string; inquiry_type: string; created_at: string }[];

	return {
		stats: { totalVehicles, activeListings, soldVehicles, totalSubmissions },
		recentVehicles,
		recentSubmissions
	};
};
