import { client } from '$lib/axios';
import { redirect } from '@sveltejs/kit';
import type { Actions, Action } from './$types';
import { isAxiosError } from 'axios';

// export const actions: Actions = {
// 	default: async (event) => {
// 	}
// };

const loginAction: Action = async ({ request, cookies }) => {
	// await request.json()
	// console.log('~ form data ~', (await request.formData()).getAll('username'));
	const formData = await request.formData();

	const email = formData.get('email');
	const password = formData.get('password');

	console.log('email:password', `${email}:${password}`);

	// TODO: validate email and password here
	let status = null;
	try {
		const {
			data,
			status: resStatus,
			headers,
			...rest
		} = await client.post('/auth/login', {
			email,
			password
		});
		console.log('~ res ~', rest);
		const cookie = headers['set-cookie'] && headers['set-cookie'][0];
		console.log('cookie', cookie?.split(';')[0].split('=')[1]);
		const connectSid = cookie?.split(';')[0].split('=')[1];
		cookies.set('connect.sid', connectSid as string, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax'
			// secure: true
		});
		status = resStatus;
		// return res.data;
	} catch (err) {
		console.log('~ login error ~', err);
		if (isAxiosError(err)) {
			status = err?.status;
		}
	}
	if (status && status >= 200 && status < 300) {
		console.log('status', status);
		redirect(303, '/');
	}
};

export const actions: Actions = { default: loginAction };
