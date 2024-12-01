// place files you want to import through the `$lib` alias in this folder.
export const formatSize = (bytes: number) => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log2(bytes) / 10);
	return `${(bytes / Math.pow(2, i * 10)).toFixed(2)} ${sizes[i]}`;
};

export const profileLinkGetter = (account: IConnectedAccounts) => {
	switch (account.account) {
		case 'tiktok':
			return `https://www.tiktok.com/@${account.details.username}`;
		case 'youtube':
			return `https://www.youtube.com/${account.details.username}`;
	}
};
