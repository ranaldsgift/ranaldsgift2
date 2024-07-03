<script lang="ts">
	import type { ITrait } from "$lib/entities/Trait";

	type Props = {
		trait: ITrait;
		class?: string;
	};

	let { trait, class: CLASS = "" }: Props = $props();
</script>

<span
	class={`item-trait-icon trait-icon border-04`}
	style="background: url('/images/traits/{trait.name.toLowerCase().replaceAll(' ', '-')}.png'), black"
></span>

<style>
	.item-trait-icon {
		grid-area: traitIcon;
		background-repeat: no-repeat !important;
		background-position: center !important;
		height: 60px;
		background-size: auto !important;
		box-sizing: border-box;
	}
	.item-trait-icon::after {
		background-color: #0000 !important;
	}
</style>
