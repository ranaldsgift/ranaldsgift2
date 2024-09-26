<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
    }

    const { children }: Props = $props();
</script>

<div class="fixed z-[10001] top-[28px] left-[150px] flex gap-5">
    {@render children()}
</div>
