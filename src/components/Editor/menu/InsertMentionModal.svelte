<script lang="ts">
	import { UserApi } from '$lib/controllers/wikia/UserApi';
	import { createEventDispatcher } from 'svelte';
	import { wiki } from '../../../routes/stores';
	import HTTP from '$lib/HTTPCodes';
	const dispatch = createEventDispatcher();

	export let onSubmit: (userId: string, text: string, notifyUser: boolean) => boolean;

	let id: string;
	let exactName: string;

	let text: string;
	let notifyUser: boolean = true;

	function destroySelf() {
		dispatch('destroy');
	}

	/**
	 * @returns `[userId, text, notifyUser]`
	 */
	async function getPingData(): Promise<[string, string, boolean]> {
		if (id && text) {
			return [id, text, notifyUser];
		}

		if (
			id &&
			exactName &&
			id.match(/^\d+$/) &&
			exactName.charAt(0).toUpperCase() === exactName.charAt(0)
		) {
			return [id, '@' + exactName, notifyUser];
		}

		let username = exactName;
		if (username) {
			username = username.charAt(0).toUpperCase() + username.slice(1);
			// getDetails requires the first letter be capitalised
		}

		const query = await UserApi.getDetails($wiki, { ids: `${id},${username}` });
		if (query.status !== HTTP.OK) {
			throw new Error(`No user found with id "${id}" or username "${username}".`);
		}

		const data = await query.json();
		const userData = data.items[0];

		const userId = userData.user_id;
		const content = text || '@' + userData.name;
		return [userId, content, notifyUser];
	}

	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		getPingData().then(([userId, text, notifyUser]) => {
			destroySelf();
			return onSubmit(userId, text, notifyUser);
		});
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

<div class="insert-mention-modal">
	<form class="insert-mention-form" on:submit={handleSubmit}>
		Identification (choose one)
		<!-- svelte-ignore a11y-autofocus -->
		<input id="id" placeholder="id" bind:value={id} autofocus={true} autocomplete="off" />
		<input id="exactName" placeholder="exactName" bind:value={exactName} autocomplete="off" />

		<!-- TODO inexact search -->

		Options
		<input
			id="text"
			placeholder="text (default: @<username>)"
			bind:value={text}
			autocomplete="off"
		/>

		<div class="notify-options">
			<label for="notifyUser">Notify:</label>
			<input type="checkbox" bind:checked={notifyUser} />
			<!-- TODO make this a slider -->
		</div>

		<div class="modal-actions">
			<button bind:this={cancel} class="text" on:click={destroySelf}>Cancel</button>
			<button bind:this={submit} type="submit">Submit</button>
		</div>
	</form>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
	.insert-mention-modal {
		position: fixed;
		z-index: 2;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		/* background-color: rgba(0, 0, 0, 0.4); */
	}

	.insert-mention-form {
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

	.insert-mention-form > * {
		display: block;
		margin: 0.25em;
		width: -moz-available;
	}

	.notify-options > * {
		margin-bottom: 0.5em;
	}

	.text {
		background: none;
		border: 0;
		color: var(--wds-text-button-label-color);
	}
</style>
