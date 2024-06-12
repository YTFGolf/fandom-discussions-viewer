<script lang="ts">
	import { page } from '$app/stores';

	function navLinkClass(page: string, route: string) {
		if (page === route) {
			return 'nav-link active';
		}
		return 'nav-link';
	}
</script>

<nav class="navbar navbar-expand-md">
	<div class="container-fluid">
		<ul class="navbar-nav nav-underline">
			<li class="nav-item">
				<a href="/" class={navLinkClass($page.url.pathname, '/')}>Home</a>
			</li>
			<li class="nav-item">
				<a href="/login" class={navLinkClass($page.url.pathname, '/login')}>Login</a>
			</li>
			<li class="nav-item">
				<a href="/test" class={navLinkClass($page.url.pathname, '/test')}>Test</a>
			</li>
		</ul>
	</div>
</nav>
