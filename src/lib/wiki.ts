import type { Wiki } from './types';

/**
 * Convert string form wiki name (`lang.name`) into {@link Wiki} object.
 * @param wiki Wiki in string form (e.g. `en.battle-cats`)
 */
export function parseWiki(wiki: string): Wiki {
	const match = wiki.match(/^([\w\-]+)\.([\w\-]+)$/);
	if (!match) {
		throw new Error(`Wiki name "${wiki}" is invalid!`);
	}
	const [_, lang, name] = match;
	return { name, lang };
}
