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

	/** These will all be set to null if not given */
	export type updateData = {
		title: string;

		jsonModel?: JsonModel;
		rawContent?: string;
		body?: string;

		attachments?: Attachments;
		articleIds?: string[];
		poll?: Poll;
	};
	export async function update(wiki: Wiki, { threadId }: { threadId: string }, data: updateData) {
		const params = getParams('DiscussionThread', 'update', { threadId });

		return post(wiki, params, data);
	}

	export async function deleteThread(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'delete', { threadId });

		return post(wiki, params);
	}

	export async function undelete(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'undelete', { threadId });

		return post(wiki, params);
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

	export type getThreadParams = {
		threadId: string;

		sortDirection?: SortDirection;
		viewableOnly?: boolean;
		limit?: number;
		pivot?: string;
		page?: number;
		responseGroup?: ResponseGroup;
	};
	export async function getThread(wiki: Wiki, params: getThreadParams) {
		params = getParams('DiscussionThread', 'getThread', params);

		return get(wiki, params);
	}

	export async function getThreadHistory(wiki: Wiki, { threadId }: { threadId: string }) {
		const params = getParams('DiscussionThread', 'getThreadHistory', { threadId });

		return get(wiki, params);
	}

	export type getThreadsParams = {
		sortKey?: SortKey;
		sortDirection?: SortDirection;
		forumId?: string;
		source?: Source;
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
