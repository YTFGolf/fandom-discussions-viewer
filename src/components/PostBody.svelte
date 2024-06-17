<script lang="ts">
	import getHtml from './JSONModel/Block';
	import Fallback from './JSONModel/Fallback.svelte';

	export let post: { jsonModel: string };
	$: postParsed = JSON.parse(post.jsonModel);

	// TODO figure out stores so attachments can be displayed.
	// https://svelte.dev/docs/special-elements
	// await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

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
	{#await getHtml(block)}
		<p>Loading block...</p>
	{:then rawText}
		{@html rawText}
	{:catch}
		<Fallback post={block} />
	{/await}
{/each}
