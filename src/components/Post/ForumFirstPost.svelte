<script lang="ts">
	import type { Thread } from '$lib/responses/Thread';
	import Post from './Post.svelte';

	export let thread: Thread;

	// gonna need to let it redefine what it means to be a post
	// gonna neeed another component for this, gonna need to make components
	// like ForumPost and ForumFirstPost as well as base Post

	// base post deals with stuff like display, while ForumPost deals with all
	// the functions
</script>

<Post post={thread} />
