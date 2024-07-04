<script lang="ts">
	import type { Post } from '$lib/responses/Post';
	import Editor, { type ViewContent } from './Editor.svelte';

	export let post: Post;
	export let status: {
		color: string;
		message: string;
	};
	export let onSubmit: (viewContent: ViewContent) => void;
	export let onCancel: () => void;
	function setErrors(msg: string) {
		status = {
			color: 'red',
			message: msg,
		};
	}
	let viewContent: ViewContent;
	$: viewContent = {
		jsonModel: post.jsonModel,
		attachments: { ...post._embedded.attachments[0], polls: undefined, quizzes: undefined },
		rawContent: post.rawContent,
	};
</script>

<div class="edit-modal">
	<div class="edit-modal-content">
		<!-- <Editor {viewContent} {onSubmit} {onCancel} {setErrors} mode="JSON" /> -->
		<Editor {viewContent} {onSubmit} {onCancel} {setErrors} />
		{#if status?.message}
			<div class="status">
				<span style="color: {status.color}">{status.message}</span>
			</div>
		{/if}
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

	.status {
		background-color: var(--wds-banner-notification-background-color);
		border-radius: 3px;
		border-right: 1px solid var(--wds-banner-notification-border-color);
		color: var(--wds-banner-notification-text-color);
		display: flex;
		margin-bottom: 3px;
		overflow: hidden;
		transition: opacity 0.4s;
		width: inherit;
		border-bottom: 1px solid var(--wds-banner-notification-border-color);
		border-top: 1px solid var(--wds-banner-notification-border-color);
		flex: 1;
		font-size: 14px;
		line-height: 1.5;
		padding: 11px 12px;
		width: 100%;
		box-sizing: border-box;
	}
</style>
