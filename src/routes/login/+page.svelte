<script lang="ts">
	import { goto } from '$app/navigation';
	import HTTP from '$lib/HTTPCodes';

	let username = '';
	let password = '';
	let status = {
		color: '',
		message: '',
	};

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
	) {
		event.preventDefault();
		status = { color: '', message: 'Sending...' };

		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
		});
		if (res.status !== HTTP.OK) {
			const body = await res.json();
			status = { color: 'red', message: 'Error while logging in: ' + body.title };
			return;
		}

		status = { color: 'green', message: `Successfully logged in as ${username}` };

		setTimeout(() => {
			window.location.reload();
		}, 1000);
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login page" />
</svelte:head>

<form on:submit={handleSubmit}>
	<label for="username">Username:</label>
	<input type="text" id="username" bind:value={username} required />

	<label for="password">Password:</label>
	<input type="password" id="password" bind:value={password} required />

	<button class="wds-button" type="submit">Login</button>
</form>

<p style="color: {status.color}">{status.message}</p>
