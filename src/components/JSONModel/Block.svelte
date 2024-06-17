<script lang="ts">
	import type { Block } from '$lib/controllers/types/jsonModel';
	import Fallback from './Fallback.svelte';
	import getHtml from './Paragraph';

	export let block: Block;
	// await new Promise((resolve) => setTimeout(resolve, 3000));
</script>

{#if block.type === 'paragraph'}
	{#await getHtml(block)}
		<p>Loading paragraph...</p>
	{:then rawText}
		{@html rawText}
	{/await}
{:else}
	<Fallback post={block} />
{/if}
