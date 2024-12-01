<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { Plus, Youtube } from 'lucide-svelte';
	import AddAccount from './components/add-account.svelte';
	import type { PageData } from '../$types';
	import AccountCard from './components/account-card.svelte';
	import { AppStore } from '$lib/store/index.store';

	let isAddAccountModalOpen = $state(false);

	const updateIsAddAccountModalOpen = (value: boolean) => {
		isAddAccountModalOpen = value;
	};

	$effect(() => {
		console.log('isAddAccountModalOpen', isAddAccountModalOpen);
	});

	let { data }: { data: { accounts: Array<IConnectedAccounts> } } = $props();
	const { accounts: connectedAccounts } = data;

	$AppStore.accounts = connectedAccounts;

	console.log('connected-accounts', data);
</script>

<div class="w-full h-full space-y-8">
	<AddAccount {isAddAccountModalOpen} {updateIsAddAccountModalOpen} />
	{#if connectedAccounts.length > 0}
		<ScrollArea
			orientation="horizontal"
			class="w-full max-w-sm md:max-w-[900px] xl:max-w-[1200px] flex items-center min-h-32 "
		>
			<div class="w-max h-full flex gap-x-4">
				{#each connectedAccounts as account}
					<AccountCard {account} />
				{/each}
			</div>
		</ScrollArea>
	{/if}
	<div class="w-full flex items-center justify-end">
		<Button
			onclick={() => {
				isAddAccountModalOpen = true;
			}}
			class="flex items-center gap-x-2"
		>
			<Plus size={16} />
			<span> Add Account </span>
		</Button>
	</div>
	<!-- <p class="text-black">hello world</p> -->
</div>
