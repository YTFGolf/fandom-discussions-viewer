import { Option, setFromClient } from './client';
import { get as getUserData, set as setUserData, type UserData } from './server/userData';

/**
 * Each file has its own method. Then there is one general method that takes in
 * an argument that gets used.
 *
 * This should probably be its own folder.
 */

/***/

// export async function get(option: Option): Promise<any>;
export async function get(option: Option.UserData): Promise<UserData> {
	switch (option) {
		case Option.UserData:
			return getUserData();
	}
}

export const set: typeof setFromClient = async function (option, data) {
	switch (option) {
		case Option.UserData:
			return setUserData(data);
	}
};
