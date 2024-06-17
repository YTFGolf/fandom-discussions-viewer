import type { JsonModel } from '$lib/controllers/types/jsonModel';

export type Attachments = {
	atMentions: {
		id: string;
	}[];
	openGraphs: {
		originalUrl: string;
		siteName: string | number | boolean;
	}[];
	contentImages: {
		id?: number;
		position?: number;
		url: string;
		width: number;
		height: number;
		mediaType?: string;
	}[];

	polls: any[];
	quizzes: any[];
};

export type Post = {
	jsonModel: string;
	_embedded: {
		attachments: Attachments[];
	};
};
