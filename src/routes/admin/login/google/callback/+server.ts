import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { createSessionToken } from '$lib/server/auth';
import { fetchGoogleEmail, isAllowedAdmin } from '$lib/server/google';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const savedState = cookies.get('oauth_state');
	cookies.delete('oauth_state', { path: '/admin/login/google' });

	if (url.searchParams.get('error') || !code || !state || state !== savedState) {
		throw redirect(302, '/admin/login?error=failed');
	}

	const email = await fetchGoogleEmail(url, code);
	if (!email) {
		throw redirect(302, '/admin/login?error=failed');
	}
	if (!isAllowedAdmin(email)) {
		throw redirect(302, '/admin/login?error=denied');
	}

	cookies.set('admin_session', createSessionToken(email), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 // 24 hours
	});

	throw redirect(302, '/admin');
};
