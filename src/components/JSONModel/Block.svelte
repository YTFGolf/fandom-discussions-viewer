<script lang="ts">
	import type { Block } from '$lib/controllers/types/jsonModel';
	import Paragraph from './Block/Paragraph.svelte';
	import Fallback from './Fallback.svelte';

	export let block: Block;
</script>

{#if block.type === 'paragraph'}
	<Paragraph props={block} />
{:else}
	<Fallback post={block} />
{/if}
