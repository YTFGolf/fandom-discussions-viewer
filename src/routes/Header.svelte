<script lang="ts">
	import Avatar from '../components/Avatar.svelte';
	import FandomIcon from '../components/FandomIcon.svelte';
	import { userDetails, wiki } from './stores';

	function setWiki() {
		const url = new URL(window.location.href);
		url.searchParams.set('wiki', `${$wiki.lang}.${$wiki.name}`);
		window.location.href = url.href;
	}

	async function logout() {
		await fetch('/api/logout');
		window.location.reload();
	}
</script>

<nav class="top-nav">
	<form class="wiki-form" on:submit={setWiki}>
		<label for="name">Wiki:</label>
		<input type="text" bind:value={$wiki.name} />

		<label for="lang">Lang:</label>
		<input type="lang" bind:value={$wiki.lang} />

		<button class="wds-button" type="submit">Set</button>
	</form>
	<a class="settings-link" href="/settings">
		<FandomIcon icon="gear" size="2em" />
	</a>
	<Avatar user={$userDetails} />
	{#if $userDetails.id !== 0}
		<button class="wds-button" on:click={logout}>Logout</button>
	{:else}
		<button class="wds-button"><a href="/login">Login</a></button>
	{/if}
</nav>

<style>
	.top-nav {
		display: flex;
		position: relative;
		align-items: center;
		padding: 1em;
		gap: 0.5em;
	}

	.top-nav .wiki-form {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		padding-right: 1em;
	}

	.settings-link :global(.fandom-icon-svg) {
		background-color: var(--theme-page-text-color);
		transition: 0.2s;
	}

	.settings-link :global(.fandom-icon-svg:hover) {
		background-color: var(--theme-page-text-color--hover);
	}
</style>
