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

	const postData: ArticleComments.deleteData = {
		title: 'API stuff',
		namespace: 0,
		token: 'not given',
		postId: '4400000000000090127',
	};

	// @ts-ignore
	async function sendTokenRequest(wiki, params, data) {
		let t = data;
		t.token = await getToken(wiki);
		console.log(await ArticleComments.undeletePost(wiki, params, data));
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
<!-- <button on:click={async () => sendTokenRequest(wwrWiki, postParams, postData)}>
	Click to post
</button> -->
<!-- prettier-ignore -->
<button on:click={async () => DiscussionPost.deletePost(wwrWiki, { postId: "4400000000000090100" })}>
	Click to post
</button>
