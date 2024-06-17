<script lang="ts">
	import type { DocModel } from '$lib/controllers/types/jsonModel';
	import Block from './JSONModel/Block.svelte';

	export let post: { jsonModel: string };
	$: postParsed = JSON.parse(post.jsonModel);

	// TODO figure out stores so attachments can be displayed.
	// https://svelte.dev/docs/special-elements

	/*

    Plan:

    <!-- prettier-ignore -->
    - Block
    - Image (will be broken)
    - OpenGraph (will be broken)
    - HtmlList
      - bulletList
      - orderedList
    - CodeBlock
	 */
</script>

{#each postParsed.content as block}
	<Block {block}></Block>
{/each}
