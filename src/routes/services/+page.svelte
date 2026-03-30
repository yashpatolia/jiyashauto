<script lang="ts">
	const services = [
		{
			title: 'Oil Change',
			tagline: 'Keep Your Engine at Its Best',
			description:
				"Regular oil changes are the single most important maintenance task for your vehicle's longevity. Our technicians use manufacturer-recommended oil specifications and perform a comprehensive fluid and filter inspection with every visit. We offer conventional, semi-synthetic, and full-synthetic options tailored to your engine's requirements.",
			includes: [
				'Oil drain and replacement (up to 5L)',
				'New OEM or quality aftermarket oil filter',
				'Top-up of all essential fluids',
				'Visual inspection of belts and hoses',
				'Tire pressure check',
				'Safety light inspection'
			],
			badge: '~30 min',
			icon: 'oil'
		},
		{
			title: 'Tire Rotation',
			tagline: 'Even Wear, Longer Life',
			description:
				"Uneven tire wear can reduce fuel economy and compromise your vehicle's handling. Our tire rotation service moves each tire to a new position on the vehicle to promote even tread wear, extend the life of your tires, and improve road safety. We follow the rotation pattern recommended for your specific drivetrain.",
			includes: [
				'Full 4-tire rotation (front/rear/diagonal)',
				'Torque-spec wheel re-installation',
				'Tire tread depth measurement',
				'Tire pressure adjustment to spec',
				'Visual inspection for damage or wear',
				'Brake dust and wheel cleaning'
			],
			badge: '~45 min',
			icon: 'tire'
		},
		{
			title: 'Brake Service',
			tagline: 'Stop Confidently, Every Time',
			description:
				"Your brakes are your vehicle's most critical safety system. Our certified technicians perform a thorough multi-point brake inspection and can handle everything from pad replacement to full rotor resurfacing. We use quality brake components that meet or exceed OEM specifications, ensuring you stop with confidence.",
			includes: [
				'Brake pad and rotor inspection',
				'Brake pad replacement (per axle)',
				'Rotor resurfacing or replacement',
				'Brake fluid level and condition check',
				'Caliper inspection and lubrication',
				'Road test verification'
			],
			badge: '~1–2 hrs',
			icon: 'brake'
		},
		{
			title: 'General Repairs',
			tagline: 'One Shop, Every Job',
			description:
				"From a squeaky belt to a complex engine repair, Jiyash Auto handles it all. Our team of experienced technicians is equipped to tackle a wide range of mechanical issues across makes and models. We use quality parts and back our repair work so you can drive away with confidence.",
			includes: [
				'Engine and drivetrain repairs',
				'Suspension and steering components',
				'Exhaust system repairs',
				'Electrical system diagnostics and repair',
				'Cooling system service',
				'Battery testing and replacement'
			],
			badge: 'Varies',
			icon: 'wrench'
		},
		{
			title: 'Diagnostics',
			tagline: 'Find It Fast, Fix It Right',
			description:
				"Modern vehicles are packed with sensors and onboard computers — when something goes wrong, they tell us exactly where to look. Our advanced OBD-II diagnostic equipment communicates with your vehicle's ECU to quickly identify fault codes, sensor failures, and performance issues, getting you back on the road faster.",
			includes: [
				'Full OBD-II fault code scan',
				'Live sensor data analysis',
				'Check Engine Light diagnosis',
				'Emissions system evaluation',
				'ABS, airbag, and module scan',
				'Detailed written diagnostic report'
			],
			badge: '~1 hr',
			icon: 'diag'
		}
	];
</script>

<svelte:head>
	<title>Services — Jiyash Auto</title>
	<meta name="description" content="Professional auto service and maintenance at Jiyash Auto in Cambridge, ON. Oil changes, tire rotations, brake service, general repairs, and diagnostics." />
</svelte:head>

<!-- Header -->
<section class="bg-gray-900 dark:bg-gray-950 py-14 px-4 border-b border-gray-800">
	<div class="max-w-7xl mx-auto">
		<span class="text-red-500 font-semibold text-sm uppercase tracking-wider">Professional Automotive Care</span>
		<h1 class="text-4xl font-bold text-white mt-2 mb-3">Our Services</h1>
		<p class="text-gray-400 max-w-2xl">
			Expert maintenance and repair services to keep your vehicle running reliably and safely. Serving Cambridge and surrounding areas.
		</p>
	</div>
</section>

<!-- Services List -->
<section class="py-16 px-4 bg-white dark:bg-gray-950">
	<div class="max-w-5xl mx-auto space-y-12">
		{#each services as service, i}
			<div class="grid md:grid-cols-5 gap-8 {i % 2 !== 0 ? 'md:flex-row-reverse' : ''}">
				<!-- Icon + title col -->
				<div class="md:col-span-2 flex flex-col">
					<div class="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950 flex items-center justify-center mb-5">
						<svg class="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
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
					<span class="inline-block bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">{service.badge}</span>
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{service.title}</h2>
					<p class="text-red-600 font-medium text-sm">{service.tagline}</p>
				</div>

				<!-- Content col -->
				<div class="md:col-span-3">
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{service.description}</p>
					<div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
						<h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Service Includes</h4>
						<ul class="grid sm:grid-cols-2 gap-2">
							{#each service.includes as item}
								<li class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
									<div class="w-4 h-4 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center shrink-0">
										<svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
											<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
										</svg>
									</div>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>

			{#if i < services.length - 1}
				<hr class="border-gray-200 dark:border-gray-800" />
			{/if}
		{/each}
	</div>
</section>

<!-- CTA -->
<section class="py-16 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
	<div class="max-w-3xl mx-auto text-center">
		<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Book Your Service?</h2>
		<p class="text-gray-500 dark:text-gray-400 mb-8">
			Call us or fill out our online form and we'll get you scheduled at a time that works for you.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/contact?inquiry=Book a Service" class="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-red-900/20">
				Book Online
			</a>
			<a href="tel:5196536222" class="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
				<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
				</svg>
				Call (519) 653-6222
			</a>
		</div>
	</div>
</section>
