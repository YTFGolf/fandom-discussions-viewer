<script lang="ts">
	import type { Post } from '$lib/responses/Post';
	import Avatar from './Post/Avatar.svelte';
	import PostBody from './Post/PostBody.svelte';

	export let post: Post;
</script>

<div class="post-container">
	<div class="user-info">
		<Avatar user={post.createdBy} />
		<a class="user-link" href={'/f/u/' + post.createdBy.id}>{post.createdBy.name}</a>
	</div>
	<PostBody jsonModel={post.jsonModel} attachments={post._embedded.attachments[0]} />
</div>

<style>
	.post-container {
		color: var(--theme-page-text-color);
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

	a {
		text-decoration: none;
	}
</style>
