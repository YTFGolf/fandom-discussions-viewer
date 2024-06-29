import { page } from '$app/stores';
import type { Cookies } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

/**
 * Sets wiki name as a cookie. Wiki is the first given of:
 * - URL search param (`?wiki=en.battle-cats`)
 * - Wiki cookie
 * - `en.community`
 */
export const load: LayoutServerLoad = function (data) {
	const cookies = data.cookies;
	const url = data.url;

	const wiki = url.searchParams.get('wiki') || cookies.get('wiki') || 'en.community';
	cookies.set('wiki', wiki, { path: '/' });

	return {
		wiki: wiki,
	};
};
