<script lang="ts">
	import type { Poll, Thread, PollAnswer as ThreadPollAnswer } from '$lib/responses/Thread';
	import PostComponent from './Post.svelte';
	import { type EditorContent } from '../Editor.svelte';
	import type { Wiki } from '$lib/types';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Answer, Poll as SendPoll } from '$lib/controllers/types/poll';
	import type { Post } from '$lib/responses/Post';

	export let thread: Thread;
	let poll: Poll | undefined;
	$: poll = thread._embedded.attachments[0].polls?.[0];

	// gonna need to let it redefine what it means to be a post
	// gonna neeed another component for this, gonna need to make components
	// like ForumPost and ForumFirstPost as well as base Post

	// base post deals with stuff like display, while ForumPost deals with all
	// the functions

	function getNewAnswer(answer: ThreadPollAnswer): Answer {
		return { ...answer, id: undefined, votes: undefined } as Answer;
	}

	async function deleteFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.deleteThread(wiki, { threadId: thread.id });
		// return DiscussionPost.deletePost(wiki, { postId: thread.firstPostId });
		// For whatever reason DiscussionThread.deleteThread doesn't mark the
		// post as deleted
	}
	async function undeleteFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.undelete(wiki, {
			threadId: (thread as any as Post).threadId || thread.id,
		});
	}
	async function updateFunction(wiki: Wiki, thread: Thread, data: EditorContent) {
		let poll: SendPoll | undefined = undefined;
		if (thread.poll) {
			poll = {
				...thread.poll,
				totalVotes: undefined,
				userVotes: undefined,
				answers: thread.poll.answers.map(getNewAnswer),
			} as SendPoll;
			data.attachments.polls = [poll as SendPoll] as any;
		}
		// TODO sort out this mess

		return DiscussionThread.update(
			wiki,
			{ threadId: thread.id },
			{
				...thread,
				...data,
				poll,
			},
		);
	}
	async function lockFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.lock(wiki, { threadId: thread.id });
	}
	async function unlockFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.unlock(wiki, { threadId: thread.id });
	}

	/**
	 * Poll:
	 *
	 * Can edit it, but cannot edit text and poll at same time.
	 *
	 * Can cast a vote.
	 */
</script>

<PostComponent
	post={thread}
	{deleteFunction}
	{undeleteFunction}
	{updateFunction}
	{lockFunction}
	{unlockFunction}
/>
{#if poll}
	<h4 class="poll-question">{poll.question}</h4>
	{#each poll.answers as answer}
		{JSON.stringify(answer)}
	{/each}
{/if}

<style></style>
