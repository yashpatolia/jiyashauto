import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('admin_session', { path: '/' });
	throw redirect(302, '/admin/login');
};
