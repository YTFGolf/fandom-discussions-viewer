<script lang="ts">
	/**
	 * @file This whole thing could do with a refactor
	 */
	import type { Poll as ThreadPoll } from '$lib/responses/Thread';
	import type { Answer as SendPollAnswer, Poll as SendPoll } from '$lib/controllers/types/poll';
	import { dispatchNotification } from '../Notification.svelte';

	type EditorType = 'HTML' | 'JSON';

	export let poll: ThreadPoll | undefined;
	export let closePollEditor: () => void;
	export let submitPoll: (newPollData: SendPoll) => Promise<void>;

	let newPoll: SendPoll = getNewPoll(poll);
	let HtmlEditor: HTMLDivElement;
	let JsonEditor: HTMLDivElement;
	let currentEditorType: EditorType = 'HTML';
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

	function convertPoll(from: EditorType): SendPoll {
		if (from === 'JSON') {
			const text = JsonEditor.querySelector('textarea')!.value;
			return JSON.parse(text);
		}
		return newPoll as SendPoll;
	}
	function switchEditor(to: EditorType, poll: SendPoll) {
		let switches: Record<EditorType, (poll: SendPoll) => void> = {
			HTML: (poll) => (newPoll = poll),
			JSON: (poll) =>
				(JsonEditor.querySelector('textarea')!.value = JSON.stringify(poll, undefined, '\t')),
		};
		switches[to](poll);
	}

	let switcher: HTMLDivElement;
	function handleSwitchEditor(
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
	) {
		if (event.currentTarget.dataset.switchTo! === currentEditorType) {
			return;
		}
		if (event.currentTarget.dataset.switchTo! === 'HTML') {
			JsonEditor.style.display = 'none';
			HtmlEditor.style.display = 'block';
		} else {
			JsonEditor.style.display = 'block';
			HtmlEditor.style.display = 'none';
		}
		const poll = convertPoll(currentEditorType);
		switchEditor(event.currentTarget.dataset.switchTo! as EditorType, poll);
		currentEditorType = event.currentTarget.dataset.switchTo! as EditorType;
	}

	// options for each thing
	// can add more options
	// will validate before being sent

	function handleSubmit() {
		let poll = convertPoll(currentEditorType);
		const errors = getPollErrors(poll);
		if (errors === '') {
			submitPoll(poll);
			return;
		}

		dispatchNotification('error', errors);
	}

	function getPollErrors(newPoll: SendPoll) {
		// position must be numeric
		// text must be non-blank
		// at least 2 options
		// if has image then all must have image and must have even amount
		// image h/w > 0
		if (newPoll.question === '') {
			return 'Question is blank!';
		}
		let isImages = Boolean(newPoll.answers[0].image);
		for (const [i, answer] of newPoll.answers.entries()) {
			if (!(Number(answer.position) > -1)) {
				return `Position in answer ${i} is not a number!`;
			}
			if (answer.text === '') {
				return `Text in answer ${i} is blank!`;
			}
			if ((!isImages && answer.image) || (isImages && !answer.image)) {
				return `Mismatch in poll images at answer ${i}.`;
			}
			if (answer.image && (answer.image.height <= 0 || answer.image.width <= 0)) {
				return `Invalid image dimensions in answer ${i}.`;
			}
		}
		if (newPoll.answers.length < 2 || newPoll.answers.length > 6) {
			return 'Poll must have between 2 and 6 answers!';
		}
		if (isImages && newPoll.answers.length % 2 !== 0) {
			return 'Image polls must have an even number of answers!';
		}
		return '';
	}
</script>

<div class="edit-modal">
	<div class="edit-modal-content">
		<div class="editor-container">
			<form on:submit={handleSubmit}>
				<span>Note: this editor isn't really very good</span>
				<div class="switcher" bind:this={switcher}>
					<button
						class="wds-button"
						on:click={handleSwitchEditor}
						type="button"
						data-switch-to="HTML"
					>
						Switch to HTML
					</button>
					<button
						class="wds-button"
						on:click={handleSwitchEditor}
						type="button"
						data-switch-to="JSON"
					>
						Switch to JSON
					</button>
				</div>
				<div bind:this={HtmlEditor}>
					<div class="poll-input">
						<label for="question">Question:</label>
						<input type="text" id="question" bind:value={newPoll.question} />
					</div>
					<div style="padding-left: 1em">
						{#each newPoll.answers as answer, i}
							<span>{i}:</span>
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
				</div>
				<div style="display:none" bind:this={JsonEditor}>
					<textarea>{JSON.stringify(newPoll)}</textarea>
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

	form textarea {
		max-height: 500px;
		overflow: scroll;
		width: 100%;
		min-height: 400px;
		font-family: Consolas, 'Eupheima UCAS', Monaco, Menlo, monospace;
		font-size: 0.8125rem;
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
		color: var(--theme-page-text-color);
		resize: none;
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
