<script lang="ts">
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Wiki } from '$lib/types';

	const wiki: Wiki = { name: 'battle-cats', lang: 'en' };
	let threadId = '4400000000000822918';

	$: threadContent = DiscussionThread.getThread(wiki, { threadId });
</script>

<svelte:head>
	<title>Post</title>
	<meta name="description" content="wait a minute" />
</svelte:head>

<h1>hi</h1>
<label for="lang">Language:</label>
<input type="text" id="lang" bind:value={wiki.lang} />
<label for="wiki">Wiki:</label>
<input type="text" id="wiki" bind:value={wiki.name} />
<label for="threadId">ThreadId:</label>
<input type="text" id="threadId" bind:value={threadId} />

{#await threadContent}
	<p>...waiting</p>
{:then postData}
	<p>{JSON.stringify(postData)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
