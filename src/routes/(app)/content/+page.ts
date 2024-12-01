import { client } from '$lib/axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	try {
		const res = await Promise.all([
			client.get<Array<IConnectedAccounts>>('/accounts')
			// client.get<Array<IVideo>>('/content/list')
		]);

		return {
			accounts: res[0].data
			// videos: res[1].data
		};
	} catch (err) {
		return {
			accounts: [],
			videos: []
		};
	}
};

export const ssr = false;
