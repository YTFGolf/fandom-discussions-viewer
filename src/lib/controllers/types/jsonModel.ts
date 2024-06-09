/**
 * Fandom provides zero validation of the jsonModel. All listed required
 * parameters are only what won't break the website, not what the API actually
 * checks for. Optional types are ones where I don't know what they do but the
 * website puts in.
 *
 * Every type of object here is indexable. This means you can literally put in
 * `{hot: 'garbage'}` and it makes its way into the post. You don't even need
 * to make sure it's well-formed, although doing something wrong will lead to
 * errors whenever you're trying to view/edit the post.
 */
export type DocModel = {
	// technically these can be inline
	content: Block[];

	/** I would advise you to make this `'doc'` but you do whatever you want to do. */
	type?: any;
};

/** Block-level objects */
type Block = Paragraph | Image | OpenGraph | HtmlList | CodeBlock;

/**
 * Technically you can put a paragraph inside a paragraph. Breaks the editor though.
 *
 * You can also put stuff like ListItem in there, but this just looks weird.
 */
type Paragraph = {
	type: 'paragraph';
	/** Technically optional, if only the type then just creates a blank line. */
	content?: TextItem[];
};

type Image = {
	type: 'image';
	attrs: {
		/** `contentImages[id]` */
		id: number;
	};
};

type HtmlList = {
	type: 'bulletList' | 'orderedList';
	/** Technically optional */
	content: ListItem[];

	attrs?: { createdWith?: string };
};

type ListItem = {
	type: 'listItem';
	/** Technically you can nest lists but it's ugly */
	content: Paragraph[];
};

type CodeBlock = {
	type: 'code_block';
	/** Yes this does mean you can apply marks to stuff inside a code block */
	content: TextItem[];
};

type OpenGraph = {
	type: 'openGraph';
	attrs: {
		/** `openGraphs[id]` */
		id: number;

		url?: string;
		wasAddedWithInlineLink?: boolean;
	};
};

/** Inline objects */
type TextItem = {
	type: 'text';
	/** Should not be empty */
	text: string;

	marks?: Mark[];
};

type Mark = { type: 'em' | 'strong' } | Link | Mention;

type Link = {
	type: 'link';
	attrs: { href: string; title?: string | null };
};

type Mention = {
	type: 'mention';
	attrs: {
		userId: string;
		href?: string | null;
		userName?: string;
	};
};

export type JsonModel = string | DocModel;
