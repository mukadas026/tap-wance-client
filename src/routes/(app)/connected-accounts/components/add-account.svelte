<script lang="ts">
	import { baseURL } from '$lib/axios';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Dialog } from '$lib/components/ui/dialog';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import Icon from '@iconify/svelte';
	import { Youtube } from 'lucide-svelte';

	let {
		isAddAccountModalOpen,
		updateIsAddAccountModalOpen
	}: { isAddAccountModalOpen: boolean; updateIsAddAccountModalOpen: (value: boolean) => void } =
		$props();
</script>

<Dialog onOpenChange={updateIsAddAccountModalOpen} open={isAddAccountModalOpen}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Add Account</DialogTitle>
		</DialogHeader>
		<form class="flex flex-col gap-y-2">
			<Button
				type="submit"
				formaction={`${baseURL}/accounts/youtube`}
				class="flex items-center gap-x-4 bg-youtube-red font-bold text-lg"
			>
				<!-- <Youtube size={32} /> -->
				<Icon icon="logos:youtube-icon" width="32" />
				<span>Youtube</span>
			</Button>
			<Button
				type="submit"
				formaction={`${baseURL}/accounts/tiktok`}
				class="flex items-center gap-x-4 bg-black font-bold text-lg hover:bg-youtube-red"
			>
				<!-- <Youtube size={32} /> -->
				<Icon icon="logos:tiktok-icon" width="32" />
				<span>TikTok</span>
			</Button>
		</form>
	</DialogContent>
</Dialog>
