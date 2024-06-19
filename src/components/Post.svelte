<script lang="ts">
	import type { Post } from '$lib/responses/Post';
	import Avatar from './Post/Avatar.svelte';
	import PostBody from './Post/PostBody.svelte';

	export let post: Post;
</script>

<container>
	<Avatar user={post.createdBy} />
	<PostBody jsonModel={post.jsonModel} attachments={post._embedded.attachments[0]} />
</container>
