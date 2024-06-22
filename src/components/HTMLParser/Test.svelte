<script lang="ts">
	import { keymap } from 'prosemirror-keymap';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { DOMParser } from 'prosemirror-model';
	import { baseKeymap } from 'prosemirror-commands';
	import { history, redo, undo } from 'prosemirror-history';
	import { onMount } from 'svelte';
	import { schema } from './schema';
	import { getMenu } from './Menu';

	let editorView: EditorView;
	onMount(() => {
		editorView = new EditorView(document.querySelector('#editor'), {
			state: EditorState.create({
				doc: DOMParser.fromSchema(schema).parse(document.createElement('div')),
				plugins: [
					keymap(baseKeymap),
					history(),
					keymap({ 'Mod-z': undo, 'Mod-y': redo }),
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
	<hr />
	<button on:click={logDocumentModel}>Submit</button>
</div>
<pre>{model}</pre>

<style>
	.editor-container {
		border: 1px solid #ccc;
		padding: 10px;
		min-height: 200px;
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
	}

	#editor :global(.ProseMirror) {
		white-space: pre-wrap;
		min-height: 135px;
		max-height: 400px;
		overflow: scroll;
	}

	#editor :global(.menubar) {
		padding: 0.25em;
	}

	#editor :global(.menubar .menuicon) {
		display: inline-block;
		border-right: 1px solid rgba(0, 0, 0, 0.2);
		color: #888;
		line-height: 1;
		padding: 0 7px;
		margin: 1px;
		cursor: pointer;
		text-align: center;
		min-width: 1.4em;
	}

	#editor :global(.menubar .menuicon:not(.active):hover) {
		background: rgba(var(--webeditor-link-color--rgb), 0.15);
	}

	#editor :global(.menubar .menuicon.active) {
		background: rgba(var(--webeditor-link-color--rgb), 0.15);
		color: var(--webeditor-link-color);
	}
</style>
