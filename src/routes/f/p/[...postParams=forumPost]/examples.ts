import type { DocModel } from '$lib/controllers/types/jsonModel';
import type { Attachments, Post } from '$lib/responses/Post';
import type { Thread } from '$lib/responses/Thread';

const examplesRaw: DocModel[] = [
	{
		type: 'doc',
		content: [
			{ type: 'paragraph', content: [{ type: 'text', text: 'Normal text ahi' }] },
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Alkdfa;d ' },
					{ type: 'text', marks: [{ type: 'strong' }], text: 'bold ' },
					{ type: 'text', text: 'end bold' },
				],
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'H ' },
					{ type: 'text', marks: [{ type: 'em' }], text: 'italics ' },
					{ type: 'text', text: 'end ' },
					{ type: 'text', marks: [{ type: 'strong' }], text: 'bold' },
					{ type: 'text', text: ' hi' },
				],
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'J' },
					{ type: 'text', marks: [{ type: 'em' }, { type: 'strong' }], text: 'bitalics' },
					{ type: 'text', text: 'a' },
				],
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'This ' },
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: null },
							},
						],
						text: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
					},
					{ type: 'text', text: ' and ' },
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: null },
							},
						],
						text: 'customised',
					},
					{ type: 'text', text: ' link' },
				],
			},
			{
				type: 'bulletList',
				attrs: { createdWith: '- ' },
				content: [
					{
						type: 'listItem',
						content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bullet' }] }],
					},
					{
						type: 'listItem',
						content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Second' }] }],
					},
				],
			},
			{ type: 'paragraph', content: [{ type: 'text', text: 'I' }] },
			{
				type: 'orderedList',
				attrs: { createdWith: '1. ' },
				content: [
					{
						type: 'listItem',
						content: [{ type: 'paragraph', content: [{ type: 'text', text: 'List' }] }],
					},
					{
						type: 'listItem',
						content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Second' }] }],
					},
				],
			},
			{ type: 'code_block', content: [{ type: 'text', text: 'something' }] },
			{ type: 'paragraph', content: [{ type: 'text', text: 'And' }] },
			{ type: 'image', attrs: { id: 0 } },
			{ type: 'paragraph', content: [{ type: 'text', text: 'Hi' }] },
			{
				type: 'openGraph',
				attrs: {
					id: 0,
					url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
					wasAddedWithInlineLink: true,
				},
			},
			{ type: 'paragraph', content: [{ type: 'text', text: 'Imagen' }] },
			{ type: 'paragraph' },
			{ type: 'paragraph', content: [{ type: 'text', text: 'Cool' }] },
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Text with ' },
					{
						type: 'text',
						marks: [
							{
								type: 'mention',
								attrs: { href: null, userId: '27706221', userName: 'TheWWRNerdGuy' },
							},
						],
						text: '@TheWWRNerdGuy',
					},
					{ type: 'text', text: ' inside' },
				],
			},
		],
	},
	{
		content: [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						marks: [
							{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
							{ type: 'mention', attrs: { userId: '27706221' } },
						],
						text: 'Definitely not a rickroll',
					},
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: { href: 'https://www."<pre>t</pre>youtube.com/watch?v=dQw4w9WgXcQ' },
							},
							{ type: 'mention', attrs: { userId: '27706221\'"><pre>t</pre>' } },
						],
						text: 'Definitely not a rickroll',
					},
					{ type: 'text', text: 'J' },
					{ type: 'text', marks: [{ type: 'em' }, { type: 'strong' }], text: 'bi<br>talics' },
					{ type: 'text', text: 'a' },
				],
			},
		],
	},
	{
		type: 'doc',
		content: [
			{
				type: 'paragraph',
				content: [{ type: 'text', marks: [{ type: 'strong' }], text: 'Short answer:' }],
			},
			{ type: 'paragraph', content: [{ type: 'text', text: 'Because this:' }] },
			{
				type: 'code_block',
				content: [
					{
						type: 'text',
						text: '{{#ifexist: {{#var: sandbox}}\n   | [[{{#var: sandbox}}|sandbox]] <!--\n   --><small>(<!--\n     -->[[Special:EditPage/{{#var: sandbox}}|edit]] &#124; <!--\n     -->[{{fullurl: Special:ComparePages\n         | page1={{FULLPAGENAMEE:{{#var: base page}}}}&page2={{FULLPAGENAMEE:{{#var: current page}}}}\n         }} diff]<!--\n   -->)</small>\n      \n   | sandbox <small>(<!--\n   -->[{{fullurl: {{FULLPAGENAMEE:{{#var: sandbox}}}}\n     | action=edit&preload={{#var: preload-sandbox}}\n     }} create] &#124; [{{fullurl: {{FULLPAGENAMEE:{{#var: sandbox}}}}\n     | action=edit&preload={{FULLPAGENAMEE:{{#var: base page}}}}\n     }} mirror]<!--\n   -->)</small>\n   \n   }}',
					},
				],
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: '... is easier for humans to read and understand than this:' },
				],
			},
			{
				type: 'code_block',
				content: [
					{
						type: 'text',
						text: '{{#ifexist:{{#var:sandbox}}|[[{{#var:sandbox}}|sandbox]] <small>([[Special:EditPage/{{#var:sandbox}}|edit]] &#124; [{{fullurl:Special:ComparePages|page1={{FULLPAGENAMEE{{#var:base page}}}}&page2={{FULLPAGENAMEE:{{#var:current page}}}}}} diff])</small>|sandbox <small>([{{fullurl:{{FULLPAGENAMEE:{{#var:sandbox}}}}|action=edit&preload={{#var:preload-sandbox}}}} create] &#124; [{{fullurl:{{FULLPAGENAMEE:{{#var:sandbox}}}}|action=edit&preload={{FULLPAGENAMEE:{{#var:base page}}}}}} mirror])</small>}}',
					},
				],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [{ type: 'text', marks: [{ type: 'strong' }], text: 'Long answer:' }],
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'In order to really understand this matter, you have to have a basic notion of:',
					},
				],
			},
			{
				type: 'bulletList',
				attrs: { createdWith: null },
				content: [
					{
						type: 'listItem',
						content: [
							{
								type: 'paragraph',
								content: [
									{ type: 'text', text: 'what is ' },
									{
										type: 'text',
										marks: [
											{
												type: 'link',
												attrs: {
													href: 'https://medium.com/@thepawanluhana/what-is-beautifying-your-code-and-why-do-you-need-it-966d7d592214',
													title: null,
												},
											},
										],
										text: 'beautifying a code',
									},
									{ type: 'text', text: ' and ' },
									{
										type: 'text',
										marks: [
											{
												type: 'link',
												attrs: {
													href: 'https://www.quora.com/What-is-beautiful-code-Why-do-some-developers-believe-that-developers-today-write-less-beautiful-code-than-they-did-in-the-past-with-languages-such-as-C-and-C/answer/Ken-Gregg',
													title: null,
												},
											},
										],
										text: "why it's important",
									},
								],
							},
						],
					},
				],
			},
			{
				type: 'bulletList',
				attrs: { createdWith: null },
				content: [
					{
						type: 'listItem',
						content: [
							{
								type: 'paragraph',
								content: [
									{ type: 'text', text: 'how MediaWiki handles ' },
									{
										type: 'text',
										marks: [
											{
												type: 'link',
												attrs: {
													href: 'https://meta.wikimedia.org/wiki/Help:Newlines_and_spaces',
													title: null,
												},
											},
										],
										text: 'newlines and spaces',
									},
									{ type: 'text', text: '.' },
								],
							},
						],
					},
				],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Empty comment tags can be useful, or not.' }],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Example of ' },
					{ type: 'text', marks: [{ type: 'strong' }], text: 'useless empty comments' },
				],
			},
			{
				type: 'code_block',
				content: [
					{
						type: 'text',
						text: "''Last month I bought:'' <!--\n-->chicken breasts, <!--\n-->oily fish, <!--\n-->luncheon meat, <!--\n-->chopped tomatoes, <!--\n-->soup, <!--\n-->dried fruit, <!--\n-->pasta, <!--\n-->rice, <!--\n-->bread, <!--\n-->flour, <!--\n-->breakfast cereal, <!--\n-->salt, <!--\n-->pepper, <!--\n-->fresh herbs, <!--\n-->honey, <!--\n-->vinegar, <!--\n-->sugar, <!--\n-->milk, <!--\n-->eggs, <!--\n-->cheese, <!--\n-->yogurt, <!--\n-->cooking oil and <!--\n-->butter.",
					},
				],
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'The code above will appear on the page as:' }],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [
					{ type: 'text', marks: [{ type: 'em' }], text: 'Last month I bought:' },
					{
						type: 'text',
						text: ' chicken breasts, oily fish, luncheon meat, chopped tomatoes, soup, dried fruit, pasta, rice, bread, flour, breakfast cereal, salt, pepper, fresh herbs, honey, vinegar, sugar, milk, eggs, cheese, yogurt, cooking oil and butter.',
					},
				],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'The empty comments here are useless because the code below can produce the same result on the page, and is much cleaner and easier to read in source mode:',
					},
				],
			},
			{
				type: 'code_block',
				content: [
					{
						type: 'text',
						text: "''Last month I bought:''\nchicken breasts,\noily fish,\nluncheon meat,\nchopped tomatoes,\nsoup,\ndried fruit,\npasta,\nrice,\nbread,\nflour,\nbreakfast cereal,\nsalt,\npepper,\nfresh herbs,\nhoney,\nvinegar,\nsugar,\nmilk,\neggs,\ncheese,\nyogurt,\ncooking oil and\nbutter.",
					},
				],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Example of ' },
					{ type: 'text', marks: [{ type: 'strong' }], text: 'useful empty comments' },
				],
			},
			{
				type: 'code_block',
				content: [
					{
						type: 'text',
						text: "''Last month I bought:'' <!--\n\n-->chicken breasts,\noily fish,\nluncheon meat, <!--\n\n-->chopped tomatoes,\nsoup,\ndried fruit, <!--\n\n-->pasta,\nrice,\nbread,\nflour,\nbreakfast cereal, <!--\n\n-->salt,\npepper,\nfresh herbs,\nhoney,\nvinegar,\nsugar, <!--\n\n-->milk,\neggs,\ncheese,\nyogurt, <!--\n\n-->cooking oil and\nbutter.",
					},
				],
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Here, the editor used empty comments to separate the products into categories that made sense for them, without even writing within the comments: Meat & Fish, Tinned & Dried, Grains & Bread, Condiments, etc; all that while avoiding the text being split into several paragraphs.',
					},
				],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'In these examples I used a simple grocery list. You can escalate the concept in your mind to try and apply it on freaking complicated templates with dozens of nested conditionals.',
					},
				],
			},
			{ type: 'paragraph' },
			{
				type: 'paragraph',
				content: [
					{ type: 'text', marks: [{ type: 'strong' }], text: '"' },
					{
						type: 'text',
						marks: [{ type: 'em' }],
						text: 'How well an individual editor beautifies their code has more to do with having empathy for the next person (perhaps the future you) to read and/or maintain the code.',
					},
					{ type: 'text', marks: [{ type: 'strong' }], text: '"' },
				],
			},
		],
	},
];

