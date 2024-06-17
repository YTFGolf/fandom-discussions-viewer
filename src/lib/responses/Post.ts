import type { JsonModel } from '$lib/controllers/types/jsonModel';

export type Attachments = {
	atMentions: {
		id: string;
	}[];
	openGraphs: {
		url: string;
		title: string;
		siteName: string;
		imageUrl: string;
		imageHeight: number;
		imageWidth: number;
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
