import { env } from '$env/dynamic/private';

export function redirectUri(url: URL): string {
	const base = (env.SITE_URL || url.origin).replace(/\/$/, '');
	return `${base}/admin/login/google/callback`;
}

export function buildAuthUrl(url: URL, state: string): string {
	const params = new URLSearchParams({
		client_id: env.GOOGLE_CLIENT_ID,
		redirect_uri: redirectUri(url),
		response_type: 'code',
		scope: 'openid email',
		state,
		prompt: 'select_account'
	});
	return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function fetchGoogleEmail(url: URL, code: string): Promise<string | null> {
	const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			code,
			client_id: env.GOOGLE_CLIENT_ID,
			client_secret: env.GOOGLE_CLIENT_SECRET,
			redirect_uri: redirectUri(url),
			grant_type: 'authorization_code'
		})
	});
	if (!tokenRes.ok) return null;
	const { access_token } = await tokenRes.json();
	if (!access_token) return null;

	const infoRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	if (!infoRes.ok) return null;
	const info = await infoRes.json();
	if (!info.email || info.email_verified !== true) return null;
	return String(info.email).toLowerCase();
}

export function isAllowedAdmin(email: string): boolean {
	const allowed = (env.ADMIN_EMAILS || '')
		.split(',')
		.map((e) => e.trim().toLowerCase())
		.filter(Boolean);
	return allowed.includes(email);
}
