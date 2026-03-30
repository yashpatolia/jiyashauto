<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let submitting = $state(false);

	const inquiryTypes = ['General Inquiry', 'Book a Service', 'Vehicle Inquiry'];

	const hours = [
		{ day: 'Sunday', time: 'Closed', closed: true },
		{ day: 'Monday', time: '9:00 AM – 5:30 PM', closed: false },
		{ day: 'Tuesday', time: '9:00 AM – 5:30 PM', closed: false },
		{ day: 'Wednesday', time: '9:00 AM – 5:30 PM', closed: false },
		{ day: 'Thursday', time: '9:00 AM – 5:30 PM', closed: false },
		{ day: 'Friday', time: '9:00 AM – 5:30 PM', closed: false },
		{ day: 'Saturday', time: '9:00 AM – 1:30 PM', closed: false }
	];
</script>

<svelte:head>
	<title>Contact Us — Jiyash Auto</title>
	<meta name="description" content="Contact Jiyash Auto in Cambridge, ON. Book a service appointment, inquire about a vehicle, or just say hello." />
</svelte:head>

<!-- Header -->
<section class="bg-gray-900 dark:bg-gray-950 py-14 px-4 border-b border-gray-800">
	<div class="max-w-7xl mx-auto">
		<span class="text-red-500 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
		<h1 class="text-4xl font-bold text-white mt-2 mb-3">Contact Us</h1>
		<p class="text-gray-400 max-w-xl">
			Have a question about a vehicle? Want to book a service? We're here to help.
		</p>
	</div>
</section>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="grid lg:grid-cols-3 gap-10">
		<!-- Form -->
		<div class="lg:col-span-2">
			<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
				<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>

				{#if form?.success}
					<div class="flex items-start gap-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-xl p-4 mb-6">
						<svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<div class="font-semibold">Message sent!</div>
							<div class="text-sm mt-0.5">Thanks for reaching out. We'll get back to you shortly.</div>
						</div>
					</div>
				{/if}

				{#if form?.error}
					<div class="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-xl p-4 mb-6">
						<svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
						<span>{form.error}</span>
					</div>
				{/if}

				{#if !form?.success}
					<form
						method="POST"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								submitting = false;
								await update();
							};
						}}
						class="space-y-5"
					>
						<!-- Honeypot: hidden from real users, bots fill it in -->
						<div style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden" aria-hidden="true">
							<label for="website">Website</label>
							<input type="text" id="website" name="website" autocomplete="off" tabindex="-1" />
						</div>

						<div class="grid sm:grid-cols-2 gap-5">
							<div>
								<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
									Full Name <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									value={form?.values?.name ?? ''}
									placeholder="John Smith"
									class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
								/>
							</div>
							<div>
								<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
									Email Address <span class="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									value={form?.values?.email ?? ''}
									placeholder="john@example.com"
									class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
								/>
							</div>
						</div>

						<div class="grid sm:grid-cols-2 gap-5">
							<div>
								<label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
									Phone Number
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={form?.values?.phone ?? ''}
									placeholder="(519) 000-0000"
									class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
								/>
							</div>
							<div>
								<label for="inquiry_type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
									Inquiry Type <span class="text-red-500">*</span>
								</label>
								<select
									id="inquiry_type"
									name="inquiry_type"
									required
									class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
								>
									<option value="" disabled selected={!data.inquiry && !form?.values?.inquiry_type}>Select inquiry type</option>
									{#each inquiryTypes as type}
										<option
											value={type}
											selected={type === (form?.values?.inquiry_type ?? data.inquiry)}
										>{type}</option>
									{/each}
								</select>
							</div>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
								Message <span class="text-red-500">*</span>
							</label>
							<textarea
								id="message"
								name="message"
								required
								rows="5"
								placeholder={data.vehicle ? `I'm interested in the ${data.vehicle}. Please let me know more details...` : 'How can we help you?'}
								class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
							>{form?.values?.message ?? (data.vehicle ? `I'm interested in the ${data.vehicle}.` : '')}</textarea>
						</div>

						<button
							type="submit"
							disabled={submitting}
							class="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-red-900/20"
						>
							{#if submitting}
								<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
								</svg>
								Sending...
							{:else}
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
								</svg>
								Send Message
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>

		<!-- Business Info Sidebar -->
		<div class="space-y-6">
			<!-- Contact details -->
			<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
				<h3 class="font-semibold text-gray-900 dark:text-white mb-5">Contact Information</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0">
							<svg class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div>
							<div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Address</div>
							<div class="text-sm text-gray-900 dark:text-white font-medium">1461 King Street East<br />Cambridge, ON N3H 3R3</div>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0">
							<svg class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
						</div>
						<div>
							<div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Phone</div>
							<a href="tel:5196536222" class="text-sm font-medium text-red-600 hover:text-red-700">(519) 653-6222</a>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0">
							<svg class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<div>
							<div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Email</div>
							<a href="mailto:jiyashautosales@gmail.com" class="text-sm font-medium text-red-600 hover:text-red-700 break-all">jiyashautosales@gmail.com</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Hours -->
			<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
				<h3 class="font-semibold text-gray-900 dark:text-white mb-5">Business Hours</h3>
				<div class="space-y-2">
					{#each hours as { day, time, closed }}
						<div class="flex items-center justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
							<span class="text-gray-600 dark:text-gray-400">{day}</span>
							<span class="{closed ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white font-medium'}">{time}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Social -->
			<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
				<h3 class="font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
				<div class="flex gap-3">
					{#each [
						{ href: 'https://www.facebook.com/jiyashauto/', label: 'Facebook', color: '#1877F2' },
						{ href: 'https://www.instagram.com/jiyashauto/', label: 'Instagram', color: '#E4405F' },
						{ href: 'https://twitter.com/jiyashauto', label: 'X (Twitter)', color: '#000000' }
					] as social}
						<a href={social.href} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
							<div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-950 flex items-center justify-center transition-colors">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									{#if social.label === 'Facebook'}
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									{:else if social.label === 'Instagram'}
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
									{:else}
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									{/if}
								</svg>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
