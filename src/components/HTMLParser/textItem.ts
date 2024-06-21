import type { Mark, TextItem } from '$lib/controllers/types/jsonModel';

function getMark(node: Node): Mark {
	if (node.nodeName === 'EM') {
		return { type: 'em' };
	} else if (node.nodeName === 'STRONG') {
		return { type: 'strong' };
	}
	if (node.nodeName !== 'A') {
		throw new Error(`Cannot parse an element of type <${node.nodeName.toLowerCase()}>`);
	}
	var newNode = node as HTMLAnchorElement;
	// typecast

	if (newNode.classList.contains('mention')) {
		const reUserId = /\/f\/u\/(\d+)$/;
		const userId = newNode.href.match(reUserId)![1];
		return { type: 'mention', attrs: { userId: userId } };
	}

	return { type: 'link', attrs: { href: newNode.href } };
}

function parseMarkedNode(markNode: Node): TextItem {
	const marks = [];
	while (markNode.nodeName !== '#text') {
		marks.push(getMark(markNode));

		markNode = markNode.childNodes.values().next().value;
		// object model means that only 1 child needs to be considered
		// Fandom's behaviour just strips the tag if you try to add it in with
		// inspect element but we don't care do we
	}
	return { type: 'text', marks: marks.reverse(), text: markNode.textContent! };
}

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
	return parseMarkedNode(textNode);
}
