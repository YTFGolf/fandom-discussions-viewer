import type { Wiki } from '$lib/types';

// something like global values e.g. username so I can set the user agent (client)

// get(wiki, params)
// post(wiki, params, data)

export async function get(wiki: Wiki, params: any) {
	let wikiUrl = `https://${wiki.name}.fandom.com`;

	if (wiki.lang && wiki.lang !== 'en') {
		wikiUrl += '/' + wiki.lang;
	}
	wikiUrl += `/${wiki.script}.php`;

	const query = new URLSearchParams({
		fdvEntrypoint: wikiUrl,
		...params
	});

	const res = await fetch(`/api?${query}`, {
		method: 'GET'
	});

	return await res.json();
}
