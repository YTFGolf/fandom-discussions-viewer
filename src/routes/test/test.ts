import type { DiscussionPost } from '$lib/controllers/DiscussionPost';
import type { Attachments } from '$lib/controllers/types/attachments';
import type { JsonModel } from '$lib/controllers/types/jsonModel';
import type { Poll } from '$lib/controllers/types/poll';
import type { Funnel, Source } from '$lib/controllers/types/string-types';

// body isn't needed technically, need to investigate further
// body is alias for rawContent
// jsonModel isn't needed either
// jsonModel > body
// figure out how contentimages work, probably similar to attachments or directly in there
// if jsonModel is not proper json just fails lmao
// reply history relies on jsonModel
// special:userprofileactivity relies on body/rawContent
// jsonModel length must be between 0 and 65520

// anything that can be null can also be undefined
type ThreadPost = {
	title: string;
	siteId: string;

	jsonModel?: JsonModel;
	// you could just not use it but why
	// TODO create a proper interface for jsonModel

	rawContent?: string;
	source?: Source;
	attachments?: Attachments;
	articleIds?: string[];
	// numerical

	funnel?: Funnel;
	poll: Poll;

	body?: string;
	// same as rawContent
};

/** I love this payload */
let postData: DiscussionPost.createData = {
	siteId: '3448675',
	threadId: '4400000000000037009',
	jsonModel: {
		content: [
			{
				type: 'code_block',
				content: [
					{
						type: 'text',
						text: 'test',
						marks: [
							{ type: 'strong' },
							{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
							{ type: 'em' },
							{ type: 'mention', attrs: { userId: '27706221' } },
						],
					},
				],
			},
		],
	},
};
