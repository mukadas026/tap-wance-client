<script lang="ts">
	import { baseURL, client } from '$lib/axios';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Dialog, DialogFooter, DialogTrigger } from '$lib/components/ui/dialog';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import Icon from '@iconify/svelte';
	import VideoDnd from './video-dnd.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Progress } from '$lib/components/ui/progress';
	import { formatSize, profileLinkGetter } from '$lib';
	import { platformIconMap } from '$lib/constants/platforms';

	let { accounts }: { accounts: Array<IConnectedAccounts> } = $props();

	console.log('accounts from upload', accounts);

	let isModalOpen = $state(false);

	const videoDetails: {
		title: string;
		description: string;
		tags: string[];
		thumbnail: string;
		category: string;
		[key: string]: any;
	} = $state({
		title: '',
		description: '',
		tags: [],
		thumbnail: '',
		category: ''
	});

	let videoFile: File | null = $state(null);
	let videoURL = $state('');
	let uploadProgress = $state(0);
	const setVideoFile = (file: File) => {
		videoFile = file;
	};
	$effect(() => {
		if (videoFile) {
			videoDetails.title = videoFile.name.split('.')[0];
			videoURL = URL.createObjectURL(videoFile);
		}
	});

	const onChangeHandler = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const { name, value } = target;
		if (name === 'tags') {
			videoDetails[name] = value.split(',').filter((tag) => tag.trim() !== '');
			target.style.height = 0 + 'px';
			target.style.height = target.scrollHeight + 5 + 'px';
			return;
		}
		videoDetails[name] = value;
		target.style.height = 0 + 'px';
		target.style.height = target.scrollHeight + 5 + 'px';
	};

	const submitHandler = async () => {
		try {
			const formData = new FormData();
			formData.append('title', videoDetails.title);
			formData.append('description', videoDetails.description);
			formData.append('tags', videoDetails.tags.join(','));
			formData.append('video', videoFile as File);
			const res = await client.post('/upload', formData, {
				headers: {
					// 'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
					console.log('progressEvent', progressEvent);
					// uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					uploadProgress = Math.floor((progressEvent.progress || 0) * 100);
				}
			});

			console.log(res);
			isModalOpen = false;
		} catch (error) {
			console.log(error);
		}
	};
</script>

<Dialog
	open={isModalOpen}
	onOpenChange={(open) => {
		isModalOpen = !open;
	}}
>
	<DialogTrigger>
		<Button class="flex items-center gap-x-4">
			<Icon icon="akar-icons:video" width="24" />
			<span> Upload Video </span>
		</Button>
	</DialogTrigger>
	<DialogContent class="font-inter w-[90%] md:max-w-[80%] h-[80%] flex flex-col gap-y-4 ">
		{#if videoFile === null}
			<DialogHeader class="  max-h-20">
				<DialogTitle>Choose Video</DialogTitle>
			</DialogHeader>
			<VideoDnd {setVideoFile} />
		{:else}
			<DialogHeader class="max-h-20">
				<DialogTitle>{videoDetails.title}</DialogTitle>
			</DialogHeader>
			<div class="flex gap-x-16 h-full">
				<ScrollArea class="flex-1 flex h-[90%] pb-8 ">
					<div class="flex flex-1 flex-col gap-y-4 px-4">
						<div>
							<h3 class="font-semibold text-lg">Details</h3>
						</div>
						<Label class="space-y-4">
							<span>Title</span>
							<Textarea
								name="title"
								value={videoDetails.title}
								oninput={onChangeHandler}
								placeholder="Enter Title"
							/>
						</Label>
						<Label class="space-y-4">
							<span>Description</span>
							<Textarea
								name="description"
								value={videoDetails.description}
								oninput={onChangeHandler}
								placeholder="Enter Description"
								rows={7}
							/>
						</Label>
						<Label class="space-y-4">
							<span>Tags</span>
							<div class="flex gap-x-1 gap-y-1 flex-wrap">
								{#each videoDetails.tags as tag}
									<span class="text-xs border px-2 py-1 rounded-full">{tag}</span>
								{/each}
							</div>
							<Textarea
								name="tags"
								value={videoDetails.tags.join(',')}
								oninput={onChangeHandler}
								placeholder="Enter Tags"
							/>
						</Label>
					</div>
				</ScrollArea>
				<div class="w-full flex-1 flex flex-col items-end">
					<div class="w-4/5 space-y-4">
						<video controls src={videoURL} class="w-full max-w-[400px] aspect-video">
							<track kind="captions" />
						</video>
						<div>
							<h3 class="font-semibold">File name</h3>
							<span class="text-sm">{videoFile?.name}</span>
						</div>
						<div>
							<h3 class="font-semibold">File size</h3>
							<span class="text-sm">{formatSize(videoFile?.size)}</span>
						</div>
						{#if uploadProgress < 100}
							<div class="flex flex-col gap-y-2">
								<h3 class="font-semibold">Upload progress</h3>
								<div class="flex items-center gap-x-2">
									<Progress value={uploadProgress} />
									<span class="text-sm">{uploadProgress}%</span>
								</div>
								<p class="text-sm">Your video will be uploaded to the following platforms</p>
							</div>
						{:else}
							<div class="flex flex-col gap-y-2">
								<h3 class="font-semibold animate-pulse">Processing...</h3>
								<p class="text-sm">
									Your video is being processed by our servers and will be uploaded to the following
									platforms
								</p>
							</div>
						{/if}
						<div class="flex items-center gap-x-2 px-4 py-2 rounded-full bg-gray-100/0 w-fit">
							{#each accounts as account}
								<a href={profileLinkGetter(account)} target="_blank">
									<Icon icon={platformIconMap[account.account]} width="22" class="" />
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<DialogFooter class="bg-white absolute bottom-0 left-0 px-4 min-h-20 w-full ">
				<Separator class="w-[95%] absolute left-1/2 -translate-x-1/2 top-0" />
				<div class="w-full flex items-center justify-end gap-x-4">
					<Button onclick={submitHandler}>Upload</Button>
				</div>
			</DialogFooter>
		{/if}
	</DialogContent>
</Dialog>
