import { get, post } from '$lib/caller';
import { ContentType, type Wiki } from '$lib/types';
import type { sAttachments } from '../types/attachments';
import type { JsonModel } from '../types/jsonModel';
import type { ResponseGroup } from '../types/string-types';
import { getParams } from '../util';

export namespace MessageWall {
	export type getThreadsParams = {
		wallOwnerId: string;
		hideDeleted?: boolean;
		limit?: number;
		page?: number;
		pivot?: string;
	};
	export async function getThreads(wiki: Wiki, params: getThreadsParams) {
		params = getParams('MessageWall', 'getThreads', params);

		return get(wiki, params);
	}

	/**
	 * Fun fact: there is no viewableOnly/hideDeleted parameter; it always
	 * returns every post that you can view.
	 */
	export type getThreadParams = {
		threadId: string;
		wallOwnerId: string;
		limit?: number;
		responseGroup?: ResponseGroup;
		pivot?: string;
	};
	export async function getThread(wiki: Wiki, params: getThreadParams) {
		params = getParams('MessageWall', 'getThread', params);

		return get(wiki, params);
	}

	export type createThreadData = {
		title: string;
		wallOwnerId: string;
		jsonModel: JsonModel;
		attachments: sAttachments;
		token: string;
		rawContent?: string;
	};
	export async function createThread(wiki: Wiki, {}: {}, data: createThreadData) {
		const params = getParams('MessageWall', 'createThread');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export type createReplyData = {
		wallOwnerId: string;
		threadId: string;
		jsonModel: JsonModel;
		attachments: sAttachments;
		token: string;
		rawContent?: string;
	};
	export async function createReply(wiki: Wiki, {}: {}, data: createReplyData) {
		const params = getParams('MessageWall', 'createReply');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export type editPostData = {
		wallOwnerId: string;
		threadId: string;
		postId: string;
		jsonModel: JsonModel;
		attachments: sAttachments;
		token: string;
		rawContent?: string;
	};
	export async function editPost(wiki: Wiki, {}: {}, data: editPostData) {
		const params = getParams('MessageWall', 'editPost');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export async function reportPost(wiki: Wiki, {}: {}, data: { token: string; postId: string }) {
		const params = getParams('MessageWall', 'reportPost');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export async function deleteReply(
		wiki: Wiki,
		{}: {},
		data: { postId: string; wallOwnerId: string; token: string; suppressContent?: boolean },
	) {
		const params = getParams('MessageWall', 'deleteReply');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export async function undeleteReply(
		wiki: Wiki,
		{}: {},
		data: { postId: string; wallOwnerId: string; token: string },
	) {
		const params = getParams('MessageWall', 'undeleteReply');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export async function lockThread(
		wiki: Wiki,
		{}: {},
		data: { threadId: string; wallOwnerId: string; token: string },
	) {
		const params = getParams('MessageWall', 'lockThread');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export async function unlockThread(
		wiki: Wiki,
		{}: {},
		data: { threadId: string; wallOwnerId: string; token: string },
	) {
		const params = getParams('MessageWall', 'unlockThread');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	/** Doesn't appear to do anything */
	export async function canAnonsPost() {
		throw new Error('Not implemented');
	}

	export async function help(wiki: Wiki) {
		const params = getParams('MessageWall', 'help');

		return get(wiki, params);
	}
}
