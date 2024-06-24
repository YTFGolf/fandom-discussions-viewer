import { EditorState, Plugin, Transaction, type Command } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { schema } from './schema';
import { setBlockType, toggleMark } from 'prosemirror-commands';
import type { Attrs, Mark, NodeType } from 'prosemirror-model';
import { liftListItem, wrapInList } from 'prosemirror-schema-list';

type ViewItem = {
	command: Command;
	dom: HTMLElement;
	isActive: (menu: MenuView) => boolean;
};

// MenuView{
class MenuView {
	items: ViewItem[];
	editorView: EditorView;
	dom: HTMLElement;

	constructor(items: ViewItem[], editorView: EditorView) {
		this.items = items;
		this.editorView = editorView;

		this.dom = document.createElement('div');
		this.dom.className = 'menubar';

		items.forEach(({ dom }) => this.dom.appendChild(dom));
		this.update();

		this.dom.addEventListener('mousedown', (e) => {
			e.preventDefault();
			editorView.focus();

			items.forEach(({ command, dom, isActive }) => {
				if (dom.contains(e.target as Node)) {
					command(editorView.state, editorView.dispatch, editorView);
					dom.classList.toggle('active', isActive(this));
				}
			});
		});
	}

	update() {
		// console.log(this.items);
		this.items.forEach(({ dom, isActive }) => {
			dom.classList.toggle('active', isActive(this));
		});
	}

	destroy() {
		this.dom.remove();
	}
}

function markInStoredMarks(name: string, marks: readonly Mark[]) {
	return marks?.some((m) => m.type.name === name) || false;
}

function isMarkActive(markName: string) {
	return function (menu: MenuView): boolean {
		const storedMarks = menu.editorView.state.storedMarks;
		if (storedMarks) {
			return markInStoredMarks(markName, storedMarks);
		}
		return markInStoredMarks(markName, menu.editorView.state.selection.$to.marks());
	};
}

// function toggleList(bulletList: NodeType): Command {
// 	return function (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) {
// 		console.log(bulletList);
// 		console.log(state, view);

// 		return true;
// 	};
// }

function menuPlugin(items: ViewItem[]) {
	return new Plugin({
		view(editorView) {
			let menuView = new MenuView(items, editorView);
			editorView.dom.parentNode?.insertBefore(menuView.dom, editorView.dom);
			return menuView;
		},
	});
}

// Helper function to create menu icons
function icon(html: string, title: string, className?: string) {
	let span = document.createElement('span');
	span.className = 'menuicon';
	if (className) {
		span.classList.add(className);
	}
	span.title = title;
	span.innerHTML = html;
	return span;
	// TODO figure out how to use fandom icons (https://fandomdesignsystem.com/?path=/docs/assets-icons--docs)
}

// https://github.com/ProseMirror/prosemirror-commands/blob/904e3b39374cc147c36d79fccfe83a3f9fd4ee68/src/commands.ts#L536
// IDK MIT license or something
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

function toggleList(listType: NodeType): Command {
	return function (state, dispatch) {
		liftListItem(schema.nodes.listItem)(state, dispatch);
		wrapInList(listType)(state, dispatch);
		return false;
	};
}

function Alert() {
	alert('Not implemented!');
	return false;
}

function never() {
	return false;
}

function isBlockActive(nodeType: NodeType) {
	return (menu: MenuView) => {
		return !toggleBlock(nodeType)(menu.editorView.state, undefined, menu.editorView);
	};
}

export function getMenu() {
	return menuPlugin([
		{
			command: toggleMark(schema.marks.strong),
			dom: icon('<b>B</b>', 'Bold (Ctrl+B)'),
			// TODO figure out how to change tooltip for Mac
			isActive: isMarkActive('strong'),
		},
		{
			command: toggleMark(schema.marks.em),
			dom: icon('<b><i>I</i></b>', 'Italic (Ctrl+I)'),
			isActive: isMarkActive('em'),
		},
		{
			command: toggleList(schema.nodes.bulletList),
			dom: icon('<b>•</b>', 'Add bullet list'),
			isActive: isBlockActive(schema.nodes.bulletList),
		},
		{
			command: toggleList(schema.nodes.orderedList),
			dom: icon('<b>1.</b>', 'Add ordered list'),
			isActive: isBlockActive(schema.nodes.orderedList),
		},
		{
			command: toggleBlock(schema.nodes.code_block),
			dom: icon('<b>&lt;&gt;</b>', 'Preformatted'),
			isActive: isBlockActive(schema.nodes.code_block),
		},
		{
			command: Alert,
			dom: icon('<b>LINK</b>', 'Insert link', 'disabled'),
			isActive: never,
		},
		{
			command: Alert,
			dom: icon('<b>IMAGE</b>', 'Insert image', 'disabled'),
			isActive: never,
		},
		{
			command: Alert,
			dom: icon('<b>MENTION</b>', 'Mention user', 'disabled'),
			isActive: never,
		},
		// TODO fix these
	]);
}
