<script lang="ts">
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Wiki } from '$lib/types';

	const wiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	async function test() {
		let res;

		// Delete post
		res = DiscussionPost.deletePost(wiki, { postId: '4400000000000090100' });
		console.log(await res);

		// Undelete post
		res = DiscussionPost.undelete(wiki, { postId: '4400000000000090100' });
		console.log(await res);

		// Delete thread
		res = DiscussionThread.deleteThread(wiki, { threadId: '4400000000000037057' });
		console.log(await res);

		// Undelete thread
		res = DiscussionThread.undelete(wiki, { threadId: '4400000000000037057' });
		console.log(await res);

		// Lock thread
		res = DiscussionThread.lock(wiki, { threadId: '4400000000000037057' });
		console.log(await res);

		// Unlock thread
		res = DiscussionThread.unlock(wiki, { threadId: '4400000000000037057' });
		console.log(await res);
	}
</script>

<svelte:head>
	<title>Test</title>
	<meta name="description" content="Test the API" />
</svelte:head>

<button on:click={test}> Run tests </button>
