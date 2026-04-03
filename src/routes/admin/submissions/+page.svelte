<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selected = $state<number | null>(null);
	let activeTab = $state<'normal' | 'spam'>('normal');

	function formatDate(dateStr: string) {
		return new Date(dateStr + 'Z').toLocaleString('en-CA', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	const SPAM_PATTERNS = [
		/https?:\/\//i,
		/www\./i,
		/\.(com|net|org|io|co)\b/i,
		/free\s+(trial|ad|promo|commercial|broadcast|edit)/i,
		/tv\s*commercial/i,
		/lead\s*list/i,
		/target\s*lead/i,
		/broadcast/i,
		/top shelf/i,
		/seo\s*(service|boost|rank)/i,
		/backlink/i,
		/crypto|bitcoin|forex|investment opportunity/i,
	];

	function isSpam(s: { name: string; email: string; message: string }) {
		const text = `${s.name} ${s.message}`;
		return SPAM_PATTERNS.some((p) => p.test(text));
	}

	const normal = $derived(data.submissions.filter((s) => !isSpam(s)));
	const spam = $derived(data.submissions.filter((s) => isSpam(s)));
	const listed = $derived(activeTab === 'spam' ? spam : normal);

	const selectedSubmission = $derived(
		selected !== null ? data.submissions.find((s) => s.id === selected) : null
	);
</script>

<svelte:head>
	<title>Submissions — Jiyash Auto Admin</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center gap-3">
		<a href="/admin" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</a>
		<div>
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Contact Submissions</h1>
			<p class="text-sm text-gray-500 mt-0.5">{normal.length} inbox · {spam.length} possible spam</p>
		</div>
	</div>

	<!-- Tabs -->
	<div class="flex gap-2">
		<button
			onclick={() => { activeTab = 'normal'; selected = null; }}
			class="px-4 py-2 rounded-xl text-sm font-medium transition-colors {activeTab === 'normal' ? 'bg-red-600 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}"
		>
			Inbox {#if normal.length > 0}<span class="ml-1 opacity-75">({normal.length})</span>{/if}
		</button>
		<button
			onclick={() => { activeTab = 'spam'; selected = null; }}
			class="px-4 py-2 rounded-xl text-sm font-medium transition-colors {activeTab === 'spam' ? 'bg-yellow-500 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}"
		>
			Possible Spam {#if spam.length > 0}<span class="ml-1 opacity-75">({spam.length})</span>{/if}
		</button>
	</div>

	{#if listed.length === 0}
		<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-16 text-center">
			<p class="text-gray-500 dark:text-gray-400">{activeTab === 'spam' ? 'No possible spam detected.' : 'No submissions yet.'}</p>
		</div>
	{:else}
		<div class="grid lg:grid-cols-5 gap-6">
			<!-- Table -->
			<div class="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-gray-200 dark:border-gray-800">
								<th class="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3">Name</th>
								<th class="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Type</th>
								<th class="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Date</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-100 dark:divide-gray-800">
							{#each listed as s}
								<tr
									onclick={() => (selected = selected === s.id ? null : s.id)}
									class="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors {selected === s.id ? 'bg-red-50 dark:bg-red-950/20' : ''}"
								>
									<td class="px-5 py-3.5">
										<div class="font-medium text-gray-900 dark:text-white">{s.name}</div>
										<div class="text-xs text-gray-500">{s.email}</div>
									</td>
									<td class="px-5 py-3.5 hidden sm:table-cell">
										<span class="inline-block text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full whitespace-nowrap">{s.inquiry_type}</span>
									</td>
									<td class="px-5 py-3.5 text-xs text-gray-400 hidden md:table-cell whitespace-nowrap">{formatDate(s.created_at)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Detail panel -->
			<div class="lg:col-span-2">
				{#if selectedSubmission}
					<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-20">
						<div class="flex items-start justify-between mb-5">
							<div>
								<h3 class="font-semibold text-gray-900 dark:text-white">{selectedSubmission.name}</h3>
								<p class="text-xs text-gray-500 mt-0.5">{formatDate(selectedSubmission.created_at)}</p>
							</div>
							<button onclick={() => (selected = null)} class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<div class="space-y-3">
							<div>
								<div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Email</div>
								<a href="mailto:{selectedSubmission.email}" class="text-sm font-medium text-red-600 hover:text-red-700">
									{selectedSubmission.email}
								</a>
							</div>
							{#if selectedSubmission.phone}
								<div>
									<div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Phone</div>
									<a href="tel:{selectedSubmission.phone}" class="text-sm font-medium text-gray-900 dark:text-white">
										{selectedSubmission.phone}
									</a>
								</div>
							{/if}
							<div>
								<div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Inquiry Type</div>
								<span class="text-sm font-medium text-gray-900 dark:text-white">{selectedSubmission.inquiry_type}</span>
							</div>
							<div>
								<div class="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Message</div>
								<div class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
									{selectedSubmission.message}
								</div>
							</div>
						</div>
						<div class="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
							<a
								href="mailto:{selectedSubmission.email}"
								class="flex-1 text-center text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors"
							>
								Reply by Email
							</a>
							{#if selectedSubmission.phone}
								<a
									href="tel:{selectedSubmission.phone}"
									class="flex-1 text-center text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-xl transition-colors"
								>
									Call
								</a>
							{/if}
							<form method="POST" action="?/delete" use:enhance={() => {
								return ({ result }) => {
									if (result.type === 'success') selected = null;
								};
							}}>
								<input type="hidden" name="id" value={selectedSubmission.id} />
								<button
									type="submit"
									class="text-sm font-medium border border-red-200 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 px-4 py-2 rounded-xl transition-colors"
									onclick={(e) => { if (!confirm('Delete this submission?')) e.preventDefault(); }}
								>
									Delete
								</button>
							</form>
						</div>
					</div>
				{:else}
					<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
						Select a submission to view details
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
