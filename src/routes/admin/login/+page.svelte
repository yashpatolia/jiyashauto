<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin Login | Jiyash Auto</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<!-- Logo -->
		<div class="text-center mb-8">
			<div class="inline-block bg-white rounded-2xl px-4 py-3 mb-3 shadow-sm">
				<img src="/logo.png" alt="Jiyash Auto" class="h-14 w-auto object-contain" />
			</div>
			<p class="text-sm text-gray-500 dark:text-gray-400">Admin Dashboard</p>
		</div>

		<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
			<h1 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Sign In</h1>

			{#if data.error}
				<div class="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-3 mb-5 text-sm">
					<svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					{data.error}
				</div>
			{/if}

			<a
				href="/admin/login/google"
				data-sveltekit-reload
				class="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
			>
				<svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
					<path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 01-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
					<path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.27v3.1A12 12 0 0012 24z" />
					<path fill="#FBBC05" d="M5.29 14.29a7.2 7.2 0 010-4.58v-3.1H1.27a12 12 0 000 10.78l4.02-3.1z" />
					<path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.61l4.02 3.1C6.23 6.86 8.88 4.75 12 4.75z" />
				</svg>
				Sign in with Google
			</a>
		</div>

		<div class="text-center mt-6">
			<a href="/" class="text-sm text-gray-500 hover:text-red-600 transition-colors">← Back to website</a>
		</div>
	</div>
</div>
