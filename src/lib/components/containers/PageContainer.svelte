<script lang="ts">
	import type { Snippet } from "svelte";

type Props = {
    class?: string;
    children: Snippet;
}

let { class: className, children }: Props = $props();
</script>

<div class="page-layout border-01 m-auto max-w-7xl top-left-shadow relative {className} p-2 mobile:p-5">
	
    {@render children()}
</div>
<style>
    .page-layout {
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('/images/backgrounds/background39.png');
    }
</style>