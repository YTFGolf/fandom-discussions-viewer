import type { UserDetails } from '$lib/responses/Post';
import type { Config } from '$lib/server/config';
import type { Wiki } from '$lib/types';
import { writable } from 'svelte/store';

/**
 * IMPORTANT: must be set in layout before is used.
 */
export const wiki = writable<Wiki>(null as any);
export const userDetails = writable<UserDetails>(null as any);
export const config = writable<Config>(null as any);
