import type { Block, Paragraph, TextItem } from '$lib/controllers/types/jsonModel';
import parseTextNode from './textItem';

namespace parse {
	export async function Paragraph(paragraph: HTMLParagraphElement): Promise<Paragraph> {
		const children = [];
		for (const node of paragraph.childNodes) {
			children.push(parseTextNode(node));
		}
		const content = (await Promise.all(children)).filter((child) => child) as TextItem[];
		if (content.length === 0) {
			return { type: 'paragraph' };
		}

		console.log(JSON.stringify(content));
		// if (content.length === 1 && content)
		return { type: 'paragraph', content: content };
	}
}

export default async function parseBlock(block: HTMLElement): Promise<Block> {
	if (block.tagName === 'PRE') {
		return {
			type: 'code_block',
			content: [{ type: 'text', text: block.innerText }],
		};
	} else if (block.tagName === 'P') {
		return parse.Paragraph(block as HTMLParagraphElement);
	} else {
		// console.log(block.innerHTML);
	}

	// @ts-ignore
	return;
}
