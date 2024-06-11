import type { JsonModel } from './jsonModel';

/** If data needs at least one of `jsonModel`, `body` or `rawContent` */
export type HasData =
	| { jsonModel: JsonModel; body?: string; rawContent?: string }
	| { body: string; rawContent?: string }
	| { rawContent: string };

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

/**
 * Has a meaning in the web editor: polls you can only edit poll (although you
 * still can't submit your edits so what's the point) and text you can only edit
 * the body. Not tested the others.
 */
export type Funnel = 'TEXT' | 'LINK' | 'IMAGE' | 'POLL' | 'QUIZ';

export type ContainerType = 'FORUM' | 'WALL' | 'ARTICLE_COMMENT';

/**
 * I don't entirely know what this does, but it seems to be something like
 * returning posts when calling `getThread` for example.
 */
export type ResponseGroup = 'small' | 'full';
/** `trending` is only compatible with `sortDirection=descending` */
export type SortKey = 'creation_date' | 'trending';

/**
 * desc = latest first. (= top post/most recent)
 * asc = first post
 */
export type SortDirection = 'ascending' | 'descending';
