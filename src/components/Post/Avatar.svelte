<script lang="ts">
	import type { UserDetails } from '$lib/responses/Post';
	import Badge, { type BadgeName } from './Badge.svelte';

	export let user: UserDetails;

	let description = `${user.name}'s avatar`;
	let avatar: string;
	if (!user.avatarUrl) {
		avatar = '';
	} else if (user.avatarUrl.match(/^https:\/\/vignette/)) {
		avatar = user.avatarUrl + '/revision/latest/scale-to-width/48';
	} else {
		avatar = user.avatarUrl + '/scale-to-width/48';
	}

	let userBadge = user.badgePermission.replace('badge:', '') as BadgeName;
</script>

<div class="avatar">
	<a href={`/f/u/${user.id}`}>
		{#if user.avatarUrl}
			<img src={avatar} alt={description} title={description} class="avatar-image" />
		{:else}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="1em" height="1em" class="wds-avatar__image" data-testid="Avatar__image-placeholder"><defs><path id="IconAvatar__a" d="M12 11c-.965 0-1.75-.785-1.75-1.75S11.035 7.5 12 7.5s1.75.785 1.75 1.75S12.965 11 12 11m0-5.5a3.754 3.754 0 00-3.75 3.75A3.754 3.754 0 0012 13a3.754 3.754 0 003.75-3.75A3.754 3.754 0 0012 5.5m7.679 12.914c-1.987-2.104-4.727-3.289-7.679-3.289-2.953 0-5.692 1.185-7.679 3.289A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10a9.956 9.956 0 01-2.321 6.414M12 22a9.995 9.995 0 01-6.25-2.187c1.613-1.719 3.844-2.688 6.25-2.688s4.637.969 6.249 2.688A9.993 9.993 0 0112 22m0-22C5.383 0 0 5.383 0 12c0 3.268 1.294 6.33 3.651 8.63l.012.013A12 12 0 0012 24h.036a12.008 12.008 0 008.306-3.363C22.701 18.341 24 15.273 24 12c0-6.617-5.383-12-12-12"></path></defs><use xlink:href="#IconAvatar__a" fill-rule="evenodd"></use></svg>
		{/if}
	</a>
	{#if user.badgePermission !== ''}
		<Badge group={userBadge}></Badge>
	{/if}
</div>

<style>
	/* From https://wwr-test.fandom.com/wikia.php?controller=ThemeApi&method=themeVariables&variant=light&version=1718794675 */
	/* TODO this should be global CSS */
	/* prettier-ignore */
	:root{--theme-body-dynamic-color-1:#fff;--theme-body-dynamic-color-1--rgb:255,255,255;--theme-body-dynamic-color-2:#e6e6e6;--theme-body-dynamic-color-2--rgb:230,230,230;--theme-page-dynamic-color-1:#fff;--theme-page-dynamic-color-1--rgb:255,255,255;--theme-page-dynamic-color-1--inverted:#000;--theme-page-dynamic-color-1--inverted--rgb:0,0,0;--theme-page-dynamic-color-2:#e6e6e6;--theme-page-dynamic-color-2--rgb:230,230,230;--theme-sticky-nav-dynamic-color-1:#fff;--theme-sticky-nav-dynamic-color-1--rgb:255,255,255;--theme-sticky-nav-dynamic-color-2:#e6e6e6;--theme-sticky-nav-dynamic-color-2--rgb:230,230,230;--theme-link-dynamic-color-1:#000;--theme-link-dynamic-color-1--rgb:0,0,0;--theme-link-dynamic-color-2:#3a3a3a;--theme-link-dynamic-color-2--rgb:58,58,58;--theme-accent-dynamic-color-1:#fff;--theme-accent-dynamic-color-1--rgb:255,255,255;--theme-accent-dynamic-color-2:#e6e6e6;--theme-accent-dynamic-color-2--rgb:230,230,230;--theme-body-background-color:#250f12;--theme-body-background-color--rgb:37,15,18;--theme-body-background-image:none;--theme-body-background-image-full:url(https://static.wikia.nocookie.net/wwr-test/images/b/b5/Site-background-light/revision/latest?cb=20240605150128);--theme-body-background-image-desktop:url(https://static.wikia.nocookie.net/wwr-test/images/b/b5/Site-background-light/revision/latest/scale-to-width-down/1280?cb=20240605150128);--theme-body-background-image-large-desktop:url(https://static.wikia.nocookie.net/wwr-test/images/b/b5/Site-background-light/revision/latest/scale-to-width-down/1500?cb=20240605150128);--theme-body-background-image-mobile:url(https://static.wikia.nocookie.net/wwr-test/images/b/b5/Site-background-light/revision/latest/scale-to-width-down/600?cb=20240605150128);--theme-body-background-image-mobile-2x:url(https://static.wikia.nocookie.net/wwr-test/images/b/b5/Site-background-light/revision/latest/scale-to-width-down/1200?cb=20240605150128);--theme-body-background-image-tablets:url(https://static.wikia.nocookie.net/wwr-test/images/b/b5/Site-background-light/revision/latest/scale-to-width-down/1024?cb=20240605150128);--theme-body-background-image-tablets-2x:url(https://static.wikia.nocookie.net/wwr-test/images/b/b5/Site-background-light/revision/latest/scale-to-width-down/2048?cb=20240605150128);--theme-body-text-color:#fff;--theme-body-text-color--rgb:255,255,255;--theme-body-text-color--hover:#cccccc;--theme-sticky-nav-background-color:#401c31;--theme-sticky-nav-background-color--rgb:64,28,49;--theme-sticky-nav-text-color:#fff;--theme-sticky-nav-text-color--hover:#cccccc;--theme-page-background-color:#401c31;--theme-page-background-color--rgb:64,28,49;--theme-page-background-color--secondary:#5d3e50;--theme-page-background-color--secondary--rgb:93,62,80;--theme-page-text-color:#e6e6e6;--theme-page-text-color--rgb:230,230,230;--theme-page-text-color--hover:#b3b3b3;--theme-page-text-mix-color:#93818c;--theme-page-text-mix-color-95:#48263a;--theme-page-accent-mix-color:#87255d;--theme-page-headings-font:'Rubik';--theme-link-color:#ff94da;--theme-link-color--rgb:255,148,218;--theme-link-color--hover:#fef9fd;--theme-link-label-color:#000;--theme-accent-color:#ce2d88;--theme-accent-color--rgb:206,45,136;--theme-accent-color--hover:#e27eb7;--theme-accent-label-color:#fff;--theme-border-color:#6a4f5e;--theme-border-color--rgb:106,79,94;--theme-alert-color:#ec001c;--theme-alert-color--rgb:236,0,28;--theme-alert-color--hover:#fe5267;--theme-alert-color--secondary:#fe6274;--theme-alert-label:#fff;--theme-warning-color:#cf721c;--theme-warning-color--rgb:207,114,28;--theme-warning-color--secondary:#e17e23;--theme-warning-label:#000;--theme-success-color:#0d8636;--theme-success-color--rgb:13,134,54;--theme-success-color--secondary:#11af46;--theme-success-label:#fff;--theme-message-color:#b14d9f;--theme-message-label:#fff;--theme-community-header-color:#ffffff;--theme-community-header-color--hover:#cccccc;--theme-background-image-opacity:100%;--theme-page-text-opacity-factor:0.7;--theme-body-text-opacity-factor:0.7;--theme-link-decoration:none;}

	:root {
		--wds-avatar-border-color: rgba(var(--theme-page-text-color--rgb), 0.7);
		--wds-avatar-border-color--hover: var(--theme-link-color);
		--wds-avatar-background-color: var(--theme-page-background-color);
		--wds-avatar-border-width: 2px;
	}

	.avatar-image,
	.wds-avatar__image {
		width: 36px;
		height: 36px;
		border-radius: 50%;
	}

	.avatar-image,
	.wds-avatar__image {
		fill: currentColor;
		background-color: var(--wds-avatar-background-color);
		border-radius: 50%;
		box-sizing: border-box;
		color: var(--wds-avatar-border-color);
		display: inline-block;
		-o-object-fit: cover;
		object-fit: cover;
		transition:
			border-color 0.3s,
			color 0.3s;
	}

	.avatar-image:hover,
	.wds-avatar__image:hover {
		color: var(--wds-avatar-border-color--hover);
	}

	.avatar-image {
		border: var(--wds-avatar-border-width) solid;
	}
</style>
