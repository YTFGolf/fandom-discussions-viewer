import type { Attachments } from '$lib/responses/Post';
import type { Block, Image, Paragraph } from '$lib/controllers/types/jsonModel';
import { default as getText } from './Text';
import fallback from '../Fallback';

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

async function getImage(i: Image, attachments: Attachments) {
	const image = attachments.contentImages![i.attrs.id];
	if (!image) {
		throw new Error(`Image ${i.attrs.id} doesn't exist!`);
	}

	const img = document.createElement('img');
	img.src = image.url;
	img.width = image.width;
	img.height = image.height;

	return img.outerHTML;
}

export default async function getHtml(block: Block, attachments: Attachments) {
	if (!block.type) {
		throw new Error('Block does not have a type!');
	}
	// await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
	/*

    Plan:

    <!-- prettier-ignore -->
    - Block
    - OpenGraph (may be broken)
    - HtmlList
      - bulletList
      - orderedList
    - CodeBlock
	 */

	switch (block.type) {
		case 'paragraph':
			return getParagraph(block);

		case 'image':
			return getImage(block, attachments);

		default:
			return fallback(JSON.stringify(block));
	}
}
