import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { isRateLimited } from '$lib/server/rateLimit';

export const load: PageServerLoad = async ({ url }) => {
	return {
		inquiry: url.searchParams.get('inquiry') || '',
		vehicle: url.searchParams.get('vehicle') || ''
	};
};

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const ip = getClientAddress();

		// 5 submissions per IP per 10 minutes
		if (isRateLimited(ip, 5, 10 * 60 * 1000)) {
			return fail(429, { error: 'Too many submissions. Please try again later.' });
		}

		const data = await request.formData();

		// Honeypot: bots fill this hidden field, humans don't see it
		if (data.get('website')) {
			return { success: true };
		}

		const name = (data.get('name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const phone = (data.get('phone') as string)?.trim() ?? '';
		const inquiry_type = (data.get('inquiry_type') as string)?.trim();
		const message = (data.get('message') as string)?.trim();

		// Basic validation
		if (!name || name.length < 2) {
			return fail(400, { error: 'Please enter your full name.', values: { name, email, phone, inquiry_type, message } });
		}
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', values: { name, email, phone, inquiry_type, message } });
		}
		if (!inquiry_type) {
			return fail(400, { error: 'Please select an inquiry type.', values: { name, email, phone, inquiry_type, message } });
		}
		if (!message || message.length < 10) {
			return fail(400, { error: 'Please enter a message (at least 10 characters).', values: { name, email, phone, inquiry_type, message } });
		}

		db.prepare(
			'INSERT INTO contact_submissions (name, email, phone, inquiry_type, message) VALUES (?, ?, ?, ?, ?)'
		).run(name, email, phone, inquiry_type, message);

		return { success: true };
	}
};
