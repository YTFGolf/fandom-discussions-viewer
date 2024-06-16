import { get, post } from '$lib/caller';
import { ContentType, type Wiki } from '$lib/types';
import type { Attachments } from '../types/attachments';
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
		attachments: Attachments | string;
		token: string;
		rawContent?: string;
	};
	export async function createThread(wiki: Wiki, {}: {}, data: createThreadData) {
		const params = getParams('MessageWall', 'createThread');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	export async function createReply() {
		throw new Error('Not implemented');
	}

	export async function editPost() {
		throw new Error('Not implemented');
	}

	export async function reportPost() {
		throw new Error('Not implemented');
	}

	export async function deleteReply() {
		throw new Error('Not implemented');
	}

	export async function undeleteReply() {
		throw new Error('Not implemented');
	}

	export async function lockThread() {
		throw new Error('Not implemented');
	}

	export async function unlockThread() {
		throw new Error('Not implemented');
	}

	export async function canAnonsPost() {
		throw new Error('Not implemented');
	}

	export async function help() {
		throw new Error('Not implemented');
	}
}
