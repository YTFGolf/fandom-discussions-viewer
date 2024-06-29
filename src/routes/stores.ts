import type { Wiki } from '$lib/types';
import { writable } from 'svelte/store';

/**
 * IMPORTANT: must be set in layout before is used.
 */
export const wiki = writable<Wiki>(null as any);
