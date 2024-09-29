<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        handler?: () => void;
        children: Snippet;

    }

    const { handler, children }: Props = $props();
</script>

<style>
    button {
        text-align: center;
        position: relative;
        max-width: 300px;
        justify-self: center;
        width: 100%;
        height: 55px;
        padding: 0 20px;
        color: #928962 !important;
        background: url('/images/labels/label-06.png') no-repeat center;
        background-size: cover;
        align-content: center;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        font-size: 120%;
        box-shadow: inset 0 0 75px black, inset 0 -8px 1px #3b3b3b, inset 0 8px 1px #979797 !important;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        letter-spacing: 2px;
        grid-template-rows: 1fr;
        align-items: center;
        border-image: url('/images/borders/border-04.png');
        border-image-slice: 15;
        border-image-width: 15px;
        border-style: solid;
        border-image-repeat: repeat;
    }
    button:hover {
        box-shadow: inset 0 0 75px #000,inset 0 -17px 30px #b30000,inset 0 -8px 1px #3b3b3b,inset 0 8px 1px #979797!important;
        cursor: pointer;
    }
    button::before {
        background: url('/images/borders/border-28.png') no-repeat;
        left: -12px;
        content: '';
    }
    button::after {
        background: url('/images/borders/border-28.png') no-repeat;
        transform: scaleX(-1);
        right: -12px;
        content: '';
    }
    button::before, button::after {
        position: absolute;
        content: '';
        height: calc(100% + 8px);
        width: 100%;  
        background-repeat: no-repeat; 
        top: -3px;
    }
</style>

<button onclick={() => { handler ? handler() : null }}>
    {@render children()}
</button>