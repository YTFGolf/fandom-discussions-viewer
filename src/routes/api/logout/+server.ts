import { type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const session = event.cookies.get('fandom_session') || '';
	event.cookies.set('fandom_session', session, { path: '/', maxAge: 0 });

	return new Response(null);
}
