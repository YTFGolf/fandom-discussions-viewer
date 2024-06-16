<script lang="ts">
	import type { Block } from '$lib/controllers/types/jsonModel';
	import Paragraph from './Block/Paragraph.svelte';
	import Fallback from './Fallback.svelte';

	export let block: Block;

	/** A valid component that takes `data` as arguments. */
	interface ComponentData {
		component: any;
		data: any;
	}
	// this is basically so I can make this a switch case instead of an if
	// block.
	// TODO probably not this

	function switchComponent(block: Block): ComponentData {
		switch (block.type) {
			case 'paragraph':
				return {
					component: Paragraph,
					data: block,
				};

			default:
				return {
					component: Fallback,
					data: { post: block },
				};
		}
	}

	$: blockInner = switchComponent(block);
</script>

<!-- @ts-ignore -->
<svelte:component this={blockInner.component} {...blockInner.data} />
