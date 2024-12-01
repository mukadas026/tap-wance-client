<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';
	import Sidebar from './components/sidebar.svelte';
	import { AuthStore } from '$lib/store/auth/auth.store';

	let { children, data }: { children: Snippet; data: PageData } = $props();

	console.log('data', data);
	if (data) {
		$AuthStore.user = data.user;
	}
</script>

<div class="w-full h-full">
	<!-- layout here - sidebar -topbar -->
	<Sidebar>
		{@render children()}
	</Sidebar>
</div>
