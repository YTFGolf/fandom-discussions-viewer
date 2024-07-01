<script lang="ts">
	import HTTP from '$lib/HTTPCodes';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import type { Post } from '$lib/responses/Post';
	import type { Wiki } from '$lib/types';
	import { wiki } from '../routes/stores';
	import EditModal from './EditModal.svelte';
	import { type ViewContent } from './Editor.svelte';
	import FandomIcon from './FandomIcon.svelte';
	import Avatar from './Avatar.svelte';
	import PostBody from './Post/PostBody.svelte';
	import Time from './Post/Time.svelte';

	export let post: Post;
	const permissions = post._embedded.userData[0].permissions;

	let container: HTMLElement;
	let modalContainer: HTMLElement;
	let openEditor: boolean;
	let modalStatus: { color: string; message: string };

	function edit() {
		openEditor = true;
	}
	async function deletePost() {
		const res = await DiscussionPost.deletePost($wiki, { postId: post.id });
		if (res.status == HTTP.OK) {
			post = await res.json();
		} else {
			const json = await res.json();
			alert(json.title || json.errorText || JSON.stringify(json));
		}
	}
	async function undeletePost() {
		const res = await DiscussionPost.undelete($wiki, { postId: post.id });
		if (res.status == HTTP.OK) {
			post = await res.json();
		} else {
			const json = await res.json();
			alert(json.title || json.errorText || JSON.stringify(json));
		}
	}

	async function onSubmit(data: ViewContent) {
		modalStatus = {
			color: '',
			message: '...',
		};
		const res = await DiscussionPost.update(
			$wiki,
			{ postId: post.id },
			{
				...post,
				...data,
			},
		);
		if (res.status == HTTP.OK) {
			onCancel();
			post = await res.json();
		} else {
			const json = await res.json();
			modalStatus = {
				color: 'red',
				message: json.title || json.errorText || JSON.stringify(json),
			};
		}
	}
	function onCancel() {
		modalContainer.remove();
		modalStatus = null as any;
		openEditor = false;
	}
</script>

<div bind:this={container} class={'post-container' + ((post.isDeleted && ' is-deleted') || '')}>
	{#if post.isDeleted}
		<div class="deleted-by">
			Deleted by {post.lastDeletedBy?.name}.
		</div>
	{/if}
	<div class="user-info">
		<Avatar user={post.createdBy} />
		<a class="user-link" href={'/f/u/' + post.createdBy.id}>{post.createdBy.name}</a>
		<span class="reply-time">·</span>
		<a class="reply-time" href={`/f/p/${post.threadId}/r/${post.id}`}>
			<Time time={post.creationDate} />
		</a>
	</div>
	{#if permissions}
		<div class="form-actions">
			{#if permissions?.includes('canEdit')}
				<button class="action" on:click={edit}>
					<FandomIcon icon="edit" width="18" />
					Edit
				</button>
			{/if}
			{#if permissions?.includes('canDelete') && !post.isDeleted}
				<button class="action" on:click={deletePost}>
					<FandomIcon icon="delete" width="18" />
					Delete
				</button>
			{/if}
			{#if permissions?.includes('canUndelete') && post.isDeleted}
				<button class="action" on:click={undeletePost}>
					<FandomIcon icon="restore" width="18" />
					Undelete
				</button>
			{/if}
		</div>
	{/if}
	<PostBody
		jsonModel={post.jsonModel}
		attachments={post._embedded.attachments[0]}
		rawContent={post.rawContent}
	/>
	{#if post.lastEditedBy}
		<div class="edited-by">(Edited by {post.lastEditedBy.name})</div>
	{/if}
	{#if openEditor}
		<!-- <Editor content={container.querySelector('.post-content')} /> -->
		<div bind:this={modalContainer} class="modal-container">
			<EditModal {post} {onSubmit} {onCancel} status={modalStatus} />
		</div>
	{/if}
</div>

<style>
	a {
		text-decoration: none;
	}

	.is-deleted {
		opacity: 0.5;
	}
	/* this also makes the edit modal have 50% opacity but tbh that looks cool */

	.user-info {
		display: flex;
		padding: 5px;
	}

	.user-info :global(.avatar) {
		width: 60px;
	}

	.user-link:hover {
		color: var(--theme-page-text-color--hover);
	}

	.user-link {
		color: var(--theme-page-text-color);
		display: inline-block;
		font-weight: 700;
		max-width: 16em;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 0.3s;
		/* vertical-align: middle; */
		align-content: center;
		white-space: nowrap;
	}

	span.reply-time {
		margin: 0 6px;
	}

	.reply-time {
		color: var(--theme-page-text-color);
		display: inline-block;
		font-weight: 700;
		max-width: 16em;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 0.3s;
		/* vertical-align: middle; */
		align-content: center;
		white-space: nowrap;
		color: rgba(var(--theme-page-text-color--rgb), var(--theme-page-text-opacity-factor));
	}

	.form-actions {
		background-color: var(--wds-dropdown-background-color);
		border: 1px solid var(--wds-dropdown-border-color);
		border-radius: 3px;
		color: var(--wds-dropdown-text-color);
		padding: 0.5em;
		display: inline-flex;
		gap: 0.5em;
	}

	.form-actions :global(.fandom-icon-svg) {
		background-color: var(--wds-dropdown-text-color);
	}

	.form-actions .action {
		background: none;
		border: 1px solid var(--wds-dropdown-border-color);
		border-radius: 3px;
		color: var(--wds-dropdown-text-color);
		cursor: pointer;
		font-weight: 400;
		padding-left: 9px;
		padding-right: 9px;
		text-decoration: none;
		transition-duration: 0.3s;
		transition-property: background-color, color;
		text-transform: none;
		font-size: 0.875rem;
	}

	.form-actions .action:hover {
		background-color: var(--wds-dropdown-linked-item-background-color);
		color: var(--wds-dropdown-linked-item-color);
	}

	.form-actions .action :global(img) {
		margin-right: 4px;
		vertical-align: middle;
	}

	.edited-by {
		color: rgba(var(--theme-page-text-color--rgb), var(--theme-page-text-opacity-factor));
		font-size: 12px;
		font-style: italic;
		margin-bottom: 12px;
	}
</style>
