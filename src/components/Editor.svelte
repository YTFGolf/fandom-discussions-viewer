<script lang="ts">
	import type { Attachments } from '$lib/controllers/types/attachments';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { examples } from '../routes/f/p/[...postParams=forumPost]/examples';
	import { onMount } from 'svelte';
	import type { UserDetails } from '$lib/responses/Post';
	import Avatar from './Post/Avatar.svelte';
	import { JSONView, ProseMirrorView, type View } from './Editor/Switcher';
	import { getHtmlWithFallback } from './Post/JSONModel/Body';
	import type { DocModel } from '$lib/controllers/types/jsonModel';

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
	 * https://prosemirror.net/examples/upload/
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

	// async function postModel(event: MouseEvent) {
	// 	const target = (event.target as any).parentElement.firstChild.firstChild as HTMLDivElement;
	// 	const attachments: Attachments = (await examples)._embedded['doc:posts'][0]._embedded
	// 		.attachments[0];

	// 	const [rawContent, post] = await parse(target, attachments);

	// 	DiscussionPost.create(
	// 		{ lang: 'en', name: 'wwr-test' },
	// 		{},
	// 		{
	// 			siteId: '3448675',
	// 			threadId: '4400000000000037009',
	// 			rawContent: rawContent,
	// 			jsonModel: post,
	// 			attachments: cleanAttachments(attachments),
	// 		},
	// 	);
	// }

	// async function getRawContent(container: HTMLDivElement) {
	// 	// could just do `return container.innerText;` but that also includes stuff
	// 	// from opengraphs
	// 	const rawContent = [];
	// 	for (const child of container.children as any as HTMLElement[]) {
	// 		if (
	// 			!(child.classList.contains('open-graph') || child.innerText === String.fromCharCode(160))
	// 		) {
	// 			rawContent.push(child.innerText);
	// 		}
	// 	}
	// 	return rawContent.join('\n');
	// }

	let editorView: View;
	let editor: HTMLElement;
	let content: HTMLElement;
	let isLoaded = false;
	let switcher: HTMLElement;

	type SwitchMode = 'RTE' | 'JSON';
	function activateSwitcher(mode: SwitchMode) {
		Object.values(switcher.children).forEach((child) => {
			if ((child as HTMLElement).dataset.switchTo === mode) {
				child.classList.add('current');
			} else {
				child.classList.remove('current');
			}
		});
	}

	onMount(() => {
		editorView = new ProseMirrorView(editor, content);

		content.remove();
		isLoaded = true;
		activateSwitcher('RTE');
	});

	const logDocumentModel = () => {
		// model = JSON.stringify(editorView.content, undefined, '    ');
		// editorView.destroy();
	};

	// TODO turn this into overload
	// content is an object
	/**
	 * Converts document model object into format suitable for constructor of
	 * the view used.
	 * @param content
	 * @param mode
	 */
	async function convertDoc(content: any, mode: SwitchMode): Promise<any> {
		switch (mode) {
			case 'RTE':
				const html = await getHtmlWithFallback(content.jsonModel, content.attachments);
				const div = document.createElement('div');
				div.innerHTML = html;
				return div;

			case 'JSON':
				// JSONViewer's content in constructor is string
				// JSONModel -> string
				return JSON.stringify(content, undefined, '    ');
		}
	}

	type ViewContent = {
		jsonModel: DocModel;
		attachments: Attachments;
		rawContent: string;
	};
	function submitPost(event: MouseEvent) {
		const data: ViewContent = editorView.content;

		DiscussionPost.create(
			{ name: 'wwr-test', lang: 'en' },
			{},
			{
				...data,
				threadId: '4400000000000037009',
				siteId: '3448675',
			},
		);

		editorView.destroy();
	}

	function switchEditor(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		const mode = (event.target as HTMLButtonElement).dataset.switchTo as SwitchMode;
		// TODO uncouple this from button interface
		let view: View = (
			{
				RTE: ProseMirrorView,
				JSON: JSONView,
			} as any as Record<SwitchMode, View>
		)[mode];
		if (editorView instanceof (view as any)) {
			return;
		}

		let content = editorView.content;
		convertDoc(content, mode).then((newDoc) => {
			editorView.destroy();
			editorView = new (view as any)(editor, newDoc);
			activateSwitcher(mode);
		});
		// // need a custom method
		// // if (typeof content !== 'string') {
		// // 	content = JSON.stringify(content, undefined, '    ');
		// // }
		// // model = content;

		// editorView.destroy();
		// editorView = new (view as any)(editor, model);
		// activateSwitcher(mode);
	}

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
	<div class="switcher" bind:this={switcher}>
		<button class="current" on:click={switchEditor} data-switch-to="RTE">Switch to RTE</button>
		<button class="" on:click={switchEditor} data-switch-to="JSON">Switch to JSON</button>
	</div>
	<div class="form-content">
		<Avatar user={userDetails} />
		<div id="editor" data-placeholder="Share your thoughts…" bind:this={editor}></div>
	</div>
	<div class="form-actions">
		<button on:click={submitPost}>Submit</button>
	</div>
</div>
<div class="fallback" style={isLoaded ? 'display: none' : ''}>Loading editor...</div>

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

	.switcher button.current {
		color: grey;
		background-color: transparent;
		cursor: default;
		border-color: var(--wds-primary-button-background-color);
	}

	.switcher button.current {
		color: grey;
		background-color: transparent;
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

	#editor :global(.json-editor) {
		overflow: scroll;
		width: 100%;
		min-height: 400px;
		font-family: monospace;
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

	#editor :global(.menubar .menuicon.disabled) {
		background: rgba(var(--webeditor-link-color--rgb), 0) !important;
		color: grey;
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
