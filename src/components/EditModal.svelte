<script lang="ts">
	import type { Post } from '$lib/responses/Post';
	import type { Thread } from '$lib/responses/Thread';
	import { config } from '../routes/stores';
	import Editor, { type EditorContent } from './Editor.svelte';

	export let post: Thread | Post;
	export let onSubmit: (editorContent: EditorContent) => void;
	export let onCancel: () => void;
	let editorContent: EditorContent;
	$: editorContent = {
		jsonModel: post.jsonModel!,
		attachments: { ...post._embedded.attachments[0], polls: undefined, quizzes: undefined },
		rawContent: post.rawContent,
		// @ts-ignore
		title: post.title as string | undefined,
	};
</script>

<div class="edit-modal">
	<div class="edit-modal-content">
		<Editor mode={$config.defaultEditor.update} {editorContent} {onSubmit} {onCancel} />
	</div>
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
