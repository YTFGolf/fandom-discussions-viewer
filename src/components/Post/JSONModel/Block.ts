import type { Attachments } from '$lib/responses/Post';
import type {
	Block,
	CodeBlock,
	HtmlList,
	Image,
	ListItem,
	OpenGraph,
	Paragraph,
	TextItem,
} from '$lib/controllers/types/jsonModel';
import getText from './Text';
import fallback from '../../Fallback';

export async function getParagraph(p: Paragraph) {
	// @ts-ignore
	if (p.content && !p.content[0]) {
		return getParagraph({ ...p, content: [p.content as any] });
	}
	p.content = p.content as TextItem[];

	if (!p.content || (p.content.length === 1 && p.content[0].text === '\n')) {
		return '<p><br></p>';
	}

	const root = document.createElement('p');
	const elements: Promise<string>[] = [];
	for (const textItem of p.content) {
		elements.push(getText(textItem));
	}
	root.innerHTML = (await Promise.all(elements)).join('');

	return root.outerHTML;
}

export async function getImage(i: Image, attachments: Attachments) {
	const image = attachments.contentImages![i.attrs.id];
	if (!image) {
		throw new Error(`Image ${i.attrs.id} doesn't exist!`);
	}

	const container = document.createElement('div');
	container.className = 'image-container';

	const img = document.createElement('img');
	img.src = image.url + '/scale-to-width/755';
	img.width = 708;
	// img.height = image.height;

	container.append(img);
	return container.outerHTML;
}

export async function getListItem(listItem: ListItem) {
	const itemElement = document.createElement('li');

	const paragraphs: Promise<string>[] = [];
	for (const item of listItem.content) {
		paragraphs.push(getParagraph(item));
	}

	itemElement.innerHTML = (await Promise.all(paragraphs)).join('');
	return itemElement.outerHTML;
}

export async function getHtmlList(list: HtmlList) {
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

export async function getCodeBlock(block: CodeBlock) {
	const codeBlock = document.createElement('code');

	const elements: Promise<string>[] = [];
	for (const textItem of block.content as TextItem[]) {
		elements.push(getText(textItem));
	}
	codeBlock.innerHTML = (await Promise.all(elements)).join('');

	const outer = document.createElement('pre');
	outer.append(codeBlock);

	return outer.outerHTML;
}

export async function getOpenGraph(g: OpenGraph, attachments: Attachments) {
	const graph = attachments.openGraphs![g.attrs.id];
	// TODO what to do when this is null
	// http://localhost:5173/f/p/4400000000000889237/r/4400000000003558413?wiki=en.battle-cats
	// Fandom just returns malformed content
	// http://localhost:5173/f/p/4400000000000022255?wiki=en.dev
	if (!graph) {
		throw new Error(`Open graph ${g.attrs.id} doesn't exist!`);
	}

	const graphContainer = document.createElement('div');
	graphContainer.className = 'open-graph';
	const img = document.createElement('img');
	img.src = graph.imageUrl + '/scale-to-width/755';
	img.width = 708;
	// img.height = graph.imageHeight;

	const link = document.createElement('a');
	link.href = graph.url;
	link.textContent = graph.title;
	link.target = '_blank';

	graphContainer.append(img, link);

	return graphContainer.outerHTML;
}

export async function getHtml(block: Block, attachments: Attachments) {
	if (!block.type) {
		throw new Error('Block does not have a type!');
	}
	// await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

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

		case 'openGraph':
			return getOpenGraph(block, attachments);

		// // @ts-ignore
		// case 'text':
		// 	return getParagraph({ type: 'paragraph', content: block });

		default:
			return fallback(JSON.stringify(block));
	}
}

export default async function getHtmlWithFallback(block: Block, attachments: Attachments) {
	try {
		return await getHtml(block, attachments);
	} catch (e) {
		// console.error(e);
		// Error messages are ridiculously long so ignore
		return fallback(JSON.stringify(block));
	}
}
