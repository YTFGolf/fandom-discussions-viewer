<script context="module" lang="ts">
	export type BadgeName =
		| 'sysop'
		| 'content-moderator'
		| 'threadmoderator'
		| 'staff'
		| 'wiki-specialist'
		| 'soap'
		| 'global-discussions-moderator';

	type GroupInfo = {
		name: string;
		url: string;
	};
</script>

<script lang="ts">
	// Stolen from https://dev.fandom.com/wiki/MediaWiki:UserBadge/code.js
	// prettier-ignore
	var BADGES_DEFAULTS: Record<BadgeName, GroupInfo> = {
		'sysop': {
			name: 'Sysop',
			url: 'https://vignette.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg',
		},
		'content-moderator': {
			name: 'Content Moderator',
			url: 'https://vignette.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg',
		},
		'threadmoderator': {
			name: 'Thread Moderator',
			url: 'https://vignette.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg',
		},
		// global
		'staff': {
			name: 'Staff',
			url: 'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
		},
		'wiki-specialist': {
			name: 'Wiki Specialist',
			url: 'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
		},
		'soap': {
			name: 'SOAP',
			url: 'https://vignette.wikia.nocookie.net/central/images/9/9a/Badge-SOAP.svg',
		},
		'global-discussions-moderator': {
			name: 'Global Discussions Moderator',
			url: 'https://vignette.wikia.nocookie.net/central/images/4/40/Badge-GlobalDiscussionsModerator.svg',
		},
	};

	export let group: BadgeName;

	async function getBadge(badgeName: BadgeName) {
		const img = document.createElement('img');
		img.src = BADGES_DEFAULTS[badgeName].url;
		img.style.width = '1em';
		img.style.height = '1em';
		img.alt = BADGES_DEFAULTS[badgeName].name;
		img.title = BADGES_DEFAULTS[badgeName].name;

		return img.outerHTML;
	}
</script>

{#await getBadge(group)}
	Loading badge...
{:then badge}
	{@html badge}
{/await}
