<script lang="ts">
	import HTTP from '$lib/HTTPCodes';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import type { Post } from '$lib/responses/Post';
	import type { Wiki } from '$lib/types';
	import EditModal from './EditModal.svelte';
	import { type ViewContent } from './Editor.svelte';
	import Avatar from './Post/Avatar.svelte';
	import PostBody from './Post/PostBody.svelte';
	import Time from './Post/Time.svelte';

	export let post: Post;
	const permissions = post._embedded.userData[0].permissions;
	const wiki: Wiki = { name: 'wwr-test', lang: 'en' };

	let container: HTMLElement;
	let modalContainer: HTMLElement;
	let openEditor: boolean;
	let modalStatus: { color: string; message: string };

	function edit() {
		openEditor = true;
	}
	async function deletePost() {
		const res = await DiscussionPost.deletePost(wiki, { postId: post.id });
		if (res.status == HTTP.OK) {
			post = await res.json();
		} else {
			const json = await res.json();
			alert(json.title || json.errorText || JSON.stringify(json));
		}
	}
	async function undeletePost() {
		const res = await DiscussionPost.undelete(wiki, { postId: post.id });
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
			wiki,
			{ postId: post.id },
			{
				...post,
				...data,
			},
		);
		if (res.status == HTTP.OK) {
			onCancel();
			post = await res.json();
			modalStatus = null as any;
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
	<div class="form-actions">
		{#if permissions?.includes('canEdit')}<button on:click={edit}>EDIT</button>{/if}
		{#if permissions?.includes('canDelete') && !post.isDeleted}
			<button on:click={deletePost}>DELETE</button>
		{/if}
		{#if permissions?.includes('canUndelete') && post.isDeleted}
			<button on:click={undeletePost}>UNDELETE</button>
		{/if}
	</div>
	<PostBody jsonModel={post.jsonModel} attachments={post._embedded.attachments[0]} />
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

	.edited-by {
		color: rgba(var(--theme-page-text-color--rgb), var(--theme-page-text-opacity-factor));
		font-size: 12px;
		font-style: italic;
		margin-bottom: 12px;
	}
</style>
