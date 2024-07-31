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
		gear:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-gear-small.svg',
		lock:           'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-lock-small.svg',
		unlock:         'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-unlock-small.svg',
		alert:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-alert-small.svg',
		error:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-error-small.svg',
		checkmark:      'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-checkmark-small.svg',
		close:          'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-close.svg',
	};

	export let icon: keyof typeof ICONS;
	export let size: string;

	// responsibility for setting colour is on the user
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
		color: transparent;
		display: inline-block;
	}
</style>
