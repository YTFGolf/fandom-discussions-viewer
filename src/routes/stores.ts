import type { UserDetails } from '$lib/responses/Post';
import type { Wiki } from '$lib/types';
import { writable } from 'svelte/store';

/**
 * IMPORTANT: must be set in layout before is used.
 */
export const wiki = writable<Wiki>(null as any);
export const userDetails = writable<UserDetails>({
	id: 0,
	avatarUrl: null,
	name: null,
	badgePermission: '',
});
