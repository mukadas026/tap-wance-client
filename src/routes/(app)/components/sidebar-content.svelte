<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';

	import {
		ChartLine,
		House,
		Package,
		ShoppingCart,
		Users,
		TrendingUpDown,
		Contact
	} from 'lucide-svelte';

	const navLinks = [
		{
			name: 'Dashboard',
			href: '/',
			icon: House
		},
		{
			name: 'Content',
			href: '/content',
			icon: ShoppingCart
		},
		{
			name: 'Analytics',
			href: '/analytics',
			icon: TrendingUpDown
		},
		{
			name: 'Customers',
			href: '/',
			icon: Users
		},
		{
			name: 'Connected Accounts',
			href: '/connected-accounts',
			icon: Contact
		}
	];
</script>

<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
	{#each navLinks as { name, href, icon: Icon }}
		<a
			{href}
			class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
		>
			<Icon class="h-4 w-4" />
			{name}
		</a>
	{/each}
</nav>
