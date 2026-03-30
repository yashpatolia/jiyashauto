import type { PageServerLoad } from './$types';
import db, { type ContactSubmission } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const submissions = db
		.prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC')
		.all() as ContactSubmission[];

	return { submissions };
};
