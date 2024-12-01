import { client } from '$lib/axios';
import { get } from 'svelte/store';

export const getAllVideos = {
	key: ['getAllVideos'],
	fn: async () => {
		try {
			const res = await client.get<Array<IVideo>>('/content/list');
			console.log('get all videos', res);
			return res.data;
		} catch (e) {
			throw e;
		}
	}
};
