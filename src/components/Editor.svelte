<script lang="ts">
	import type { Attachments } from '$lib/controllers/types/attachments';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { examples } from '../routes/f/p/[...postParams=forumPost]/examples';
	import parse from './HTMLParser/parser';
	import PostBody from './Post/PostBody.svelte';

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
	 */

	/***/
	function logEvent(event: InputEvent) {}

	async function logModel(event: MouseEvent) {
		const target = (event.target as any).parentElement.firstChild.firstChild as HTMLDivElement;
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
	<button on:click={postModel}>Post JSON model</button>
</div>

<style>
	.editor {
		background-color: var(--theme-page-background-color--secondary);
		border: 1px solid var(--theme-border-color);
	}
</style>
