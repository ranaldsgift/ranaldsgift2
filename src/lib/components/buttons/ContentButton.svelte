<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
        class?: string;
        url?: string;
    }

    const { children, class: CLASS, url }: Props = $props();
</script>

<div class="p-4 border-10 background-30 !bg-cover !bg-no-repeat transition-shadow duration-300 ease-in-out {CLASS} {url ? 'hover:shadow-[0_0_8px_2px_gold] relative' : ''}">
    {#if url}
        <a href={url} target="_blank" class="absolute inset-0 z-10"> </a>
    {/if}
    {@render children()}
</div>