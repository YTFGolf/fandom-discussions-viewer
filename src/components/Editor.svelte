<script lang="ts">
	import type { Attachments } from '$lib/controllers/types/attachments';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { examples } from '../routes/f/p/[...postParams=forumPost]/examples';
	import parse from './Editor/parser';
	import { keymap } from 'prosemirror-keymap';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { DOMParser } from 'prosemirror-model';
	import { baseKeymap, toggleMark } from 'prosemirror-commands';
	import { history, redo, undo } from 'prosemirror-history';
	import { onMount } from 'svelte';
	import { schema } from './Editor/schema';
	import { getMenu } from './Editor/Menu';
	import type { UserDetails } from '$lib/responses/Post';
	import Avatar from './Post/Avatar.svelte';

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
	let content: HTMLElement;
	let editor: HTMLElement;
	let isLoaded = false;
	onMount(() => {
		editorView = new EditorView(editor, {
			state: EditorState.create({
				doc: DOMParser.fromSchema(schema).parse(content),
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

		content.remove();
		isLoaded = true;
	});

	let model = '';

	const logDocumentModel = () => {
		const dom = editorView.dom;
		const doc = editorView.state.doc;
		console.log(dom.children);
		console.log(doc.toJSON());
		console.log(doc);

		model = JSON.stringify(doc.toJSON(), undefined, '    ');
	};

	const userDetails: UserDetails = {
		id: '27706221',
		avatarUrl: 'https://vignette.wikia.nocookie.net/messaging/images/e/e8/Avatar2.jpg',
		name: 'TheWWRNerdGuy',
		badgePermission: 'badge:sysop',
	};
	// TODO actually dynamically load this
</script>

<div id="post-content" bind:this={content} style="display:none"><slot /></div>
<div class="editor-container" style={isLoaded ? '' : 'display: none'}>
	<div class="form-content">
		<Avatar user={userDetails} />
		<div id="editor" data-placeholder="Share your thoughts…" bind:this={editor}></div>
	</div>
	<div class="form-actions"><button on:click={logDocumentModel}>Submit</button></div>
</div>
<div class="fallback" style={isLoaded ? 'display: none' : ''}>Loading editor...</div>
<pre>{model}</pre>

<style>
	:root {
		--icon-gap: 8px;
	}

	.editor-container {
		border: 1px solid #ccc;
		padding: 10px 0;
		min-height: 200px;
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
	}

	.editor-container :global(a) {
		color: var(--theme-link-color);
	}

	.editor-container :global(a:hover) {
		color: var(--theme-link-color--hover);
	}

	#editor {
		flex: 1;
		max-height: unset;
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

	.form-content {
		display: flex;
		flex: 1;
		max-height: calc(100vh - 200px);
		overflow: auto;
		padding: 24px 18px 0;
		position: relative;
	}

	.form-actions {
		border-top: 1px solid var(--theme-border-color);
		display: flex;
		margin: 0 18px;
		padding-top: 12px;
	}
</style>
