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
	let isImages: boolean;
	$: isImages = poll?.answers[0].image ? true : false;

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
	function getUpvoteId(thread: Thread) {
		return thread.firstPostId;
	}

	/**
	 * Poll:
	 *
	 * Can edit it, but cannot edit text and poll at same time.
	 *
	 * Can cast a vote.
	 */

	let currentAnswer: HTMLButtonElement;
	function selectAnswer(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (event.currentTarget == currentAnswer) {
			return;
		}
		if (currentAnswer) {
			currentAnswer.classList.remove('is-selected');
		}

		event.currentTarget.classList.add('is-selected');
		currentAnswer = event.currentTarget;
	}
</script>

<PostComponent
	post={thread}
	{deleteFunction}
	{undeleteFunction}
	{updateFunction}
	{lockFunction}
	{unlockFunction}
	{getUpvoteId}
/>
{#if poll}
	<h4 class="poll-question">{poll.question}</h4>
	{JSON.stringify(poll.answers)}
	<div class="poll-answers {isImages ? 'image-poll' : 'text-poll'} items-{poll.answers.length}">
		{#each poll.answers as answer}
			{#if answer.image}
				<button class="poll-answer" on:click={selectAnswer}>
					<div class="answer-image-wrapper">
						<img
							src={answer.image.url}
							alt={answer.text}
							class="poll-answer-image"
							sizes="(max-width: 420px) 180px, 370px"
						/>
					</div>
					<span class="answer-text">{answer.text}</span>
				</button>
			{:else}
				<button class="poll-answer" on:click={selectAnswer}>{answer.text}</button>
			{/if}
		{/each}
		{#if false}
			<button class="poll-answer is-selected" style="display:none"></button>
		{/if}
	</div>
{/if}

<style>
	.poll-answers.image-poll {
		grid-column-gap: 13px;
		grid-row-gap: 13px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 14px;
		max-width: 750px;
	}

	.poll-answers.image-poll.items-6 {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.text-poll .poll-answer {
		width: -moz-available;
		background-color: inherit;

		align-items: center;
		background-repeat: no-repeat;
		background-size: 0 100%;
		border: 1px solid var(--theme-border-color);
		border-radius: 3px;
		cursor: pointer;
		display: flex;
		line-height: 1.25em;
		margin-bottom: 12px;
		padding: 12px 12px 10px;
		position: relative;
		transition:
			background-size 0.3s ease,
			border-color 0.3s;
	}

	.text-poll .poll-answer:hover,
	.text-poll .poll-answer.is-selected {
		border-color: var(--theme-link-color);
	}

	.text-poll .poll-answer.is-selected {
		border-width: 3px;
		font-weight: 600;
		padding: 10px 10px 8px;
	}

	.image-poll .poll-answer {
		border-radius: 5px;
		box-shadow: 0 0 0 1px var(--theme-border-color);
		color: #fff;
		cursor: pointer;
		overflow: hidden;
		position: relative;
		text-align: center;
		transition: box-shadow 0.3s;
		border: none;
	}

	.image-poll .poll-answer:hover {
		box-shadow: 0 0 0 1px var(--theme-link-color);
	}

	.image-poll .poll-answer.is-selected {
		box-shadow: 0 0 0 3px var(--theme-link-color);
		font-weight: 500;
	}

	.image-poll .answer-image-wrapper {
		height: 0;
		padding-bottom: 100%;
		width: 100%;
	}

	.image-poll .poll-answer-image {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		-o-object-fit: cover;
		object-fit: cover;
	}

	.image-poll .answer-image-wrapper::after {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		background-image: linear-gradient(180deg, transparent, #222);
		content: '';
	}

	.image-poll .answer-text {
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		bottom: 20px;
		display: -webkit-box;
		font-size: 18px;
		left: 0;
		line-height: 1.25;
		overflow: hidden;
		padding: 0 10px;
		position: absolute;
		text-overflow: ellipsis;
		width: 100%;
		word-break: break-word;
		font-weight: bold;
	}
</style>
