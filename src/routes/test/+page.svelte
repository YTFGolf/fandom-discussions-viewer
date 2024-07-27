<script lang="ts">
	import { getToken } from '$lib/controllers/api/custom';
	import { ArticleComments } from '$lib/controllers/wikia/ArticleComments';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import { MessageWall } from '$lib/controllers/wikia/MessageWall';
	import type { Wiki } from '$lib/types';

	const wiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	async function testDiscussionPost() {
		let res;
		// Delete post
		res = DiscussionPost.deletePost(wiki, { postId: '4400000000000090100' });
		console.log(await res);

		// Undelete post
		res = DiscussionPost.undelete(wiki, { postId: '4400000000000090100' });
		console.log(await res);
	}

	async function testDiscussionThread() {
		let res;
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

	async function testArticleComments(token: string) {
		let res;
		// Delete comment
		res = ArticleComments.deletePost(
			wiki,
			{},
			{ title: 'API stuff', namespace: 0, postId: '4400000000000090132', token },
		);
		console.log(await res);

		// Undelete comment
		res = ArticleComments.undeletePost(
			wiki,
			{},
			{ title: 'API stuff', namespace: 0, postId: '4400000000000090132', token },
		);
		console.log(await res);
	}

	async function testMessageWall(token: string) {
		let res;
		// Delete message
		res = MessageWall.deleteReply(
			wiki,
			{},
			{ wallOwnerId: '28291873', postId: '4400000000000090143', token },
		);
		console.log(await res);

		// Undelete message
		res = MessageWall.undeleteReply(
			wiki,
			{},
			{ wallOwnerId: '28291873', postId: '4400000000000090143', token },
		);
		console.log(await res);

		// Lock message
		res = MessageWall.lockThread(
			wiki,
			{},
			{ wallOwnerId: '28291873', threadId: '4400000000000037091', token },
		);
		console.log(await res);

		// Unlock message
		res = MessageWall.unlockThread(
			wiki,
			{},
			{ wallOwnerId: '28291873', threadId: '4400000000000037091', token },
		);
		console.log(await res);
	}

	async function test() {
		// testDiscussionPost();
		// testDiscussionThread();

		const csrfToken = await getToken(wiki);
		testArticleComments(csrfToken);
		testMessageWall(csrfToken);
	}
</script>

<svelte:head>
	<title>Test</title>
	<meta name="description" content="Test the API" />
</svelte:head>

<button class="wds-button" on:click={test}>Run tests</button>
