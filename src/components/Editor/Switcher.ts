import { canSplit } from 'prosemirror-transform';
import { EditorView } from 'prosemirror-view';
import { EditorState, NodeSelection, Transaction, type Command } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { history, redo, undo } from 'prosemirror-history';
import { getMenu } from './Menu';
import { DOMParser, Fragment, Slice, type Attrs, type NodeType } from 'prosemirror-model';
import { baseKeymap, chainCommands, toggleMark } from 'prosemirror-commands';
import { schema } from './schema';
import type { DocModel } from '$lib/controllers/types/jsonModel';
import type { Attachments } from '$lib/controllers/types/attachments';

// https://github.com/ProseMirror/prosemirror-schema-list/blob/79b62755a061869e0dfa1e877b5033f341dc0592/src/schema-list.ts#L114
function splitListItem(itemType: NodeType, itemAttrs?: Attrs): Command {
	return function (state: EditorState, dispatch?: (tr: Transaction) => void) {
		let { $from, $to, node } = state.selection as NodeSelection;
		if ((node && node.isBlock) || $from.depth < 3 || !$from.sameParent($to)) return false;
		let grandParent = $from.node(-2);
		if (grandParent.type != itemType) return false;
		if ($from.parent.content.size == 0 && $from.node(-1).childCount == $from.indexAfter(-1)) {
			// In an empty block. If this is a nested list, the wrapping
			// list item should be split. Otherwise, bail out and let next
			// command handle lifting.
			if (
				$from.depth == 3 ||
				$from.node(-3).type != itemType ||
				$from.index(-2) != $from.node(-2).childCount - 1
			)
				return false;
			if (dispatch) {
				let wrap = Fragment.empty;
				let depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
				// Build a fragment containing empty versions of the structure
				// from the outer list item to the parent node of the cursor
				for (let d = $from.depth - depthBefore; d >= $from.depth - 3; d--)
					wrap = Fragment.from($from.node(d).copy(wrap));
				let depthAfter =
					$from.indexAfter(-1) < $from.node(-2).childCount
						? 1
						: $from.indexAfter(-2) < $from.node(-3).childCount
							? 2
							: 3;
				// Add a second list item with an empty default start node
				wrap = wrap.append(Fragment.from(itemType.createAndFill()));
				let start = $from.before($from.depth - (depthBefore - 1));
				let tr = state.tr.replace(
					start,
					$from.after(-depthAfter),
					new Slice(wrap, 4 - depthBefore, 0),
				);
				let sel = -1;
				tr.doc.nodesBetween(start, tr.doc.content.size, (node, pos) => {
					if (sel > -1) return false;
					if (node.isTextblock && node.content.size == 0) sel = pos + 1;
				});
				throw new Error("You shouldn't be here");
				// if (sel > -1) tr.setSelection(Selection.near(tr.doc.resolve(sel)));
				// dispatch(tr.scrollIntoView());
			}
			return true;
		}
		let nextType = null;
		let tr = state.tr.delete($from.pos, $to.pos);
		let types = nextType
			? [itemAttrs ? { type: itemType, attrs: itemAttrs } : null, { type: nextType }]
			: undefined;
		if (!canSplit(tr.doc, $from.pos, 2, types)) return false;
		if (dispatch) dispatch(tr.split($from.pos, 2, types).scrollIntoView());
		return true;
	};
}

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

	// legendary command `git grep -P "const rawContent" $(git rev-list --all)`
	getRawContent(container: HTMLElement) {
		// could just do `return container.innerText;` but that also includes stuff
		// from opengraphs
		const rawContent = [];
		for (const child of container.children as any as HTMLElement[]) {
			if (
				!(child.classList.contains('open-graph') || child.innerText === String.fromCharCode(160))
			) {
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
