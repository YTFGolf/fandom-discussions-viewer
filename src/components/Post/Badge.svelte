<script context="module" lang="ts">
	export type BadgeName =
		| 'sysop'
		| 'content-moderator'
		| 'threadmoderator'
		| 'staff'
		| 'wiki-specialist'
		| 'soap'
		| 'global-discussions-moderator';
</script>

<script lang="ts">
	// Stolen from https://dev.fandom.com/wiki/MediaWiki:UserBadge/code.js
	// prettier-ignore
	var BADGES_DEFAULTS :Record<BadgeName, string>= {
		// local
		'sysop':                        'https://vignette.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg',
		'content-moderator':            'https://vignette.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg',
		'threadmoderator':              'https://vignette.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg',
		// global
		'staff':                        'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
		'wiki-specialist':              'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
		'soap':                         'https://vignette.wikia.nocookie.net/central/images/9/9a/Badge-SOAP.svg',
		'global-discussions-moderator': 'https://vignette.wikia.nocookie.net/central/images/4/40/Badge-GlobalDiscussionsModerator.svg',
	};

	export let group: BadgeName;

	async function getBadge(badgeName: BadgeName) {
		const img = document.createElement('img');
		img.src = BADGES_DEFAULTS[badgeName];
		img.style.width = '1em';
		img.style.height = '1em';
		img.alt = badgeName;
		img.title = badgeName;

		return img.outerHTML;
	}
</script>

{#await getBadge(group)}
	Loading badge...
{:then badge}
	{@html badge}
{/await}
