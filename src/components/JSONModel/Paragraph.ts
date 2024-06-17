import type { Paragraph } from '$lib/controllers/types/jsonModel';
import { default as getText } from './Text';

export default async function getHtml(block: Paragraph) {
	if (!block.content) {
		return '&nbsp;';
	}

	const root = document.createElement('p');
	const elements: Promise<string>[] = [];
	for (const textItem of block.content) {
		elements.push(getText(textItem));
	}
	root.innerHTML = (await Promise.all(elements)).join('');

	return root.outerHTML;
}
