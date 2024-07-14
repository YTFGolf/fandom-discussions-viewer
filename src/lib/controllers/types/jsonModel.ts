/**
 * Fandom provides zero validation of the jsonModel besides checking it is not
 * empty (even then, that's only for calls that require data). All listed
 * required parameters are only what won't break the website, not what the API
 * actually checks for. Any parameters listed as `T | null | undefined` do
 * nothing.
 *
 * Every type of object here is indexable. This means you can literally put in
 * `{hot: 'garbage'}` and it makes its way into the post. You don't even need
 * to make sure it's well-formed, although doing something wrong will lead to
 * errors whenever you're trying to view/edit the post (`Malformed content`).
 *
 * ```css
 * .entity-content {
 * 	white-space: pre-wrap;
 * }
 * ```
 * Beautiful. Put a `\n` anywhere and it shows up like that.
 *
 * The Fandom editor itself does a decent job at removing weird stuff like
 * having multiple paragraphs inside a ListItem or having newlines inside a line
 * but doesn't fix everything.
 */
export type DocModel = {
	// technically these can be inline
	content: Block[];

	/** I would advise you to make this `'doc'` but you do whatever you want to do. */
	type?: any;
};

/** Block-level objects */
export type Block = Paragraph | Image | OpenGraph | HtmlList | CodeBlock;

/**
 * Technically you can put a paragraph inside a paragraph. Breaks the editor though.
 *
 * You can also put stuff like ListItem in there, but this just looks weird.
 */
export type Paragraph = {
	type: 'paragraph';
	/** Technically optional, if only the type then just creates a blank line. */
	content?: TextItem[];
};

export type Image = {
	type: 'image';
	attrs: {
		/** `contentImages[id]` */
		id: number;
	};
};

export type HtmlList = {
	type: 'bulletList' | 'orderedList';
	/** Technically optional */
	content: ListItem[];

	attrs?: { createdWith?: string | null };
};

export type ListItem = {
	type: 'listItem';
	/** Technically you can nest lists but it's ugly */
	content: Paragraph[];
};

export type CodeBlock = {
	type: 'code_block';
	/**
	 * Yes this does mean you can apply marks to stuff inside a code block. If
	 * you want text to be bold you need to wrap it in multiple strong tags.
	 */
	content: TextItem[];
};

export type OpenGraph = {
	type: 'openGraph';
	attrs: {
		/** `openGraphs[id]` */
		id: number;

		url?: string | null;
		wasAddedWithInlineLink?: boolean | null;
	};
};

/** Inline objects */
export type TextItem = {
	type: 'text';
	/** Should not be empty */
	text: string;

	marks?: Mark[];
};

/**
 * All apply. Applies in reverse order, so `{em}{strong}` would give
 * `<strong><em>{data}</em></strong>`.
 *
 * If has both link and mention, then mention always takes priority if you click
 * the link (probably because it's regarded as a browser event).
 */
export type Mark = { type: 'em' | 'strong' } | Link | Mention;

export type Link = {
	type: 'link';
	attrs: {
		href: string;
		/** Has no effect when viewing but does have an effect in the editor. */
		title?: string;
	};
};

export type Mention = {
	type: 'mention';
	attrs: {
		userId: string;
		href?: string | null;
		userName?: string | null;
		/** Custom data point for copying and pasting pinglists */
		notifyUser?: boolean;
	};
};

export type JsonModel = string | DocModel;
