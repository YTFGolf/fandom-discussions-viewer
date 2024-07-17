<script lang="ts">
	import PostComponent from './Post.svelte';
	import ReplyEditor from './ReplyEditor.svelte';
	import type { EditorContent } from './Editor.svelte';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import HTTP from '$lib/HTTPCodes';
	import { wiki } from '../routes/stores';
	import type { Thread } from '$lib/responses/Thread';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Post } from '$lib/responses/Post';

	export let thread: Thread & { _embedded: Thread['_embedded'] & { 'doc:posts': Post[] } };
	$: thread._embedded['doc:posts'] = thread._embedded['doc:posts'] || [];

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
				threadId: thread.id,
				siteId: thread.siteId,
				...editorContent,
			},
		);
		if (res.status == HTTP.CREATED) {
			// onCancel();
			thread._embedded['doc:posts'].splice(0, 0, await res.json());
			thread = thread;
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

	async function viewOlderReplies(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;
		target.disabled = true;

		const olderRepliesHref = thread._links.next![0].href;
		const params = Object.fromEntries(new URLSearchParams(olderRepliesHref)) as any;

		const res = await DiscussionThread.getThread($wiki, params);
		const data = (await res.json()) as Thread;
		thread._links.next = data._links.next;

		thread._embedded['doc:posts'] = [
			...thread._embedded['doc:posts'],
			...(data._embedded['doc:posts'] || []),
		];
		target.disabled = false;
	}

	async function viewNewerReplies(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;
		target.disabled = true;

		const newerRepliesHref = thread._links.previous![0].href;
		const params = Object.fromEntries(new URLSearchParams(newerRepliesHref)) as any;

		const res = await DiscussionThread.getThread($wiki, params);
		const data = (await res.json()) as Thread;
		thread._links.previous = data._links.previous;

		thread._embedded['doc:posts'] = [
			...(data._embedded['doc:posts'] || []),
			...thread._embedded['doc:posts'],
		];
		target.disabled = false;
	}
</script>

<div bind:this={postList} class="post-list">
	{#if thread._links.next}
		<button class="view-more ignore-button-styles" on:click={viewOlderReplies}>
			View older replies
		</button>
	{/if}
	{#each thread._embedded['doc:posts'].toReversed() as post (post.id)}
		<!-- {#if i > 0}<hr />{/if} -->
		<hr />
		<PostComponent {post} />
	{/each}
	<hr />
	{#if thread._links.previous}
		<button
			style="margin-bottom: 0.5em"
			class="view-more ignore-button-styles"
			on:click={viewNewerReplies}
		>
			View newer replies
		</button>
	{/if}
	<ReplyEditor bind:this={editor} onSubmit={submitReply} />
</div>

<style>
	.view-more {
		display: block;

		background-color: var(--theme-page-background-color--secondary);
		border-radius: 3px;
		border-width: 0;
		color: var(--theme-page-text-color);
		cursor: pointer;
		font-size: 12px;
		font-weight: 700;
		padding: 15px 0;
		text-transform: uppercase;
		transition: color 0.3s;
		width: 100%;
	}

	.view-more:hover {
		color: var(--theme-page-text-color--hover);
	}

	.post-list {
		padding: 36px;
	}
</style>
