import type { PageServerLoad } from './$types';
import db, { type Vehicle } from '$lib/server/db';

export const load: PageServerLoad = async ({ url }) => {
	const showSold = url.searchParams.get('showSold') === 'true';

	const vehicles = db
		.prepare(
			showSold
				? 'SELECT * FROM vehicles WHERE is_public = 1 ORDER BY created_at DESC'
				: 'SELECT * FROM vehicles WHERE is_public = 1 AND is_sold = 0 ORDER BY created_at DESC'
		)
		.all() as Vehicle[];

	// Parse images JSON
	const parsed = vehicles.map((v) => ({
		...v,
		images: JSON.parse(v.images || '[]') as string[]
	}));

	// Get unique makes for filter (public only)
	const makes = db
		.prepare('SELECT DISTINCT make FROM vehicles WHERE is_public = 1 ORDER BY make ASC')
		.all() as { make: string }[];

	return {
		vehicles: parsed,
		makes: makes.map((m) => m.make),
		showSold
	};
};
