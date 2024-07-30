<script lang="ts">
	import type { Poll as ThreadPoll } from '$lib/responses/Thread';
	import type { Answer as SendPollAnswer, Poll as SendPoll } from '$lib/controllers/types/poll';

	export let poll: ThreadPoll | undefined;
	export let closePollEditor: () => void;
	export let submitPoll: (newPollData: SendPoll) => Promise<void>;

	let newPoll: SendPoll;
	$: newPoll = getNewPoll(poll);
	function getNewPoll(poll: ThreadPoll | undefined) {
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

		return newPoll;
	}
	// options for each thing
	// can add more options
	// will validate before being sent
</script>

<div class="edit-modal">
	<div class="edit-modal-content">
		<div class="editor-container">
			{JSON.stringify(newPoll)}
			<div class="form-actions">
				<button class="wds-button text" on:click={closePollEditor}>Cancel</button>
				<button class="wds-button" on:click={() => submitPoll(newPoll)}>Submit</button>
			</div>
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
	}
</style>
