<script lang="ts">
	import { userDetails, wiki } from './stores';

	function setWiki() {
		const url = new URL(window.location.href);
		url.searchParams.set('wiki', `${$wiki.lang}.${$wiki.name}`);
		window.location.href = url.href;
	}
</script>

<nav class="top-nav">
	<form class="wiki-form" on:submit={setWiki}>
		<label for="name">Wiki:</label>
		<input type="text" bind:value={$wiki.name} />

		<label for="lang">Lang:</label>
		<input type="lang" bind:value={$wiki.lang} />

		<button type="submit">Set</button>
	</form>
	<!-- <span>{JSON.stringify($userDetails)}</span> -->
</nav>

<style>
	.top-nav {
		display: flex;
		position: relative;
		align-content: center;
		padding: 1em;
	}

	.top-nav .wiki-form {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
	}
</style>
