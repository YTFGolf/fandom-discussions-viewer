<script lang="ts">
	// https://fandomdesignsystem.com/?path=/story/assets-icons--common-icons
	// just check the title attribute of any icons

	// prettier-ignore
	const ICONS = {
		edit:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-pencil.svg',
		delete:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-trash.svg',
		restore:        'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-trash-open.svg',
		heart:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-heart.svg',
		'heart-filled': 'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-heart-filled.svg',
		bullet:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-bullet-list.svg',
		numbered:       'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-numbered-list.svg',
		bold:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-bold.svg',
		italic:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-italics.svg',
		preformat:      'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-preformat.svg',
		link:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-link.svg',
		image:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-image.svg',
		mention:        'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-mention.svg',
		gear:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-gear.svg',
		lock:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-lock.svg',
		unlock:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-unlock.svg',
		close:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-close.svg',
		alert:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-alert.svg',
		error:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-error.svg',
		checkmark:      'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-checkmark.svg',
	};

	export let icon: keyof typeof ICONS;
	export let size: string;
</script>

<!-- https://stackoverflow.com/a/43916743 -->
<img
	class="fandom-icon-svg"
	style="mask-image: url({ICONS[icon]}); width: {size}; height: {size};"
	alt={icon}
/>

<style>
	img {
		mask: none no-repeat center;
		background-color: currentColor;
		display: inline-block;
		text-indent: -10000px;
	}
</style>
