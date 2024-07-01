import { Option } from './client';
import { get as getUserData, set as setUserData } from './server/userData';
import { get as getConfig, set as setConfig } from './server/config';

/**
 * Each file has its own method. Then there is one general method that takes in
 * an argument that gets used.
 *
 * This should probably be its own folder.
 */

/***/

export async function get(option: Option): Promise<any> {
	switch (option) {
		case Option.UserData:
			return getUserData();

		case Option.Config:
			return getConfig();
	}
}

export async function set(option: Option, data: any) {
	switch (option) {
		case Option.UserData:
			return setUserData(data);

		case Option.Config:
			return setConfig(data);
	}
}
