<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/DiscussionPost';

	let getWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
		script: 'wikia',
	};

	let getParams = {
		controller: 'DiscussionThread',
		method: 'getThread',
		threadId: '4400000000000817646',
	};

	let postWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
		script: 'wikia',
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
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: {
						type: 'text',
						text: 'different forumId',
					},
				},
			],
		},
	};
</script>

<!-- {#await DiscussionPost.getPost(getWiki, { postId: '4400000000003543769' })}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<button on:click={async () => console.log(await DiscussionPost.create(postWiki, postParams, postData))}>
	Click to post
</button>
