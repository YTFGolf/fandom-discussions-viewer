export function getParams(controller: string, method: string, other?: Object) {
	return {
		controller,
		method,
		...other,
	};
}
