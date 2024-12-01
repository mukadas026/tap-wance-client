import { client } from '$lib/axios';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { isAxiosError } from 'axios';

const checkUserHasSession = async (connectSid: string) => {
	let status = null;
	try {
		const res = await client.get('/auth', {
			withCredentials: true,
			headers: { cookie: `connect.sid=${connectSid}` }
		});
		console.log('~ res has data ~', res.data);

		return res.data;
	} catch (err: unknown) {
		console.log('~ check user has session error ~', err);
		if (isAxiosError(err)) {
			status = err?.status;
		} else {
			status = 400;
		}
	}
	if (status && status >= 400) {
		console.log('status', status);
		redirect(307, '/login');
	}
};
export const load: LayoutServerLoad = async ({ cookies }) => {
	const connectSid = cookies.get('connect.sid') as string;
	console.log('connect sid', connectSid);
	const data = await checkUserHasSession(connectSid);
	return data;
};
