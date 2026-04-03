<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';

	let { children } = $props();

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/inventory', label: 'Inventory' },
		{ href: '/services', label: 'Services' },
		{ href: '/contact', label: 'Contact' }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Navbar (hidden on admin pages) -->
<nav
	class="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm {page.url.pathname.startsWith('/admin') ? 'hidden' : ''}" style="border-bottom: 2px solid #dc2626;"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" onclick={closeMobileMenu}>
				<img src="/logo.png" alt="Jiyash Auto" class="h-10 w-auto object-contain" />
			</a>

			<!-- Right side: nav links + mobile menu button -->
			<div class="flex items-center gap-1">
				<!-- Desktop Nav Links -->
				{#each navLinks as link}
					<a
						href={link.href}
						class="hidden md:block px-4 py-2 rounded-lg text-sm font-medium transition-colors {isActive(link.href)
							? 'text-red-600 bg-red-50 dark:bg-red-950/40'
							: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}"
					>
						{link.label}
					</a>
				{/each}

				<!-- Mobile menu button -->
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="Toggle mobile menu"
				>
					{#if mobileMenuOpen}
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
			<div class="px-4 py-3 space-y-1">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={closeMobileMenu}
						class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors {isActive(link.href)
							? 'text-red-600 bg-red-50 dark:bg-red-950/40'
							: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>

<!-- Main content -->
<main class="min-h-screen">
	{@render children()}
</main>

<!-- Footer -->
<footer class="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<!-- Brand -->
			<div class="lg:col-span-1">
				<a href="/" class="inline-block mb-4">
					<span class="text-2xl font-extrabold tracking-tight text-white">JIYASH <span class="text-red-500">AUTO</span></span>
					<p class="text-xs text-gray-500 italic mt-0.5">don't dream it. just drive it!</p>
				</a>
				<p class="text-sm text-gray-400 leading-relaxed">
					Quality pre-owned vehicles in Cambridge, ON. Honest deals, trusted service.
				</p>
				<!-- Social links -->
				<div class="flex items-center gap-3 mt-4">
					<a
						href="https://www.facebook.com/jiyashauto/"
						target="_blank"
						rel="noopener noreferrer"
						class="w-8 h-8 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
						aria-label="Facebook"
					>
						<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
							/>
						</svg>
					</a>
					<a
						href="https://www.instagram.com/jiyashauto/"
						target="_blank"
						rel="noopener noreferrer"
						class="w-8 h-8 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
						aria-label="Instagram"
					>
						<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
							/>
						</svg>
					</a>
					<a
						href="https://twitter.com/jiyashauto"
						target="_blank"
						rel="noopener noreferrer"
						class="w-8 h-8 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
						aria-label="X (Twitter)"
					>
						<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
				<ul class="space-y-2 text-sm">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								class="text-gray-400 hover:text-red-500 transition-colors">{link.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Hours -->
			<div>
				<h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Hours</h3>
				<ul class="space-y-1.5 text-sm">
					<li class="flex justify-between gap-4">
						<span class="text-gray-400">Mon–Fri</span>
						<span class="text-white">9:00 AM – 5:30 PM</span>
					</li>
					<li class="flex justify-between gap-4">
						<span class="text-gray-400">Saturday</span>
						<span class="text-white">9:00 AM – 1:30 PM</span>
					</li>
					<li class="flex justify-between gap-4">
						<span class="text-gray-400">Sunday</span>
						<span class="text-gray-500">Closed</span>
					</li>
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
				<ul class="space-y-3 text-sm">
					<li class="flex items-start gap-2.5">
						<svg
							class="w-4 h-4 text-red-500 mt-0.5 shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span class="text-gray-400">1461 King Street East<br />Cambridge, ON N3H 3R3</span>
					</li>
					<li class="flex items-center gap-2.5">
						<svg
							class="w-4 h-4 text-red-500 shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
						<a href="tel:5196536222" class="text-gray-400 hover:text-red-500 transition-colors">
							(519) 653-6222
						</a>
					</li>
					<li class="flex items-center gap-2.5">
						<svg
							class="w-4 h-4 text-red-500 shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<a
							href="mailto:jiyashautosales@gmail.com"
							class="text-gray-400 hover:text-red-500 transition-colors break-all"
						>
							jiyashautosales@gmail.com
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="text-xs text-gray-500">
				© {new Date().getFullYear()} Jiyash Auto. All rights reserved.
			</p>
			<p class="text-xs text-gray-600">1461 King Street East, Cambridge, ON N3H 3R3</p>
		</div>
	</div>
</footer>
