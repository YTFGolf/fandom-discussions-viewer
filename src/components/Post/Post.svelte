<script lang="ts">
	import HTTP from '$lib/HTTPCodes';
	import type { Post } from '$lib/responses/Post';
	import { wiki } from '../../routes/stores';
	import EditModal from '../EditModal.svelte';
	import { type EditorContent } from '../Editor.svelte';
	import FandomIcon from '../FandomIcon.svelte';
	import Avatar from '../Avatar.svelte';
	import PostBody from './PostBody.svelte';
	import Time from './Time.svelte';
	import { DiscussionVote } from '$lib/controllers/wikia/DiscussionVote';
	import type { Wiki } from '$lib/types';
	import type { Thread } from '$lib/responses/Thread';
	import { dispatchNotification } from '../Notification.svelte';

	export let post: Post | Thread;
	const permissions = post._embedded.userData?.[0].permissions;

	export let deleteFunction: (wiki: Wiki, post: any) => Promise<Response>;
	export let undeleteFunction: (wiki: Wiki, post: any) => Promise<Response>;
	export let updateFunction: (wiki: Wiki, post: any, data: EditorContent) => Promise<Response>;
	export let lockFunction: ((wiki: Wiki, thread: any) => Promise<Response>) | null = null;
	export let unlockFunction: ((wiki: Wiki, thread: any) => Promise<Response>) | null = null;
	export let getUpvoteId: (post: any) => string = (post) => post.id;

	let container: HTMLElement;
	let modalContainer: HTMLElement;
	let openEditor: boolean;

	let hasUpvoted: boolean;
	$: hasUpvoted = post._embedded.userData?.[0]?.hasUpvoted || false;
	let postLink: string;
	$: postLink =
		(((post as Post).threadId && `/f/p/${(post as Post).threadId}/r/${post.id}`) ||
			`/f/p/${post.id}`) + `?wiki=${$wiki.lang}.${$wiki.name}`;

	function edit() {
		openEditor = true;
	}
	async function deletePost() {
		const res = await deleteFunction($wiki, post);
		if (res.status == HTTP.OK) {
			post = await res.json();
			post.isDeleted = true;
		} else {
			const json = await res.json();
			dispatchNotification('error', json.title || json.errorText || JSON.stringify(json));
		}
	}
	async function undeletePost() {
		const res = await undeleteFunction($wiki, post);
		if (res.status == HTTP.OK) {
			post = await res.json();
		} else {
			const json = await res.json();
			dispatchNotification('error', json.title || json.errorText || JSON.stringify(json));
		}
	}
	async function lockPost() {
		if (!lockFunction) {
			return;
		}
		const res = await lockFunction($wiki, post);
		if (res.status == HTTP.ACCEPTED) {
			post.isLocked = true;
		} else {
			const json = await res.json();
			dispatchNotification('error', json.title || json.errorText || JSON.stringify(json));
		}
	}
	async function unlockPost() {
		if (!unlockFunction) {
			return;
		}
		const res = await unlockFunction($wiki, post);
		if (res.status == HTTP.NO_CONTENT) {
			post.isLocked = false;
		} else {
			const json = await res.json();
			dispatchNotification('error', json.title || json.errorText || JSON.stringify(json));
		}
	}

	async function onSubmit(data: EditorContent) {
		const res = await updateFunction($wiki, post, data);
		if (res.status == HTTP.OK) {
			onCancel();
			post = await res.json();
		} else {
			const json = await res.json();
			dispatchNotification('error', json.title || json.errorText || JSON.stringify(json));
		}
	}
	function onCancel() {
		modalContainer.remove();
		openEditor = false;
	}

	async function toggleUpvote() {
		const f = hasUpvoted ? DiscussionVote.downVotePost : DiscussionVote.upVotePost;
		const res = await f($wiki, { postId: getUpvoteId(post) });
		if (res.status !== HTTP.OK) {
			throw new Error('Action failed.');
		}
		const data = await res.json();
		post.upvoteCount = data.upvoteCount;
		post._embedded.userData![0].hasUpvoted = !hasUpvoted;
	}
</script>

