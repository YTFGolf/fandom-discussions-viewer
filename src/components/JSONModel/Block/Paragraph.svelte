<script lang="ts">
	$$restProps;

	export let content = null;
</script>

{#if content}
	<p><strong>{JSON.stringify(content)}</strong></p>
{:else}
	<p>&nbsp;</p>
{/if}
