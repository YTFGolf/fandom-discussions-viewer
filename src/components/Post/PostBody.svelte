<script lang="ts">
	import type { Attachments } from '$lib/responses/Post';
	import type { DocModel } from '$lib/controllers/types/jsonModel';
	import { default as getBlock } from './JSONModel/Block';
	import fallback from '../Fallback';

	export let jsonModel: string;
	export let attachments: Attachments;

	async function getHtml(jsonModel: string, attachments: Attachments) {
		const postParsed: DocModel = JSON.parse(jsonModel);

		const blocks: Promise<string>[] = [];
		for (const block of postParsed.content) {
			blocks.push(getBlock(block, attachments));
		}

		return (await Promise.all(blocks)).join('');
	}

	async function getHtmlWithFallback(jsonModel: string, attachments: Attachments) {
		try {
			return await getHtml(jsonModel, attachments);
		} catch (e) {
			console.error(e);
			return fallback(jsonModel);
		}
	}
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
