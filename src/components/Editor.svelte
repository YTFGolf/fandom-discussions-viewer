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
	 * Alternatively, this is only for the editing part and the caller always
	 * controls the context in which it is used. E.g. caller has attachments and
	 * then generates the body and jsonModel by using these functions, then
	 * sends the appropriate POST.
	 */

	/***/

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

	/**
	 * Information about the content of a post.
	 */
	type ViewContent = {
		jsonModel: DocModel;
		attachments: Attachments;
		rawContent: string;
	};

	/**
	 * Converts document model object into format suitable for constructor of
	 * the view used.
	 */
	// async function convertDoc(content: ViewContent, mode: 'RTE'): Promise<HTMLDivElement>;
	// async function convertDoc(content: ViewContent, mode: 'JSON'): Promise<string>;
	async function convertDoc(content: ViewContent, mode: SwitchMode): Promise<any> {
		switch (mode) {
			case 'RTE':
				const html = await getHtmlWithFallback(content.jsonModel, content.attachments as any);
				const div = document.createElement('div');
				div.innerHTML = html;
				return div;

			case 'JSON':
				return JSON.stringify(content, undefined, '\t');
		}
	}

	function submitPost() {
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

	function switchEditor(mode: SwitchMode) {
		let view: any = {
			RTE: ProseMirrorView,
			JSON: JSONView,
		}[mode];
		if (editorView instanceof view) {
			return;
		}

		let content = editorView.content;
		convertDoc(content, mode).then((newDoc) => {
			editorView.destroy();
			editorView = new view(editor, newDoc);
			activateSwitcher(mode);
		});
	}

	function handleSwitchEditor(event: MouseEvent) {
		const mode = (event.target as HTMLButtonElement).dataset.switchTo as SwitchMode;
		return switchEditor(mode);
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
		<button class="current" on:click={handleSwitchEditor} data-switch-to="RTE">
			Switch to RTE
		</button>
		<button class="" on:click={handleSwitchEditor} data-switch-to="JSON">Switch to JSON</button>
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
		font-family: Consolas, 'Eupheima UCAS', Monaco, Menlo, monospace;
		font-size: 0.8125rem;
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
		color: var(--theme-page-text-color);
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
