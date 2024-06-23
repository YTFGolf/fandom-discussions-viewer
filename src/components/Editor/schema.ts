import { Schema, type NodeSpec, type MarkSpec, type DOMOutputSpec } from 'prosemirror-model';

const pDOM: DOMOutputSpec = ['p', 0];

export const nodes = {
	doc: {
		content: 'block+',
	} as NodeSpec,

	paragraph: {
		content: 'inline*',
		group: 'block',
		parseDOM: [{ tag: 'p' }],
		toDOM() {
			return pDOM;
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
