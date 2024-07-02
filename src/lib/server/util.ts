import { mkdir, readFile, writeFile } from 'node:fs/promises';

const CONFIG_FOLDER_PATH = '.userconfig';

/**
 * Get the data stored in `fileName` as a JSON object.
 */
export async function getFileData(fileName: string): Promise<any | null> {
	let content: any | null = null;

	try {
		const buf = await readFile(`${CONFIG_FOLDER_PATH}/${fileName}`);
		content = JSON.parse(buf.toString());
	} catch (e) {
		console.error(e);
	}

	return content;
}

/**
 * Set a JSON object as the content of `fileName`.
 * @returns Has the set data operation succeeded
 */
export async function setFileData(fileName: string, data: any): Promise<boolean> {
	try {
		const repr = JSON.stringify(data, undefined, '\t');
		await mkdir(CONFIG_FOLDER_PATH, { recursive: true });
		await writeFile(`${CONFIG_FOLDER_PATH}/${fileName}`, repr);

		return true;
	} catch (e) {
		console.error(e);

		return false;
	}
}

export async function getConfigData<T>(fileName: string, defaultData: T): Promise<T> {
	const fileContent = await getFileData(fileName);
	if (!fileContent) {
		setConfigData(fileName, defaultData);
	}
	return { ...defaultData, ...fileContent };
}

export async function setConfigData<T>(fileName: string, data: T): Promise<void> {
	const success = setFileData(fileName, data);
	if (!success) {
		throw new Error(`File write failed for ${fileName}!`);
	}
}
