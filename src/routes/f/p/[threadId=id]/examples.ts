import type { DocModel } from '$lib/controllers/types/jsonModel';

const examplesRaw: DocModel[] = [
	// https://the-battle-doges.fandom.com/f/p/4400000000000033130/r/4400000000000086658
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
		],
	},
];

export const examples = { _embedded: { 'doc:posts': examplesRaw } };
