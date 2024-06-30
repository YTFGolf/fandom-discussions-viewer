<script lang="ts">
	import Header from './Header.svelte';
	import { parseWiki } from '$lib/wiki';
	import { wiki } from './stores';
	import { onMount } from 'svelte';
	import { FeedsAndPosts } from '$lib/controllers/wikia/FeedsAndPosts';
	import { get } from '$lib/caller';
	import type { UserData } from '$lib/server/userData';

	export let data;
	const theme = data.config.theme;
	$wiki = parseWiki(data.wiki);

	let entrypoint = `https://${$wiki.name}.fandom.com`;
	if ($wiki.lang && $wiki.lang !== 'en') {
		entrypoint += '/' + $wiki.lang;
	}

	async function getUserDetails() {
		// https://wwr-test.fandom.com/api.php?action=query&format=json&meta=userinfo&uiprop=options
		// https://wwr-test.fandom.com/wikia.php&controller=FeedsAndPosts&method=getAll

		const params = {
			action: 'query',
			format: 'json',
			meta: 'userinfo',
			uiprop: 'options',
		};
		const userInfo = get($wiki, params, { script: 'api.php' });
		const wikiInfo = FeedsAndPosts.getAll($wiki);

		const responses = [userInfo.then((res) => res.json()), wikiInfo.then((res) => res.json())];
		const [userData, wikiData] = await Promise.all(responses);
		const info = userData.query.userinfo;

		const userDetails: UserData = {
			id: info.id,
			name: info.name,
			avatarUrl: info.options.avatar || null,
			badgePermission: wikiData.badge,
		};

		console.log(userDetails);
	}

	onMount(() => {
		getUserDetails();
	});

	// console.log($page.data?.wiki);
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
