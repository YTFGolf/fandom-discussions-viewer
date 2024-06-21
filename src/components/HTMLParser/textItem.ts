import type { TextItem } from '$lib/controllers/types/jsonModel';

/**
 * @returns `undefined` if node is blank (i.e. contains only `<br>` or `&nbsp;`)
 */
export default async function parseTextNode(textNode: Node): Promise<TextItem | undefined> {
	if (textNode.nodeName === '#text') {
		const content = textNode.textContent!;

		// 160 = &nbsp;
		if (content === String.fromCharCode(160)) {
			return;
		}
		return {
			type: 'text',
			text: content,
		};
	} else if (textNode.nodeName === 'br') {
		return;
	}
	console.log(textNode, textNode.nodeName);
	// @ts-ignore
	return;
}
