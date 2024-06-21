import type { Attachments } from '$lib/controllers/types/attachments';
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
import parseTextNode from './textItem';

namespace parse {
	export async function Paragraph(paragraph: HTMLParagraphElement): Promise<Paragraph> {
		const children: Promise<TextItem | undefined>[] = [];
		for (const node of paragraph.childNodes) {
			children.push(parseTextNode(node));
		}
		const content = (await Promise.all(children)).filter((child) => child) as TextItem[];
		// await children and remove undefined values

		if (content.length === 0) {
			return { type: 'paragraph' };
		}
		return { type: 'paragraph', content: content };
	}

	export function Image(
		container: HTMLDivElement,
		contentImages: Attachments['contentImages'],
	): Image {
		const target = (container.firstChild as HTMLImageElement).src.replace(
			'/scale-to-width/755',
			'',
		);

		let id;
		for (const [i, image] of contentImages!.entries()) {
			if (image.url === target) {
				id = i;
				break;
			}
		}

		if (id === undefined) {
			throw new Error(`Image ${target} not found!`);
		}

		return { type: 'image', attrs: { id: id } };
	}

	export async function ListItem(item: HTMLLIElement): Promise<ListItem> {
		const paragraphs = [];
		for (const paragraph of item.children) {
			paragraphs.push(parse.Paragraph(paragraph as HTMLParagraphElement));
		}

		return { type: 'listItem', content: await Promise.all(paragraphs) };
	}

	export async function List(list: HTMLOListElement | HTMLUListElement): Promise<HtmlList> {
		let type: 'bulletList' | 'orderedList';
		if (list.tagName === 'UL') {
			type = 'bulletList';
		} else if (list.tagName === 'OL') {
			type = 'orderedList';
		} else {
			throw new Error('List type not defined!');
		}

		const items = [];
		for (const listItem of list.children) {
			items.push(parse.ListItem(listItem as HTMLLIElement));
		}

		return { type: type, content: await Promise.all(items) };
	}

	/**
	 * Note: this doesn't allow you to apply marks to text inside the pre
	 */
	export function CodeBlock(block: HTMLPreElement): CodeBlock {
		return {
			type: 'code_block',
			content: [{ type: 'text', text: block.innerText }],
		};

		// 	// This would be so much easier if I were willing to just use
		// 	// block.innerText lmao
		// 	const code = block.children[0];
		// 	const children: Promise<TextItem | undefined>[] = [];
		// 	for (const node of code.childNodes) {
		// 		children.push(parseTextNode(node));
		// 	}
		// 	const content = (await Promise.all(children)).filter((child) => child) as TextItem[];

		// 	let marks = [];

		// 	return {
		// 		type: 'code_block',
		// 		content: content,
		// 	};
	}

	export async function OpenGraph(
		container: HTMLDivElement,
		openGraphs: Attachments['openGraphs'],
	): Promise<OpenGraph> {
		const target = (container.lastChild as HTMLAnchorElement).href;
		for (let [i, graph] of openGraphs!.entries()) {
			if (graph.originalUrl === target || graph.url === target) {
				return { type: 'openGraph', attrs: { id: i } };
			}
		}

		throw new Error('Invalid open graph found!');
	}
}

export default async function parseBlock(
	block: HTMLElement,
	attachments: Attachments,
): Promise<Block> {
	if (block.tagName === 'PRE') {
		return parse.CodeBlock(block as HTMLPreElement);
	} else if (block.tagName === 'P') {
		return parse.Paragraph(block as HTMLParagraphElement);
	} else if (block.tagName === 'DIV' && block.classList.contains('image-container')) {
		return parse.Image(block as HTMLDivElement, attachments.contentImages);
	} else if (block.tagName === 'UL' || block.tagName === 'OL') {
		return parse.List(block as any);
	} else if (block.tagName === 'DIV' && block.classList.contains('open-graph')) {
		return parse.OpenGraph(block as HTMLDivElement, attachments.openGraphs);
	} else {
		// console.log(block.innerHTML);
	}

	// @ts-ignore
	return;
}
