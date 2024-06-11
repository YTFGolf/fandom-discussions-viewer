import type { Wiki, WikiScript } from '$lib/types';

// something like global values e.g. username so I can set the user agent (client)

// get(wiki, params)
// post(wiki, params, data)

// action=query format=json meta=userinfo uiprop=groups|rights

/**
 * Transform wiki object to url entrypoint
 * @param wiki
 * @param script
 * @returns
 */
function buildEntrypoint(wiki: Wiki, script?: WikiScript) {
	let entrypoint = `https://${wiki.name}.fandom.com`;

	if (wiki.lang && wiki.lang !== 'en') {
		entrypoint += '/' + wiki.lang;
	}
	entrypoint += '/' + (script || 'wikia.php');
	return entrypoint;
}

/**
 * Transform wiki and params to proxy server url
 * @param wiki
 * @param params
 * @param script
 * @returns
 */
function buildUrl(wiki: Wiki, params: any, script?: WikiScript) {
	let entrypoint = buildEntrypoint(wiki, script);

	let query = new URLSearchParams({
		fdvEntrypoint: entrypoint,
		...params,
	});

	let url = `/api?${query}`;
	return url;
}

/**
 * Send GET request
 * @param wiki
 * @param params
 * @param script Wiki script to use (default: `wikia.php`)
 * @returns Promise containing Fandom server response
 */
export async function get(wiki: Wiki, params: any, script?: WikiScript) {
	let url = buildUrl(wiki, params, script);

	let res = await fetch(url, {
		method: 'GET',
	});

	return await res.json();
}

/**
 * Send POST request
 * @param wiki
 * @param params
 * @param data
 * @param script Wiki script to use (default: `wikia.php`)
 * @returns Promise containing Fandom server response
 */
export async function post(wiki: Wiki, params: any, data?: any, script?: WikiScript) {
	let url = buildUrl(wiki, params, script);

	if (data && typeof data !== 'string') {
		if (data.jsonModel && typeof data.jsonModel !== 'string') {
			data.jsonModel = JSON.stringify(data.jsonModel);
		}
		data = JSON.stringify(data);
	}

	let res = await fetch(url, {
		method: 'POST',
		body: data,
	});

	return await res.json();
}
