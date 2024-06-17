<script lang="ts">
	import type { TextItem } from '$lib/controllers/types/jsonModel';
	import ParseError from '../ParseError.svelte';
	import Text from '../Text.svelte';

	$$restProps;

	export let content: TextItem[] | null = null;
</script>

{@html '<p>'}
{#if content}
	{#each content as object}
		{#if !object}
			{new Error("Shouldn't happen")}
		{:else if object.type == 'text'}
			<Text props={object}></Text>
		{:else}
			<ParseError />
		{/if}
	{/each}
{:else}
	&nbsp;
{/if}
{@html '</p>'}
