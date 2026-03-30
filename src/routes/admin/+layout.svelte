<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', exact: true },
		{ href: '/admin/vehicles/new', label: 'Add Vehicle' },
		{ href: '/admin/submissions', label: 'Submissions' }
	];

	function isActive(href: string, exact: boolean) {
		if (exact) return page.url.pathname === href;
		return page.url.pathname.startsWith(href);
	}
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-950">
	<!-- Admin top bar -->
	<header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-14">
				<div class="flex items-center gap-6">
					<a href="/admin" class="flex items-center gap-3">
						<div class="bg-white dark:bg-white rounded-lg px-1.5 py-0.5">
							<img src="/logo.png" alt="Jiyash Auto" class="h-7 w-auto object-contain" />
						</div>
						<span class="font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Admin</span>
					</a>
					<nav class="hidden sm:flex items-center gap-1">
						{#each navItems as item}
							<a
								href={item.href}
								class="px-3 py-1.5 rounded-lg text-sm transition-colors {isActive(item.href, item.exact ?? false)
									? 'bg-red-50 dark:bg-red-950/40 text-red-600'
									: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}"
							>
								{item.label}
							</a>
						{/each}
					</nav>
				</div>
				<div class="flex items-center gap-3">
					<a href="/" target="_blank" class="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
						View Site ↗
					</a>
					<form action="/admin/logout" method="POST">
						<button type="submit" class="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors">
							Sign Out
						</button>
					</form>
				</div>
			</div>
		</div>
	</header>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>
</div>
