import { get } from '$lib/caller';
import type { Wiki } from '$lib/types';
import { getParams } from '../util';
import { DiscussionThread } from './DiscussionThread';

/**
 * Doesn't implement all features of FeedsAndPosts; see
 * https://community.fandom.com/wikia.php?controller=FeedsAndPosts&method=help&format=json
 * for a full list.
 */
export namespace FeedsAndPosts {
	/**
	 * Implements every method that starts with `get` and takes no input.
	 */
	export async function getAll(wiki: Wiki) {
		const params = getParams('FeedsAndPosts', 'getAll');

		return get(wiki, params);
	}

	/**
	 * Not very useful for Discussions.
	 */
	export async function getArticleData(wiki: Wiki, { title }: { title: string }) {
		const params = getParams('FeedsAndPosts', 'getArticleData', { title });

		return get(wiki, params);
	}

	/**
	 * Both inputs are in the form {num1},{num2} etc.
	 *
	 * If you put userIds as `27706221,0,27706221` the response would have
	 * userIds be of length 1. Similar thing for stablePageIds.
	 */
	export async function getArticleNamesAndUsernames(
		wiki: Wiki,
		params: { stablePageIds?: string; userIds?: string },
	) {
		params = getParams('FeedsAndPosts', 'getArticleNamesAndUsernames', params);

		return get(wiki, params);
	}

	/**
	 * Returns the `articleIds` used in {@link DiscussionThread}.
	 *
	 * `query` must be at least 3 characters long. This is a query, i.e. when
	 * trying to put tags on a post this is the method that gets called.
	 */
	export async function searchForTags(wiki: Wiki, params: { query: string }) {
		params = getParams('FeedsAndPosts', 'searchForTags', params);

		return get(wiki, params);
	}

	export async function help(wiki: Wiki) {
		const params = getParams('FeedsAndPosts', 'help');

		return get(wiki, params);
	}
}
