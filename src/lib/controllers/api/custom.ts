import { post } from '$lib/caller';
import type { Wiki } from '$lib/types';

/**
 *
 * @param wiki
 * @returns
 * @throws Token doesn't exist error
 */
export async function getToken(wiki: Wiki) {
	const params = {
		action: 'query',
		format: 'json',
		meta: 'tokens',
		prop: 'revisions',
		rvlimit: 2,
		formatversion: 2,
	};

	const data = await post(wiki, params, undefined, { script: 'api.php' });
	const token: string = data.query.tokens.csrftoken;
	return token;
}
