<script>
	import { page } from '$app/stores';
	import { Navbar, Nav, NavItem, NavLink } from '@sveltestrap/sveltestrap';
</script>

<Navbar expand="md">
	<Nav navbar underline>
		<NavItem>
			<NavLink href="/" class={$page.url.pathname === '/' ? 'active' : ''}>Home</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="/login" class={$page.url.pathname === '/login' ? 'active' : ''}>Login</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="/test" class={$page.url.pathname === '/test' ? 'active' : ''}>Test</NavLink>
		</NavItem>
	</Nav>
</Navbar>
