import type { Attachments } from '$lib/controllers/types/attachments';
import type { DocModel } from '$lib/controllers/types/jsonModel';
import parseBlock from './block';

export default async function parse(
	container: HTMLDivElement,
	attachments: Attachments,
): Promise<[string, DocModel]> {
	const rawContent = container.innerText;
	// FIXME also contains the text of the link in OpenGraphs

	const postContent = [];
	for (const child of container.children as any as HTMLElement[]) {
		postContent.push(parseBlock(child, attachments));
	}

	const post: DocModel = { content: await Promise.all(postContent) };

	return [rawContent, post];
}
