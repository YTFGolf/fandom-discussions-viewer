<script lang="ts">
	let username = '';
	let password = '';
	let status = {
		color: '',
		message: ''
	};

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault();
		status = { color: '', message: 'Sending...' };

		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});

		const cookie = res.headers.get('cookie');
		// TODO check error code
		if (!cookie) {
			console.error('Response does not contain cookie');
			status = { color: 'red', message: 'Error while logging in' };
			return;
		}
		document.cookie = cookie;

		status = { color: 'green', message: `Successfully logged in as ${username}` };

		// window.location.replace('/');
	}
</script>

<form on:submit={handleSubmit}>
	<label for="username">Username:</label>
	<input type="text" id="username" bind:value={username} required />

	<label for="password">Password:</label>
	<input type="password" id="password" bind:value={password} required />

	<button type="submit">Login</button>
</form>

<p style="color: {status.color}">{status.message}</p>
