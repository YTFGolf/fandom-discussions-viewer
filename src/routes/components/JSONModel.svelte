<script lang="ts">
	import type { DocModel } from '$lib/controllers/types/jsonModel';

	export let post: DocModel;

	// TODO figure out stores so attachments can be displayed.
	// https://svelte.dev/docs/special-elements

	/*

    Plan:

    <!-- prettier-ignore -->
    - Block
    - Paragraph
    - Image (will be broken)
    - OpenGraph (will be broken)
    - HtmlList
      - bulletList
      - orderedList
    - CodeBlock
    - Inline
    - If anything goes through to the end return <code>Malformed content</code>

    So I can make a ts file that will go through and

    ```
    b.svelte
    export let tag;
    ...
    <svelte:element this={tag}>dd<slot></slot></svelte:element>

    a.svelte
    import b
    comp = b
    <svelte:component this={comp} tag={"h1"}><h3>s</h3></svelte:component>
    ```

	 */
</script>

{#each post.content as element}
	<p>{JSON.stringify(element)}</p>
{/each}
