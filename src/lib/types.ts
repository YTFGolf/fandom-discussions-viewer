export type Wiki = {
	name: string;
	lang: string;
};

/** If not explicitly given `wikia.php` should be assumed */
export type WikiScript = 'api.php' | 'wikia.php';
