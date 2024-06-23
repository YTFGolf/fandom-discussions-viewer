<script lang="ts">
	import type { Attachments } from '$lib/controllers/types/attachments';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { examples } from '../routes/f/p/[...postParams=forumPost]/examples';
	import parse from './HTMLParser/parser';
	import PostBody from './Post/PostBody.svelte';
	import { keymap } from 'prosemirror-keymap';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { DOMParser } from 'prosemirror-model';
	import { baseKeymap, toggleMark } from 'prosemirror-commands';
	import { history, redo, undo } from 'prosemirror-history';
	import { onMount } from 'svelte';
	import { schema } from './HTMLParser/schema';
	import { getMenu } from './HTMLParser/Menu';

	/**
	 * Plan: This takes in a few props: rawContent, JSONModel, Attachments. All
	 * of these parameters have sensible defaults so that's fine.
	 *
	 * Also takes in a callback function that takes all 3 of these and posts it.
	 *
	 * Alternatively, this is only for the editing part and the caller always
	 * controls the context in which it is used. E.g. caller has attachments and
	 * then generates the body and jsonModel by using these functions, then
	 * sends the appropriate POST.
	 *
	 * Okay new plan for editor: all attachments are generated when converting
	 * to JSON. Pings will have notifyuser: bool, images will just set the href
	 * as an attr; this will be turned into an attachment when converting;
	 * opengraphs same thing. This is fine since I can just directly check the
	 * html with class name selectors. I can replace the images and opengraphs
	 * with the id and leave the ping the same.
	 *
	 * https://prosemirror.net/examples/markdown/
	 * https://prosemirror.net/examples/menu/
	 */

	/***/
	// async function logModel(event: MouseEvent) {
	// 	const target = (event.target as any).parentElement.firstChild.firstChild as HTMLDivElement;
	// 	// const attachments: Attachments = {
	// 	// 	atMentions: [],
	// 	// 	contentImages: [],
	// 	// 	openGraphs: [],
	// 	// };
	// 	const attachments: Attachments = (await examples)._embedded['doc:posts'][0]._embedded
	// 		.attachments[0];

	// 	const [rawContent, post] = await parse(target, attachments);

	// 	// console.log(JSON.stringify(rawContent), JSON.stringify(post), JSON.stringify(attachments));
	// 	console.log(JSON.stringify(rawContent), post, attachments);
	// }

	function cleanAttachments(attachments: Attachments): Attachments {
		const atMentions: Attachments['atMentions'] = [];
		for (const mention of attachments.atMentions || []) {
			atMentions.push({ id: mention.id });
		}

		return {
			atMentions: atMentions,
			contentImages: attachments.contentImages,
			openGraphs: attachments.openGraphs,
		};
	}

	async function postModel(event: MouseEvent) {
		const target = (event.target as any).parentElement.firstChild.firstChild as HTMLDivElement;
		const attachments: Attachments = (await examples)._embedded['doc:posts'][0]._embedded
			.attachments[0];

		const [rawContent, post] = await parse(target, attachments);

		DiscussionPost.create(
			{ lang: 'en', name: 'wwr-test' },
			{},
			{
				siteId: '3448675',
				threadId: '4400000000000037009',
				rawContent: rawContent,
				jsonModel: post,
				attachments: cleanAttachments(attachments),
			},
		);
	}

	let editorView: EditorView;
	onMount(() => {
		editorView = new EditorView(document.querySelector('#editor'), {
			state: EditorState.create({
				doc: DOMParser.fromSchema(schema).parse(document.createElement('div')),
				plugins: [
					keymap(baseKeymap),
					history(),
					keymap({
						'Mod-z': undo,
						'Mod-y': redo,
						'Mod-b': toggleMark(schema.marks.strong),
						'Mod-i': toggleMark(schema.marks.em),
					}),
					getMenu(),
				],
			}),
		});
	});

	let model = '';

	const logDocumentModel = () => {
		const dom = editorView.dom;
		const doc = editorView.state.doc;
		console.log(dom.children);
		console.log(doc.toJSON());

		model = JSON.stringify(doc.toJSON(), undefined, '    ');
	};
</script>

<div class="editor-container">
	<div id="editor" data-placeholder="Share your thoughts…"></div>
	<div class="actions"><button on:click={logDocumentModel}>Submit</button></div>
</div>
<pre>{model}</pre>

<style>
	:root {
		--icon-gap: 8px;
	}

	.editor-container {
		border: 1px solid #ccc;
		padding: 10px 20px;
		min-height: 200px;
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
	}

	#editor :global(.ProseMirror) {
		white-space: pre-wrap;
		min-height: 135px;
		max-height: 400px;
		overflow: scroll;
		margin-bottom: 12px;
	}

	#editor :global(.ProseMirror:focus) {
		outline: none;
	}

	#editor :global(.menubar) {
		border: 1px solid var(--webeditor-border-color);
		border-radius: 3px;
		display: inline-block;
		margin: 0 12px;
		margin-bottom: 12px;
		max-width: min-content;
		white-space: nowrap;
		/* make sure padding is consistent between these 2 */
		padding: 4px;
		padding-right: calc(4px + var(--icon-gap));
	}

	#editor :global(.menubar .menuicon) {
		display: inline-block;
		color: #888;
		padding: 0.5em;
		margin: 1px;
		text-align: center;
		min-width: 1.4em;
		border-radius: 3px;
		cursor: pointer;
		margin-left: var(--icon-gap);
		transition: background-color 0.3s;
	}

	#editor :global(.menubar .menuicon:not(.active):hover) {
		background: rgba(var(--webeditor-link-color--rgb), 0.15);
	}

	#editor :global(.menubar .menuicon.active) {
		background: rgba(var(--webeditor-link-color--rgb), 0.15);
		color: var(--webeditor-link-color);
	}

	.actions {
		border-top: 1px solid var(--theme-border-color);
		display: flex;
		/* margin: 18px 18px 0; */
		/* padding: 18px 0; */
		padding-top: 18px;
	}
</style>
