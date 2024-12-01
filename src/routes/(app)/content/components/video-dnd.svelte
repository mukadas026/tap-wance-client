<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import Icon from '@iconify/svelte';
	const { setVideoFile }: { setVideoFile: (file: File) => void } = $props();

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			setVideoFile(file);
		}
	};
</script>

<div class="w-full h-full">
	<Label
		class="w-full h-full flex-1 flex flex-col items-center justify-center gap-y-2 text-muted-foreground/50 text-xl font-black cursor-pointer border-2 border-dashed rounded-md"
	>
		<Icon icon="akar-icons:video" width="250" class="text-muted-foreground/50" />
		<p>Drag and Drop Video</p>
		<p>or</p>
		<p>Click to Upload</p>

		<Input type="file" onchange={handleFileChange} accept="video/*" class="sr-only" />
	</Label>
</div>
