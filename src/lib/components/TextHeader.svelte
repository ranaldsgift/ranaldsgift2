<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    }

    const { children }: Props = $props();
</script>

<h1 class="uppercase text-center text-[2rem] bg-gradient-to-b from-[#fae031] to-[#da8f1c] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
    {@render children()}
</h1>