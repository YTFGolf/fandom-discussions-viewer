import { get, post } from '$lib/caller';
import { ContentType, type Wiki } from '$lib/types';
import { getParams } from '../util';

export namespace DiscussionPoll {
	export async function castVote(wiki: Wiki, {}: {}, data: { answerIds: string; pollId: string }) {
		const params = getParams('DiscussionPoll', 'castVote');

		return post(wiki, params, data, { contentType: ContentType.HTML });
	}

	/**
	 * If answerId is not given then will display all users who have voted on
	 * the poll. If given then only displays users for that answer.
	 */
	export async function getVoters(wiki: Wiki, params: { pollId: string; answerId?: string }) {
		params = getParams('DiscussionPoll', 'getVoters', params);

		return get(wiki, params);
	}

	export async function help(wiki: Wiki) {
		const params = getParams('DiscussionPoll', 'help');

		return get(wiki, params);
	}
}