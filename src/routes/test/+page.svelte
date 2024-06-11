<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/DiscussionPost';

	let getWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	let getParams = {
		controller: 'DiscussionThread',
		method: 'getThread',
		threadId: '4400000000000817646',
	};

	let postWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
		// siteId: '3448675',
	};

	// https://wwr-test.fandom.com/wikia.php?controller=FeedsAndPosts&method=getWikiVariables
	let postParams = {
		controller: 'DiscussionThread',
		method: 'create',
		forumId: '4400000000000004391',
	};

	let postData: DiscussionPost.createData = {
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
								{ type: 'strong' },
								{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
								{ type: 'em' },
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

<!-- {#await DiscussionPost.getPost(getWiki, { postId: '4400000000003543769' })}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<button on:click={async () => console.log(await DiscussionPost.create(postWiki, {}, postData))}>
	Click to post
</button>
