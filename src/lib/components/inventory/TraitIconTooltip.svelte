<script lang="ts">
	import type { ITrait } from "$lib/entities/Trait";
	import Tooltip from "$lib/components/ui/tooltip/Tooltip.svelte";

	type Props = {
		trait?: ITrait | null;
		class?: string;
		size?: string;
	};

	let { trait, class: CLASS = "", size = "60px" }: Props = $props();
</script>

{#if trait && trait.name}
	<Tooltip>
		<span
			class={`item-trait-icon trait-icon border-04`}
			style="--size: {size}; background: url('/images/traits/{trait.name.toLowerCase().replaceAll(' ', '-')}.png'), black"
		>
		</span>
		{#snippet content()}
			<div class="flex flex-col gap-2 background-28 border-35 p-5">
				<h1 class="header-underline">{trait.name}</h1>
				<p class="">{trait.description}</p>
			</div>
		{/snippet}
	</Tooltip>
{:else}
	<span class="item-trait-icon trait-icon lock-icon border-04" style="--size: {size};"></span>
{/if}

<style>
	.item-trait-icon {
		grid-area: traitIcon;
		background-repeat: no-repeat !important;
		background-position: center !important;
		height: var(--size);
		width: var(--size);
		background-size: 65% !important;
		box-sizing: border-box;
		display: inline-block;
		box-shadow: inset 0 4px 2px white;
		position: relative;
		background-color: #000;
	}
	.item-trait-icon::after {
		background-color: #0000 !important;
	}
	.tooltip {
		display: none;
	}
	.item-trait-icon:hover .tooltip {
		display: grid;
		position: relative;
		top: 0;
		bottom: 0;
		left: 0;
		padding: 1.5rem;
		z-index: 1000;
		background: linear-gradient(0deg, #000000cf, #00000030), url("/images/backgrounds/background29.png");
		background-size: cover;
		text-transform: none;
		grid-auto-flow: row;
		grid-row-gap: 5px;
		box-shadow: inset 0 0 10px 5px #000000;
		width: max-content;
		text-align: left;
	}
</style>
