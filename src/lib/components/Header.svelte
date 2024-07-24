<script lang="ts">
	import type { Snippet } from "svelte";

    const { children }: { children: Snippet } = $props();
</script>

<span>{@render children()}</span>

<style> 
    span {
        background: url('/images/labels/header-03.png') no-repeat center / cover;
        height: 54px;
        width: 105%;
        min-width: 474px;
        text-align: center;
        line-height: 54px;
        color: #dfcfc7;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        font-size: 1.2rem;
    }
</style>