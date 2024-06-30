import { open } from 'node:fs/promises';

/**
 * Get the data stored in `fileName` as a JSON object.
 */
export async function getFileData(fileName: string): Promise<any | null> {
	let content: any | null = null;

	let filehandle;
	try {
		// filehandle = await open(`.userdata/${fileName}`, 'r');
		filehandle = await open(`${fileName}`, 'r');
		const buf = await filehandle.read();
		content = buf.buffer.toString();
	} finally {
		await filehandle?.close();
	}

	return content;
}

/**
 * Set a JSON object as the content of `fileName`.
 */
export async function setFileData(fileName: string, data: any) {
	throw new Error('Not implemented');
}
