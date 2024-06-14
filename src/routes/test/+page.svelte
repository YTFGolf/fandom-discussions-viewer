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
		threadId: '4400000000000865448',
		title: 'Ackey',
		namespace: 0,
	};

	const wwrWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	const postParams = {};

	const postData: ArticleComments.postThreadData = {
		title: 'CORS',
		namespace: 0,
		jsonModel: {
			content: [{ type: 'paragraph', content: [{ type: 'text', text: 'hi' }] }],
		},
		attachments: { contentImages: [], openGraphs: [], atMentions: [] },
		token: 'not given',
	};

	// @ts-ignore
	async function sendTokenRequest(wiki, params, data) {
		let t = data;
		t.token = await getToken(wiki);
		console.log(await ArticleComments.postNewCommentThread(wiki, params, data));
	}
</script>

<svelte:head>
	<title>Test</title>
	<meta name="description" content="Testing the API" />
</svelte:head>

{#await ArticleComments.getCommentCount(bcWiki, getParams)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!-- prettier-ignore -->
<button on:click={async () => sendTokenRequest(wwrWiki, postParams, postData)}>
	Click to post
</button>
