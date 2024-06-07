import { json, type RequestEvent } from '@sveltejs/kit';

export type Details = { username: string; password: string };

export async function _handle(details: Details) {
	const res = await fetch('https://services.fandom.com/mobile-fandom-app/fandom-auth/login', {
		method: 'POST',
		headers: {
			Connection: 'keep-alive',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': `${details.username}:localhost:fandom-discussions-viewer`
			// TODO extract user agent out
		},
		body: new URLSearchParams(details)
	});
	// TODO check error code

	const cookies = res.headers.getSetCookie()[0].split(';');
	const resCookies = [];
	for (var cookie of cookies) {
		// will get rejected by browser if these are left in
		if (!(cookie.startsWith('Domain=') || cookie.startsWith('HttpOnly'))) {
			resCookies.push(cookie);
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
