<script lang="ts">
	import { post } from '$lib/caller';
	import type { Paragraph } from '$lib/controllers/types/jsonModel';
	import ParseError from '../ParseError.svelte';
	import getHtml from '../Text';
	// // complicated thing to render DOM
	// const globProps = {
	// 	document: null,
	// };
	// function elem<K extends keyof HTMLElementTagNameMap>(
	// 	tagName: K,
	// 	options?: ElementCreationOptions | undefined,
	// ): HTMLElementTagNameMap[K] {
	// 	// @ts-ignore
	// 	return globProps.document.createElement(tagName, options);
	// }

	export let props: Paragraph;
</script>

<p>
	{#if props.content}
		{#each props.content as object}
			{#if !object}
				{new Error("Shouldn't happen")}
			{:else if object.type == 'text'}
				{#await getHtml(object)}
					Loading text...
				{:then rawText}{@html rawText}{/await}
			{:else}
				<ParseError />
			{/if}
		{/each}
	{:else}
		&nbsp;
	{/if}
</p>
