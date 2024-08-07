import { Plugin, type Command } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { schema } from './schema';
import { toggleMark } from 'prosemirror-commands';
import { type Mark, type NodeType } from 'prosemirror-model';
import { createImage, createLink, createMention, toggleBlock, toggleList } from './menu/commands';

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

function isBlockActive(nodeType: NodeType) {
	return (menu: MenuView) => {
		return !toggleBlock(nodeType)(menu.editorView.state, undefined, menu.editorView);
	};
}

function never() {
	return false;
}

// Helper function to create menu icons
function icon(html: string, title: string, className?: string) {
	let button = document.createElement('button');
	button.className = 'menuicon';
	if (className) {
		button.classList.add(className);
	}
	button.title = title;
	button.innerHTML = html;
	return button;
	// TODO use fandom icons
}

function menuPlugin(items: ViewItem[]) {
	return new Plugin({
		view(editorView) {
			let menuView = new MenuView(items, editorView);
			editorView.dom.parentNode?.insertBefore(menuView.dom, editorView.dom);
			return menuView;
		},
	});
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
			command: createLink,
			dom: icon('<b>LINK</b>', 'Insert link'),
			isActive: never,
		},
		{
			command: createImage,
			dom: icon('<b>IMAGE</b>', 'Insert image'),
			isActive: never,
		},
		{
			command: createMention,
			dom: icon('<b>MENTION</b>', 'Mention user'),
			isActive: never,
		},
	]);
}
