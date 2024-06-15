<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import { ArticleComments } from '$lib/controllers/wikia/ArticleComments';
	import { getToken } from '$lib/controllers/api/custom';

	const bcWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	const getParams: ArticleComments.getThreadParams = {
		hideDeleted: false,
		threadId: '4400000000000037083',
		title: 'CORS',
		namespace: 0,
	};

	const wwrWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	const postParams = {};

	const postData: ArticleComments.postReplyData = {
		title: 'CORS',
		namespace: 0,
		token: 'not given',
		threadId: '4400000000000037085',
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
	};

	// @ts-ignore
	async function sendTokenRequest(wiki, params, data) {
		let t = data;
		t.token = await getToken(wiki);
		console.log(await ArticleComments.postNewCommentReply(wiki, params, data));
	}
</script>

<svelte:head>
	<title>Demo</title>
	<meta name="description" content="Demonstration and scripting" />
</svelte:head>

<!-- {#await ArticleComments.getComments(wwrWiki, getParams)}
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
