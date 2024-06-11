import { get } from '$lib/caller';
import type { Wiki } from '$lib/types';
import type { ResponseGroup, SortDirection, SortKey } from './types/string-types';
import { getParams } from './util';

// wiki: Wiki, {}: {}, {}: {}
// wiki, params, data
export namespace DiscussionThread {
	export async function lock() {
		throw new Error('Not implemented');
	}

	export async function unlock() {
		throw new Error('Not implemented');
	}

	export async function update() {
		throw new Error('Not implemented');
	}

	export async function deleteThread() {
		throw new Error('Not implemented');
	}

	export async function undelete() {
		throw new Error('Not implemented');
	}

	export async function create() {
		throw new Error('Not implemented');
	}

	export async function getThreadForAnons(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'getThreadForAnons', { threadId });

		return get(wiki, params);
	}

	export async function getThread(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'getThread', { threadId });

		return get(wiki, params);
	}

	export async function getThreadHistory(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'getThreadHistory', { threadId });

		return get(wiki, params);
	}

	export type getThreadsParams = {
		sortKey?: SortKey;
		sortDirection?: SortDirection;
		viewableOnly?: boolean;
		limit?: number;
		pivot?: string;
		page?: number;

		responseGroup?: ResponseGroup;
	};
	export async function getThreads(wiki: Wiki, params?: getThreadsParams) {
		params = getParams('DiscussionThread', 'getThreads');

		return get(wiki, params);
	}

	export async function help() {
		throw new Error('Not implemented');
	}
}
