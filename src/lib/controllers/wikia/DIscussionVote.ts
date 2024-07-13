import { get, post } from '$lib/caller';
import { ContentType, type Wiki } from '$lib/types';
import { getParams } from '../util';

export namespace DiscussionVote {
	export async function upVotePost(wiki: Wiki, params: { postId: string }) {
		params = getParams('DiscussionVote', 'upVotePost', params);

		return post(wiki, params, { contentType: ContentType.HTML });
	}

	export async function downVotePost(wiki: Wiki, params: { postId: string }) {
		params = getParams('DiscussionVote', 'downVotePost', params);

		return post(wiki, params, { contentType: ContentType.HTML });
	}

	export async function help(wiki: Wiki) {
		const params = getParams('DiscussionVote', 'help');

		return get(wiki, params);
	}
}
