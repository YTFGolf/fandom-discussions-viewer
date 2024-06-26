<script lang="ts">
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Thread } from '$lib/responses/Thread';
	import type { Wiki } from '$lib/types';
	import { examples } from './examples';
	import { page } from '$app/stores';
	import Post from '../../../../components/Post.svelte';

	const [_, threadId, postId]: string[] = $page.params.postParams.match(/^(\d+)(?:\/r\/)?(.*)/)!;
	// /f/p/{t} => [_, t, ""]
	// /f/p/{t}/r/{p} => [_, t, p]
	// Format is guaranteed by forumPost param

	// const wiki: Wiki = { name: 'battle-cats', lang: 'en' };
	const wiki: Wiki = { name: 'wwr-test', lang: 'en' };
	const params: DiscussionThread.getThreadParams = {
		threadId: threadId,
		responseGroup: 'full',
		pivot: postId,
		viewableOnly: false,
		limit: 10,
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
	$: threadContent = DiscussionThread.getThread(wiki, params);
	// $: threadContent = examples;
</script>

<svelte:head>
	<title>Post</title>
	<meta name="description" content="wait a minute" />
</svelte:head>

<h1>hi</h1>
<label for="lang">Language:</label>
<input type="text" id="lang" bind:value={wiki.lang} />
<label for="wiki">Wiki:</label>
<input type="text" id="wiki" bind:value={wiki.name} />
<label for="threadId">ThreadId:</label>
<input type="text" id="threadId" bind:value={params.threadId} />
<label for="pivot">pivot:</label>
<input type="text" id="pivot" bind:value={params.pivot} />
<label for="limit">limit:</label>
<input type="text" id="limit" bind:value={params.limit} />

<container>
	{#await threadContent}
		<p>...waiting</p>
	{:then postData}
		{#if postData._embedded && postData._embedded['doc:posts']}
			{#each postData._embedded['doc:posts'].reverse() as post, i}
				<!-- {#if i > 0}<hr />{/if} -->
				<hr />
				<Post {post} />
			{/each}
		{:else}
			<p style="color: red">Error: posts not found</p>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</container>
