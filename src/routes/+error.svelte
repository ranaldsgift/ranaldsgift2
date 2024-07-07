<script>
	import { page } from "$app/stores";
</script>

<svelte:head><title>Holy Sigmar! - augs.tools</title></svelte:head>

<div class="h-full w-full grid">
	<h2 class="text-2xl">Holy Sigmar!</h2>
	<p>{$page.status} - {$page.error?.message}</p>
</div>