const attachments = [
	{
		atMentions: [
			{
				id: '27706221',
				avatarUrl: 'https://vignette.wikia.nocookie.net/messaging/images/e/e8/Avatar2.jpg',
				name: 'TheWWRNerdGuy',
				badgePermission: '',
			},
		],
		contentImages: [
			{
				id: 4395,
				position: 0,
				url: 'https://static.wikia.nocookie.net/cad8d7f8-2e3b-44d2-bd7e-a09a9d436f15',
				width: 444,
				height: 301,
				mediaType: 'image/png',
			},
		],
		openGraphs: [
			{
				id: '4400000000000000889',
				postRevisionId: 4400000000000092700,
				siteId: 2730969,
				url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				siteName: 'YouTube',
				title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
				type: 'video.other',
				imageUrl: 'https://static.wikia.nocookie.net/f05bb310-1a0b-4241-9553-0f56b91161d7',
				description:
					"The official video for “Never Gonna Give You Up” by Rick Astley. \n\nThe new album 'Are We There Yet?' is out now: Download here: https://RickAstley.lnk.to/AreWeThereYetFA/itunes\n\n“Never Gonna Give You Up” was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody”.  The album was itself a UK number one and would go on to sell over 15 million copies worldwide.\n\nThe legendary video was directed by Simon West – who later went on to make Hollywood blockbusters such as Con Air, Lara Croft – Tomb Raider and The Expendables 2.  The video passed the 1bn YouTube views milestone on 28 July 2021.\n\nSubscribe to the official Rick Astley YouTube channel: https://RickAstley.lnk.to/YTSubID\n\nFollow Rick Astley:\nFacebook: https://RickAstley.lnk.to/FBFollowID \nTwitter: https://RickAstley.lnk.to/TwitterID \nInstagram: https://RickAstley.lnk.to/InstagramID \nWebsite: https://RickAstley.lnk.to/storeID \nTikTok: https://RickAstley.lnk.to/TikTokID\n\nListen to Rick Astley:\nSpotify: https://RickAstley.lnk.to/SpotifyID \nApple Music: https://RickAstley.lnk.to/AppleMusicID \nAmazon Music: https://RickAstley.lnk.to/AmazonMusicID \nDeezer: https://RickAstley.lnk.to/DeezerID \n\nLyrics:\nWe’re no strangers to love\nYou know the rules and so do I\nA full commitment’s what I’m thinking of\nYou wouldn’t get this from any other guy\n\nI just wanna tell you how I’m feeling\nGotta make you understand\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\nWe’ve known each other for so long\nYour heart’s been aching but you’re too shy to say it\nInside we both know what’s been going on\nWe know the game and we’re gonna play it\n\nAnd if you ask me how I’m feeling\nDon’t tell me you’re too blind to see\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\n#RickAstley #NeverGonnaGiveYouUp #WheneverYouNeedSomebody #OfficialMusicVideo",
				originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
				videoSecureUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
				videoType: 'text/html',
				videoHeight: 720,
				videoWidth: 1280,
				imageHeight: 720,
				imageWidth: 1280,
				dateRetrieved: {
					epochSecond: 1705595519,
					nano: 0,
				},
			},
		],
		polls: [],
		quizzes: [],
	},
];

const postObj: Post = {
	rawContent: '',
	jsonModel: '',

	isContentSuppressed: false,
	isDeleted: false,
	isEditable: false,
	isLocked: false,
	isReported: false,

	createdBy: {
		id: '27706221',
		avatarUrl: 'https://vignette.wikia.nocookie.net/messaging/images/e/e8/Avatar2.jpg',
		name: 'TheWWRNerdGuy',
		badgePermission: 'badge:sysop',
	},
	creationDate: {
		epochSecond: 12,
		nano: 0,
	},

	id: '',
	threadId: '',

	upvoteCount: 0,

	_embedded: {
		attachments: attachments,
		userData: [{ hasReported: false, hasUpvoted: false, permissions: [] }],
	},
};

const examplesObj: Thread = {
	_embedded: {
		'doc:posts': examplesRaw.map((e) => {
			return {
				...postObj,
				jsonModel: JSON.stringify(e),
			};
		}),
	},
};

export const examples: Promise<typeof examplesObj> = new Promise((resolve) => {
	resolve(examplesObj);
});

// https://the-battle-doges.fandom.com/f/p/4400000000000033130/r/4400000000000086658
// https://community.fandom.com/f/p/4400000000003692230/r/4400000000014035327
