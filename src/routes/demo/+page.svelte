<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import { ArticleComments } from '$lib/controllers/wikia/ArticleComments';
	import { getToken } from '$lib/controllers/api/custom';
	import { MessageWall } from '$lib/controllers/wikia/MessageWall';
	import { FeedsAndPosts } from '$lib/controllers/wikia/FeedsAndPosts';

	const bcWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	const getParams: MessageWall.getThreadParams = {
		threadId: '4400000000000873805',
		wallOwnerId: '45329321',
		limit: 1,
		responseGroup: 'full',
		pivot: '4400000000003500938',
	};

	const wwrWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	const postParams = {};

	const postData: DiscussionPost.createData = {
		// threadId: '4400000000000822918',
		// siteId: '691085',
		threadId: '4400000000000037009',
		siteId: '3448675',
		jsonModel: {
			content: [
				{
					type: 'code_block',
					content: [
						{
							type: 'text',
							marks: [
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
								{ type: 'mention', attrs: { userId: '53976914' } },
								{ type: 'em' },
							],
							text: 'Can any of you mere\nmortals do this',
						},
					],
				},
				{
					type: 'bulletList',
					content: [
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n1 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n2 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n3 lol hi this is a sentence' }],
								},
							],
						},
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n1 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n2 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n3 lol hi this is a sentence' }],
								},
							],
						},
					],
				},
			],
		},
	};
</script>

<svelte:head>
	<title>Demo</title>
	<meta name="description" content="Demonstration and scripting" />
</svelte:head>

<!-- {#await FeedsAndPosts.getAll(wwrWiki)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<button on:click={async () => DiscussionPost.create(wwrWiki, postParams, postData)}>
	Click to post
</button>
