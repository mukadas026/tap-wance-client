<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { platformIconMap } from '$lib/constants/platforms';
	import Icon from '@iconify/svelte';

	const { account }: { account: IConnectedAccounts } = $props();
</script>

<Card class="min-w-[200px] ">
	<CardHeader>
		<CardTitle>
			<div class="flex items-center gap-x-2">
				<Icon icon={platformIconMap[account.account]} width="16" />
				<h3 class="capitalize font-medium">{account.details.title}</h3>
			</div>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<div class="flex items-center gap-x-2">
			<div class="flex items-center gap-x-2">
				<Icon icon="formkit:people" />
				<span>{account.details.subscribers}</span>
			</div>
			<div class="flex items-center gap-x-2">
				<Icon icon="akar-icons:video" />
				<span>{account.details.videos}</span>
			</div>
		</div>
	</CardContent>
</Card>
