import { writable } from 'svelte/store';

interface IAppStore {
	accounts: Array<IConnectedAccounts>;
}
export const AppStore = writable<IAppStore>({
	accounts: []
});
