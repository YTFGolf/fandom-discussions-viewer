type Mention = any;

type Image = {
	url: string;
	// url must match "^http(s)?:\/\/(www\.)?(static\.wikia\.nocookie\.net|(vignette|static)\.(wikia-dev|fandom-dev)\.(us|pl))\/.+"
	height: number;
	width: number;

	mediaType?: string;
	// id?: number;
	position?: number;
};

export type Attachments = {
	atMentions: Mention[];
	openGraphs: any[];
	contentImages: Image[];

	// polls:any[]
	// quizzes:any[]
};
