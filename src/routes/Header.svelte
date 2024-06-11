<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
				<a href="/login">Login</a>
			</li>
			<li aria-current={$page.url.pathname === '/test' ? 'page' : undefined}>
				<a href="/test">Test</a>
			</li>
		</ul>
	</nav>
</header>
