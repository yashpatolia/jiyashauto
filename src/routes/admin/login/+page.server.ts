import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const errors: Record<string, string> = {
	denied: 'That Google account is not authorized to access the admin dashboard.',
	failed: 'Google sign-in failed. Please try again.'
};

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.admin) {
		throw redirect(302, '/admin');
	}
	return { error: errors[url.searchParams.get('error') ?? ''] ?? null };
};
