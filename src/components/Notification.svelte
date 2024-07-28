<script context="module" lang="ts">
	import Notification from './Notification.svelte';

	type NotificationType = 'alert' | 'error';

	export function dispatchNotification(type: NotificationType, message: string) {
		const notif = new Notification({
			target: document.querySelector('.notification-container')!,
			props: { type, message },
		});

		notif.$on('destroy', () => {
			notif.$destroy();
		});

		return notif;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FandomIcon from './FandomIcon.svelte';
	const dispatch = createEventDispatcher();

	export let type: NotificationType;
	export let message: string;
	function destroy() {
		dispatch('destroy');
	}
	function destroyAll() {
		document.querySelector('.notification-container')!.innerHTML = '';
	}

	const notificationColors: Record<NotificationType, string> = {
		alert: '#b46318',
		error: '#bf0017',
	};
</script>

<div class="notification">
	<div class="notification-icon" style="background-color:{notificationColors[type]}">
		<FandomIcon icon={type} size="18px" />
	</div>
	<div class="notification-text">{message}</div>
	<button on:click={destroy} class="close-icon" title="Close notification">
		<FandomIcon icon="close" size="12px" />
	</button>
	<button on:click={destroyAll} class="close-icon" title="Close all notification">
		<FandomIcon icon="delete" size="12px" />
	</button>
</div>

<style>
	.notification {
		--wds-banner-notification-background-color: var(--fandom-banner-notification-background-color);
		--wds-banner-notification-text-color: var(--fandom-text-color);
		--wds-banner-notification-link-color: var(--fandom-link-color);
		--wds-banner-notification-link-color--hover: var(--fandom-link-color--hover);
		--wds-banner-notification-border-color: var(--fandom-border-color);
		--wds-banner-notification-close-icon: var(--fandom-banner-notifications-close-icon);
		box-sizing: content-box;
		background-color: var(--wds-banner-notification-background-color);
		border-radius: 3px;
		border-right: 1px solid var(--wds-banner-notification-border-color);
		color: var(--wds-banner-notification-text-color);
		display: flex;
		margin-bottom: 3px;
		overflow: hidden;
		transition: opacity 0.4s;
		width: inherit;
	}

	.notification-icon {
		align-items: center;
		border-radius: 3px 0 0 3px;
		color: #fff;
		display: flex;
		justify-content: center;
		width: 40px;
	}

	.notification-icon :global(.fandom-icon-svg) {
		background-color: #fff;
	}

	.notification-text {
		border-bottom: 1px solid var(--wds-banner-notification-border-color);
		border-top: 1px solid var(--wds-banner-notification-border-color);
		flex: 1;
		font-size: 14px;
		line-height: 1.5;
		padding: 11px 12px;
	}

	.notification .close-icon {
		background-color: inherit;
		display: inline;
		border: none;
		border-bottom: 1px solid var(--wds-banner-notification-border-color);
		border-radius: 0 3px 3px 0;
		border-top: 1px solid var(--wds-banner-notification-border-color);
		box-sizing: content-box;
		color: var(--wds-banner-notification-close-icon);
		cursor: pointer;
		height: inherit;
		line-height: 0;
		padding: 14px;
		width: 12px;
	}

	.notification .close-icon :global(.fandom-icon-svg) {
		background-color: var(--wds-banner-notification-close-icon);
	}
</style>
