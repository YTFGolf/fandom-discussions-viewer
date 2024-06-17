import type { Mark, TextItem } from '$lib/controllers/types/jsonModel';

function getElement(mark: Mark): HTMLElement | undefined {
	switch (mark.type) {
		case 'strong':
			return document.createElement('strong');

		case 'em':
			return document.createElement('em');

		case 'link':
			const link = document.createElement('a');
			link.href = mark.attrs.href;
			link.target = '_blank';
			return link;

		case 'mention':
			let mention = document.createElement('a');
			mention.href = '/f/u/' + mark.attrs.userId;
			mention.target = '_blank';
			mention.className = 'mention';
			return mention;

		default:
			return;
	}
}

function getElements(marks?: Mark[]): HTMLElement[] {
	if (!marks) {
		return [];
	}

	const elements = [];
	for (const mark of marks) {
		const element = getElement(mark);
		if (element) {
			elements.push(element);
		}
	}

	return elements;
}

export default async function getHtml(text: TextItem) {
	const dummy = document.createElement('body');
	let outer: HTMLElement = dummy;

	const elements = getElements(text.marks);
	for (const element of elements.reverse()) {
		outer.append(element);
		outer = element;
	}
	outer.textContent = text.text;

	return dummy.innerHTML;
}
