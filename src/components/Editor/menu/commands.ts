import { type Command } from 'prosemirror-state';
import { schema } from '../schema';
import { toggleMark } from 'prosemirror-commands';
import { type Attrs, type NodeType } from 'prosemirror-model';
import { liftListItem, wrapInList } from 'prosemirror-schema-list';
import type { ComponentConstructorOptions, SvelteComponent } from 'svelte';
// @ts-ignore
import InsertLinkModal from './InsertLinkModal.svelte';
// @ts-ignore
import InsertImageModal from './InsertImageModal.svelte';

// https://github.com/ProseMirror/prosemirror-commands/blob/904e3b39374cc147c36d79fccfe83a3f9fd4ee68/src/commands.ts#L536
// IDK MIT license or something
/**
 * Toggle between `nodeType` and paragraph. Only really useful on code blocks or
 * for checking if a transaction is applicable.
 */
export function toggleBlock(nodeType: NodeType, attrs: Attrs | null = null): Command {
	return function (state, dispatch) {
		let applicable = false;
		let isType = false;
		for (let i = 0; i < state.selection.ranges.length && !applicable; i++) {
			let {
				$from: { pos: from },
				$to: { pos: to },
			} = state.selection.ranges[i];
			state.doc.nodesBetween(from, to, (node, pos) => {
				if (applicable) {
					return false;
				}
				if (node.type == nodeType) {
					isType = true;
				}
				if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) {
					return;
				}
				let $pos = state.doc.resolve(pos),
					index = $pos.index();
				applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
			});
		}
		if (dispatch) {
			let tr = state.tr;
			for (let i = 0; i < state.selection.ranges.length; i++) {
				let {
					$from: { pos: from },
					$to: { pos: to },
				} = state.selection.ranges[i];
				if (applicable) {
					tr.setBlockType(from, to, nodeType, attrs);
				} else {
					tr.setBlockType(from, to, schema.nodes.paragraph, attrs);
				}
			}
			dispatch(tr.scrollIntoView());
		}
		return !isType;
	};
}

export function toggleList(listType: NodeType): Command {
	return function (state, dispatch) {
		liftListItem(schema.nodes.listItem)(state, dispatch);
		wrapInList(listType)(state, dispatch);
		return false;
	};
}

function insertLink(href: string, text: string): Command {
	return function (state, dispatch, view) {
		const {
			$from: { pos: from },
			$to: { pos: to },
		} = state.selection.ranges[0];
		if (from !== to) {
			return toggleMark(schema.marks.link, { href })(state, dispatch, view);
		}
		if (!text) {
			return false;
		}
		const currentMarks = state.selection.ranges[0].$from.marks();
		const linkMark = schema.marks.link.create({ href });
		let tr = state.tr.setStoredMarks([...currentMarks, linkMark]).insertText(text);
		if (dispatch) {
			dispatch(tr);
		}
		return true;
	};
}

export const createLink: Command = function (state, dispatch, view) {
	if (!dispatch || !view) {
		return false;
	}

	const options: ComponentConstructorOptions<{
		onSubmit: (href: string, text: string) => boolean;
	}> = {
		target: document.body,
		props: {
			onSubmit: (href: string, text: string) => {
				return insertLink(href, text)(state, dispatch, view);
			},
		},
	};
	const modal: SvelteComponent = new InsertLinkModal(options);
	modal.$on('destroy', () => {
		modal.$destroy();
		view.focus();
	});

	return true;
};

function insertImage(src: string): Command {
	return function (state, dispatch, view) {
		if (!dispatch) {
			return false;
		}
		let tr = state.tr;
		tr = tr.replaceSelectionWith(schema.nodes.image.create({ src }));
		tr = tr.insert(tr.selection.ranges[0].$to.pos, schema.nodes.paragraph.create());
		tr = tr.scrollIntoView();
		dispatch(tr);
		return true;
	};
}

export const createImage: Command = function (state, dispatch, view) {
	if (!dispatch || !view) {
		return false;
	}

	const options: ComponentConstructorOptions<{
		onSubmit: (src: string) => boolean;
	}> = {
		target: document.body,
		props: {
			onSubmit: (src) => {
				return insertImage(src)(state, dispatch, view);
			},
		},
	};
	const modal: SvelteComponent = new InsertImageModal(options);
	modal.$on('destroy', () => {
		modal.$destroy();
		view.focus();
	});

	return true;
};

export function Alert() {
	alert('Not implemented!');
	return false;
}
