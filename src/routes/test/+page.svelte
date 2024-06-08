<script lang="ts">
	import type { Wiki } from '$lib/types';
	import { get } from '$lib/caller';

	let wiki: Wiki = {
		name: 'battle-cats',
		lang: 'en',
		script: 'wikia'
	};

	let params = {
		controller: 'DiscussionThread',
		method: 'getThread',
		threadId: '4400000000000817646'
	};
</script>

{#await get(wiki, params)}
	<p>...waiting</p>
{:then number}
	<p>The number is {JSON.stringify(number)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<button on:click={async () => console.log(await get(wiki, params))}> Count: </button>
