import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename } from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';

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

		const filename = `${randomUUID()}.webp`;
		const filePath = join(UPLOADS_DIR, filename);

		const buffer = Buffer.from(await file.arrayBuffer());
		const processed = await sharp(buffer)
			.resize({ width: 1200, withoutEnlargement: true })
			.webp({ quality: 82 })
			.toBuffer();
		await writeFile(filePath, processed);

		paths.push(`/uploads/${filename}`);
	}

	return json({ paths });
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	if (!locals.admin) {
		throw error(403, 'Unauthorized');
	}

	const { path } = await request.json() as { path: string };

	// Only allow deleting files within /uploads/
	if (!path || !path.startsWith('/uploads/')) {
		throw error(400, 'Invalid path');
	}

	const filename = basename(path);
	const filePath = join(UPLOADS_DIR, filename);

	await unlink(filePath).catch(() => {});

	return json({ ok: true });
};
