<script lang="ts">
	import type { Post } from '$lib/responses/Post';
	import Avatar from './Post/Avatar.svelte';
	import PostBody from './Post/PostBody.svelte';
	import Time from './Post/Time.svelte';

	export let post: Post;
</script>

<div class={'post-container' + ((post.isDeleted && ' is-deleted') || '')}>
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
	<PostBody jsonModel={post.jsonModel} attachments={post._embedded.attachments[0]} />
	{#if post.lastEditedBy}
		<div class="edited-by">(Edited by {post.lastEditedBy.name})</div>
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
