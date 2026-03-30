<script lang="ts">
	interface Vehicle {
		id?: number;
		year?: number;
		make?: string;
		model?: string;
		price?: number;
		mileage?: number;
		vin?: string;
		description?: string;
		images?: string[];
		is_sold?: number;
	is_public?: number;
		fuel_type?: string;
		transmission?: string;
		drive_type?: string;
		ext_color?: string;
		int_color?: string;
		engine?: string;
	}

	let {
		vehicle = {},
		error = '',
		submitLabel = 'Save Vehicle',
		formAction = ''
	}: {
		vehicle?: Vehicle;
		error?: string;
		submitLabel?: string;
		formAction?: string;
	} = $props();

	let existingImages = $state<string[]>(vehicle.images ?? []);
	let uploadedImages = $state<string[]>([]);
	let uploading = $state(false);
	let submitting = $state(false);

	async function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) return;

		uploading = true;
		try {
			const formData = new FormData();
			for (const file of input.files) {
				formData.append('files', file);
			}
			const res = await fetch('/api/upload', { method: 'POST', body: formData });
			if (res.ok) {
				const { paths } = await res.json();
				uploadedImages = [...uploadedImages, ...paths];
			}
		} finally {
			uploading = false;
			input.value = '';
		}
	}

	function removeExisting(path: string) {
		existingImages = existingImages.filter((p) => p !== path);
	}

	function removeUploaded(path: string) {
		uploadedImages = uploadedImages.filter((p) => p !== path);
	}

	const allImages = $derived([...existingImages, ...uploadedImages]);
</script>

