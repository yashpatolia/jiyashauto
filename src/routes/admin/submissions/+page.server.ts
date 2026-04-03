import type { PageServerLoad, Actions } from './$types';
import db, { type ContactSubmission } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const submissions = db
		.prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC')
		.all() as ContactSubmission[];

	return { submissions };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id') as string);
		if (!id || isNaN(id)) return fail(400, { error: 'Invalid ID' });
		db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(id);
		return { success: true };
	}
};
