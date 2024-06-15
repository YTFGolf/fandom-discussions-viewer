import { json, type RequestEvent } from '@sveltejs/kit';
import { handleRequestEvent } from './requestHandler';
import HTTP from '$lib/HTTPCodes';

/**
 * Pass `event` to {@link handleRequestEvent} and handle errors
 * @param event
 * @returns Response to give to user
 */
async function _handle(event: RequestEvent) {
	try {
		const res = await handleRequestEvent(event);

		if (res.status === HTTP.NO_CONTENT) {
			return new Response(null, { status: res.status });
		}

		const headers: any = {};
		const reIgnoreHeaders = /^(set-cookie|content-encoding|content-length)$/i;
		res.headers.forEach((value, key) => {
			if (!key.match(reIgnoreHeaders)) {
				headers[key] = value;
			}
		});

		const res2 = new Response(await res.text(), {
			headers: headers,
			status: res.status,
		});

		return res2;
	} catch (e) {
		console.error(e);

		if (!(e instanceof Error)) {
			return json(
				{ error: 'Something went wrong', data: e },
				{ status: HTTP.INTERNAL_SERVER_ERROR },
			);
		}

		return json({ error: e.toString() }, { status: HTTP.BAD_REQUEST });
	}
}

export async function GET(event: RequestEvent) {
	return _handle(event);
}

export async function POST(event: RequestEvent) {
	return _handle(event);
}
