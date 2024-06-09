import { type RequestEvent } from '@sveltejs/kit';

/**
 * @param entrypoint Fandom wiki using query on
 * @param params Search query parameters
 * @returns URL to send fetch request to
 */
function buildQuery(
	entrypoint: string,
	params: string | string[][] | Record<string, string> | URLSearchParams | undefined
) {
	// prettier-ignore
	const reEntrypoint = new RegExp([
		/^https:\/\//,              // begin + https://
		/[a-z\-]+\.fandom\.com/,    // {wiki name}.fandom.com
		/(?:\/[a-z\-]+)?/,          // (optional) /{lang}
		/\/(api|wikia)\.php$/       // /{script}.php + end
	].map((r: RegExp) => r.source).join(''));
	// https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
	// const reEntrypoint = /^https:\/\/[a-z\-]+\.fandom\.com(?:\/[a-z\-]+)?\/(api|wikia)\.php$/;

	if (!entrypoint.match(reEntrypoint)) {
		throw new Error('Wiki entrypoint invalid!');
	}

	const uParams = new URLSearchParams(params);
	return entrypoint + '?' + uParams;
}

/**
 * Handles the `RequestEvent` given to the server and returns the server's
 * response.
 * @param event
 * @returns Raw output of `fetch` request
 * @throws Various possible errors
 */
export async function handleRequestEvent(event: RequestEvent) {
	// TODO should be able to just use same headers sent in request
	const params: any = {};
	let entrypoint: string | undefined;

	for (let param of event.url.searchParams.entries()) {
		if (param[0] === 'fdvEntrypoint') {
			entrypoint = param[1];
		} else {
			params[param[0]] = param[1];
		}
	}
	if (!entrypoint) {
		throw new Error('Wiki entrypoint not provided!');
	}

	let init: RequestInit = {
		method: event.request.method,
		headers: {
			Cookie: `fandom_session=${event.cookies.get('fandom_session')}`,
		},
	};
	if (init.method === 'POST') {
		init.body = await event.request.text();
	}

	return fetch(buildQuery(entrypoint, params), init);
}
