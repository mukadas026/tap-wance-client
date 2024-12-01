<script lang="ts">
	import { getAllVideos } from '$lib/api';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { platformIconMap } from '$lib/constants/platforms';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { Loader2 } from 'lucide-svelte';

	const query = createQuery({
		queryKey: getAllVideos.key,
		queryFn: () => getAllVideos.fn()
	});
</script>

<div>
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead></TableHead>
				<TableHead>Title</TableHead>
				<TableHead>Uploaded</TableHead>
				<TableHead>Platforms</TableHead>
				<TableHead></TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#if $query.isLoading}
				<TableRow class="bg-transparent hover:bg-transparent">
					<TableCell colspan={5}>
						<div class="w-full min-h-40 pt-32 flex flex-col justify-center items-center gap-y-4">
							<Loader2 size={40} class="animate-spin" />
						</div>
					</TableCell>
				</TableRow>
			{:else if $query.data && $query.data.length > 0}
				{#each $query.data as video}
					<TableRow>
						<TableCell>
							<img src="" alt="" />
						</TableCell>
						<TableCell>{video.title}</TableCell>
						<TableCell>{video.posted}</TableCell>
						<TableCell>
							{#if video.ids && video.ids.length > 0}
								<div class="flex items-center gap-x-2">
									{#each video.ids as platform}
										<Icon icon={platformIconMap[platform.account]} width="16" />
									{/each}
								</div>
							{:else}
								<div>
									<p class="animate-pulse">Processing ...</p>
								</div>
							{/if}
						</TableCell>
					</TableRow>
				{/each}
			{:else}
				<TableRow class="bg-transparent hover:bg-transparent">
					<TableCell colspan={5}>
						<div class="w-full min-h-40 pt-32 flex flex-col justify-center items-center gap-y-4">
							<Icon
								icon="material-symbols:info-outline"
								width="300"
								class="text-muted-foreground/50"
							/>
							<span class="text-5xl font-semibold text-muted-foreground/50">No videos Uploaded</span
							>
							<span class="text-xl text-muted-foreground/50 font-medium"
								>Click the upload button to start an upload</span
							>
						</div>
					</TableCell>
				</TableRow>
			{/if}
		</TableBody>
	</Table>
</div>
