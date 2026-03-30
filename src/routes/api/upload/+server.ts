import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';

const UPLOADS_DIR = join(process.cwd(), 'static', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.admin) {
		throw error(403, 'Unauthorized');
	}

	// Ensure uploads directory exists
	if (!existsSync(UPLOADS_DIR)) {
		await mkdir(UPLOADS_DIR, { recursive: true });
	}

	const formData = await request.formData();
	const files = formData.getAll('files') as File[];

	if (!files.length) {
		throw error(400, 'No files provided');
	}

	const paths: string[] = [];

	for (const file of files) {
		if (!ALLOWED_TYPES.includes(file.type)) {
			throw error(400, `File type ${file.type} is not allowed`);
		}

		if (file.size > MAX_FILE_SIZE) {
			throw error(400, `File ${file.name} exceeds 10MB limit`);
		}

		const ext = extname(file.name).toLowerCase() || '.jpg';
		const filename = `${randomUUID()}${ext}`;
		const filePath = join(UPLOADS_DIR, filename);

		const buffer = Buffer.from(await file.arrayBuffer());
		await writeFile(filePath, buffer);

		paths.push(`/uploads/${filename}`);
	}

	return json({ paths });
};
