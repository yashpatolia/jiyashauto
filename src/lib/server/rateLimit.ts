interface RateLimitEntry {
	count: number;
	resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Periodically clean up expired entries to prevent unbounded memory growth
setInterval(() => {
	const now = Date.now();
	for (const [key, entry] of store) {
		if (entry.resetAt < now) store.delete(key);
	}
}, 60_000);

/**
 * Returns true if the request should be blocked.
 * @param key      Usually the client IP address
 * @param limit    Max requests allowed in the window
 * @param windowMs Window size in milliseconds
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
	const now = Date.now();
	const entry = store.get(key);

	if (!entry || entry.resetAt < now) {
		store.set(key, { count: 1, resetAt: now + windowMs });
		return false;
	}

	entry.count += 1;
	return entry.count > limit;
}
