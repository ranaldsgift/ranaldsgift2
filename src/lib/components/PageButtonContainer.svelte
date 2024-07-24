<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
    }

    const { children }: Props = $props();
</script>

<div class="fixed z-10 top-[38px] left-[150px]">
    {@render children()}
</div>
