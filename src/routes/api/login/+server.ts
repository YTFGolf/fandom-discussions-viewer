import { json, type RequestEvent } from '@sveltejs/kit';
import HTTP from '$lib/HTTPCodes';

export type Details = { username: string; password: string };

export async function _handle(details: Details) {
	const res = await fetch('https://services.fandom.com/mobile-fandom-app/fandom-auth/login', {
		method: 'POST',
		headers: {
			Connection: 'keep-alive',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': `${details.username}:localhost:fandom-discussions-viewer`,
			// TODO extract user agent out
		},
		body: new URLSearchParams(details),
	});
	if (res.status !== HTTP.OK) {
		return res;
	}

	const cookies = res.headers.getSetCookie()[0].split(';');
	const resCookies = [];
	for (var cookie of cookies) {
		if (!cookie.startsWith('Domain=')) {
			resCookies.push(cookie);
		} else {
			resCookies.push(cookie.replace('fandom.com', 'localhost'));
			// will get rejected by browser if this is left in
		}
	}

	const res2 = json(await res.json());
	res2.headers.set('Set-Cookie', resCookies.join(';'));

	return res2;
}

export async function POST(event: RequestEvent) {
	const details: Details = await event.request.json();
	return _handle(details);
}
