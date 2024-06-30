/**
 * This file should only ever be called in a `load` function.
 */

import { get as getUserData, set as setUserData, type UserData } from './server/userData';

/**
 * Each file has its own method. Then there is one general method that takes in
 * an argument that gets used.
 *
 * This should probably be its own folder.
 */

/***/

export enum Option {
	UserData,
}

// export async function get(option: DATA_OPTION): Promise<any>;
export async function get(option: Option.UserData): Promise<UserData> {
	switch (option) {
		case Option.UserData:
			return getUserData();
	}
}
