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
<button on:click={async () => console.log(await DiscussionThread.unlock(postWiki, { threadId: "4400000000000037009" }))}>
	Click to post
</button>
