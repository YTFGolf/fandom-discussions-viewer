import type { Option } from '$lib/client';
import { set } from '$lib/server';
import { type RequestEvent } from '@sveltejs/kit';

export type Details = {
	option: Option;
	data: any;
};

export async function POST(event: RequestEvent) {
	const details: Details = await event.request.json();
	set(details.option, details.data);

	return new Response(null);
}
