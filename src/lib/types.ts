export type Wiki = {
	name: string;
	lang: string;
};

/** If not explicitly given `wikia.php` should be assumed */
export type WikiScript = 'api.php' | 'wikia.php';

/** If not explicitly given `JSON` should be assumed */
export enum ContentType {
	JSON,
	HTML,
	FormData
}

export type EditorMode = 'RTE' | 'JSON';
