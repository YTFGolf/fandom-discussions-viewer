import { get } from '$lib/caller';
import type { Wiki } from '$lib/types';
import { getParams } from '../util';

// wiki: Wiki, {}: {}, {}: {}
// wiki, params, data
export namespace ArticleComments {
	export async function postNewCommentThread() {
		throw new Error('Not implemented');
	}

	export async function postNewCommentReply() {
		throw new Error('Not implemented');
	}

	export async function editComment() {
		throw new Error('Not implemented');
	}

	export async function reportPost() {
		throw new Error('Not implemented');
	}

	export async function getCommentCount() {
		throw new Error('Not implemented');
	}

	export async function getThread() {
		throw new Error('Not implemented');
	}

	export async function getComments() {
		throw new Error('Not implemented');
	}

	export async function deletePost() {
		throw new Error('Not implemented');
	}

	export async function undeletePost() {
		throw new Error('Not implemented');
	}

	/**
	 * Basically a worse version of `FeedsAndPosts.getArticleNamesAndUsername`.
	 * Doesn't specify namespace so useless for user blogs. Also only works for
	 * the one page.
	 */
	export async function getArticleTitle(wiki: Wiki, { stablePageId }: { stablePageId: string }) {
		const params = getParams('ArticleComments', 'getArticleTitle', { stablePageId });

		return get(wiki, params);
	}

	export async function help(wiki: Wiki) {
		const params = getParams('ArticleComments', 'help');

		return get(wiki, params);
	}
}
