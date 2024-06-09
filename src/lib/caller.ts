import type { Wiki } from '$lib/types';

// something like global values e.g. username so I can set the user agent (client)

// get(wiki, params)
// post(wiki, params, data)

// action=query format=json meta=userinfo uiprop=groups|rights

/**
 * Transform wiki object to url entrypoint
 * @param wiki
 * @returns
 */
function buildEntrypoint(wiki: Wiki) {
	let entrypoint = `https://${wiki.name}.fandom.com`;

	if (wiki.lang && wiki.lang !== 'en') {
		entrypoint += '/' + wiki.lang;
	}
	entrypoint += `/${wiki.script}.php`;
	return entrypoint;
}

/**
 * Transform wiki and params to proxy server url
 * @param wiki
 * @param params
 * @returns
 */
function buildUrl(wiki: Wiki, params: any) {
	const entrypoint = buildEntrypoint(wiki);

	const query = new URLSearchParams({
		fdvEntrypoint: entrypoint,
		...params
	});

	const url = `/api?${query}`;
	return url;
}

/**
 * Send GET request
 * @param wiki
 * @param params
 * @returns Promise containing Fandom server response
 */
export async function get(wiki: Wiki, params: any) {
	const url = buildUrl(wiki, params);

	const res = await fetch(url, {
		method: 'GET'
	});

	return await res.json();
}

/**
 * Send POST request
 * @param wiki
 * @param params
 * @param data
 * @returns Promise containing Fandom server response
 */
export async function post(wiki: Wiki, params: any, data: any) {
	const url = buildUrl(wiki, params);

	if (typeof data !== 'string') {
		data = JSON.stringify(data);
	}

	const res = await fetch(url, {
		method: 'POST',
		body: data
	});

	return await res.json();
}
