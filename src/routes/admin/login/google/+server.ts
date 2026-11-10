import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { randomBytes } from 'crypto';
import { buildAuthUrl } from '$lib/server/google';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const state = randomBytes(24).toString('base64url');

	cookies.set('oauth_state', state, {
		path: '/admin/login/google',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 10
	});

	throw redirect(302, buildAuthUrl(url, state));
};
