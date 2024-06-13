<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/DiscussionThread';

	const getWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	const getParams = {
		controller: 'DiscussionThread',
		method: 'getThread',
		threadId: '4400000000000817646',
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

	const postData: DiscussionThread.createData = {
		siteId: '3448675',
		title: 'name of post',
		jsonModel: 'the',
		poll: {
			question: 'what name',
			answers: [
				{
					text: 'option 1',
					position: 0,
					image: {
						url: 'https://static.wikia.nocookie.net/86750a06-2148-46ab-a58d-5d28a012c596',
						height: 112,
						width: 112,
						mediaType: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
					},
				},
				{
					text: 'option 2',
					position: 0,
					image: {
						url: 'https://static.wikia.nocookie.net/86750a06-2148-46ab-a58d-5d28a012c596',
						height: 112,
						width: 112,
						mediaType: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
					},
				},
			],
		},
		funnel: 'TEXT',
		source: 'MIGRATED_WALL_POST',
	};
</script>

<svelte:head>
	<title>Test</title>
	<meta name="description" content="Testing the API" />
</svelte:head>

<!-- {#await DiscussionThread.getThreads(getWiki)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<button on:click={async () => console.log(await DiscussionThread.create(postWiki, { forumId: "3448675" }, postData))}>
	Click to post
</button>
