import type { DiscussionPost } from '$lib/controllers/DiscussionPost';

/** I love this payload */
const postData: DiscussionPost.createData = {
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
							{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
							{ type: 'mention', attrs: { userId: '27706221' } },
						],
					},
				],
			},
		],
	},
};
