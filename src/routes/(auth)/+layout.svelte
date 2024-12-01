<script lang="ts">
	let { children } = $props();
</script>

<div class="w-full h-full flex items-center justify-center">
	{@render children()}
</div>
