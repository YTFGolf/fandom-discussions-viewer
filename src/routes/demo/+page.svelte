<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { DiscussionPost } from '$lib/controllers/wikia/DiscussionPost';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import { ArticleComments } from '$lib/controllers/wikia/ArticleComments';
	import { getToken } from '$lib/controllers/api/custom';
	import { MessageWall } from '$lib/controllers/wikia/MessageWall';
	import { FeedsAndPosts } from '$lib/controllers/wikia/FeedsAndPosts';
	import Editor from '../../components/Editor.svelte';

	const bcWiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
	};

	const getParams: DiscussionThread.getThreadParams = {
		threadId: '4400000000000037009',
		pivot: '4400000000000090155',
		responseGroup: 'full',
		viewableOnly: false,
	};

	const wwrWiki: Wiki = {
		name: 'wwr-test',
		lang: 'en',
	};

	const postParams = {};

	const postData: DiscussionPost.createData = {
		// threadId: '4400000000000822918',
		// siteId: '691085',
		threadId: '4400000000000037009',
		siteId: '3448675',
		jsonModel: {
			content: [
				{
					type: 'code_block',
					content: [
						{
							type: 'text',
							marks: [
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'strong' },
								{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
								{ type: 'mention', attrs: { userId: '27706221' } },
								{ type: 'em' },
							],
							text: 'Can any of you mere\nmortals do this',
						},
					],
				},
				{
					type: 'bulletList',
					content: [
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n1 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n2 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n3 lol hi this is a sentence' }],
								},
							],
						},
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n1 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n2 lol hi this is a sentence' }],
								},
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'para\n3 lol hi this is a sentence' }],
								},
							],
						},
					],
				},
			],
		},
	};

	let content;
</script>

<svelte:head>
	<title>Demo</title>
	<meta name="description" content="Demonstration and scripting" />
</svelte:head>

<!-- {#await DiscussionThread.getThread(wwrWiki, getParams)}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<!-- prettier-ignore -->
<button on:click={async () => DiscussionPost.create(wwrWiki, postParams, postData)}>
	Click to post
</button>

<div bind:this={content} style="display:none">
	{@html '<div class="post-content s-EztHMNfjy4h3"><p>Normal text ahi</p><p>Alkdfa;d <strong>bold </strong>end bold</p><p>H <em>italics </em>end <strong>bold</strong> hi</p><p>J<strong><em>bitalics</em></strong>a</p><p>This <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">https://www.youtube.com/watch?v=dQw4w9WgXcQ</a> and <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">customised</a> link</p><ul><li><p>Bullet</p></li><li><p>Second</p></li></ul><p>I</p><ol><li><p>List</p></li><li><p>Second</p></li></ol><pre><code>something</code></pre><p>And</p><div class="image-container"><img src="https://static.wikia.nocookie.net/cad8d7f8-2e3b-44d2-bd7e-a09a9d436f15/scale-to-width/755" width="708"></div><p>Hi</p><div class="open-graph"><img src="https://static.wikia.nocookie.net/f05bb310-1a0b-4241-9553-0f56b91161d7/scale-to-width/755" width="708"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Rick Astley - Never Gonna Give You Up (Official Music Video)</a></div><p>Imagen</p><p><br></p><p>Cool</p><p><br></p><p>Text with <a href="/f/u/27706221" target="_blank" class="mention">@TheWWRNerdGuy</a> inside</p></div>'}
</div>
{#if content}
	<Editor {content} />
{:else}
	<div>Loading...</div>
{/if}
