<script lang="ts">
	import type { ITrait } from "$lib/entities/Trait";

	type Props = {
		trait: ITrait;
		class?: string;
		size?: string;
	};

	let { trait, class: CLASS = "", size = "60px" }: Props = $props();
</script>

<span
	class={`item-trait-icon trait-icon border-04`}
	style="--size: {size}; background: url('/images/traits/{trait.name.toLowerCase().replaceAll(' ', '-')}.png'), black"
></span>

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
	}
	.item-trait-icon::after {
		background-color: #0000 !important;
	}
</style>
