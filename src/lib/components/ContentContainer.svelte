<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
        class?: string;
    }

    const { children, class: CLASS }: Props = $props();
</script>


<div class="content-container background-14 border-02 p-5 {CLASS}">
    {@render children()}
</div>

<style>
	.content-container {
        font-size: 1.3rem;
		background: linear-gradient(270deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url("/images/backgrounds/background14.webp");
	}
</style>
