<script>
	import Header from './Header.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/wwr-theme-variables.css" />
	<link rel="stylesheet" href="/styles.css" />
</svelte:head>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<!-- <footer>Footer</footer> -->
</div>
