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
