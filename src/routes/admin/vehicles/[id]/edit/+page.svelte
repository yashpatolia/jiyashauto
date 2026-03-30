<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import VehicleForm from '$lib/components/VehicleForm.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let confirmDelete = $state(false);
</script>

<svelte:head>
	<title>Edit {data.vehicle.year} {data.vehicle.make} {data.vehicle.model} — Admin</title>
</svelte:head>

<div class="max-w-3xl">
	<div class="flex items-center justify-between gap-3 mb-8">
		<div class="flex items-center gap-3">
			<a href="/admin" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</a>
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
				Edit: {data.vehicle.year} {data.vehicle.make} {data.vehicle.model}
			</h1>
		</div>
		<div class="flex items-center gap-2">
			<!-- Toggle sold -->
			<form method="POST" action="?/toggleSold">
				<button
					type="submit"
					class="text-sm font-medium px-4 py-2 rounded-xl border transition-colors {data.vehicle.is_sold ? 'border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950' : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}"
				>
					{data.vehicle.is_sold ? 'Mark Available' : 'Mark Sold'}
				</button>
			</form>
			<!-- View listing -->
			<a
				href="/inventory/{data.vehicle.id}"
				target="_blank"
				class="text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				View ↗
			</a>
		</div>
	</div>

	<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-6">
		<VehicleForm vehicle={data.vehicle} error={form?.error ?? ''} submitLabel="Save Changes" formAction="?/save" />
	</div>

	<!-- Danger zone -->
	<div class="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900 p-6">
		<h3 class="text-sm font-semibold text-red-600 mb-3">Danger Zone</h3>
		{#if !confirmDelete}
			<button
				type="button"
				onclick={() => (confirmDelete = true)}
				class="text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950 px-4 py-2 rounded-xl transition-colors"
			>
				Delete This Listing
			</button>
		{:else}
			<div class="flex items-center gap-3">
				<p class="text-sm text-gray-600 dark:text-gray-400">Are you sure? This cannot be undone.</p>
				<form method="POST" action="?/delete">
					<button type="submit" class="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-colors">
						Yes, Delete
					</button>
				</form>
				<button
					type="button"
					onclick={() => (confirmDelete = false)}
					class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
				>
					Cancel
				</button>
			</div>
		{/if}
	</div>
</div>
