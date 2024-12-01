// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface IAccountDetails {
		title: string;
		description: string;
		username: string;
		thumbnail: string;
		subscribers: number;
		videos: number;
	}

	type AccountTypes = 'youtube' | 'tiktok';
	type IConnectedAccounts = {
		// [key in AccountTypes]: {
		account: AccountTypes;
		details: IAccountDetails;
		// };
	};

	interface IVideo {
		_id: string;
		userID: string;
		ids?: Array<{ id: string; account: AccountTypes }>;
		title: string;
		posted: string;
		updated: string;
	}
}

export {};
