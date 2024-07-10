<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let onSubmit: (href: string, text: string) => boolean;

	let href: string;
	let text: string;

	onMount(() => {
		// @ts-ignore
		document.activeElement?.blur && document.activeElement.blur();
	});

	function destroySelf() {
		dispatch('destroy');
	}

	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		destroySelf();
		if (!text) {
			text = href;
		}
		return onSubmit(href, text);
	}

	function onKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		if (event.code === 'Escape') {
			destroySelf();
		}
	}
</script>

<div class="link-modal">
	<form class="link-form" on:submit={handleSubmit}>
		<input tabindex="0" id="href" placeholder="href" bind:value={href} required />

		<input tabindex="0" id="text" placeholder="text (default: href)" bind:value={text} />

		<div class="modal-actions">
			<button class="text" on:click={destroySelf}>Cancel</button>
			<button type="submit">Submit</button>
		</div>
	</form>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
	.link-modal {
		position: fixed;
		z-index: 2;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		/* background-color: rgba(0, 0, 0, 0.4); */
	}

	.link-form {
		width: fit-content;
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
	}

	.link-form > * {
		display: block;
		margin: 0.25em;
	}

	.text {
		background: none;
		border: 0;
		color: var(--wds-text-button-label-color);
	}
</style>
