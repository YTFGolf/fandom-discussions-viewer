import type { SortDirection } from './controllers/types/string-types';

/**
 * Offset the pivot of a post so that operations with it use a non-strict
 * inequality.
 * @returns New pivot
 */
export function offsetPivot(pivot: string, sortDirection?: SortDirection) {
	let newPivot;
	if (sortDirection && sortDirection === 'ascending') {
		newPivot = (BigInt(pivot) - BigInt(1)).toString();
	} else {
		newPivot = (BigInt(pivot) + BigInt(1)).toString();
	}
	// Pivot uses strict inequality so this hack is needed so that e.g. the call
	// below begins with the same post that the equivalent discussions link does
	// http://localhost:5173/f/p/4400000000000822918/r/4400000000003058552
	// https://battle-cats.fandom.com/f/p/4400000000000822918/r/4400000000003058552

	return newPivot;
}
