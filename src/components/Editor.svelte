<script lang="ts">
	import type { Attachments } from '$lib/controllers/types/attachments';
	import { examples } from '../routes/f/p/[...postParams=forumPost]/examples';
	import parse from './HTMLParser/parser';
	import PostBody from './Post/PostBody.svelte';

	function logEvent(event: InputEvent) {}

	async function logModel(event: MouseEvent) {
		const target = (event.target as any).parentElement.firstChild.firstChild as HTMLDivElement;
		console.log(target);
		// const attachments: Attachments = {
		// 	atMentions: [],
		// 	contentImages: [],
		// 	openGraphs: [],
		// };
		const attachments: Attachments = (await examples)._embedded['doc:posts'][0]._embedded
			.attachments[0];

		const [rawContent, post] = await parse(target, attachments);

		// console.log(JSON.stringify(rawContent), JSON.stringify(post), JSON.stringify(attachments));
		console.log(JSON.stringify(rawContent), post, attachments);
	}
</script>

<div class="editor-container">
	<div contenteditable="true" class="editor" on:beforeinput={logEvent}>
		{#await examples.then((a) => a._embedded['doc:posts'][0])}
			<p>...waiting</p>
		{:then post}
			<PostBody jsonModel={post.jsonModel} attachments={post._embedded.attachments[0]} />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
	<button on:click={logModel}>Log JSON model</button>
</div>

<style>
	.editor {
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
	}
</style>
