import { ContentType, type Wiki, type WikiScript } from '$lib/types';
import { stringify } from './controllers/util';

export type CallOptions = {
	script?: WikiScript;
	contentType?: ContentType;
};

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
	const entrypoint = buildEntrypoint(wiki, script);

	const query = new URLSearchParams({
		fdvEntrypoint: entrypoint,
		...params,
	});

	const url = `/api?${query}`;
	return url;
}

/**
 * Send GET request
 * @param wiki
 * @param params
 * @param options
 * @returns Promise containing Fandom's server response.
 */
export async function get(wiki: Wiki, params: any, options?: CallOptions) {
	const url = buildUrl(wiki, params, options?.script);

	const init: RequestInit = {
		method: 'GET',
	};

	return fetch(url, init);
}

/**
 * Send POST request
 * @param wiki
 * @param params
 * @param data
 * @param options
 * @returns Promise containing Fandom's server response.
 */
export async function post(wiki: Wiki, params: any, data?: any, options?: CallOptions) {
	const url = buildUrl(wiki, params, options?.script);

	if (data && typeof data !== 'string') {
		data = (function () {
			switch (options?.contentType || ContentType.JSON) {
				case ContentType.JSON:
					data.jsonModel = stringify(data.jsonModel);
					return JSON.stringify(data);
				case ContentType.HTML:
					data.jsonModel = stringify(data.jsonModel);
					data.attachments = stringify(data.attachments);
					return new URLSearchParams(data);
				case ContentType.FormData:
					const form = new FormData();
					Object.entries(data).forEach(([key, value]) => form.append(key, value as string));
					return form;
			}
		})();
	}

	const init: RequestInit = {
		method: 'POST',
		body: data,
	};

	return fetch(url, init);
}
