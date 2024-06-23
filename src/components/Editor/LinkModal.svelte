<svelte:options accessors />

<script lang="ts">
	export let element: HTMLElement | undefined = undefined;

	export let handleSubmit: (e: SubmitEvent) => any;
</script>

<div bind:this={element}><p>hi</p></div>

<form on:submit={handleSubmit}>
	<label for="url">URL</label>
	<input type="url" id="url" />

	<button type="submit">Add</button>
</form>
