<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
    }

    const { children }: Props = $props();
</script>

<div class="tablet:fixed z-[10001] tablet:top-[28px] top-0 flex gap-5 mb-2 tablet:ml-[10px] ml-0 tablet:mr-0 mr-4 tablet:pt-0 pt-2 sticky tablet:mb-0 tablet:justify-start justify-end">
    {@render children()}
</div>
