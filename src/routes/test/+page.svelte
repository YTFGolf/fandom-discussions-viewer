<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import { ArticleComments } from '$lib/controllers/wikia/ArticleComments';

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

{#await ArticleComments.getCommentCount(bcWiki, getParams)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!-- prettier-ignore -->
<!-- <button on:click={async () => console.log(await DiscussionThread.update(postWiki, { threadId: "4400000000000037057" }, postData))}>
	Click to post
</button> -->
