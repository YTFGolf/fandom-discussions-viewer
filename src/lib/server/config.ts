import { getConfigData, setConfigData } from './util';

export type Config = {
	theme: 'light' | 'dark';
	hideDeleted: boolean;
	/**
	 * If not null then always uses this wiki's theme irregardless of what wiki
	 * you're on.
	 */
	themeWiki: string | null;
};

const fileName = 'config.json';
const defaultConfig: Config = {
	theme: 'light',
	hideDeleted: false,
	themeWiki: null,
};

export async function get(): Promise<Config> {
	return getConfigData(fileName, defaultConfig);
}

export async function set(data: Config) {
	return setConfigData(fileName, data);
}
