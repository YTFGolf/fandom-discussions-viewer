import type { Attachments } from '$lib/responses/Post';
import type {
	Block,
	CodeBlock,
	HtmlList,
	Image,
	ListItem,
	Paragraph,
} from '$lib/controllers/types/jsonModel';
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

async function getListItem(listItem: ListItem) {
	const itemElement = document.createElement('li');

	const paragraphs: Promise<string>[] = [];
	for (const item of listItem.content) {
		paragraphs.push(getParagraph(item));
	}

	itemElement.innerHTML = (await Promise.all(paragraphs)).join('');
	return itemElement.outerHTML;
}

async function getHtmlList(list: HtmlList) {
	let tag;
	if (list.type === 'bulletList') {
		tag = 'ul';
	} else if (list.type === 'orderedList') {
		tag = 'ol';
	} else {
		throw new Error('This should be unreachable');
	}

	const listElement = document.createElement(tag);

	const items: Promise<string>[] = [];
	for (const item of list.content) {
		items.push(getListItem(item));
	}

	listElement.innerHTML = (await Promise.all(items)).join('');
	return listElement.outerHTML;
}

async function getCodeBlock(block: CodeBlock) {
	const codeBlock = document.createElement('code');

	const elements: Promise<string>[] = [];
	for (const textItem of block.content) {
		elements.push(getText(textItem));
	}
	codeBlock.innerHTML = (await Promise.all(elements)).join('');

	const outer = document.createElement('pre');
	outer.append(codeBlock);

	return outer.outerHTML;
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

		case 'bulletList':
		case 'orderedList':
			return getHtmlList(block);

		case 'code_block':
			return getCodeBlock(block);

		default:
			return fallback(JSON.stringify(block));
	}
}
