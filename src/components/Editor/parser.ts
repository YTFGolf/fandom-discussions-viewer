import type { Attachments } from '$lib/controllers/types/attachments';
import type { DocModel } from '$lib/controllers/types/jsonModel';
import parseBlock from './block';
import PostBody from '../Post/PostBody.svelte';

async function getRawContent(container: HTMLDivElement) {
	// could just do `return container.innerText;` but that also includes stuff
	// from opengraphs
	const rawContent = [];
	for (const child of container.children as any as HTMLElement[]) {
		if (!(child.classList.contains('open-graph') || child.innerText === String.fromCharCode(160))) {
			rawContent.push(child.innerText);
		}
	}

	return rawContent.join('\n');
}

async function getPost(container: HTMLDivElement, attachments: Attachments) {
	const postContent = [];
	for (const child of container.children as any as HTMLElement[]) {
		postContent.push(parseBlock(child, attachments));
	}

	const post: DocModel = { content: await Promise.all(postContent) };
	return post;
}

/**
 * Note: this function assumes that the container is well-formed (i.e. no
 * `Malformed content` or weird API-only stuff).
 * @param container The output of {@link PostBody}.
 * @return `[rawContent, jsonModel]`
 */
export default async function parse(
	container: HTMLDivElement,
	attachments: Attachments,
): Promise<[string, DocModel]> {
	const rawContent = getRawContent(container);

	const post = getPost(container, attachments);

	return Promise.all([rawContent, post]);
}
