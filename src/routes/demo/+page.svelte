<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import { ArticleComments } from '$lib/controllers/wikia/ArticleComments';
	import { getToken } from '$lib/controllers/api/custom';
	import { MessageWall } from '$lib/controllers/wikia/MessageWall';

	const bcWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	const getParams: MessageWall.getThreadParams = {
		threadId: '4400000000000873805',
		wallOwnerId: '45329321',
		limit: 1,
		responseGroup: 'full',
		page: 400,
		pivot: '4400000000003500938',
		hideDeleted: true,
		viewableOnly: true,
	};

	const wwrWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	const postParams = {};

	const postData: MessageWall.createThreadData = {
		title: 'Title',
		wallOwnerId: '28291873',
		jsonModel: {
			content: [
				{ type: 'paragraph', content: [{ type: 'text', text: 'hills' }] },
				{ type: 'paragraph', content: [{ type: 'text', text: 'hills' }] },
				{ type: 'openGraph', attrs: { id: 0 } },
				{ type: 'openGraph', attrs: { id: 1 } },
			],
		},
		attachments: {
			contentImages: [],
			openGraphs: [
				{ originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', siteName: 'Rick' },
				{ originalUrl: 'https://www.youtube.com/watch?v=LLFhKaqnWwk', siteName: 'Rick???' },
			],
			atMentions: [],
		},
		rawContent: 'does this do ',
		token: 'not given',
	};

	// @ts-ignore
	async function sendTokenRequest(wiki, params, data) {
		let t = data;
		t.token = await getToken(wiki);
		console.log(await MessageWall.createThread(wiki, params, data));
	}
</script>

<svelte:head>
	<title>Demo</title>
	<meta name="description" content="Demonstration and scripting" />
</svelte:head>

<!-- {#await MessageWall.getThread(bcWiki, getParams)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<button on:click={async () => sendTokenRequest(wwrWiki, postParams, postData)}>
	Click to post
</button>
