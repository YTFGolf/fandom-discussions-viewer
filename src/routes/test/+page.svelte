<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/DiscussionThread';

	const getWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	const getParams: DiscussionThread.getThreadParams = {
		threadId: '4400000000000822918',
		responseGroup: 'full',
	};

	const postWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
		// siteId: '3448675',
	};

	// https://wwr-test.fandom.com/wikia.php?controller=FeedsAndPosts&method=getWikiVariables
	const postParams = {
		controller: 'DiscussionThread',
		method: 'create',
		forumId: '4400000000000004391',
	};

	const postData: DiscussionThread.updateData = {
		title: 'title is required',
		jsonModel: {
			content: [{ type: 'paragraph', content: [{ type: 'text', text: 'hi' }] }],
		},
		poll: {
			question: 'does this required',
			answers: [
				{ text: 'hi', position: 0 },
				{ text: 'hi', position: 0 },
			],
		},
	};
</script>

<svelte:head>
	<title>Test</title>
	<meta name="description" content="Testing the API" />
</svelte:head>

<!-- {#await DiscussionThread.getThread(getWiki, getParams)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<!-- <button on:click={async () => console.log(await DiscussionThread.update(postWiki, { threadId: "4400000000000037057" }, postData))}>
	Click to post
</button> -->
