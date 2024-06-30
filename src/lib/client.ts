/**
 * This file needs to be different from server.ts because svelte automatically
 * makes it so client code can't call anything in a `$lib/server` endpoint.
 */

import type { UserData } from './server/userData';

export enum Option {
	UserData,
}

// export async function setFromClient(option: Option, data: any);
export async function setFromClient(option: Option.UserData, data: UserData): Promise<void> {
	fetch('/api/config', { method: 'POST', body: JSON.stringify({ option, data }) });
}
