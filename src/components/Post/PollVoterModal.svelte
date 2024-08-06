<script lang="ts">
	import type { PollAnswer, PollVoters } from '$lib/responses/Thread';
	import { createEventDispatcher } from 'svelte';
	import FandomIcon from '../FandomIcon.svelte';
	import Avatar from '../Avatar.svelte';
	import { wiki } from '../../routes/stores';

	export let answer: PollAnswer;
	export let voters: PollVoters;

	const dispatch = createEventDispatcher();

	function destroy() {
		dispatch('destroy');
	}

	function handleKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & Window }) {
		if (event.key === 'Escape') {
			destroy();
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="modal__wrapper">
	<div class="modal__overlay" role="presentation"></div>
	<div class="modal is-full-size">
		<div class="user-list-modal">
			<div class="user-list-header">
				<span class="user-list-header-text">{answer.text} ({voters.users.length}&nbsp;Votes)</span>
				<button
					id="close-modal"
					class="plain-style"
					on:click={destroy}
					title="Close modal (Escape)"
				>
					<FandomIcon icon="close" size="24px" />
				</button>
			</div>
			<ul class="voter-info-list">
				{#each voters.users as user}
					<li class="user-info">
						<Avatar {user} />
						<a class="user-link" href="/f/u/{user.id}?wiki={$wiki.lang}.{$wiki.name}">
							{user.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.modal__overlay {
		background: #000;
		height: 100%;
		left: 0;
		opacity: 0.6;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 250;
	}

	.modal {
		background-color: var(--theme-page-background-color--secondary);
		border-radius: 3px;
		color: var(--theme-page-text-color);
		left: 50%;
		position: fixed;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 300;
	}

	.user-list-modal {
		min-width: 480px;
	}

	#close-modal {
		cursor: pointer;
	}

	.voter-info-list {
		--wds-list-border-color: var(--theme-border-color);
		list-style-type: none;
		margin: 0;
		max-height: 80vh;
		overflow: auto;
		padding: 7px 18px;
	}

	.voter-info-list > li {
		font-size: 14px;
		font-weight: 400;
		line-height: 1em;
		padding: 11px 0;
	}

	.user-info :global(.avatar) {
		margin: 0 0.75em;
	}

	.user-link:hover {
		color: var(--theme-page-text-color--hover);
	}

	.user-link {
		color: var(--theme-page-text-color);
		display: inline-block;
		font-weight: 700;
		max-width: 16em;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 0.3s;
		vertical-align: middle;
		align-content: center;
		white-space: nowrap;
	}

	.user-info {
		align-items: center;
		border-bottom: 1px solid var(--theme-border-color);
		display: flex;
		padding: 6px;
	}

	.user-info:last-child {
		border-bottom: 0;
	}

	.user-list-header {
		align-items: center;
		border-bottom: 1px solid var(--theme-border-color);
		display: flex;
		font-size: 14px;
		font-weight: 500;
		justify-content: space-between;
		letter-spacing: 0.2px;
		padding: 18px;
		text-transform: uppercase;
	}

	.user-list-header-text {
		flex-grow: 1;
	}
</style>
