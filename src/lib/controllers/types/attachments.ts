export type Attachments = {
	atMentions?: {
		/** ID of user */
		id: string;
	}[];
	openGraphs?: {
		originalUrl: string;
		/** Doesn't do anything */
		siteName: string | number | boolean;
	}[];
	contentImages?: {
		/** Must match `^http(s)?:\/\/(www\.)?(static\.wikia\.nocookie\.net|(vignette|static)\.(wikia-dev|fandom-dev)\.(us|pl))\/.+` */
		url: string;
	}[];

	// polls:any[]
	// quizzes:any[]
};

export type sAttachments = Attachments | string;
