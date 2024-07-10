<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let onSubmit: (href: string, text: string) => boolean;

	let href: string;
	let text: string;
	let container: HTMLDivElement;

	onMount(() => {
		// @ts-ignore
		document.activeElement?.blur && document.activeElement.blur();
	});

	function destroySelf() {
		dispatch('destroy');
	}

	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
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

<div class="edit-modal">
	<div class="edit-modal-content">
		<form on:submit={handleSubmit}>
			<label for="href">href:</label>
			<input tabindex="0" id="href" bind:value={href} required />

			<label for="text">text:</label>
			<input tabindex="0" id="text" bind:value={text} />

			<button class="text" on:click={destroySelf}>Cancel</button>
			<button type="submit">Submit</button>
		</form>
	</div>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
	.edit-modal {
		position: fixed;
		z-index: 2;
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

	.text {
		background: none;
		border: 0;
		color: var(--wds-text-button-label-color);
	}
</style>
