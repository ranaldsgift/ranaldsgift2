<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
    }

    const { children }: Props = $props();
</script>

<div class="fixed z-10 top-[35px] right-[180px]">
    {@render children()}
</div>
