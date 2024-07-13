/**
 * @file Contains information about thread objects as returned from server
 * requests.
 */

import type { Post } from './Post';

export type Thread = {
	_embedded: { 'doc:posts': Post[] };

	title: string;

	id: string;
	siteId: string;
	forumId: string;
	firstPostId: string;

	upvoteCount: number;

	// poll: undefined;
};
