import type { Actions, PageServerLoad } from './$types';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '$env/static/private';
import { createSessionToken } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.admin) {
		throw redirect(302, '/admin');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = (data.get('username') as string)?.trim();
		const password = data.get('password') as string;

		if (!username || !password) {
			return fail(400, { error: 'Please enter your credentials.' });
		}

		if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
			// Delay to slow brute-force attempts
			await new Promise((r) => setTimeout(r, 500));
			return fail(401, { error: 'Invalid username or password.' });
		}

		const token = createSessionToken(username);

		cookies.set('admin_session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 // 24 hours
		});

		throw redirect(302, '/admin');
	}
};
