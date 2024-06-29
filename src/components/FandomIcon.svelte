<script lang="ts">
	const ICONS = {
		edit: 'https://fandomdesignsystem.com/ooui/dist/themes/fandomooui/images/wds-icons-pencil-small.svg',
	};

	export let icon: keyof typeof ICONS;
	export let width: string;
</script>

<img {width} src={ICONS[icon]} alt={icon} />
