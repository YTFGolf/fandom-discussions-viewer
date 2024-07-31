<script lang="ts">
	import type {
		Poll as ThreadPoll,
		PollAnswer as ThreadPollAnswer,
		Thread,
	} from '$lib/responses/Thread';
	import PostComponent from './Post.svelte';
	import PollComponent from './Poll.svelte';
	import { type EditorContent } from '../Editor.svelte';
	import type { Wiki } from '$lib/types';
	import { DiscussionThread } from '$lib/controllers/wikia/DiscussionThread';
	import type { Answer as SendPollAnswer, Poll as SendPoll } from '$lib/controllers/types/poll';
	import type { Post } from '$lib/responses/Post';
	import PollEditor from './PollEditor.svelte';
	import { wiki } from '../../routes/stores';
	import HTTP from '$lib/HTTPCodes';
	import { dispatchNotification } from '../Notification.svelte';
	import { createEventDispatcher } from 'svelte';

	export let thread: Thread;
	let poll: ThreadPoll | undefined;
	$: poll = thread._embedded.attachments[0].polls?.[0];

	const dispatch = createEventDispatcher();

	async function deleteFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.deleteThread(wiki, { threadId: thread.id });
		// return DiscussionPost.deletePost(wiki, { postId: thread.firstPostId });
		// For whatever reason DiscussionThread.deleteThread doesn't mark the
		// post as deleted
	}
	async function undeleteFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.undelete(wiki, { threadId: thread.id });
	}
	async function updateFunction(wiki: Wiki, thread: Thread, data: EditorContent) {
		let poll: SendPoll | undefined = undefined;
		if (thread.poll) {
			poll = {
				id: thread.poll.id,
				question: thread.poll.question,
				answers: [],
			} as SendPoll;
			data.attachments.polls = [poll as SendPoll] as any;
		}

		const res = await DiscussionThread.update(
			wiki,
			{ threadId: thread.id },
			{
				...thread,
				...data,
				poll,
				// @ts-ignore
				_embedded: undefined,
			},
		);

		if (res.status === HTTP.OK && data.title) {
			dispatch('updateTitle', { title: data.title });
		}
		return res;
	}
	async function lockFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.lock(wiki, { threadId: thread.id });
	}
	async function unlockFunction(wiki: Wiki, thread: Thread) {
		return DiscussionThread.unlock(wiki, { threadId: thread.id });
	}
	function getUpvoteId(thread: Thread) {
		return thread.firstPostId;
	}

	let editorContainer: HTMLDivElement;
	let editorComponent: PollEditor;
	let isEditorOpen = false;
	function openPollEditor() {
		isEditorOpen = true;
	}
	function closePollEditor() {
		editorComponent.$destroy();
		isEditorOpen = false;
	}
	async function submitPoll(newPollData: SendPoll) {
		const attachments: EditorContent['attachments'] = {
			...thread._embedded.attachments[0],
			polls: [newPollData] as any,
			quizzes: undefined,
		};
		const data: EditorContent = {
			attachments,
			jsonModel: thread.jsonModel!,
			rawContent: thread.rawContent,
		};
		const update: DiscussionThread.updateData = {
			...thread,
			...data,
			poll: newPollData,
			// @ts-ignore
			_embedded: undefined,
		};

		const res = await DiscussionThread.update($wiki, { threadId: thread.id }, update);
		if (res.status === HTTP.OK) {
			const thread = (await res.json()) as Thread;
			poll = thread.poll;
			closePollEditor();
			return;
		}
		dispatchNotification('error', `Error ${res.status}: ${res.statusText}`);
	}
</script>

<PostComponent
	post={thread}
	{deleteFunction}
	{undeleteFunction}
	{updateFunction}
	{lockFunction}
	{unlockFunction}
	{getUpvoteId}
/>
{#if poll}
	<PollComponent {poll} on:openEditor={openPollEditor} />
{:else if thread._embedded.userData?.[0].permissions?.includes('canEdit')}
	<button class="wds-button" on:click={openPollEditor}>Add poll</button>
{/if}
{#if isEditorOpen}
	<div bind:this={editorContainer}>
		<PollEditor bind:this={editorComponent} {poll} {closePollEditor} {submitPoll} />
	</div>
{/if}
