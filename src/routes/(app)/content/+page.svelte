<script lang="ts">
	import { client } from '$lib/axios';
	import ListVideos from './components/list-videos.svelte';
	import UploadVideo from './components/upload-video.svelte';

	const { data }: { data: { accounts: Array<IConnectedAccounts> } } = $props();

	const { accounts } = data;
</script>

<main class="w-full h-full">
	<div class="w-full flex items-center justify-end">
		<UploadVideo {accounts} />
	</div>
	<div class="w-full space-y-10">
		<div>
			<h1 class="text-3xl font-semibold">Uploaded Videos</h1>
		</div>
		<div>
			<ListVideos />
		</div>
	</div>
</main>
