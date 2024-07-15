<script lang="ts">
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Thread } from '$lib/responses/Thread';
	import { page } from '$app/stores';
	import { config, wiki } from '../../../stores';
	import ThreadComponent from '../../../../components/Thread.svelte';

	const rePostParams = /^(\d+)(?:\/r\/)?(\d*)$/;
	const [_, threadId, postId]: string[] = $page.params.postParams.match(rePostParams)!;
	// /f/p/{t} => [_, t, ""]
	// /f/p/{t}/r/{p} => [_, t, p]
	// Format is guaranteed by forumPost param

	const params: DiscussionThread.getThreadParams = {
		threadId: threadId,
		responseGroup: 'full',
		pivot: postId,
		viewableOnly: $config.hideDeleted,
		limit: $config.postLimit,
	};
	if (params.pivot !== '') {
		if (params.sortDirection && params.sortDirection === 'ascending') {
			params.pivot = (BigInt(params.pivot!) - BigInt(1)).toString();
		} else {
			params.pivot = (BigInt(params.pivot!) + BigInt(1)).toString();
		}
	}
	// Pivot uses strict inequality so this hack is needed so that e.g. the call
	// below begins with the same post that the equivalent discussions link does
	// http://localhost:5173/f/p/4400000000000822918/r/4400000000003058552
	// https://battle-cats.fandom.com/f/p/4400000000000822918/r/4400000000003058552

	let threadContent: Promise<Thread>;
	$: threadContent = DiscussionThread.getThread($wiki, params).then((res) => res.json());
</script>

<svelte:head>
	<title>Post</title>
	<meta name="description" content="wait a minute" />
</svelte:head>

{#await threadContent}<h1>Loading post...</h1>{:then content}<h1>{content.title}</h1>{/await}
<label for="threadId">ThreadId:</label>
<input type="text" id="threadId" bind:value={params.threadId} />
<label for="pivot">pivot:</label>
<input type="text" id="pivot" bind:value={params.pivot} />
<label for="limit">limit:</label>
<input type="text" id="limit" bind:value={params.limit} />
<!-- <button on:click={movePage}>Move page</button> -->

<container>
	{#await threadContent}
		<p>...waiting</p>
	{:then threadContent}
		<ThreadComponent {threadContent} />
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</container>
