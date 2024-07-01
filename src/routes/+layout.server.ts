import { Option } from '$lib/client';
import { get } from '$lib/server';
import type { Config } from '$lib/server/config';
import type { UserData } from '$lib/server/userData';
import type { LayoutServerLoad } from './$types';

// https://stackoverflow.com/a/64915904
async function resolve<T extends Record<keyof T, any>>(
	obj: T,
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
	// prettier-ignore
	return Promise.all(
		Object.entries(obj).map(async ([k, v]) => [k, await v])
	).then(Object.fromEntries);
}

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

	const fileContent = await resolve({
		userData: get(Option.UserData) as Promise<UserData>,
		config: get(Option.Config) as Promise<Config>,
	});

	return {
		wiki,
		...fileContent,
	};
};
