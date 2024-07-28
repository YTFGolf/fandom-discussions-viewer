<script lang="ts">
	import HTTP from '$lib/HTTPCodes';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import type { Post } from '$lib/responses/Post';
	import { type EditorContent } from '../Editor.svelte';
	import { DiscussionVote } from '$lib/controllers/wikia/DiscussionVote';
	import PostComponent from './Post.svelte';
	import type { Wiki } from '$lib/types';

	export let post: Post;

	let hasUpvoted: boolean;
	$: hasUpvoted = post._embedded.userData?.[0].hasUpvoted || false;

	async function deleteFunction(wiki: Wiki, post: Post) {
		return DiscussionPost.deletePost(wiki, { postId: post.id });
	}
	async function undeleteFunction(wiki: Wiki, post: Post) {
		return DiscussionPost.undelete(wiki, { postId: post.id });
	}
	async function updateFunction(wiki: Wiki, post: Post, data: EditorContent) {
		return DiscussionPost.update(
			wiki,
			{ postId: post.id },
			{
				...post,
				...data,
			},
		);
	}
</script>

<PostComponent {post} {deleteFunction} {undeleteFunction} {updateFunction} />
