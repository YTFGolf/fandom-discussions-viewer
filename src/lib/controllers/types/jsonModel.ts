export type docModel = {
	type: 'doc';
	content: contentItem[];
};

type contentItem = any;
// TODO define this

export type jsonModel = string | docModel;
