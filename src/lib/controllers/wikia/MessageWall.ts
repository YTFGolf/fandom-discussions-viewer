import { get } from '$lib/caller';
import type { Wiki } from '$lib/types';
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

	export async function getThread() {
		throw new Error('Not implemented');
	}

	export async function createThread() {
		throw new Error('Not implemented');
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
