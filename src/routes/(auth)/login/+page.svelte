<script lang="ts">
	import { enhance } from '$app/forms';
	import { baseURL, client } from '$lib/axios';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Icon from '@iconify/svelte';
	import type { SubmitFunction } from './$types';
	import { Loader } from 'lucide-svelte';

	let isLoading = $state(false);
	let email = $state('');
	let password = $state('');

	const onChangeHandler = (e: Event) => {
		const { name, value } = e.target as HTMLInputElement;
		if (name === 'email') {
			email = value;
		} else if (name === 'password') {
			password = value;
		}
	};
	const submitHandler = async (e: SubmitEvent) => {
		e.preventDefault();
		console.log('~ email ~', email, '~ password ~', password);
		try {
			const res = await client.post('/auth/login', {
				email,
				password
			});
			console.log('~ res ~', res.data);
			window.location.replace('/');
		} catch (err) {
			console.log(err);
		}
	};
</script>

<div
	class="w-5/6 md:w-3/5 max-w-[350px] flex flex-col gap-y-4 shadow-sm shadow-black/50 px-2 py-12 rounded-md"
>
	<form onsubmit={submitHandler} class="w-full flex flex-col gap-y-4">
		<Label class="space-y-4">
			<span> Email </span>

			<Input
				required
				name="email"
				value={email}
				onchange={onChangeHandler}
				placeholder="Enter Email"
			/>
		</Label>
		<Label class="space-y-4">
			<span>Password</span>
			<Input
				required
				name="password"
				value={password}
				onchange={onChangeHandler}
				type="password"
				placeholder="********"
			/>
		</Label>
		<Button type="submit" disabled={isLoading}>
			{#if isLoading}
				<Loader class="animate-spin" size={16} />
			{:else}
				<span> Login </span>
			{/if}
		</Button>
	</form>
	<form action={`${baseURL}/auth/google`} class="w-full flex items-center justify-center">
		<Button
			type="submit"
			class="bg-white text-black hover:text-white flex items-center justify-center gap-x-4 px-4"
			disabled={isLoading}
		>
			<Icon icon="logos:google-icon" />
			<span> Google </span>
		</Button>
	</form>
</div>
