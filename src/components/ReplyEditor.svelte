<script lang="ts">
	import { config } from '../routes/stores';
	import Editor, { type EditorContent } from './Editor.svelte';

	export let onSubmit: (editorContent: EditorContent) => void;

	function onCancel() {
		return;
	}
</script>

<div class="reply-create">
	<Editor mode={$config.defaultEditor.create} {onSubmit} {onCancel} />
</div>

<style>
	.reply-create {
		position: sticky;
	}
</style>
