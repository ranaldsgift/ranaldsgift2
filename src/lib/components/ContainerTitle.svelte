<script lang="ts">
	import type { Snippet } from "svelte";

    const { class: CLASS, children }: { class?: string, children: Snippet} = $props();
</script>

<style>
    span {
        display: grid;
        box-shadow: inset 0 9px 6px -5px #fff, inset 0 -12px 20px -6px #6a371d !important;
        color: #f0f0f0;
        background: #000;
        text-align: center;
        align-items: center;
        min-height: 33px;
    }
</style>

<span class="border-01 {CLASS}">
    {@render children()}
</span>