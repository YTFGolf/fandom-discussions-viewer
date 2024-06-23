import { EditorState, Plugin, Transaction, type Command } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { schema } from './schema';
import { toggleMark } from 'prosemirror-commands';
import type { Mark } from 'prosemirror-model';
import Modal from './LinkModal.svelte';

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

// function displayLinkModal(): Command {
// 	return function (
// 		state: EditorState,
// 		dispatch?: (tr: Transaction) => void,
// 		view?: EditorView,
// 	): boolean {
// 		console.log(state, dispatch, view);

// 		const modal = new Modal({
// 			target: document.body,
// 			props: {
// 				handleSubmit(e: SubmitEvent) {
// 					console.log(e);
// 				},
// 			},
// 		}).element!;
// 		console.log(modal);

// 		return true;
// 	};
// }

function Alert() {
	alert('Not implemented!');
	return false;
}

function never() {
	return false;
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
			command: Alert,
			dom: icon('<b>LINK</b>', 'Insert link'),
			isActive: never,
		},
		{
			command: Alert,
			dom: icon('<b>IMAGE</b>', 'Insert image'),
			isActive: never,
		},
		{
			command: Alert,
			dom: icon('<b>MENTION</b>', 'Mention user'),
			isActive: never,
		},
		// TODO fix these
	]);
}
