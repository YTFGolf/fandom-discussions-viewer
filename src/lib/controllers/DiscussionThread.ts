import { get, post } from '$lib/caller';
import type { Wiki } from '$lib/types';
import type { Attachments } from './types/attachments';
import type { JsonModel } from './types/jsonModel';
import type { Poll } from './types/poll';
import type { Funnel, ResponseGroup, SortDirection, SortKey, Source } from './types/string-types';
import { getParams } from './util';

// wiki: Wiki, {}: {}, {}: {}
// wiki, params, data
export namespace DiscussionThread {
	export async function lock(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'lock', { threadId });

		return post(wiki, params);
	}

	export async function unlock(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'unlock', { threadId });

		return post(wiki, params);
	}

	export async function update() {
		throw new Error('Not implemented');
	}

	export async function deleteThread(wiki: Wiki, { threadId }: { threadId: string }) {
		throw new Error('Not implemented');
	}

	export async function undelete(wiki: Wiki, { threadId }: { threadId: string }) {
		throw new Error('Not implemented');
	}

	export type createData = {
		title: string;
		siteId: string;

		jsonModel?: JsonModel;
		rawContent?: string;
		body?: string;

		source?: Source;
		attachments?: Attachments;
		articleIds?: string[];
		funnel?: Funnel;
		poll?: Poll;
	};
	export async function create(wiki: Wiki, { forumId }: { forumId: string }, data: createData) {
		const params = getParams('DiscussionThread', 'create', { forumId });

		return post(wiki, params, data);
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
		params = getParams('DiscussionThread', 'getThreads', params);

		return get(wiki, params);
	}

	export async function help(wiki: Wiki) {
		const params = getParams('DiscussionThread', 'help');

		return get(wiki, params);
	}
}
