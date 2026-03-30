import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const year = parseInt(data.get('year') as string);
		const make = (data.get('make') as string)?.trim();
		const model = (data.get('model') as string)?.trim();
		const price = parseFloat(data.get('price') as string);
		const mileage = parseInt(data.get('mileage') as string);
		const vin = (data.get('vin') as string)?.trim().toUpperCase();
		const description = (data.get('description') as string)?.trim() ?? '';
		const images = (data.get('images') as string) ?? '[]';
		const is_sold = data.get('is_sold') === '1' ? 1 : 0;
		const is_public = data.get('is_public') === '1' ? 1 : 0;
		const fuel_type = (data.get('fuel_type') as string)?.trim() ?? '';
		const transmission = (data.get('transmission') as string)?.trim() ?? '';
		const drive_type = (data.get('drive_type') as string)?.trim() ?? '';
		const ext_color = (data.get('ext_color') as string)?.trim() ?? '';
		const int_color = (data.get('int_color') as string)?.trim() ?? '';
		const engine = (data.get('engine') as string)?.trim() ?? '';

		if (!year || isNaN(year)) return fail(400, { error: 'Invalid year.' });
		if (!make) return fail(400, { error: 'Make is required.' });
		if (!model) return fail(400, { error: 'Model is required.' });
		if (!price || isNaN(price)) return fail(400, { error: 'Invalid price.' });
		if (!mileage || isNaN(mileage)) return fail(400, { error: 'Invalid mileage.' });
		if (!vin) return fail(400, { error: 'VIN is required.' });

		const existing = db.prepare('SELECT id FROM vehicles WHERE vin = ?').get(vin);
		if (existing) return fail(400, { error: `A vehicle with VIN ${vin} already exists.` });

		db.prepare(`
			INSERT INTO vehicles
				(year, make, model, price, mileage, vin, description, images, is_sold, is_public,
				 fuel_type, transmission, drive_type, ext_color, int_color, engine)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`).run(year, make, model, price, mileage, vin, description, images, is_sold, is_public,
			   fuel_type, transmission, drive_type, ext_color, int_color, engine);

		throw redirect(302, '/admin');
	}
};
