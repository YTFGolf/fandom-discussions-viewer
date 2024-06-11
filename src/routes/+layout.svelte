<script>
	import Header from './Header.svelte';
	import './bootstrap.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<!-- <footer>Footer</footer> -->
</div>
