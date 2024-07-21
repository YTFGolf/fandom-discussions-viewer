<script lang="ts">
	import HTTP from '$lib/HTTPCodes';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import type { Post } from '$lib/responses/Post';
	import { wiki } from '../../routes/stores';
	import { type EditorContent } from '../Editor.svelte';
	import { DiscussionVote } from '$lib/controllers/wikia/DiscussionVote';
	import PostComponent from './Post.svelte';
	import type { Wiki } from '$lib/types';

	export let post: Post;

	let modalContainer: HTMLElement;
	let openEditor: boolean;
	let modalStatus: { color: string; message: string };
	// TODO replace with an actual global error message thing

	let hasUpvoted: boolean;
	$: hasUpvoted = post._embedded.userData?.[0].hasUpvoted || false;

	function edit() {
		openEditor = true;
	}

	async function onSubmit(data: EditorContent) {
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

	async function toggleUpvote() {
		const f = hasUpvoted ? DiscussionVote.downVotePost : DiscussionVote.upVotePost;
		const res = await f($wiki, { postId: post.id });
		if (res.status !== HTTP.OK) {
			throw new Error('Action failed.');
		}
		const data = await res.json();
		post.upvoteCount = data.upvoteCount;
		post._embedded.userData![0].hasUpvoted = !hasUpvoted;
	}

	async function deleteFunction(wiki: Wiki, post: Post) {
		return DiscussionPost.deletePost(wiki, { postId: post.id });
	}
</script>

<PostComponent {post} {deleteFunction} />
