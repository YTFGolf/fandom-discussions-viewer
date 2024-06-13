export type Poll = {
	answers: Answer[];
	question: string;
};

/** If one answer is an ImageAnswer all must be. */
export type Answer = {
	text: string;
	image?: ImageAnswer;

	/** Does nothing */
	position: number;
};

/** If ImageAnswer is used then there must be an even amount of answers */
export type ImageAnswer = {
	url: string;
	height: number;
	width: number;
	/** My favourite mediaType is https://www.youtube.com/watch?v=dQw4w9WgXcQ */
	mediaType?: string;
};
