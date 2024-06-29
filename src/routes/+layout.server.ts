import type { Cookies } from '@sveltejs/kit';

const wiki = 'en.battle-cats';

export function load({ cookies }: { cookies: Cookies }) {
	cookies.set('wiki', wiki, { path: '/' });

	return {
		wiki: cookies.get('wiki'),
	};
}
