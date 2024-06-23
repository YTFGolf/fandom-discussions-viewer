import { Plugin, Transaction, type Command } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { schema } from './schema';
import { toggleMark } from 'prosemirror-commands';
import type { Mark } from 'prosemirror-model';

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
function icon(html: string, name: string) {
	let span = document.createElement('span');
	span.className = 'menuicon ' + name;
	span.title = name;
	span.innerHTML = html;
	return span;
	// TODO figure out how to use fandom icons (https://fandomdesignsystem.com/?path=/docs/assets-icons--docs)
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
	]);
}
