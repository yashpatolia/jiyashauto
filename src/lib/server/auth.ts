import { ADMIN_SECRET } from '$env/static/private';
import { createHmac, timingSafeEqual } from 'crypto';

export function createSessionToken(username: string): string {
	const timestamp = Date.now().toString();
	const payload = `${username}:${timestamp}`;
	const hmac = createHmac('sha256', ADMIN_SECRET);
	hmac.update(payload);
	const signature = hmac.digest('hex');
	return Buffer.from(`${payload}:${signature}`).toString('base64url');
}

export function validateSessionToken(token: string): boolean {
	try {
		const decoded = Buffer.from(token, 'base64url').toString('utf-8');
		// Format: username:timestamp:signature
		const lastColon = decoded.lastIndexOf(':');
		const secondLastColon = decoded.lastIndexOf(':', lastColon - 1);

		if (lastColon === -1 || secondLastColon === -1) return false;

		const username = decoded.substring(0, secondLastColon);
		const timestamp = decoded.substring(secondLastColon + 1, lastColon);
		const signature = decoded.substring(lastColon + 1);

		// Token expires after 24 hours
		const age = Date.now() - parseInt(timestamp);
		if (isNaN(age) || age > 24 * 60 * 60 * 1000) return false;

		const hmac = createHmac('sha256', ADMIN_SECRET);
		hmac.update(`${username}:${timestamp}`);
		const expected = hmac.digest('hex');

		// Use timing-safe comparison to prevent timing attacks
		const sigBuf = Buffer.from(signature, 'hex');
		const expBuf = Buffer.from(expected, 'hex');
		if (sigBuf.length !== expBuf.length) return false;

		return timingSafeEqual(sigBuf, expBuf);
	} catch {
		return false;
	}
}
