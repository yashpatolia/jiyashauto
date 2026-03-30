import type { PageServerLoad } from './$types';
import db, { type Vehicle } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const vehicle = db
		.prepare('SELECT * FROM vehicles WHERE id = ?')
		.get(params.id) as Vehicle | undefined;

	if (!vehicle || !vehicle.is_public) {
		throw error(404, 'Vehicle not found');
	}

	return {
		vehicle: {
			...vehicle,
			images: JSON.parse(vehicle.images || '[]') as string[]
		}
	};
};
