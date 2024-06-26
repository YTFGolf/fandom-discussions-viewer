<script lang="ts">
	import type { Wiki } from '$lib/types';
	import Header from './Header.svelte';

	const wiki: Wiki = { name: 'battle-cats', lang: 'en' };
	const theme = 'light';
	let entrypoint = `https://${wiki.name}.fandom.com`;

	if (wiki.lang && wiki.lang !== 'en') {
		entrypoint += '/' + wiki.lang;
	}
	// TODO make this a config option
	/**
	 * Would entail:
	 * - storing user data somewhere on the server (probably just a config in a
	 *   gitignored folder), can use svelte load function
	 * - updating config every time it changes
	 * Stores:
	 * - wiki (?) or how to do this properly (storing it on server is probably
	 *   best as a temporary measure but maybe there is a better permanent
	 *   solution)
	 * - lang
	 * - theme preference
	 */
	/**
	 * Other things that can be stored on client:
	 * - user info (since can just use a cookie, maybe use local storage to
	 *   speed up certain stuff)
	 */
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="{entrypoint}/wikia.php?controller=ThemeApi&method=themeVariables&variant={theme}"
	/>
	<link
		rel="stylesheet"
		href="{entrypoint}/resources-ucp/mw139/dist/styles/ext.fandom.GlobalComponents.GlobalComponentsTheme.{theme}.css"
	/>
	<link rel="stylesheet" href="/styles.css" />
</svelte:head>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<!-- <footer>Footer</footer> -->
</div>

{@html `<style>body{color-scheme:${theme};}</style>`}
