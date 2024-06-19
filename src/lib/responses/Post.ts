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

export type UserDetails = {
	avatarUrl: string | null;
	badgePermission: string;
	id: string;
	name: string;
};

export type Post = {
	jsonModel: string;
	_embedded: {
		attachments: Attachments[];
		userData: [
			{
				hasReported: boolean;
				hasUpvoted: boolean;
				permissions: ('canDelete' | 'canUndelete' | 'canModerate' | 'canEdit')[];
			},
		];
	};
	rawContent: string;

	isContentSuppressed: boolean;
	isDeleted: boolean;
	isEditable: boolean;
	isLocked: boolean;
	isReported: boolean;

	createdBy: UserDetails;
	creationDate: any;

	id: string;
	threadId: string;

	upvoteCount: number;

	// Appear only if these actions have actually been done
	/** Disappears if the post has been undeleted */
	lastDeletedBy?: UserDetails;
	lastEditedBy?: UserDetails;
};
