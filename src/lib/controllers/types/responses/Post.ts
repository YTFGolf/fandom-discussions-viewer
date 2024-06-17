import type { Attachments } from '../attachments';
import type { JsonModel } from '../jsonModel';

export type Post = {
	jsonModel: JsonModel;
	_embedded: { attachments: [Attachments] };
};
