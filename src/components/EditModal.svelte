<script lang="ts">
	import type { Post } from '$lib/responses/Post';
	import { onMount } from 'svelte';
	import { getHtmlWithFallback } from './Post/JSONModel/Body';
	import Editor, { type ViewContent } from './Editor.svelte';

	export let post: Post;
	export let onSubmit: (viewContent: ViewContent) => void;
	export let onCancel: () => void;

	let loaded = false;
	let target: HTMLDivElement;
	let modal: HTMLDivElement;

	onMount(async () => {
		const postHtml = await getHtmlWithFallback(post.jsonModel, post._embedded.attachments[0]);
		target.innerHTML = postHtml;
		loaded = true;
	});
</script>

<div bind:this={target} style="display:none"></div>
<div bind:this={modal} class="edit-modal">
	{#if loaded}
		<div class="edit-modal-content"><Editor content={target} {onSubmit} {onCancel} /></div>
	{:else}
		Loading editor...
	{/if}
</div>

<style>
	.edit-modal {
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.edit-modal-content {
		width: 60%;
		margin: 7.5% auto;
	}

	.edit-modal .edit-modal-content :global(#editor :is(.ProseMirror, textarea)) {
		max-height: 500px;
	}
</style>
