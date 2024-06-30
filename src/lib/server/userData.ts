import type { UserDetails } from '$lib/responses/Post';
import { getFileData, setFileData } from './util';

export type UserData = UserDetails;

const FILE_NAME = 'userData.json';
const defaultUserData: UserData = {
	id: '0',
	avatarUrl: null,
	name: null,
	badgePermission: '',
};

export async function get(): Promise<UserData> {
	const fileContent = await getFileData(FILE_NAME);
	return fileContent || defaultUserData;
}

export async function set(details: UserData) {
	const success = setFileData(FILE_NAME, details);
	if (!success) {
		throw new Error('File write failed!');
	}
}
