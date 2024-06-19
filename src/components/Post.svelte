<script lang="ts">
	import type { Post } from '$lib/responses/Post';
	import PostBody from './Post/PostBody.svelte';

	export let post: Post;
	console.log(post);
</script>

<container>
	<PostBody jsonModel={post.jsonModel} attachments={post._embedded.attachments[0]} />
</container>
