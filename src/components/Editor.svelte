<script context="module" lang="ts">
	/**
	 * Information about the content of a post.
	 */
	export type EditorContent = {
		jsonModel: JsonModel;
		attachments: Attachments & { polls: undefined; quizzes: undefined };
		// Technically should make sure that nothing else is in the attachments
		// but TypeScript unironically does not have this capability.
		rawContent: string;
	};
</script>

<script lang="ts">
	import type { Attachments } from '$lib/controllers/types/attachments';
	import { onMount } from 'svelte';
	import Avatar from './Avatar.svelte';
	import { JSONView, ProseMirrorView, type View } from './Editor/Switcher';
	import { getHtmlWithFallback } from './Post/JSONModel/Body';
	import type { JsonModel } from '$lib/controllers/types/jsonModel';
	import { config, userDetails } from '../routes/stores';
	import type { EditorMode } from '$lib/types';

	export let editorContent: EditorContent = {
		jsonModel: {
			type: 'doc',
			content: [],
		},
		attachments: {
			atMentions: [],
			contentImages: [],
			openGraphs: [],
			polls: undefined,
			quizzes: undefined,
		},
		rawContent: '',
	};

	export let mode: EditorMode;
	export let onSubmit: (viewContent: EditorContent) => void;
	export let onCancel: () => void;
	// export let setError: (msg: string) => void = () => {};
	export let setErrors: (msg: string) => void;

	let editorView: View;
	let editor: HTMLElement;
	let isLoaded = false;
	let switcher: HTMLElement;

	function activateSwitcher(mode: EditorMode) {
		Object.values(switcher.children).forEach((child) => {
			if ((child as HTMLElement).dataset.switchTo === mode) {
				child.classList.add('current');
			} else {
				child.classList.remove('current');
			}
		});
	}

	onMount(() => {
		let view: any = {
			RTE: ProseMirrorView,
			JSON: JSONView,
		}[mode];

		convertDoc(editorContent, mode).then((newDoc) => {
			editorView = new view(editor, newDoc);
			activateSwitcher(mode);
			isLoaded = true;
		});
	});

	/**
	 * Converts document model object into format suitable for constructor of
	 * the view used.
	 */
	// async function convertDoc(content: ViewContent, mode: 'RTE'): Promise<HTMLDivElement>;
	// async function convertDoc(content: ViewContent, mode: 'JSON'): Promise<string>;
	async function convertDoc(content: EditorContent, mode: EditorMode): Promise<any> {
		switch (mode) {
			case 'RTE':
				const html = await getHtmlWithFallback(
					content.jsonModel,
					content.attachments as any,
					content.rawContent,
				);
				const div = document.createElement('div');
				div.innerHTML = html;
				return div;

			case 'JSON':
				if (!isLoaded) {
					if (typeof content.jsonModel === 'string') {
						content.jsonModel = JSON.parse(content.jsonModel);
					}

					for (const i in content.attachments.atMentions!) {
						const mention = content.attachments.atMentions[i];
						content.attachments.atMentions[i] = { id: mention.id };
					}
				}
				return JSON.stringify(content, undefined, '\t');
		}
	}

	function submitPost() {
		try {
			const content = editorView.content;
			return onSubmit(content);
		} catch (e: any) {
			setErrors(e);
			return;
		}
	}

	function switchEditor(mode: EditorMode) {
		let view: any = {
			RTE: ProseMirrorView,
			JSON: JSONView,
		}[mode];
		if (editorView instanceof view) {
			return;
		}

		let content;
		try {
			content = editorView.content;
		} catch (e: any) {
			setErrors(e);
			return;
		}
		convertDoc(content, mode).then((newDoc) => {
			editorView.destroy();
			editorView = new view(editor, newDoc);
			activateSwitcher(mode);
		});
	}

	function handleSwitchEditor(event: MouseEvent) {
		setErrors('');
		const mode = (event.target as HTMLButtonElement).dataset.switchTo as EditorMode;
		return switchEditor(mode);
	}
</script>

<div class="editor-container" style={isLoaded ? '' : 'display: none'}>
	<div class="switcher" bind:this={switcher}>
		<button class="wds-button current" on:click={handleSwitchEditor} data-switch-to="RTE">
			Switch to RTE
		</button>
		<button class="wds-button" on:click={handleSwitchEditor} data-switch-to="JSON">
			Switch to JSON
		</button>
	</div>
	<div class="form-content">
		<Avatar user={$userDetails} />
		<div id="editor" data-placeholder="Share your thoughts…" bind:this={editor}></div>
	</div>
	<div class="form-actions">
		<button class="wds-button text" on:click={onCancel}>Cancel</button>
		<button class="wds-button" on:click={submitPost}>Submit</button>
	</div>
</div>
{#if !isLoaded}
	<div class="fallback" style={isLoaded ? 'display: none' : ''}>Loading editor...</div>
{/if}

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
		/* outline-style: solid;
		outline-width: 1px;
		outline-color: invert; */
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

		border: none;
		background: none;
		color: var(--theme-page-text-color);
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
