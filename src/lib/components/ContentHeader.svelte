<script lang="ts">
	import type { Snippet } from "svelte";
	import TextHeader from "./TextHeader.svelte";

    type Props = {
        children: Snippet;
        class?: string;
    }

    let { children, class: className }: Props = $props();
</script>

<div class="content-header {className}">
    <TextHeader>{@render children()}</TextHeader>
    <div class="divider-21 w-full h-[20px] mb-2"></div>
</div>