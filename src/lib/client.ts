/**
 * This file needs to be different from server.ts because svelte automatically
 * makes it so client code can't call anything in a `$lib/server` endpoint.
 */

export enum Option {
	UserData,
	Config,
}

export async function setFromClient(option: Option, data: any) {
	return fetch('/api/config', { method: 'POST', body: JSON.stringify({ option, data }) });
}
