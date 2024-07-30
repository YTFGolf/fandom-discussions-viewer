<script lang="ts">
	import type { Poll as ThreadPoll } from '$lib/responses/Thread';
	import type { Answer as SendPollAnswer, Poll as SendPoll } from '$lib/controllers/types/poll';
	import { dispatchNotification } from '../Notification.svelte';

	export let poll: ThreadPoll | undefined;
	export let closePollEditor: () => void;
	export let submitPoll: (newPollData: SendPoll) => Promise<void>;

	let newPoll: SendPoll;
	if (!poll) {
		newPoll = {
			question: 'question',
			answers: [
				{ text: 'Option 1', position: 0, image: null },
				{ text: 'Option 2', position: 1, image: null },
			],
		};
	} else {
		newPoll = {
			question: poll.question,
			answers: poll.answers.map((tAnswer) => {
				const answer: SendPollAnswer = {
					text: tAnswer.text,
					position: tAnswer.position,
					image: tAnswer.image,
				};
				return answer;
			}),
		};
	}

	// options for each thing
	// can add more options
	// will validate before being sent

	function handleSubmit() {
		const errors = getPollErrors(newPoll);
		if (errors === '') {
			submitPoll(newPoll);
			// .then(dispatchNotification('alert', 'Successfully submitted, reloading'));
			return;
		}

		dispatchNotification('error', errors);
	}

	function getPollErrors(newPoll: SendPoll) {
		return 'Not implemented';
	}
</script>

<div class="edit-modal">
	<div class="edit-modal-content">
		<div class="editor-container">
			{JSON.stringify(newPoll)}
			<!-- TODO JSON editor -->
			<form on:submit={handleSubmit}>
				<div class="poll-input">
					<label for="question">Question:</label>
					<input type="text" id="question" bind:value={newPoll.question} />
				</div>
				<div style="padding-left: 1em">
					{#each newPoll.answers as answer, i}
						<span>{i}</span>
						<div style="padding-left: 1em">
							<div class="poll-input">
								<label for="text">Text:</label>
								<input type="text" id="text" bind:value={answer.text} />
							</div>
							<div class="poll-input">
								<label for="position">Position:</label>
								<input type="text" id="position" bind:value={answer.position} />
							</div>
							<!-- {JSON.stringify(answer)} -->
						</div>
					{/each}
				</div>
				<div class="form-actions">
					<button class="wds-button text" on:click={closePollEditor}>Cancel</button>
					<button class="wds-button" type="submit">Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.edit-modal {
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.edit-modal-content {
		width: 60%;
		margin: 7.5% auto;
	}

	.editor-container {
		border: 1px solid #ccc;
		padding: 10px 0;
		min-height: 200px;
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
		padding: 1em;
	}

	form {
		display: flex;
		flex-direction: column;
		row-gap: 1em;
		margin: auto;
		/* padding-right: 25%; */
	}

	.poll-input {
		display: flex;
		justify-content: left;
		align-items: center;
		gap: 1em;
		padding-bottom: 0;
	}

	.poll-input label {
		width: 10%;
	}

	.form-actions {
		margin: auto;
	}
</style>
