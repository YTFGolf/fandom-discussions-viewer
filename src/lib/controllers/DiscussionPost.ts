import { get, post } from '$lib/caller';
import type { Wiki } from '$lib/types';
import type { Attachments } from './types/attachments';
import type { ContainerType, HasData, Source } from './types/string-types';
import { getParams } from './util';

// wiki: Wiki, {}: {}, {}: {}
// wiki, params, data
export namespace DiscussionPost {
	export type updateData = {
		attachments: Attachments;
	} & HasData;
	export async function update(wiki: Wiki, { postId }: { postId: string }, data: updateData) {
		const params = getParams('DiscussionPost', 'update', { postId });

		return post(wiki, params, data);
	}

	export type createData = {
		/** Must correspond to actual siteId */
		siteId: string;
		threadId: string;

		source?: Source;
		attachments?: Attachments;
	} & HasData;
	/**
	 * Fun fact: if you have thread mod/admin you can reply to locked posts.
	 */
	export async function create(wiki: Wiki, {}: {}, data: createData) {
		const params = getParams('DiscussionPost', 'create');

		return post(wiki, params, data);
	}

	/**
	 * Note: to avoid keyword clash this is `deletePost` instead of `delete`.
	 */
	export async function deletePost(wiki: Wiki, { postId }: { postId: string }) {
		const params = getParams('DiscussionPost', 'delete', { postId });

		return post(wiki, params);
	}

	export async function undelete(wiki: Wiki, { postId }: { postId: string }) {
		const params = getParams('DiscussionPost', 'undelete', { postId });

		return post(wiki, params);
	}

	export async function getPost(wiki: Wiki, { postId }: { postId: string }) {
		const params = getParams('DiscussionPost', 'getPost', { postId });

		return get(wiki, params);
	}

	export async function getPostHistory(wiki: Wiki, { postId }: { postId: string }) {
		const params = getParams('DiscussionPost', 'getPostHistory', { postId });

		return get(wiki, params);
	}

	type getPostsParams = {
		containerType?: ContainerType;
		reported?: boolean;
		viewableOnly?: boolean;
		includeCounters?: boolean;
		page?: number;
		limit?: number;
	};
	export async function getPosts(wiki: Wiki, params: getPostsParams) {
		params = getParams('DiscussionPost', 'getPosts', params);

		return get(wiki, params);
	}

	export async function help(wiki: Wiki) {
		const params = getParams('DiscussionPost', 'help');

		return get(wiki, params);
	}
}
