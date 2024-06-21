<script lang="ts">
	import type { DocModel } from '$lib/controllers/types/jsonModel';

	function logEvent(event: InputEvent) {}

	function logModel(event: MouseEvent) {
		const target = (event.target as any).parentElement.firstChild as HTMLDivElement;

		const post: DocModel = { content: [] };

		for (const child of target.children as any as HTMLElement[]) {
			if (child.tagName === 'PRE') {
				post.content.push({
					type: 'code_block',
					content: [{ type: 'text', text: child.innerText }],
				});
			} else {
				console.log(child.innerHTML);
			}
		}

		console.log(post);
	}
</script>

<div class="editor-container">
	<div contenteditable="true" class="editor" on:beforeinput={logEvent}>
		<!-- prettier-ignore -->
		<p>Testing<br>p</p>
		<!-- prettier-ignore -->
		<pre>Testing pre<br>d</pre>
		<ul>
			<li>sol</li>
			<li>
				<p>uncanny</p>
				<p>uncanny</p>
			</li>
			<li>zero</li>
		</ul>
	</div>
	<button on:click={logModel}>Log JSON model</button>
</div>

<style>
	.editor {
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
	}
</style>
