import { readFile, writeFile } from 'node:fs/promises';

/**
 * Get the data stored in `fileName` as a JSON object.
 */
export async function getFileData(fileName: string): Promise<any | null> {
	let content: any | null = null;

	try {
		// filehandle = await open(`.userdata/${fileName}`, 'r');
		const buf = await readFile('package.json');
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
		// filehandle = await open(`.userdata/${fileName}`, 'r');
		const repr = JSON.stringify(data, undefined, '\t');
		await writeFile('static/test.json', repr);

		return true;
	} catch (e) {
		console.error(e);

		return false;
	}
}
