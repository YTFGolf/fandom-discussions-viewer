import type { Block, Paragraph } from '$lib/controllers/types/jsonModel';
import { default as getText } from './Text';

async function getParagraph(p: Paragraph) {
	if (!p.content) {
		return '<p>&nbsp;</p>';
	}

	const root = document.createElement('p');
	const elements: Promise<string>[] = [];
	for (const textItem of p.content) {
		elements.push(getText(textItem));
	}
	root.innerHTML = (await Promise.all(elements)).join('');

	return root.outerHTML;
}

export default async function getHtml(block: Block) {
	if (!block.type) {
		throw new Error('Block does not have a type!');
	}

	switch (block.type) {
		case 'paragraph':
			return getParagraph(block);

		default:
			const code = document.createElement('code');
			code.textContent = JSON.stringify(block);

			const p = document.createElement('p');
			p.append(code);
			return p.outerHTML;
	}
}
