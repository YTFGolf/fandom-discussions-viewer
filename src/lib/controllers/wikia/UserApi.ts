import { get } from '$lib/caller';
import type { Wiki } from '$lib/types';
import { getParams } from '../util';

export namespace UserApi {
	/**
	 * Get details about specific users. `ids` is a comma-separated list of
	 * usernames or user IDs. Size is used for profile picture dimensions.
	 */
	export async function getDetails(wiki: Wiki, params: { ids: string; size?: string }) {
		params = getParams('UserApi', 'getDetails', params);

		return get(wiki, params);
	}

	/**
	 * Search user (used when trying to write a ping).
	 */
	export async function getUsersByName(wiki: Wiki, params: { query: string }) {
		params = getParams('UserApi', 'getUsersByName', params);

		return get(wiki, params);
	}

	export async function help(wiki: Wiki) {
		const params = getParams('UserApi', 'help');

		return get(wiki, params);
	}
}
