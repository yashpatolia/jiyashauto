<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(price);
	}

	function formatDate(dateStr: string) {
		return new Date(dateStr + 'Z').toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	const statCards = $derived([
		{ label: 'Total Vehicles', value: data.stats.totalVehicles, color: 'blue' },
		{ label: 'Active Listings', value: data.stats.activeListings, color: 'green' },
		{ label: 'Sold Vehicles', value: data.stats.soldVehicles, color: 'gray' },
		{ label: 'Inquiries', value: data.stats.totalSubmissions, color: 'red' }
	]);
</script>

<svelte:head>
	<title>Dashboard — Jiyash Auto Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Page title -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
			<p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back to Jiyash Auto admin.</p>
		</div>
		<a href="/admin/vehicles/new" class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors">
			<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
			Add Vehicle
		</a>
	</div>

	<!-- Stats -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
		{#each statCards as card}
			<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
				<div class="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{card.value}</div>
				<div class="text-sm text-gray-500 dark:text-gray-400">{card.label}</div>
			</div>
		{/each}
	</div>

	<div class="grid lg:grid-cols-2 gap-8">
		<!-- Recent Vehicles -->
		<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
				<h2 class="font-semibold text-gray-900 dark:text-white">Recent Listings</h2>
				<a href="/inventory" target="_blank" class="text-xs text-red-600 hover:text-red-700 font-medium">View All →</a>
			</div>
			<div class="divide-y divide-gray-100 dark:divide-gray-800">
				{#each data.recentVehicles as v}
					<div class="flex items-center justify-between px-6 py-3.5">
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
								<svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
									<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
								</svg>
							</div>
							<div>
								<div class="text-sm font-medium text-gray-900 dark:text-white">{v.year} {v.make} {v.model}</div>
								<div class="text-xs text-gray-500">{formatPrice(v.price)}</div>
							</div>
						</div>
					<div class="flex items-center gap-2">
							{#if !v.is_public}
								<span class="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">Private</span>
							{/if}
							{#if v.is_sold}
								<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">Sold</span>
							{:else}
								<span class="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Active</span>
							{/if}
							<a href="/admin/vehicles/{v.id}/edit" class="text-xs text-red-600 hover:text-red-700 font-medium">Edit</a>
						</div>
					</div>
				{:else}
					<div class="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No vehicles yet.</div>
				{/each}
			</div>
		</div>

		<!-- Recent Submissions -->
		<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
				<h2 class="font-semibold text-gray-900 dark:text-white">Recent Inquiries</h2>
				<a href="/admin/submissions" class="text-xs text-red-600 hover:text-red-700 font-medium">View All →</a>
			</div>
			<div class="divide-y divide-gray-100 dark:divide-gray-800">
				{#each data.recentSubmissions as s}
					<div class="flex items-center justify-between px-6 py-3.5">
						<div>
							<div class="text-sm font-medium text-gray-900 dark:text-white">{s.name}</div>
							<div class="text-xs text-gray-500">{s.email} · {s.inquiry_type}</div>
						</div>
						<div class="text-xs text-gray-400">{formatDate(s.created_at)}</div>
					</div>
				{:else}
					<div class="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No submissions yet.</div>
				{/each}
			</div>
		</div>
	</div>
</div>
