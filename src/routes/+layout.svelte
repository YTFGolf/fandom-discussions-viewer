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
