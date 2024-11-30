<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
    }

    const { children }: Props = $props();
</script>

<div class="page-button-container tablet:fixed tablet:top-[25px] top-0 flex gap-5 pl-3 sticky justify-start background-14 tablet:!bg-none">
    {@render children()}
</div>

<style>
	div > :global(a) {
        text-decoration: none;
	}    
    .page-button-container {
        box-shadow: inset 0  -10px 10px -10px rgba(255, 255, 255, 0.3), inset 0 -20px 20px -20px rgba(255, 255, 255, 0.1);
        z-index: 101;
    }
    @media (min-width: 768px) {
        .page-button-container {
            box-shadow: none;
        }
    }
</style>

