<script lang="ts">
	const services = [
		{
			icon: 'oil',
			title: 'Oil Change',
			desc: 'Synthetic & conventional options. Keep your engine running clean and efficient.'
		},
		{
			icon: 'tire',
			title: 'Tire Rotation',
			desc: 'Even out wear and extend tyre life with our precision rotation service.'
		},
		{
			icon: 'brake',
			title: 'Brake Service',
			desc: 'Full inspection, pad replacement, and rotor resurfacing by certified technicians.'
		},
		{
			icon: 'wrench',
			title: 'General Repairs',
			desc: 'From minor fixes to major repairs — we handle it all with quality parts.'
		},
		{
			icon: 'diag',
			title: 'Diagnostics',
			desc: 'Advanced OBD-II diagnostics to quickly pinpoint issues and get you back on the road.'
		}
	];
</script>

<svelte:head>
	<title>Jiyash Auto</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gray-950">
	<div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/hero.png');"></div>
	<div class="absolute inset-0 bg-gray-950/75"></div>
	<div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-red-600 to-transparent"></div>
	<div
		class="absolute inset-0 opacity-5"
		style="background-image: linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px); background-size: 40px 40px;"
	></div>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

	<div class="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
		<div class="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
			<span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
			Cambridge, Ontario
		</div>
		<h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
			Find Your
			<span class="text-red-500">Perfect Ride</span>
		</h1>
		<p class="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
			Quality pre-owned vehicles, honest pricing, and trusted service — right here in Cambridge, ON.
			Your next vehicle is waiting.
		</p>
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a
				href="/inventory"
				class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 hover:-translate-y-0.5 text-base"
			>
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
				View Inventory
			</a>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-base"
			>
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				Book a Service
			</a>
		</div>

		<div class="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto">
			{#each [['10+', 'Years Experience'], ['100+', 'Vehicles Sold'], ['100%', 'Satisfaction']] as [val, label]}
				<div class="text-center">
					<div class="text-2xl font-bold text-white">{val}</div>
					<div class="text-xs text-gray-500 mt-0.5">{label}</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600">
		<span class="text-xs">Scroll</span>
		<svg class="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</section>

<!-- About Section -->
<section class="py-20 px-4 bg-white dark:bg-gray-950">
	<div class="max-w-7xl mx-auto">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<span class="text-red-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
				<h2 class="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-5 leading-tight">
					Cambridge's Trusted<br />Used Car Dealer
				</h2>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
					At Jiyash Auto, we believe buying a used car should be straightforward and stress-free.
					Located in the heart of Cambridge, Ontario, we hand-select every vehicle in our inventory
					to ensure it meets our high standards of quality and value.
				</p>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
					Whether you're looking for a reliable daily driver, a capable work truck, or a family SUV,
					our team is here to help you find the perfect vehicle at a fair price — with no hidden fees,
					no pressure, and no nonsense.
				</p>
				<div class="flex flex-wrap gap-6">
					{#each [['No Hidden Fees', '✓'], ['Carfax Available', '✓'], ['Financing Options', '✓']] as [label]}
						<div class="flex items-center gap-2">
							<div class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-600 text-xs font-bold flex items-center justify-center">✓</div>
							<span class="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
						</div>
					{/each}
				</div>
				<a href="/inventory" class="inline-flex items-center gap-2 mt-8 text-red-600 font-semibold hover:text-red-700 transition-colors group">
					Browse Our Inventory
					<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>

			<div class="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Visit Us</h3>
				<div class="space-y-5">
					<div class="flex items-start gap-3">
						<div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0">
							<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div>
							<div class="text-sm font-medium text-gray-900 dark:text-white">Address</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">1461 King Street East<br />Cambridge, ON N3H 3R3</div>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0">
							<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
						</div>
						<div>
							<div class="text-sm font-medium text-gray-900 dark:text-white">Phone</div>
							<a href="tel:5196536222" class="text-sm text-red-600 hover:text-red-700 font-medium">(519) 653-6222</a>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0">
							<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div>
							<div class="text-sm font-medium text-gray-900 dark:text-white">Hours</div>
							<div class="text-sm text-gray-500 dark:text-gray-400 space-y-0.5">
								<div>Mon – Fri: 9:00 AM – 5:30 PM</div>
								<div>Saturday: 9:00 AM – 1:30 PM</div>
								<div class="text-gray-400">Sunday: Closed</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Services Section -->
<section class="py-20 px-4 bg-gray-50 dark:bg-gray-900">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-12">
			<span class="text-red-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
			<h2 class="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Our Services</h2>
			<p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
				From routine maintenance to complex repairs, our certified technicians keep your vehicle performing at its best.
			</p>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
			{#each services as service}
				<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-800 hover:shadow-md transition-all duration-200 group">
					<div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
						<svg class="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							{#if service.icon === 'oil'}
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							{:else if service.icon === 'tire'}
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
							{:else if service.icon === 'brake'}
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
							{:else if service.icon === 'wrench'}
								<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							{/if}
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
				</div>
			{/each}
		</div>

		<div class="text-center mt-10">
			<a href="/services" class="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors group">
				Learn More About Our Services
				<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 px-4 bg-red-600 relative overflow-hidden">
	<div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%);"></div>
	<div class="relative max-w-3xl mx-auto text-center">
		<h2 class="text-4xl font-bold text-white mb-4">Ready to Find Your Next Vehicle?</h2>
		<p class="text-red-100 text-lg mb-8">Browse our current inventory or get in touch — we'd love to help you find the perfect car.</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/inventory" class="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
				View Inventory
			</a>
			<a href="/contact" class="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white border border-red-500 font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
				Contact Us
			</a>
		</div>
	</div>
</section>
