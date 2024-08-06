<script lang="ts">
	import type { UserDetails } from '$lib/responses/Post';
	import { wiki } from '../routes/stores';
	import Badge, { type BadgeName } from './Badge.svelte';

	export let user: UserDetails;
	let description, avatar, userBadge;
	$: ({ description, avatar, userBadge } = getData(user));

	function getData(user: UserDetails) {
		const description = `${user.name}'s avatar`;

		let avatar: string;
		if (!user.avatarUrl) {
			avatar = '';
		} else if (user.avatarUrl.match(/^https:\/\/vignette/)) {
			avatar = user.avatarUrl + '/revision/latest/scale-to-width/48';
		} else {
			avatar = user.avatarUrl + '/scale-to-width/48';
		}

		const userBadge = user.badgePermission.replace('badge:', '') as BadgeName;

		return { description, avatar, userBadge };
	}
</script>

<div class="avatar">
	<a href={`/f/u/${user.id}?wiki=${$wiki.lang}.${$wiki.name}`}>
		{#if user.avatarUrl}
			<img src={avatar} alt={description} title={description} class="avatar-image" />
		{:else}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="1em" height="1em" class="wds-avatar__image" data-testid="Avatar__image-placeholder"><defs><path id="IconAvatar__a" d="M12 11c-.965 0-1.75-.785-1.75-1.75S11.035 7.5 12 7.5s1.75.785 1.75 1.75S12.965 11 12 11m0-5.5a3.754 3.754 0 00-3.75 3.75A3.754 3.754 0 0012 13a3.754 3.754 0 003.75-3.75A3.754 3.754 0 0012 5.5m7.679 12.914c-1.987-2.104-4.727-3.289-7.679-3.289-2.953 0-5.692 1.185-7.679 3.289A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10a9.956 9.956 0 01-2.321 6.414M12 22a9.995 9.995 0 01-6.25-2.187c1.613-1.719 3.844-2.688 6.25-2.688s4.637.969 6.249 2.688A9.993 9.993 0 0112 22m0-22C5.383 0 0 5.383 0 12c0 3.268 1.294 6.33 3.651 8.63l.012.013A12 12 0 0012 24h.036a12.008 12.008 0 008.306-3.363C22.701 18.341 24 15.273 24 12c0-6.617-5.383-12-12-12"></path></defs><use xlink:href="#IconAvatar__a" fill-rule="evenodd"></use></svg>
		{/if}
	</a>
	{#if user.badgePermission !== ''}
		<div class="user-badge"><Badge group={userBadge}></Badge></div>
	{/if}
</div>

<style>
	.avatar {
		position: relative;
	}

	.avatar :global(img) {
		vertical-align: middle;
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

	.user-badge {
		height: var(--wds-avatar-badge-size);
		left: var(--wds-avatar-badge-left);
		line-height: 0;
		min-width: var(--wds-avatar-badge-size);
		position: absolute;
		top: var(--wds-avatar-badge-top);
		width: var(--wds-avatar-badge-size);
	}
</style>
