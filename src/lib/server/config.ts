import type { EditorMode } from '$lib/types';
import { getConfigData, setConfigData } from './util';

/**
 * Make sure to update the settings page if updating config values
 */
/***/
export type Config = {
	theme: 'light' | 'dark';
	hideDeleted: boolean;
	/**
	 * If not null then always uses this wiki's theme irregardless of what wiki
	 * you're on.
	 */
	themeWiki: string | null;
	/**
	 * Max posts that can be viewed at a time.
	 */
	postLimit: number;
	defaultEditor: EditorMode;
};

const fileName = 'config.json';
const defaultConfig: Config = {
	theme: 'light',
	hideDeleted: false,
	themeWiki: null,
	postLimit: 10,
	defaultEditor: 'RTE',
};

export async function get(): Promise<Config> {
	return getConfigData(fileName, defaultConfig);
}

export async function set(data: Config) {
	return setConfigData(fileName, data);
}
