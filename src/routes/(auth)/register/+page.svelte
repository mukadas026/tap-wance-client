<script lang="ts">
	import { enhance } from '$app/forms';
	import { baseURL, client } from '$lib/axios';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Icon from '@iconify/svelte';

	// check to see if user has a session then redirect to home page
	const formData = $state({
		displayName: '',
		email: '',
		password: ''
	});
	const handleFormSubmit = async (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		e.preventDefault();
		const { displayName, email, password } = formData;
		try {
			const res = await client.post('/auth/register', {
				email,
				name: displayName,
				password
			});
			console.log('~ res ~', res.data);
			// redirect(307, '/login');
		} catch (err) {
			console.log('~ register error ~', err);
		}
	};
</script>

<div
	class="w-5/6 md:w-3/5 max-w-[350px] flex flex-col gap-y-4 shadow-sm shadow-black/50 px-2 py-12 rounded-md"
>
	<form onsubmit={handleFormSubmit} class="w-full flex flex-col gap-y-4">
		<Label class="space-y-4">
			<span> Display Name </span>
			<Input required name="displayName" placeholder="Enter Username or Password" />
		</Label>
		<Label class="space-y-4">
			<span> Email </span>
			<Input required name="email" placeholder="Enter Username or Password" />
		</Label>
		<Label class="space-y-4">
			<span>Password</span>
			<Input required name="password" type="password" placeholder="********" />
		</Label>
		<Button type="submit">Register</Button>
	</form>
	<form action={`${baseURL}/auth/google`} class="w-full flex items-center justify-center">
		<Button
			type="submit"
			class="bg-white text-black hover:text-white flex items-center justify-center gap-x-4 px-4"
		>
			<Icon icon="logos:google-icon" />
			<span> Google </span>
		</Button>
	</form>
</div>
<!-- formaction="http://localhost:7000/api/v1/auth/google" -->
