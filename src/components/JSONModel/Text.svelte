<script lang="ts">
	import type { TextItem } from '$lib/controllers/types/jsonModel';

	export let props: TextItem;
</script>

{props.text}
