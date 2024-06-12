<script lang="ts">
	import { page } from '$app/stores';

	function navLinkClass(route: string) {
		if ($page.url.pathname === route) {
			return 'nav-link active';
		}
		return 'nav-link';
	}
</script>

<nav class="navbar navbar-expand-md">
	<div class="container-fluid">
		<ul class="navbar-nav nav-underline">
			<li class="nav-item">
				<a href="/" class={navLinkClass('/')}>Home</a>
			</li>
			<li class="nav-item">
				<a href="/login" class={navLinkClass('/login')}>Login</a>
			</li>
			<li class="nav-item">
				<a href="/test" class={navLinkClass('/test')}>Test</a>
			</li>
		</ul>
	</div>
</nav>
