<script lang="ts">
	import { config } from '../routes/stores';
	import Editor, { type EditorContent } from './Editor.svelte';

	export let onSubmit: (editorContent: EditorContent) => void;

	function onCancel() {
		return;
	}

	function setErrors(msg: string) {
		if (msg !== '') console.error(msg);
		return;
	}
	// TODO
</script>

<div class="reply-create">
	<Editor mode={$config.defaultEditor.create} {onSubmit} {onCancel} {setErrors} />
</div>

<style>
	.reply-create {
		position: sticky;
	}
</style>
