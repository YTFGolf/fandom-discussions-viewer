<script lang="ts">
	// https://fandomdesignsystem.com/?path=/story/assets-icons--common-icons
	// just check the title attribute of any icons

	// prettier-ignore
	const ICONS = {
		edit:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-pencil-small.svg',
		delete:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-trash-small.svg',
		restore:        'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-trash-open-small.svg',
		heart:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-heart-small.svg',
		'heart-filled': 'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-heart-filled-small.svg',
		bullet:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-bullet-list-small.svg',
		numbered:       'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-numbered-list-small.svg',
		bold:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-bold-small.svg',
		italic:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-italics-small.svg',
		preformat:      'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-preformat-small.svg',
		link:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-link-small.svg',
		image:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-image-small.svg',
		mention:        'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-mention-small.svg',
	};

	export let icon: keyof typeof ICONS;
	export let width: string;
	export let color: string = '';
</script>

<!-- https://stackoverflow.com/a/43916743 -->
<img
	class="fandom-icon-svg"
	style="background-color: {color}; mask-image: url({ICONS[icon]});"
	{width}
	alt={icon}
/>

<style>
	img {
		mask: none no-repeat center;
		color: transparent;
	}
</style>
