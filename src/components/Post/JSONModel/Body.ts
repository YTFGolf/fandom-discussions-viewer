import type { DocModel, JsonModel } from '$lib/controllers/types/jsonModel';
import { default as getBlock } from './Block';
import fallback from '../../Fallback';
import type { Attachments } from '$lib/responses/Post';

async function getHtml(jsonModel: DocModel, attachments: Attachments) {
	const blocks: Promise<string>[] = [];
	for (const block of jsonModel.content) {
		blocks.push(getBlock(block, attachments));
	}

	return (await Promise.all(blocks)).join('');
}

export async function getHtmlWithFallback(jsonModel: JsonModel, attachments: Attachments) {
	try {
		if (typeof jsonModel === 'string') {
			jsonModel = JSON.parse(jsonModel);
		}
		return await getHtml(jsonModel as DocModel, attachments);
	} catch (e) {
		console.error(e);
		return fallback(jsonModel as any);
	}
}
