<script lang="ts">
	import type { Attachments } from '$lib/responses/Post';
	import type { DocModel } from '$lib/controllers/types/jsonModel';
	import { default as getBlock } from './JSONModel/Block';
	import fallback from './Fallback';

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

	function getHtmlWithFallback(jsonModel: string, attachments: Attachments) {
		try {
			return getHtml(jsonModel, attachments);
		} catch (e) {
			console.error(e);
			return fallback(jsonModel);
		}
	}
</script>

{#await getHtmlWithFallback(jsonModel, attachments)}
	<p>Loading post body...</p>
{:then rawText}
	{@html rawText}
{/await}
