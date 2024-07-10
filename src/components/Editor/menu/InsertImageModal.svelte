<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let onSubmit: (src: string) => boolean;

	let src: string;

	function destroySelf() {
		dispatch('destroy');
	}

	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		destroySelf();
		return onSubmit(src);
	}

	let cancel: HTMLButtonElement;
	let submit: HTMLButtonElement;
	function onKeyDown(event: KeyboardEvent) {
		if (event.code === 'Escape') {
			cancel.click();
		} else if (event.code === 'Enter') {
			event.preventDefault();
			submit.click();
		}
	}
</script>

<div class="insert-image-modal">
	<form class="insert-image-form" on:submit={handleSubmit}>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			id="src"
			placeholder="src"
			bind:value={src}
			autofocus={true}
			autocomplete="off"
			pattern="http(s)?:\/\/(www\.)?(static\.wikia\.nocookie\.net|(vignette|static)\.(wikia-dev|fandom-dev)\.(us|pl))\/.+"
			required
		/>

		<div class="modal-actions">
			<button bind:this={cancel} class="text" on:click={destroySelf}>Cancel</button>
			<button bind:this={submit} type="submit">Submit</button>
		</div>
	</form>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
	.insert-image-modal {
		position: fixed;
		z-index: 2;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		/* background-color: rgba(0, 0, 0, 0.4); */
	}

	.insert-image-form {
		width: 250px;
		margin: 7.5% auto;
		text-align: center;
		padding: 0.5em;

		align-items: center;
		background: var(--webeditor-background-color--secondary);
		border: 1px solid rgba(var(--webeditor-text-color--rgb), 0.25);
		border-radius: 3px;
		color: var(--webeditor-text-color);
		line-height: 1;
		opacity: 1;

		box-shadow: 0 0 12px 0 rgba(30, 12, 27, 0.25);
		resize: both;
	}

	.insert-image-form > * {
		display: block;
		margin: 0.25em;
		width: -moz-available;
	}

	.text {
		background: none;
		border: 0;
		color: var(--wds-text-button-label-color);
	}
</style>
