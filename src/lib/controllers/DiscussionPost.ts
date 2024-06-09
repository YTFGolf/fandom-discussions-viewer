import { get, post } from '$lib/caller';
import type { Wiki } from '$lib/types';
import type { Attachments } from './types/attachments';
import type { HasData, Source } from './types/string-types';
import { getParams } from './util';

// wiki: Wiki, {}: {}, {}: {}
// wiki, params, data
export namespace DiscussionPost {
	export type updateData = {
		attachments: Attachments;

		/** Ignored */
		siteId?: string;
		/** Ignored */
		threadId?: string;
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

	export async function undelete() {
		throw new Error('Not implemented');
	}

	export async function getPost(wiki: Wiki, { postId }: { postId: string }) {
		const params = getParams('DiscussionPost', 'getPost', { postId });

		return get(wiki, params);
	}

	export async function getPostHistory(wiki: Wiki, { postId }: { postId: string }) {
		const params = getParams('DiscussionPost', 'getPostHistory', { postId });

		return get(wiki, params);
	}

	export async function getPosts() {
		throw new Error('Not implemented');
	}

	export async function help() {
		throw new Error('Not implemented');
	}
}
