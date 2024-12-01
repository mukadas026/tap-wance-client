<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	import { browser } from '$app/environment';
	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<div class="w-screen h-screen max-w-[1920px] max-h-[1080px] font-inter">
	<QueryClientProvider client={queryClient}>
		{@render children()}
	</QueryClientProvider>
</div>
