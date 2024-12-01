import { client } from '$lib/axios';
import { AppStore } from '$lib/store/index.store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	try {
		const res = await client.get<Array<IConnectedAccounts>>('/accounts');

		return res.data;
	} catch (err) {
		return {
			accounts: []
		};
	}
};

export const ssr = false;
