<script lang="ts">
	import Header from './Header.svelte';
	import { parseWiki } from '$lib/wiki';
	import { config, userDetails, wiki } from './stores';
	import { onMount } from 'svelte';
	import { FeedsAndPosts } from '$lib/controllers/wikia/FeedsAndPosts';
	import { get } from '$lib/caller';
	import type { UserData } from '$lib/server/userData';
	import { Option, setFromClient } from '$lib/client';

	export let data;
	$wiki = parseWiki(data.wiki);
	$userDetails = { ...data.userData, badgePermission: '' };
	$config = data.config;

	const themeWiki = parseWiki($config.themeWiki || data.wiki);
	let themeEntrypoint = `https://${themeWiki.name}.fandom.com`;
	if (themeWiki.lang && themeWiki.lang !== 'en') {
		themeEntrypoint += '/' + themeWiki.lang;
	}
	const theme = $config.theme;

	async function getUserDetails() {
		// https://wwr-test.fandom.com/api.php?action=query&format=json&meta=userinfo&uiprop=options
		const params = {
			action: 'query',
			format: 'json',
			meta: 'userinfo',
			uiprop: 'options',
		};
		const userQuery = await get($wiki, params, { script: 'api.php' });
		const userInfo = await userQuery.json();

		const info = userInfo.query.userinfo;
		const userData: UserData = {
			id: info.id,
			name: info.name,
			avatarUrl: info.options.avatar || null,
		};

		setFromClient(Option.UserData, userData);
		$userDetails = {
			...userData,
			badgePermission: $userDetails.badgePermission,
		};
	}

	async function getUserBadge() {
		// https://wwr-test.fandom.com/wikia.php&controller=FeedsAndPosts&method=getAll
		const wikiInfo = await FeedsAndPosts.getAll($wiki);
		const wikiData = await wikiInfo.json();

		$userDetails.badgePermission = wikiData.badge;
	}

	onMount(() => {
		getUserDetails();
		getUserBadge();
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="{themeEntrypoint}/wikia.php?controller=ThemeApi&method=themeVariables&variant={theme}"
	/>
	<link
		rel="stylesheet"
		href="{themeEntrypoint}/resources-ucp/mw139/dist/styles/ext.fandom.GlobalComponents.GlobalComponentsTheme.{theme}.css"
	/>
	<link rel="stylesheet" href="/styles.css" />
</svelte:head>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<!-- <footer>Footer</footer> -->
	<div class="notification-placeholder"><div class="notification-container"></div></div>
</div>

{@html `<style>body{color-scheme:${theme};}</style>`}

<style>
	.notification-placeholder {
		bottom: 18px;
		left: calc(var(--desktop-global-navigation-width, 0) + 18px);
		position: fixed;
		z-index: 200;
	}

	.notification-container {
		bottom: 0;
		margin: 0 auto;
		position: absolute;
		width: 420px;
	}
</style>