<div bind:this={container} class={'post-container' + ((post.isDeleted && ' is-deleted') || '')}>
	{#if post.isDeleted}
		<div class="deleted-by">
			Deleted by {post.lastDeletedBy?.name}.
		</div>
	{/if}
	{#if post.isLocked}
		<div class="is-locked">This post is locked.</div>
	{/if}
	<div class="user-info">
		<button class="upvote-post {hasUpvoted ? 'is-upvoted' : ''}" on:click={toggleUpvote}>
			<FandomIcon icon={hasUpvoted ? 'heart-filled' : 'heart'} size="18px" />
			<span class="upvote-count">{post.upvoteCount}</span>
		</button>
		<Avatar user={post.createdBy} />
		<a class="user-link" href="/f/u/{post.createdBy.id}?wiki={$wiki.lang}.{$wiki.name}">
			{post.createdBy.name}
		</a>
		<span class="reply-time">·</span>
		<a class="reply-time" href={postLink}>
			<Time time={post.creationDate} />
		</a>
	</div>
	<div class="post-actions">
		{#if permissions}
			<div class="form-actions">
				{#if permissions?.includes('canEdit')}
					<button class="wds-button action" on:click={edit}>
						<FandomIcon icon="edit" size="18px" />
						Edit
					</button>
				{/if}
				{#if permissions?.includes('canDelete') && !post.isDeleted}
					<button class="wds-button action" on:click={deletePost}>
						<FandomIcon icon="delete" size="18px" />
						Delete
					</button>
				{/if}
				{#if permissions?.includes('canUndelete') && post.isDeleted}
					<button class="wds-button action" on:click={undeletePost}>
						<FandomIcon icon="restore" size="18px" />
						Undelete
					</button>
				{/if}
				{#if permissions?.includes('canLock') && !post.isLocked}
					<button class="wds-button action" on:click={lockPost}>
						<FandomIcon icon="lock" size="18px" />
						Lock
					</button>
				{/if}
				{#if permissions?.includes('canUnlock') && post.isLocked}
					<button class="wds-button action" on:click={unlockPost}>
						<FandomIcon icon="unlock" size="18px" />
						Unlock
					</button>
				{/if}
			</div>
		{/if}
	</div>
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
			<EditModal {post} {onSubmit} {onCancel} />
		</div>
	{/if}
</div>

<style>
	a {
		text-decoration: none;
	}

	.is-deleted :global(> :not(.modal-container)) {
		opacity: 0.5;
	}

	.deleted-by,
	.is-locked {
		border-bottom: 1px solid var(--theme-border-color);
	}

	.user-info {
		display: flex;
		align-items: center;
		padding: 5px;
	}

	.user-info :global(.avatar) {
		margin: 0 0.75em;
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

	.post-actions {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.upvote-post {
		padding: 0.5em 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: inherit;
		border: none;
		cursor: pointer;
	}

	.upvote-post :global(.fandom-icon-svg) {
		background-color: var(--wds-dropdown-text-color);
	}

	.upvote-post.is-upvoted :global(.fandom-icon-svg) {
		background-color: var(--wds-dropdown-linked-item-color);
	}
	.upvote-post.is-upvoted .upvote-count {
		color: var(--wds-dropdown-linked-item-color);
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
		--text-color: var(--wds-dropdown-text-color);
		background: none;
		border: 1px solid var(--wds-dropdown-border-color);
		border-radius: 3px;
		color: var(--text-color);
		cursor: pointer;
		font-weight: 400;
		padding-left: 9px;
		padding-right: 9px;
		text-decoration: none;
		transition: 0.3s;
		text-transform: none;
		font-size: 0.875rem;
	}

	.form-actions .action:hover {
		--text-color: var(--wds-dropdown-linked-item-color);
		background-color: var(--wds-dropdown-linked-item-background-color);
	}

	.form-actions .action :global(.fandom-icon-svg) {
		margin-right: 4px;
		vertical-align: middle;
		background-color: var(--text-color);
		transition: 0.3s;
	}

	.edited-by {
		color: rgba(var(--theme-page-text-color--rgb), var(--theme-page-text-opacity-factor));
		font-size: 12px;
		font-style: italic;
		margin-bottom: 12px;
	}
</style>
