import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';
import db from '$lib/server/db';

const UPLOADS_DIR = join(process.cwd(), 'static', 'uploads');

export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.admin) {
		throw error(403, 'Unauthorized');
	}

	const vehicles = db.prepare('SELECT images FROM vehicles').all() as { images: string }[];

	const usedFiles = new Set<string>();
	for (const v of vehicles) {
		const images: string[] = JSON.parse(v.images || '[]');
		for (const imgPath of images) {
			usedFiles.add(imgPath.replace('/uploads/', ''));
		}
	}

	let files: string[];
	try {
		files = await readdir(UPLOADS_DIR);
	} catch {
		return json({ deleted: 0 });
	}

	let deleted = 0;
	for (const file of files) {
		if (!usedFiles.has(file)) {
			await unlink(join(UPLOADS_DIR, file)).catch(() => {});
			deleted++;
		}
	}

	return json({ deleted });
};
