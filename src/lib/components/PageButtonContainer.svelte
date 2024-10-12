<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
    }

    const { children }: Props = $props();
</script>

<div class="page-button-container tablet:fixed z-[10001] tablet:top-[25px] top-0 flex gap-5 pl-3 sticky justify-start background-14 tablet:!bg-none">
    {@render children()}
</div>

<style>
	div > :global(a) {
        text-decoration: none;
	}
    .page-button-container {
        box-shadow: inset 0 -10px 10px -10px rgba(255, 255, 255, 0.3), inset 0 -20px 20px -20px rgba(255, 255, 255, 0.1);
    }
</style>

