/**
 * @file Contains information about thread objects as returned from server
 * requests.
 */

import type { JsonModel } from '$lib/controllers/types/jsonModel';
import type { Funnel } from '$lib/controllers/types/string-types';
import type { Attachments, Post, PostTime, UserData, UserDetails } from './Post';

export type PollAnswerImage = {
	url: string;

	mediaType: string;
	height: number;
	width: number;
};

export type PollAnswer = {
	id: number;
	image?: PollAnswerImage | null;
	position: number;
	text: string;
	votes: number;
};

export type Poll = {
	answers: PollAnswer[];
	id: number;
	question: string;
	totalVotes: number;
	userVotes: number[] | null;
};

export type Article = {
	articleId: string;
	articleTitle: string;
	image: null;
	relativeUrl: string;
	siteId: string;
};

export type Thread = {
	_links: {
		/** Basically the request you sent but without pivot or sorting. */
		first: [{ href: string }];
		/** View older replies */
		next?: [{ href: string }];
		/** View newer replies */
		previous?: [{ href: string }];
	};
	_embedded: {
		/**
		 * Only exists if `responseGroup=full` and there are replies to the
		 * post.
		 */
		'doc:posts'?: Post[];
		userData?: [UserData];
		attachments: Attachments[];
	};

	title: string;
	createdBy: UserDetails;
	creationDate: PostTime;
	postCount: number;
	upvoteCount: number;
	lastEditedBy?: UserDetails;
	lastDeletedBy?: UserDetails;

	id: string;
	siteId: string;
	forumId: string;
	forumName: string;

	firstPostId: string;
	lastPostId: string;

	isContentSuppressed: boolean;
	isDeleted: boolean;
	isEditable: boolean;
	isFollowed: boolean;
	isLocked: boolean;
	isReported: boolean;

	tags: Article[];
	poll?: Poll;
	funnel: Funnel;

	rawContent: string;
	jsonModel: JsonModel | null;
};
