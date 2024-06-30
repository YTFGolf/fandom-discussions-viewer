import type { LayoutServerLoad } from './$types';
import { getFileData } from '$lib/server/util';

getFileData('package.json').then((data) => console.log(data));

export type Config = {
	theme: 'light' | 'dark';
};

/**
 * Sets wiki name as a cookie. Wiki is the first given of:
 * - URL search param (`?wiki=en.battle-cats`)
 * - Wiki cookie
 * - `en.community`
 */
export const load: LayoutServerLoad = async function (data) {
	const cookies = data.cookies;
	const url = data.url;

	const wiki = url.searchParams.get('wiki') || cookies.get('wiki') || 'en.community';
	cookies.set('wiki', wiki, { path: '/' });

	const config: Config = {
		theme: 'light',
	};
	// TODO make the config a cookie or store it in a file or something

	return {
		wiki: wiki,
		config,
	};
};
