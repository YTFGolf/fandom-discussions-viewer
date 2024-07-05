<script lang="ts">
	import { Option, setFromClient } from '$lib/client';
	import { config } from '../stores';

	async function handleSubmit() {
		await setFromClient(Option.Config, $config);
		window.location.reload();
	}
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Settings page" />
</svelte:head>

<form on:submit={handleSubmit}>
	<div class="config-option">
		<label for="theme">Theme:</label>
		<select id="theme" bind:value={$config.theme} required>
			<option value="light">light</option>
			<option value="dark">dark</option>
		</select>
	</div>
	<hr />

	<div class="config-option">
		<label for="postLimit">Post Limit:</label>
		<input type="number" id="postLimit" min="1" max="100" bind:value={$config.postLimit} required />
	</div>
	<hr />

	<div class="config-option">
		<label for="hideDeleted">Hide Deleted:</label>
		<input type="checkbox" bind:checked={$config.hideDeleted} />
		<span class="slider"></span>
	</div>
	<hr />

	<div class="config-option">
		<label for="themeWiki">Theme Wiki:</label>
		<input type="text" id="themeWiki" bind:value={$config.themeWiki} />
	</div>
	<hr />

	<div class="config-option">
		<label for="defaultEditor">Default Editor:</label>
		<select id="defaultEditor" bind:value={$config.defaultEditor} required>
			<option value="RTE">Rich Text</option>
			<option value="JSON">JSON</option>
		</select>
	</div>
	<hr />

	<button type="submit">Save</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 1em;
		width: 50%;
		margin: auto;
		/* padding-right: 25%; */
	}

	.config-option {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
		border: 1px solid gray;
		padding: 1em;
		margin: auto;
	}

	hr {
		margin: 0 1em;
	}

	button {
		margin: auto;
	}
</style>
