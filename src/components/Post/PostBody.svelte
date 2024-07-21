<script lang="ts">
	import type { JsonModel } from '$lib/controllers/types/jsonModel';
	import type { Attachments } from '$lib/responses/Post';
	import { getHtmlWithFallback } from './JSONModel/Body';
	export let jsonModel: JsonModel | null;
	export let attachments: Attachments;
	export let rawContent: string;
</script>

{#await getHtmlWithFallback(jsonModel, attachments, rawContent)}
	<p>Loading post body...</p>
{:then rawText}
	<div class="post-content">
		{@html rawText}
	</div>
{/await}

<style>
	.post-content {
		white-space: pre-wrap;
	}

	.post-content :global(a) {
		color: var(--theme-link-color);
	}

	.post-content :global(a:hover) {
		color: var(--theme-link-color--hover);
	}

	.post-content :global(.image-container) {
		max-height: 850px;
		overflow: scroll;
		padding: 12px;
		width: 755px;
	}

	/* TODO opengraphs */
</style>
