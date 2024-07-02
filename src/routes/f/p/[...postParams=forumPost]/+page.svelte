<script lang="ts">
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Thread } from '$lib/responses/Thread';
	import type { Wiki } from '$lib/types';
	import { examples } from './examples';
	import { page } from '$app/stores';
	import Post from '../../../../components/Post.svelte';
	import type { ViewContent } from '../../../../components/Editor.svelte';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import HTTP from '$lib/HTTPCodes';
	import ReplyEditor from '../../../../components/ReplyEditor.svelte';
	import { post } from '$lib/caller';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { config, wiki } from '../../../stores';

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
	// $: threadContent = examples;
	let editor: ReplyEditor;
	let postList: HTMLElement;

	function rebuildEditor() {
		editor.$destroy();
		editor = new ReplyEditor({
			target: postList,
			props: { onSubmit: submitReply },
		});
	}

	async function submitReply(viewContent: ViewContent) {
		await threadContent;
		const res = await DiscussionPost.create(
			$wiki,
			{},
			{
				threadId,
				siteId: (await threadContent).siteId,
				...viewContent,
			},
		);
		if (res.status == HTTP.CREATED) {
			// onCancel();
			// post = await res.json();
			(await threadContent)._embedded['doc:posts'].splice(0, 0, await res.json());
			// @ts-ignore
			threadContent = await threadContent;
			rebuildEditor();
		} else {
			const json = await res.json();
			console.error('Failed', json);
			// modalStatus = {
			// 	color: 'red',
			// 	message: json.title || json.errorText || JSON.stringify(json),
			// };
		}
	}

	// function movePage() {
	// 	const url = `/f/p/${params.threadId}` + (params.pivot ? `/r/${params.pivot}` : '');
	// 	if (browser) {
	// 		goto(url);
	// 	}
	// }
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
	{:then postData}
		{#if postData._embedded && postData._embedded['doc:posts']}
			<div bind:this={postList} class="post-list">
				{#each postData._embedded['doc:posts'].toReversed() as post, i}
					<!-- {#if i > 0}<hr />{/if} -->
					<hr />
					<Post {post} />
				{/each}
				<hr />
				<ReplyEditor bind:this={editor} onSubmit={submitReply} />
			</div>
		{:else}
			<p style="color: red">Error: posts not found</p>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</container>

<style>
	.post-list {
		padding: 36px;
	}
</style>
