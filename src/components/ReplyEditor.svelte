<script lang="ts">
	import Editor, { type ViewContent } from './Editor.svelte';

	export let onSubmit: (viewContent: ViewContent) => void;

	function onCancel() {
		return;
	}

	function setErrors(msg: string) {
		console.error(msg);
		return;
	}
	// TODO
</script>

<div class="reply-create">
	<Editor content={null} {onSubmit} {onCancel} {setErrors} />
</div>

<style>
	.reply-create {
		position: sticky;
	}
</style>
