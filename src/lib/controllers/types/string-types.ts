import type { JsonModel } from './jsonModel';

export type Source =
	| 'DISCUSSIONS'
	| 'CURATION_CMS'
	| 'MOBILE_APP_ARTICLES'
	| 'MOBILE_APP_VIDEOS'
	| 'MOBILE_APP_FEED'
	| 'DESKTOP_WEB_DISCUSSIONS'
	| 'MOBILE_WEB_DISCUSSIONS'
	| 'MIGRATED_POST'
	| 'CONSOLIDATED_APP_ANDROID'
	| 'CONSOLIDATED_APP_IOS'
	| 'COMMUNITY_APP_IOS'
	| 'UNCATEGORIZED'
	| 'COMMUNITY_APP_ANDROID'
	| 'DESKTOP_WEB_FEPO'
	| 'MOBILE_WEB_FEPO'
	| 'IOS_APP_FEPO'
	| 'ANDROID_APP_FEPO'
	| 'MIGRATED_WALL_POST'
	| 'MIGRATED_ARTICLE_COMMENT';

export type Funnel = 'TEXT' | 'LINK' | 'IMAGE' | 'POLL' | 'QUIZ';
// appears to alter how you can edit your thing. Poll only lets you edit
// the poll (although that doesn't even work), Text only lets you edit text

/** If data needs at least one of `jsonModel`, `body` or `rawContent` */
export type HasData =
	| { jsonModel: JsonModel; body?: string; rawContent?: string }
	| { body: string; rawContent?: string }
	| { rawContent: string };
