import { get, post } from '$lib/caller';
import { ContentType, type Wiki } from '$lib/types';
import type { Attachments } from '../types/attachments';
import type { JsonModel } from '../types/jsonModel';
import { getParams } from '../util';

/**
 * Identifies a page.
 *
 * If you have a more specific selector (`threadId`, `postId`), PageId only
 * needs to correspond to **_a_** page with comments, not necessarily the page
 * that the original thread is on
 */
export type PageId = {
	/** Without namespace prefix (i.e. same as `{{PAGENAME}}`) */
	title: string;
	/** Must be actual namespace of the page `title` refers to */
	namespace: number;
};

export namespace ArticleComments {
	export type postThreadData = {
		jsonModel: JsonModel;
		attachments: Attachments | string;
		token: string;
	} & PageId;
	export async function postNewCommentThread(wiki: Wiki, {}: {}, data: postThreadData) {
		const params = getParams('ArticleComments', 'postNewCommentThread');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export type postReplyData = {
		threadId: string;
		jsonModel: JsonModel;
		attachments: Attachments | string;
		token: string;
	} & PageId;
	export async function postNewCommentReply(wiki: Wiki, {}: {}, data: postReplyData) {
		const params = getParams('ArticleComments', 'postNewCommentReply');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export type editCommentData = {
		/**
		 * Note: if you want to edit the comment thread then you need the post
		 * id of that comment, not the `commentId` (i.e. you need to use
		 * `getThread(...).thread.postId`)
		 */
		postId: string;
		jsonModel: JsonModel;
		attachments: Attachments | string;
		token: string;
	} & PageId;
	export async function editComment(wiki: Wiki, {}: {}, data: editCommentData) {
		const params = getParams('ArticleComments', 'editComment');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export async function reportPost() {
		throw new Error('Not implemented');
	}

	export async function getCommentCount(wiki: Wiki, params: { hideDeleted?: boolean } & PageId) {
		params = getParams('ArticleComments', 'getCommentCount', params);

		return get(wiki, params);
	}

	export type getThreadParams = { threadId: string; hideDeleted?: boolean } & PageId;
	export async function getThread(wiki: Wiki, params: getThreadParams) {
		params = getParams('ArticleComments', 'getThread', params);

		return get(wiki, params);
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
