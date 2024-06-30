import type { DocModel, JsonModel } from '$lib/controllers/types/jsonModel';
import { default as getBlock, getImage } from './Block';
import fallback from '../../Fallback';
import type { Attachments } from '$lib/responses/Post';
import { stringify } from '$lib/controllers/util';

async function getHtml(jsonModel: DocModel, attachments: Attachments) {
	const blocks: Promise<string>[] = [];
	for (const block of jsonModel.content) {
		blocks.push(getBlock(block, attachments));
	}

	return (await Promise.all(blocks)).join('');
}

export async function getHtmlWithFallback(
	jsonModel: JsonModel,
	attachments: Attachments,
	rawContent: string,
) {
	if (!jsonModel) {
		let content = rawContent;
		if (attachments.contentImages[0]) {
			content += getImage({ type: 'image', attrs: { id: 0 } }, attachments);
		}
		return content;
	}

	try {
		if (typeof jsonModel === 'string') {
			jsonModel = JSON.parse(jsonModel);
		}
		return await getHtml(jsonModel as DocModel, attachments);
	} catch (e) {
		console.error(e);
		return fallback(stringify(jsonModel)!);
	}
}
