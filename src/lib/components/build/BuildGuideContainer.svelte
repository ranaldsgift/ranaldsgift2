<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<div class="build-description-container border-09 py-5 px-8">
	{@render children()}
</div>

<style>
	.build-description-container {
		background: linear-gradient(180deg, rgba(43, 18, 18, 0.2784313725490196) 35%, rgba(0, 0, 0, 0.30196078431372547));
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}
</style>