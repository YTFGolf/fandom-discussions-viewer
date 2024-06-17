<script lang="ts">
	import type { Paragraph } from '$lib/controllers/types/jsonModel';
	import ParseError from '../ParseError.svelte';
	import Text from '../Text.svelte';

	export let props: Paragraph;
</script>

<p>
	{#if props.content}
		{#each props.content as object}
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
</p>
