// https://github.com/ProseMirror/prosemirror-schema-basic/blob/master/src/schema-basic.ts
import { Schema, type NodeSpec, type MarkSpec, type DOMOutputSpec } from 'prosemirror-model';

const pDOM: DOMOutputSpec = ['p', 0];

/// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes = {
	/// NodeSpec The top level document node.
	doc: {
		content: 'block+',
	} as NodeSpec,

	/// A plain paragraph textblock. Represented in the DOM
	/// as a `<p>` element.
	paragraph: {
		content: 'inline*',
		group: 'block',
		parseDOM: [{ tag: 'p' }],
		toDOM() {
			return pDOM;
		},
	} as NodeSpec,

	/// The text node.
	text: {
		group: 'inline',
	} as NodeSpec,
};

const emDOM: DOMOutputSpec = ['em', 0],
	strongDOM: DOMOutputSpec = ['strong', 0];

/// [Specs](#model.MarkSpec) for the marks in the schema.
export const marks = {
	/// A link. Has `href` and `title` attributes. `title`
	/// defaults to the empty string. Rendered and parsed as an `<a>`
	/// element.
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

	/// An emphasis mark. Rendered as an `<em>` element. Has parse rules
	/// that also match `<i>` and `font-style: italic`.
	em: {
		parseDOM: [{ tag: 'em' }],
		toDOM() {
			return emDOM;
		},
	} as MarkSpec,

	/// A strong mark. Rendered as `<strong>`, parse rules also match
	/// `<b>` and `font-weight: bold`.
	strong: {
		parseDOM: [{ tag: 'strong' }],
		toDOM() {
			return strongDOM;
		},
	} as MarkSpec,
};

/// This schema roughly corresponds to the document schema used by
/// [CommonMark](http://commonmark.org/), minus the list elements,
/// which are defined in the [`prosemirror-schema-list`](#schema-list)
/// module.
///
/// To reuse elements from this schema, extend or read from its
/// `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).
export const schema = new Schema({ nodes, marks });
