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
	<header class="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50" style="border-bottom: 2px solid #dc2626;">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<!-- Left: logo + admin nav -->
				<div class="flex items-center gap-6">
					<a href="/" class="flex items-center gap-2">
						<img src="/logo.png" alt="Jiyash Auto" class="h-10 w-auto object-contain" />
					</a>
					<div class="h-5 w-px bg-gray-200 dark:bg-gray-700"></div>
					<span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</span>
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
				<!-- Right: site links + sign out -->
				<div class="flex items-center gap-1">
					{#each [{ href: '/', label: 'Home' }, { href: '/inventory', label: 'Inventory' }, { href: '/services', label: 'Services' }, { href: '/contact', label: 'Contact' }] as link}
						<a href={link.href} class="hidden md:block px-3 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
							{link.label}
						</a>
					{/each}
					<div class="h-5 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden md:block"></div>
					<form action="/admin/logout" method="POST">
						<button type="submit" class="px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
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
