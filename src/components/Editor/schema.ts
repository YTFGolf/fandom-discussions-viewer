import { Schema, type NodeSpec, type MarkSpec, type DOMOutputSpec } from 'prosemirror-model';

export const nodes = {
	doc: {
		content: 'block+',
	} as NodeSpec,

	paragraph: {
		content: 'inline*',
		group: 'block',
		parseDOM: [{ tag: 'p' }],
		toDOM() {
			return ['p', 0];
		},
	} as NodeSpec,

	image: {
		attrs: {
			src: {},
		},
		group: 'block',
		draggable: true,
		parseDOM: [
			{
				tag: 'div.image-container img',
				getAttrs(dom: HTMLElement) {
					return {
						src: dom.getAttribute('src')?.replace('/scale-to-width/755', ''),
					};
				},
			},
		],
		toDOM(node) {
			let { src } = node.attrs;
			return ['div', { class: 'image-container' }, ['img', { src, width: 708 }]];
		},
	} as NodeSpec,

	bulletList: {
		content: 'listItem+',
		// 	attrs?: { createdWith?: string | null };
		group: 'block',
		parseDOM: [
			{
				tag: 'ul',
			},
		],
		toDOM() {
			return ['ul', 0];
		},
	} as NodeSpec,

	orderedList: {
		content: 'listItem+',
		// 	attrs?: { createdWith?: string | null };
		group: 'block',
		parseDOM: [
			{
				tag: 'ol',
			},
		],
		toDOM() {
			return ['ol', 0];
		},
	} as NodeSpec,

	listItem: {
		content: 'paragraph+',
		defining: true,
		parseDOM: [{ tag: 'li' }],
		toDOM() {
			return ['li', 0];
		},
	} as NodeSpec,

	code_block: {
		content: 'text*',
		group: 'block',
		code: true,
		defining: true,
		parseDOM: [
			{
				tag: 'pre code',
				preserveWhitespace: 'full',
			},
		],
		toDOM() {
			return ['pre', ['code', 0]];
		},
	} as NodeSpec,

	openGraph: {
		attrs: {
			originalUrl: {},
		},
		group: 'block',
		draggable: true,
		parseDOM: [
			{
				tag: 'div.open-graph',
				getAttrs(dom: HTMLElement) {
					return {
						originalUrl: (dom.lastChild as HTMLAnchorElement).href,
					};
				},
			},
		],
		toDOM(node) {
			const url = node.attrs.originalUrl;
			return [
				'div',
				{ class: 'open-graph' },
				['a', { href: url, onclick: 'return false;' }, '|opengraph (display does not exist)|'],
			];
			// TODO actually display this
		},
	} as NodeSpec,

	text: {
		group: 'inline',
	} as NodeSpec,
};

const emDOM: DOMOutputSpec = ['em', 0],
	strongDOM: DOMOutputSpec = ['strong', 0];

export const marks = {
	mention: {
		attrs: {
			userId: {},
			notifyUser: { default: true },
		},
		inclusive: false,
		parseDOM: [
			{
				tag: 'a.mention',
				getAttrs(dom: HTMLElement) {
					const userId = (dom as HTMLAnchorElement).href.match(/\/f\/u\/(\d+)$/)![1];
					const notifyUser = dom.dataset.notifyUser !== undefined;
					return { userId, notifyUser };
				},
			},
		],
		toDOM(node) {
			return [
				'a',
				{
					href: '/f/u/' + node.attrs.userId,
					class: 'mention',
					'data-notify-user': node.attrs.notifyUser ? '' : undefined,

					onclick: 'return false;',
					// otherwise the link works for whatever reason
				},
				0,
			];
		},
	} as MarkSpec,

	link: {
		attrs: {
			href: {},
			title: { default: null },
		},
		inclusive: false,
		parseDOM: [
			{
				tag: 'a[href]',
				getAttrs(dom: HTMLElement) {
					return { href: dom.getAttribute('href'), title: dom.getAttribute('title') };
				},
			},
		],
		toDOM(node) {
			let { href, title } = node.attrs;
			return ['a', { href, title }, 0];
		},
	} as MarkSpec,

	em: {
		parseDOM: [{ tag: 'em' }],
		toDOM() {
			return emDOM;
		},
	} as MarkSpec,

	strong: {
		parseDOM: [{ tag: 'strong' }],
		toDOM() {
			return strongDOM;
		},
	} as MarkSpec,
};

export const schema = new Schema({ nodes, marks });
