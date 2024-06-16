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
		pivot: '4400000000003500938',
	};

	const wwrWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	const postParams = {};

	const postData: MessageWall.editPostData = {
		postId: '4400000000000090143',
		token: 'not given',
		wallOwnerId: '28291873',
	};

	// @ts-ignore
	async function sendTokenRequest(wiki, params, data) {
		let t = data;
		t.token = await getToken(wiki);
		console.log(await MessageWall.undeleteReply(wiki, params, data));
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
