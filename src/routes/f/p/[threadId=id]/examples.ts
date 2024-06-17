import type { DocModel } from '$lib/controllers/types/jsonModel';
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

const examplesObj: Thread = {
	_embedded: {
		'doc:posts': examplesRaw.map((e) => {
			return {
				jsonModel: JSON.stringify(e),
				_embedded: { attachments: attachments },
			};
		}),
	},
};

export const examples: Promise<typeof examplesObj> = new Promise((resolve) => {
	resolve(examplesObj);
});