{#if error}
	<div class="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-4 mb-6 text-sm">
		<svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
		</svg>
		{error}
	</div>
{/if}

<form
	method="POST"
	action={formAction || undefined}
	onsubmit={() => (submitting = true)}
	class="space-y-6"
>
	<!-- Hidden image paths -->
	<input type="hidden" name="images" value={JSON.stringify(allImages)} />

	<div class="grid sm:grid-cols-3 gap-5">
		<div>
			<label for="year" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Year <span class="text-red-500">*</span></label>
			<input
				type="number"
				id="year"
				name="year"
				required
				min="1900"
				max={new Date().getFullYear() + 1}
				value={vehicle.year ?? ''}
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
		</div>
		<div>
			<label for="make" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Make <span class="text-red-500">*</span></label>
			<input
				type="text"
				id="make"
				name="make"
				required
				value={vehicle.make ?? ''}
				placeholder="e.g. Toyota"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
		</div>
		<div>
			<label for="model" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Model <span class="text-red-500">*</span></label>
			<input
				type="text"
				id="model"
				name="model"
				required
				value={vehicle.model ?? ''}
				placeholder="e.g. RAV4 XLE"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
		</div>
	</div>

	<div class="grid sm:grid-cols-2 gap-5">
		<div>
			<label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Price (CAD) <span class="text-red-500">*</span></label>
			<input
				type="number"
				id="price"
				name="price"
				required
				min="0"
				step="0.01"
				value={vehicle.price ?? ''}
				placeholder="e.g. 18500"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
		</div>
		<div>
			<label for="mileage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mileage (km) <span class="text-red-500">*</span></label>
			<input
				type="number"
				id="mileage"
				name="mileage"
				required
				min="0"
				value={vehicle.mileage ?? ''}
				placeholder="e.g. 65000"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
		</div>
	</div>

	<div>
		<label for="vin" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">VIN <span class="text-red-500">*</span></label>
		<input
			type="text"
			id="vin"
			name="vin"
			required
			value={vehicle.vin ?? ''}
			placeholder="17-character VIN"
			maxlength="17"
			class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
		/>
	</div>

	<!-- Vehicle specs -->
	<div class="grid sm:grid-cols-3 gap-5">
		<div>
			<label for="engine" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Engine</label>
			<input type="text" id="engine" name="engine" value={vehicle.engine ?? ''} placeholder="e.g. 2.0L Turbo"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
		</div>
		<div>
			<label for="fuel_type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Fuel Type</label>
			<select id="fuel_type" name="fuel_type"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
				<option value="">Select</option>
				{#each ['Gasoline', 'Diesel', 'Hybrid', 'Plug-in Hybrid', 'Electric'] as opt}
					<option value={opt} selected={vehicle.fuel_type === opt}>{opt}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="transmission" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Transmission</label>
			<select id="transmission" name="transmission"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
				<option value="">Select</option>
				{#each ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'] as opt}
					<option value={opt} selected={vehicle.transmission === opt}>{opt}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="grid sm:grid-cols-3 gap-5">
		<div>
			<label for="drive_type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Drive Type</label>
			<select id="drive_type" name="drive_type"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
				<option value="">Select</option>
				{#each ['FWD', 'RWD', 'AWD', 'All-Wheel Drive', '4WD', '4x4'] as opt}
					<option value={opt} selected={vehicle.drive_type === opt}>{opt}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="ext_color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Exterior Color</label>
			<input type="text" id="ext_color" name="ext_color" value={vehicle.ext_color ?? ''} placeholder="e.g. Midnight Black"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
		</div>
		<div>
			<label for="int_color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Interior Color</label>
			<input type="text" id="int_color" name="int_color" value={vehicle.int_color ?? ''} placeholder="e.g. Black"
				class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
		</div>
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description / Condition Notes</label>
		<textarea
			id="description"
			name="description"
			rows="4"
			placeholder="Describe the vehicle's condition, features, and history..."
			class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
		>{vehicle.description ?? ''}</textarea>
	</div>

	<!-- Images -->
	<div>
		<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photos</label>

		{#if allImages.length > 0}
			<div class="flex flex-wrap gap-3 mb-3">
				{#each existingImages as img}
					<div class="relative group w-24 h-18 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
						<img src={img} alt="Vehicle photo" class="w-full h-full object-cover" />
						<button
							type="button"
							onclick={() => removeExisting(img)}
							class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
						>
							<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				{/each}
				{#each uploadedImages as img}
					<div class="relative group w-24 h-18 rounded-xl overflow-hidden border-2 border-green-400 dark:border-green-600">
						<img src={img} alt="Uploaded photo" class="w-full h-full object-cover" />
						<button
							type="button"
							onclick={() => removeUploaded(img)}
							class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
						>
							<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				{/each}
			</div>
		{/if}

		<label class="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-600 rounded-xl p-6 cursor-pointer transition-colors {uploading ? 'opacity-60 pointer-events-none' : ''}">
			{#if uploading}
				<svg class="w-6 h-6 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
				</svg>
				<span class="text-sm text-gray-400">Uploading...</span>
			{:else}
				<svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<span class="text-sm text-gray-500 dark:text-gray-400">Click to upload photos</span>
				<span class="text-xs text-gray-400">JPG, PNG up to 10MB each</span>
			{/if}
			<input
				type="file"
				accept="image/*"
				multiple
				onchange={handleFileChange}
				class="hidden"
			/>
		</label>
	</div>

	<!-- Visibility & Status -->
	<div class="flex flex-wrap items-center gap-6">
		<div class="flex items-center gap-3">
			<input
				type="checkbox"
				id="is_sold"
				name="is_sold"
				value="1"
				checked={vehicle.is_sold === 1}
				class="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
			/>
			<label for="is_sold" class="text-sm font-medium text-gray-700 dark:text-gray-300">
				Mark as Sold
			</label>
		</div>
		<div class="flex items-center gap-3">
			<input
				type="checkbox"
				id="is_public"
				name="is_public"
				value="1"
				checked={vehicle.is_public !== 0}
				class="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
			/>
			<label for="is_public" class="text-sm font-medium text-gray-700 dark:text-gray-300">
				Public <span class="text-xs text-gray-400 font-normal">(visible on inventory page)</span>
			</label>
		</div>
	</div>

	<!-- Submit -->
	<div class="flex items-center gap-3 pt-2">
		<button
			type="submit"
			disabled={submitting || uploading}
			class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
		>
			{#if submitting}
				<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
				</svg>
				Saving...
			{:else}
				{submitLabel}
			{/if}
		</button>
		<a href="/admin" class="text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
			Cancel
		</a>
	</div>
</form>
