<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const vehicle = $derived(data.vehicle);

	let activeImage = $state(0);
	let lightboxOpen = $state(false);

	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(price);
	}

	function formatMileage(km: number) {
		return new Intl.NumberFormat('en-CA').format(km) + ' km';
	}

	function prevImage() {
		activeImage = (activeImage - 1 + vehicle.images.length) % vehicle.images.length;
	}

	function nextImage() {
		activeImage = (activeImage + 1) % vehicle.images.length;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'ArrowLeft') prevImage();
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'Escape') lightboxOpen = false;
	}
</script>

<svelte:head>
	<title>{vehicle.year} {vehicle.make} {vehicle.model} — Jiyash Auto</title>
	<meta name="description" content="View details for this {vehicle.year} {vehicle.make} {vehicle.model} at Jiyash Auto in Cambridge, ON. Priced at {formatPrice(vehicle.price)}." />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<!-- Lightbox -->
{#if lightboxOpen && vehicle.images.length > 0}
	<div
		class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
		onclick={() => (lightboxOpen = false)}
		role="dialog"
		aria-modal="true"
		aria-label="Image gallery"
	>
		<button
			class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
			onclick={() => (lightboxOpen = false)}
			aria-label="Close"
		>
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div class="relative max-w-5xl w-full mx-4" onclick={(e) => e.stopPropagation()}>
			<img
				src={vehicle.images[activeImage]}
				alt="{vehicle.year} {vehicle.make} {vehicle.model} — photo {activeImage + 1}"
				class="w-full max-h-[80vh] object-contain rounded-xl"
			/>
			{#if vehicle.images.length > 1}
				<button onclick={prevImage} class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors">
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button onclick={nextImage} class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors">
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button>
				<div class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
					{activeImage + 1} / {vehicle.images.length}
				</div>
			{/if}
		</div>
	</div>
{/if}

<!-- Breadcrumb -->
<div class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
	<div class="w-full px-8 sm:px-14 lg:px-24">
		<nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
			<a href="/" class="hover:text-red-600 transition-colors">Home</a>
			<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
			<a href="/inventory" class="hover:text-red-600 transition-colors">Inventory</a>
			<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
			<span class="text-gray-900 dark:text-white font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
		</nav>
	</div>
</div>

<div class="w-full px-8 sm:px-14 lg:px-24 py-10">
	<div class="grid lg:grid-cols-5 gap-10">
		<!-- Left: Gallery -->
		<div class="lg:col-span-3">
			<!-- Main image -->
			<div class="relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden" style="height: clamp(400px, 45vw, 680px);">
				{#if vehicle.images.length > 0}
					<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
					<img
						src={vehicle.images[activeImage]}
						alt="{vehicle.year} {vehicle.make} {vehicle.model}"
						class="w-full h-full object-cover cursor-zoom-in"
						onclick={() => (lightboxOpen = true)}
					/>
					{#if vehicle.images.length > 1}
						<button onclick={prevImage} class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button onclick={nextImage} class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</button>
						<div class="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
							{activeImage + 1} / {vehicle.images.length}
						</div>
					{/if}
					{#if vehicle.is_sold}
						<div class="absolute top-3 left-3">
							<span class="bg-gray-900/90 text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Sold</span>
						</div>
					{/if}
				{:else}
					<div class="w-full h-full flex flex-col items-center justify-center text-gray-300 dark:text-gray-600 gap-3">
						<svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
							<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
						</svg>
						<p class="text-sm">No photos available</p>
					</div>
				{/if}
			</div>

			<!-- Thumbnails -->
			{#if vehicle.images.length > 1}
				<div class="mt-3 flex gap-2 overflow-x-auto pb-2">
					{#each vehicle.images as img, i}
						<button
							onclick={() => (activeImage = i)}
							class="shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors {activeImage === i ? 'border-red-600' : 'border-transparent hover:border-gray-400'}"
						>
							<img src={img} alt="Thumbnail {i + 1}" class="w-full h-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Right: Details & CTA -->
		<div class="lg:col-span-2">
			<!-- Title & Price -->
			<div class="mb-6">
				{#if vehicle.is_sold}
					<span class="inline-block bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Sold</span>
				{/if}
				<h1 class="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
					{vehicle.year} {vehicle.make} {vehicle.model}
				</h1>
				<div class="text-4xl font-extrabold text-red-600">{formatPrice(vehicle.price)}</div>
			</div>

			<!-- Key Specs -->
			<div class="grid grid-cols-2 gap-3 mb-6">
				{#each [
					{ label: 'Year', value: String(vehicle.year) },
					{ label: 'Mileage', value: formatMileage(vehicle.mileage) },
					{ label: 'Body Type', value: vehicle.body_type || '—' },
					{ label: 'Fuel Type', value: vehicle.fuel_type || '—' },
					{ label: 'Transmission', value: vehicle.transmission || '—' },
					{ label: 'Drive Type', value: vehicle.drive_type || '—' },
					{ label: 'Engine', value: vehicle.engine || '—' },
					{ label: 'Color', value: vehicle.ext_color || '—' },
					{ label: 'Int. Color', value: vehicle.int_color || '—' }
				] as spec}
					<div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-3.5 border border-gray-200 dark:border-gray-800">
						<div class="text-xs text-gray-500 dark:text-gray-400 mb-1">{spec.label}</div>
						<div class="font-semibold text-gray-900 dark:text-white text-sm">{spec.value}</div>
					</div>
				{/each}
			</div>

			<!-- VIN -->
			<div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mb-6">
				<div class="text-xs text-gray-500 dark:text-gray-400 mb-1">VIN</div>
				<div class="font-mono text-sm font-medium text-gray-900 dark:text-white tracking-wider">{vehicle.vin}</div>
			</div>

			<!-- Carfax -->
			<div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
						<svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
					</div>
					<div>
						<div class="text-sm font-semibold text-green-800 dark:text-green-300">Carfax Available</div>
						<div class="text-xs text-green-700 dark:text-green-400">Vehicle history report on request</div>
					</div>
				</div>
				<a href="/contact?inquiry=Vehicle Inquiry&vehicle={vehicle.year} {vehicle.make} {vehicle.model} (Carfax Request)" class="shrink-0 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors">Request Report</a>
			</div>

			<!-- CTA -->
			{#if !vehicle.is_sold}
				<div class="space-y-3">
					<a
						href="/contact?inquiry=Vehicle Inquiry&vehicle={vehicle.year} {vehicle.make} {vehicle.model}"
						class="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-red-900/20"
					>
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						Inquire About This Vehicle
					</a>
					<a
						href="tel:5196536222"
						class="flex items-center justify-center gap-2 w-full bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
					>
						<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
						Call (519) 653-6222
					</a>
				</div>
			{:else}
				<div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center">
					<p class="text-gray-600 dark:text-gray-400 text-sm mb-3">This vehicle has been sold. Check our inventory for similar options.</p>
					<a href="/inventory" class="text-red-600 font-semibold hover:text-red-700 text-sm">View Available Vehicles →</a>
				</div>
			{/if}
		</div>
	</div>

	<!-- Description -->
	{#if vehicle.description}
		<div class="mt-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
			<h3 class="text-base font-semibold text-gray-900 dark:text-white mb-4">About This Vehicle</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
		</div>
	{/if}
</div>
