<script lang="ts">
	import { page } from '$app/stores';
	import { parseWiki } from '$lib/wiki';

	function navLinkClass(page: string, route: string) {
		if (page === route) {
			return 'nav-link active';
		}
		return 'nav-link';
	}

	// const wiki: string | null | undefined = $page.data?.wiki;
	const wiki = 'en.battle-cats';
	if (wiki) {
		console.log(parseWiki(wiki));
	}
</script>

<nav class="navbar navbar-expand-md">
	<ul class="navbar-nav nav-underline">
		<li class="nav-item">
			<a href="/" class={navLinkClass($page.url.pathname, '/')}>Home</a>
		</li>
		<li class="nav-item">
			<a href="/login" class={navLinkClass($page.url.pathname, '/login')}>Login</a>
		</li>
		<li class="nav-item">
			<a href="/demo" class={navLinkClass($page.url.pathname, '/demo')}>Demo</a>
		</li>
		<li class="nav-item">
			<a href="/test" class={navLinkClass($page.url.pathname, '/test')}>Test</a>
		</li>

		<li class="nav-item">
			<a
				href="/f/p/4400000000000822918"
				class={navLinkClass($page.url.pathname, '/f/p/4400000000000822918')}
			>
				Store
			</a>
		</li>
	</ul>
</nav>

<style>
	.navbar-nav {
		display: flex;
		list-style: none;
		padding: 1em;
	}

	.nav-item {
		padding: 0.5em;
	}

	.nav-link {
		text-decoration: none;
		transition-duration: 0.15s;
		border-bottom: 0.125rem solid transparent;
		padding: 0.5rem;
	}

	.nav-link.active {
		font-weight: 700;
		border-bottom-color: currentColor;
	}

	.nav-link:hover {
		border-bottom-color: currentColor;
	}
</style>
