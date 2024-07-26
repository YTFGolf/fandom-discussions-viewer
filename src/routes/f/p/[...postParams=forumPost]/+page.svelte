<script lang="ts">
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Thread } from '$lib/responses/Thread';
	import { page } from '$app/stores';
	import { config, wiki } from '../../../stores';
	import ThreadComponent from '../../../../components/Thread.svelte';
	import { offsetPivot } from '$lib/forum';

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
	if (params.pivot && params.pivot !== '') {
		params.pivot = offsetPivot(params.pivot, params.sortDirection);
	}

	let threadContent: Promise<Thread | any>;
	$: threadContent = DiscussionThread.getThread($wiki, params).then((res) => res.json());
</script>

<svelte:head>
	{#await threadContent}<title>Post</title>{:then content}<title>{content.title}</title>{/await}
	<meta name="description" content="Forum post" />
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
		<ThreadComponent thread={threadContent} />
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</container>
