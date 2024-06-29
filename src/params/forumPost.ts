export function match(value: string) {
	return /^\d+$/.test(value) || /^\d+\/r\/\d+$/.test(value);
	// /f/p/{number} OR /f/p/{number}/r/{number}
}
