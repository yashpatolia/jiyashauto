import type { Actions, PageServerLoad } from './$types';
import db, { type Vehicle } from '$lib/server/db';
import { fail, redirect, error } from '@sveltejs/kit';
import { unlink } from 'fs/promises';
import { join } from 'path';

export const load: PageServerLoad = async ({ params }) => {
	const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(params.id) as Vehicle | undefined;
	if (!vehicle) throw error(404, 'Vehicle not found');

	return {
		vehicle: {
			...vehicle,
			images: JSON.parse(vehicle.images || '[]') as string[]
		}
	};
};

export const actions: Actions = {
	save: async ({ request, params }) => {
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

		const duplicate = db.prepare('SELECT id FROM vehicles WHERE vin = ? AND id != ?').get(vin, params.id);
		if (duplicate) return fail(400, { error: `Another vehicle with VIN ${vin} already exists.` });

		const existing = db.prepare('SELECT images FROM vehicles WHERE id = ?').get(params.id) as { images: string } | undefined;
		if (existing) {
			const oldImages: string[] = JSON.parse(existing.images || '[]');
			const newImages: string[] = JSON.parse(images);
			for (const imgPath of oldImages) {
				if (!newImages.includes(imgPath)) {
					await unlink(join(process.cwd(), 'static', imgPath)).catch(() => {});
				}
			}
		}

		db.prepare(`
			UPDATE vehicles SET
				year=?, make=?, model=?, price=?, mileage=?, vin=?, description=?, images=?, is_sold=?, is_public=?,
				fuel_type=?, transmission=?, drive_type=?, ext_color=?, int_color=?, engine=?
			WHERE id=?
		`).run(year, make, model, price, mileage, vin, description, images, is_sold, is_public,
			   fuel_type, transmission, drive_type, ext_color, int_color, engine, params.id);

		throw redirect(302, '/admin');
	},

	delete: async ({ params }) => {
		const vehicle = db.prepare('SELECT images FROM vehicles WHERE id = ?').get(params.id) as { images: string } | undefined;

		if (vehicle) {
			const images: string[] = JSON.parse(vehicle.images || '[]');
			for (const imgPath of images) {
				// imgPath is like /uploads/filename.jpg — map to filesystem
				const filePath = join(process.cwd(), 'static', imgPath);
				await unlink(filePath).catch(() => {}); // ignore if already missing
			}
		}

		db.prepare('DELETE FROM vehicles WHERE id = ?').run(params.id);
		throw redirect(302, '/admin');
	},

	toggleSold: async ({ params }) => {
		const vehicle = db.prepare('SELECT is_sold FROM vehicles WHERE id = ?').get(params.id) as { is_sold: number } | undefined;
		if (!vehicle) return fail(404, { error: 'Vehicle not found' });
		db.prepare('UPDATE vehicles SET is_sold = ? WHERE id = ?').run(vehicle.is_sold ? 0 : 1, params.id);
		throw redirect(302, '/admin');
	}
};
