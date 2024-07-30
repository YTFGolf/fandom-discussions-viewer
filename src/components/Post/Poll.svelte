<script lang="ts">
	import { DiscussionPoll } from '$lib/controllers/wikia/DiscussionPoll';
	import HTTP from '$lib/HTTPCodes';
	import type { Poll, PollAnswer } from '$lib/responses/Thread';
	import { createEventDispatcher } from 'svelte';
	import { wiki } from '../../routes/stores';
	import { dispatchNotification } from '../Notification.svelte';

	export let poll: Poll;

	let answers: HTMLDivElement;
	let isImages = Boolean(poll.answers[0].image);
	let showResults = Boolean(poll.userVotes);
	let userVotes: string;
	// Text input for votes (max len 1,048,293)

	const dispatch = createEventDispatcher();

	function selectAnswer(
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
		id: number,
	) {
		if (showResults) {
			// TODO shows who's voted for that option
			return;
		}

		if (event.ctrlKey) {
			event.currentTarget.classList.add('is-selected');
			if (!userVotes) {
				userVotes = id.toString();
			} else {
				userVotes += `,${id}`;
			}
			return;
		}

		for (const answer of answers.querySelectorAll('.is-selected')) {
			if (answer !== event.currentTarget) {
				answer.classList.remove('is-selected');
			}
		}

		event.currentTarget.classList.add('is-selected');
		userVotes = id.toString();
	}

	function getPollPercentage(answer: PollAnswer) {
		if (poll.totalVotes === 0) {
			return 0;
		}

		return Math.round((answer.votes / poll.totalVotes) * 100);
	}

	function toggleResults() {
		answers
			.querySelectorAll('.is-selected')
			.forEach((target) => target.classList.remove('is-selected'));
		showResults = !showResults;
		userVotes = '';
	}

	/**
	 * Poll edit (separate component so can add to FirstPost)
	 */

	function resetVotes() {
		showResults = true;
		toggleResults();
	}

	async function submitVote() {
		const res = await DiscussionPoll.castVote(
			$wiki,
			{},
			{ pollId: poll.id, answerIds: userVotes || '' },
		);
		if (res.status !== HTTP.NO_CONTENT) {
			dispatchNotification('error', `Error casting vote: ${res.statusText}`);
			return;
		}

		const newUserVotes =
			(userVotes && userVotes.split(',').map((n) => Number(n))) || ([null] as [null]);
		// TODO check if it's actually [null] or if doing '' does the same thing
		const oldUserVotes = poll.userVotes;

		// @ts-ignore
		poll.userVotes = newUserVotes;
		poll.totalVotes +=
			((newUserVotes?.[0] && newUserVotes?.length) || 0) -
			((oldUserVotes?.[0] && oldUserVotes?.length) || 0);
		// guarding against userVotes[0] being `null`
		poll.answers.forEach((answer) => {
			answer.votes +=
				(newUserVotes?.filter((v) => answer.id === v).length || 0) -
				(oldUserVotes?.filter((v) => answer.id === v).length || 0);
		});
		toggleResults();
	}
</script>

<h4 class="poll-question">{poll.question}</h4>
<div
	bind:this={answers}
	class={`poll-answers ${isImages ? 'image-poll' : 'text-poll'} ` +
		`items-${poll.answers.length} ${showResults ? 'show-results' : ''}`}
>
	{#each poll.answers as answer}
		{#if answer.image}
			<button
				class="poll-answer {showResults && poll.userVotes?.includes(answer.id)
					? 'is-selected'
					: ''}"
				on:click={(e) => selectAnswer(e, answer.id)}
			>
				<div class="answer-image-wrapper">
					<img
						src={answer.image.url}
						alt={answer.text}
						class="poll-answer-image"
						sizes="(max-width: 420px) 180px, 370px"
					/>
				</div>
				<div class="answer-image-gradient" style="--percentage:{getPollPercentage(answer)}%"></div>
				<span class="answer-image-text">{answer.text}</span>
				{#if showResults}
					<span class="answer-image-percentage">{getPollPercentage(answer)}%</span>
				{/if}
			</button>
		{:else}
			<button
				style="{getPollPercentage(answer)}%"
				class="poll-answer {showResults && poll.userVotes?.includes(answer.id)
					? 'is-selected'
					: ''}"
				on:click={(e) => selectAnswer(e, answer.id)}
			>
				<span class="answer-text">{answer.text}</span>
				{#if showResults}
					<span class="answer-text-votes">{getPollPercentage(answer)}%</span>
				{/if}
			</button>
		{/if}
	{/each}
</div>
<button class="wds-button" on:click={(e) => dispatch('openEditor')}>Edit Poll</button>
<button class="wds-button" on:click={toggleResults}>Toggle results</button>
<p class="total-poll-votes">{poll.totalVotes} votes in poll</p>
{#if !showResults}
	<input type="text" bind:value={userVotes} />
	<button class="wds-button text" on:click={resetVotes}>reset</button>
	<button class="wds-button" on:click={submitVote}>Vote</button>
{/if}

<style>
	.total-poll-votes {
		color: rgba(var(--theme-page-text-color--rgb), var(--theme-page-text-opacity-factor));
		cursor: pointer;
		font-size: 10px;
		letter-spacing: 0.5px;
		line-height: 34px;
		margin-top: 0;
		text-transform: uppercase;
	}

	/** Actual poll area **/
	.poll-answers {
		max-width: 750px;
	}

	.poll-answers.image-poll {
		grid-column-gap: 13px;
		grid-row-gap: 13px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 14px;
		font-family: rubik, helvetica, arial, sans-serif;
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

	.text-poll .answer-text {
		margin-right: 3em;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.text-poll .answer-text-votes {
		position: absolute;
		right: 12px;
	}

	.text-poll.show-results .poll-answer {
		background-image: linear-gradient(
			to right,
			rgba(var(--theme-link-color--rgb), 0.15) var(--percentage),
			var(--theme-page-background-color) var(--percentage)
		);
		background-size: 100% 100%;
	}

	.text-poll.show-results .poll-answer.is-selected {
		background-color: rgba(var(--theme-link-color--rgb), 0.3);
		font-weight: 500;
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

	.image-poll .answer-image-gradient {
		background-color: rgba(var(--theme-border-color--rgb), 0.5);
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		transform: translateY(100%);
		transition: transform 0.3s ease;
		width: 100%;
	}

	.image-poll.show-results .answer-image-gradient {
		transform: translateY(calc(100% - var(--percentage)));
	}
	.image-poll.show-results .is-selected .answer-image-gradient {
		background-color: rgba(var(--theme-link-color--rgb), 0.5);
	}

	.image-poll .answer-image-text {
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

	.image-poll .answer-image-percentage {
		bottom: 50%;
		font-size: 52px;
		left: 0;
		position: absolute;
		transform: translateY(50%);
		width: 100%;
	}
</style>
