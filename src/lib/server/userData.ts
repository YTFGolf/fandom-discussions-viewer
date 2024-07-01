import type { UserDetails } from '$lib/responses/Post';
import { getConfigData, setConfigData } from './util';

export type UserData = Omit<UserDetails, 'badgePermission'>;

const fileName = 'userData.json';
const defaultUserData: UserData = {
	id: '0',
	avatarUrl: null,
	name: null,
};

export async function get(): Promise<UserData> {
	return getConfigData(fileName, defaultUserData);
}

export async function set(data: UserData) {
	return setConfigData(fileName, data);
}
