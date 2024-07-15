<script lang="ts">
	import Post from './Post.svelte';
	import ReplyEditor from './ReplyEditor.svelte';
	import type { EditorContent } from './Editor.svelte';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import HTTP from '$lib/HTTPCodes';
	import { wiki } from '../routes/stores';
	import type { Thread } from '$lib/responses/Thread';

	export let threadContent: Thread;
	$: threadContent._embedded['doc:posts'] = threadContent._embedded['doc:posts'] || [];
	// console.log(threadContent);

	let editor: ReplyEditor;
	let postList: HTMLElement;

	function rebuildEditor() {
		editor.$destroy();
		editor = new ReplyEditor({
			target: postList,
			props: { onSubmit: submitReply },
		});
	}

	async function submitReply(editorContent: EditorContent) {
		const res = await DiscussionPost.create(
			$wiki,
			{},
			{
				threadId,
				siteId: threadContent.siteId,
				...editorContent,
			},
		);
		if (res.status == HTTP.CREATED) {
			// onCancel();
			// post = await res.json();
			threadContent._embedded['doc:posts'].splice(0, 0, await res.json());
			// @ts-ignore
			threadContent = threadContent;
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
</script>

<div bind:this={postList} class="post-list">
	{#each threadContent._embedded['doc:posts'].toReversed() as post, i}
		<!-- {#if i > 0}<hr />{/if} -->
		<hr />
		<Post {post} />
	{/each}
	<hr />
	<ReplyEditor bind:this={editor} onSubmit={submitReply} />
</div>

<style>
	.post-list {
		padding: 36px;
	}
</style>
