import { Option } from './client';
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

// export async function set(option: Option, data: any);
export async function set(option: Option.UserData, data: UserData): Promise<void> {
	switch (option) {
		case Option.UserData:
			return setUserData(data);
	}
}
