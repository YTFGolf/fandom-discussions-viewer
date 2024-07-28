<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import { ArticleComments } from '$lib/controllers/wikia/ArticleComments';
	import { getToken } from '$lib/controllers/api/custom';
	import { MessageWall } from '$lib/controllers/wikia/MessageWall';
	import { FeedsAndPosts } from '$lib/controllers/wikia/FeedsAndPosts';
	import Editor from '../../components/Editor.svelte';
	import { DiscussionPoll } from '$lib/controllers/wikia/DiscussionPoll';
	import { wiki } from '../stores';

	const bcWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	const getParams: DiscussionThread.getThreadParams = {
		threadId: '4400000000000037009',
		pivot: '4400000000000090155',
		responseGroup: 'full',
		viewableOnly: false,
	};

	const wwrWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	const postParams = {};

	let content;
	const noop = () => {};
</script>

<svelte:head>
	<title>Demo</title>
	<meta name="description" content="Demonstration and scripting" />
</svelte:head>

<!-- {#await DiscussionThread.getThread(wwrWiki, getParams)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<button on:click={async () => DiscussionPoll.castVote($wiki, {}, { answerIds: '17629481', pollId: '4562722' })}>
	Click to post
</button>
