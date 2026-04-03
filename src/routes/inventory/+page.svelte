<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let filterSearch = $state('');
	let filterMake = $state('');
	let filterMinPrice = $state('');
	let filterMaxPrice = $state('');
	let filterMinYear = $state('');
	let filterMaxYear = $state('');
	const showSold = $derived(data.showSold);

	const filtered = $derived(
		data.vehicles.filter((v) => {
			if (filterSearch) {
				const q = filterSearch.toLowerCase();
				const haystack = [v.year, v.make, v.model, v.ext_color, v.transmission, v.drive_type, v.fuel_type, v.engine]
					.join(' ')
					.toLowerCase();
				if (!haystack.includes(q)) return false;
			}
			if (filterMake && v.make !== filterMake) return false;
			if (filterMinPrice && v.price < Number(filterMinPrice)) return false;
			if (filterMaxPrice && v.price > Number(filterMaxPrice)) return false;
			if (filterMinYear && v.year < Number(filterMinYear)) return false;
			if (filterMaxYear && v.year > Number(filterMaxYear)) return false;
			return true;
		})
	);

	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(price);
	}

	function formatMileage(km: number) {
		return new Intl.NumberFormat('en-CA').format(km) + ' km';
	}

	function resetFilters() {
		filterSearch = '';
		filterMake = '';
		filterMinPrice = '';
		filterMaxPrice = '';
		filterMinYear = '';
		filterMaxYear = '';
	}

	function toggleSold() {
		const url = new URL(window.location.href);
		if (!showSold) {
			url.searchParams.set('showSold', 'true');
		} else {
			url.searchParams.delete('showSold');
		}
		window.location.href = url.toString();
	}

	const hasFilters = $derived(
		filterSearch || filterMake || filterMinPrice || filterMaxPrice || filterMinYear || filterMaxYear
	);
</script>

<svelte:head>
	<title>Inventory — Jiyash Auto</title>
	<meta name="description" content="Browse our selection of quality pre-owned vehicles at Jiyash Auto in Cambridge, ON." />
</svelte:head>

<!-- Page Header -->
<section class="bg-gray-900 dark:bg-gray-950 py-14 px-4 border-b border-gray-800">
	<div class="max-w-7xl mx-auto">
		<span class="text-red-500 font-semibold text-sm uppercase tracking-wider">Available Vehicles</span>
		<h1 class="text-4xl font-bold text-white mt-2 mb-2">Our Inventory</h1>
		<p class="text-gray-400">
			{filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
			{#if showSold} (including sold){/if}
		</p>
	</div>
</section>

<div class="min-h-screen bg-gray-50 dark:bg-gray-950">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Filters Sidebar -->
		<aside class="lg:w-64 shrink-0">
			<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-20">
				<div class="flex items-center justify-between mb-5">
					<h2 class="font-semibold text-gray-900 dark:text-white">Filters</h2>
					{#if hasFilters}
						<button onclick={resetFilters} class="text-xs text-red-600 hover:text-red-700 font-medium">
							Clear all
						</button>
					{/if}
				</div>

				<div class="space-y-5">
					<!-- Keyword Search -->
					<div>
						<label for="filter-search" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
							Search
						</label>
						<div class="relative">
							<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input
								id="filter-search"
								type="text"
								bind:value={filterSearch}
								placeholder="e.g. black RAV4, AWD..."
								class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
						</div>
					</div>

					<!-- Make -->
					<div>
						<label for="filter-make" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
							Make
						</label>
						<select
							id="filter-make"
							bind:value={filterMake}
							class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
						>
							<option value="">All Makes</option>
							{#each data.makes as make}
								<option value={make}>{make}</option>
							{/each}
						</select>
					</div>

					<!-- Price Range -->
					<div>
						<span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
							Price Range
						</span>
						<div class="flex gap-2">
							<input
								type="number"
								aria-label="Minimum price"
								bind:value={filterMinPrice}
								placeholder="Min"
								class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
							<input
								type="number"
								aria-label="Maximum price"
								bind:value={filterMaxPrice}
								placeholder="Max"
								class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
						</div>
					</div>

					<!-- Year Range -->
					<div>
						<span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
							Year Range
						</span>
						<div class="flex gap-2">
							<input
								type="number"
								aria-label="Minimum year"
								bind:value={filterMinYear}
								placeholder="From"
								class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
							<input
								type="number"
								aria-label="Maximum year"
								bind:value={filterMaxYear}
								placeholder="To"
								class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
						</div>
					</div>

					<!-- Show Sold toggle -->
					<div class="pt-2 border-t border-gray-200 dark:border-gray-700">
						<button
							onclick={toggleSold}
							class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
						>
							<div class="w-9 h-5 rounded-full relative transition-colors {showSold ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-700'}">
								<div class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform {showSold ? 'translate-x-4' : ''}"></div>
							</div>
							Show Sold Vehicles
						</button>
					</div>
				</div>
			</div>
		</aside>

		<!-- Vehicle Grid -->
		<div class="flex-1">
			{#if filtered.length === 0}
				<div class="text-center py-20">
					<div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No vehicles found</h3>
					<p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Try adjusting your filters.</p>
					<button onclick={resetFilters} class="text-red-600 font-medium hover:text-red-700 text-sm">Clear filters</button>
				</div>
			{:else}
				<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
					{#each filtered as vehicle (vehicle.id)}
						<a
							href="/inventory/{vehicle.id}"
							class="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-300 dark:hover:border-red-800 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
						>
							<!-- Image -->
							<div class="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
								{#if vehicle.images && vehicle.images.length > 0}
									<img
										src={vehicle.images[0]}
										alt="{vehicle.year} {vehicle.make} {vehicle.model}"
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								{:else}
									<div class="w-full h-full flex items-center justify-center">
										<svg class="w-20 h-20 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
											<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
										</svg>
									</div>
								{/if}
								{#if vehicle.is_sold}
									<div class="absolute top-3 left-3">
										<span class="bg-gray-900/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Sold</span>
									</div>
								{/if}
								{#if vehicle.images && vehicle.images.length > 1}
									<div class="absolute bottom-3 right-3">
										<span class="bg-black/60 text-white text-xs px-2 py-1 rounded-full">+{vehicle.images.length - 1} photos</span>
									</div>
								{/if}
							</div>

							<!-- Info -->
							<div class="p-5">
								<div class="flex items-start justify-between gap-2 mb-3">
									<div>
										<h3 class="font-semibold text-gray-900 dark:text-white text-base leading-tight">
											{vehicle.year} {vehicle.make} {vehicle.model}
										</h3>
									</div>
									<div class="text-lg font-bold text-red-600 shrink-0">
										{formatPrice(vehicle.price)}
									</div>
								</div>
								<div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
									<div class="flex items-center gap-1.5">
										<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
										</svg>
										{formatMileage(vehicle.mileage)}
									</div>
									<div class="flex items-center gap-1.5">
										<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										{vehicle.year}
									</div>
								</div>
								<div class="mt-4 flex items-center justify-between">
									{#if vehicle.body_type}
										<span class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{vehicle.body_type}</span>
									{:else}
										<span></span>
									{/if}
									<span class="text-xs text-red-600 font-medium group-hover:underline">View Details →</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
</div>
