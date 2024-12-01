import { writable } from 'svelte/store';

export const AuthStore = writable<{ token: string; user: any }>({
	token: '',
	user: {}
});
