import type { Post } from './Post';

export type Thread = {
	_embedded: { 'doc:posts': Post[] };
	title: string;
};
