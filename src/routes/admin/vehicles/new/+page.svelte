<script lang="ts">
	import type { ActionData } from './$types';
	import VehicleForm from '$lib/components/VehicleForm.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Add Vehicle — Jiyash Auto Admin</title>
</svelte:head>

<div class="max-w-3xl">
	<div class="flex items-center gap-3 mb-8">
		<a href="/admin" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</a>
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Add New Vehicle</h1>
	</div>

	<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
		<VehicleForm error={form?.error ?? ''} submitLabel="Add Vehicle" />
	</div>
</div>
