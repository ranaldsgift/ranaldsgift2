<script lang="ts">
	import type { Snippet } from "svelte";

    const { class: CLASS, children }: { class?: string, children: Snippet} = $props();
</script>

<style>
    span {
        display: grid;
        box-shadow: inset 0 9px 6px -6px #fff,inset 0 -9px 20px -6px #6a371d;
        color: #f0f0f0;
        background: #000;
        text-align: center;
        align-items: center;
        min-height: 33px;
        padding-top: 3px;
    }
</style>

<span class="border-01 {CLASS}">
    {@render children()}
</span>