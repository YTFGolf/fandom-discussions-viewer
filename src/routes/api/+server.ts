import { json, type RequestEvent } from '@sveltejs/kit';
import { handleRequestEvent } from './requestHandler';
import HTTP from '$lib/common/HTTPCodes';

/**
 * Pass `event` to {@link handleRequestEvent} and handle errors
 * @param event
 * @returns Response to give to user
 */
async function _handle(event: RequestEvent) {
	try {
		const res = await handleRequestEvent(event);

		// Don't know why `return res` doesn't work when status is ok
		if (res.status !== HTTP.OK) {
			return res;
		}

		let body = await res.json();
		if (res) {
			return json(body);
		}

		return json({ error: 'Something went wrong' }, { status: HTTP.INTERNAL_SERVER_ERROR });
	} catch (e) {
		console.error(e);

		if (!(e instanceof Error)) {
			return json(
				{ error: 'Something went wrong', data: e },
				{ status: HTTP.INTERNAL_SERVER_ERROR }
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
