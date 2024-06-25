import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { history, redo, undo } from 'prosemirror-history';
import { getMenu } from './Menu';
import { DOMParser } from 'prosemirror-model';
import { baseKeymap, chainCommands, toggleMark } from 'prosemirror-commands';
import { schema } from './schema';
import type { DocModel } from '$lib/controllers/types/jsonModel';
import type { Attachments } from '$lib/controllers/types/attachments';
import { splitListItem } from './commands';

export interface View {
	content: any;
	focus(): any;
	destroy(): any;
}

export class ProseMirrorView implements View {
	view: EditorView;

	constructor(target: HTMLElement, content: HTMLElement) {
		this.view = new EditorView(target, {
			state: EditorState.create({
				doc: DOMParser.fromSchema(schema).parse(content),
				plugins: [
					history(),
					keymap({
						'Mod-z': undo,
						'Mod-y': redo,
						'Mod-b': toggleMark(schema.marks.strong),
						'Mod-i': toggleMark(schema.marks.em),
						Enter: chainCommands(
							splitListItem(schema.nodes.bulletList),
							splitListItem(schema.nodes.orderedList),
						),
					}),
					getMenu(),
					keymap(baseKeymap),
				],
			}),
		});
	}

	getRawContent(container: HTMLElement) {
		// could just do `return container.innerText;` but that also includes stuff
		// from opengraphs
		const rawContent = [];
		for (const child of container.children as any as HTMLElement[]) {
			if (!child.classList.contains('open-graph')) {
				rawContent.push(child.innerText);
			}
		}

		return rawContent.join('\n');
	}

	// NOTE: this entire function will break if the schema changes
	getAttachments(): Attachments {
		const dom = this.view.dom;
		const doc = this.view.state.doc;
		const attachments: Attachments = {};

		attachments.atMentions = [];
		for (const mention of dom.querySelectorAll('a.mention[data-notify-user]')) {
			const id = (mention as HTMLAnchorElement).href.match(/\/f\/u\/(\d+)$/)![1];
			attachments.atMentions.push({ id });
		}

		attachments.contentImages = [];
		for (const image of dom.querySelectorAll('div.image-container img')) {
			const url = (image as HTMLImageElement).src;
			attachments.contentImages.push({ url });
		}

		attachments.openGraphs = [];
		for (const graph of dom.querySelectorAll('div.open-graph')) {
			const url = (graph.firstChild as HTMLAnchorElement).href;
			// The most fragile of these selectors
			attachments.openGraphs.push({
				originalUrl: url,
				siteName: 'localhost',
				imageUrl: '/favicon.png?',
				// to remove openGraph error
				url,
			});
		}

		return attachments;
	}

	findAttachmentIndex(
		target: string,
		type: 'image' | 'openGraph',
		attachments: Attachments,
	): number {
		if (type === 'image') {
			for (const i in attachments.contentImages!) {
				if (attachments.contentImages[i].url === target) {
					return i as any as number;
					// wtf TypeScript
				}
			}
		} else if (type === 'openGraph') {
			for (const i in attachments.openGraphs!) {
				if (attachments.openGraphs[i].originalUrl === target) {
					return i as any as number;
				}
			}
		}

		throw new Error("Shouldn't be possible");
	}

	/**
	 * Way this is parsed means that `jsonModel` won't be a proper JSON model; this step exists to turn it into one.
	 */
	fixDocModel(jsonModel: any, attachments: Attachments): DocModel {
		for (const block of jsonModel.content) {
			if (block.type === 'image') {
				const id = this.findAttachmentIndex(block.attrs.src, block.type, attachments);
				block.attrs.id = id;
				block.attrs.src = undefined;
			} else if (block.type === 'openGraph') {
				const id = this.findAttachmentIndex(block.attrs.originalUrl, block.type, attachments);
				block.attrs.id = id;
				block.attrs.originalUrl = undefined;
			}
		}

		return jsonModel;
	}

	get content(): { jsonModel: DocModel; attachments: Attachments; rawContent: string } {
		const dom = this.view.dom;
		const doc = this.view.state.doc;

		let jsonModel = doc.toJSON();
		const attachments = this.getAttachments();
		const rawContent = this.getRawContent(dom);

		jsonModel = this.fixDocModel(jsonModel, attachments);

		return {
			jsonModel,
			attachments,
			rawContent,
		};
	}
	focus() {
		this.view.focus();
	}
	destroy() {
		this.view.destroy();
	}
}

export class JSONView implements View {
	textarea: HTMLTextAreaElement;

	constructor(target: HTMLElement, content: string) {
		this.textarea = target.appendChild(document.createElement('textarea'));
		this.textarea.value = content;
		this.textarea.classList.add('json-editor');
	}

	get content() {
		return JSON.parse(this.textarea.value);
	}

	focus() {
		this.textarea.focus();
	}
	destroy() {
		this.textarea.remove();
	}
}
