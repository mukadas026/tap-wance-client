import { baseURL, client } from '$lib/axios';
import { redirect } from '@sveltejs/kit';
import type { Actions, Action } from './$types';

// export const actions: Actions = {
// 	default: async (event) => {
// 	}
// };

const registerAction: Action = async ({ request }) => {
	// await request.json()
	// console.log('~ form data ~', (await request.formData()).getAll('username'));
	const formData = await request.formData();

	const email = formData.get('email');
	const displayName = formData.get('displayName');
	const password = formData.get('password');

	console.log('email:password', `${email}:${password}`);

	// TODO: validate email and password here
	try {
		const res = await client.post('/auth/register', {
			email,
			name: displayName,
			password
		});
		console.log('~ res ~', res.data);
		redirect(307, '/login');
	} catch (err) {
		console.log('~ register error ~', err);
	}
};

const registerWithGoogle: Action = async ({ request }) => {};

export const actions: Actions = { default: registerAction };
