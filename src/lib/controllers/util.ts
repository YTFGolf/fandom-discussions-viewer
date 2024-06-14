/**
 * Return the parameters object containing `controller`, `method` and other
 * arguments
 * @param controller
 * @param method
 * @param other
 * @returns
 */
export function getParams(controller: string, method: string, other?: Object): any {
	return {
		controller,
		method,
		...other,
	};
}

/**
 * Stringify `obj` if it is not already a string
 * @param obj
 * @returns
 */
export function stringify(obj: any): string | null | undefined {
	if (obj && typeof obj !== 'string') {
		return JSON.stringify(obj);
	}
	return obj;
}
