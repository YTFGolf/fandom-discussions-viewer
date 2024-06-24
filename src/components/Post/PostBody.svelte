<script lang="ts">
	import type { Attachments } from '$lib/responses/Post';
	import { getHtmlWithFallback } from './JSONModel/Body';
	export let jsonModel: string;
	export let attachments: Attachments;
</script>

{#await getHtmlWithFallback(jsonModel, attachments)}
	<p>Loading post body...</p>
{:then rawText}
	<div class="post-content">
		{@html rawText}
	</div>
{/await}

<style>
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
