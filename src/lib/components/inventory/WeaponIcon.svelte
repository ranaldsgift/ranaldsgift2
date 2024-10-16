<script lang="ts">
	import type { IWeapon } from "$lib/entities/Weapon";
	import Skeleton from "../ui/skeleton/skeleton.svelte";

	type Props = {
		weapon: IWeapon;
		class?: string;
		size?: string;
		tooltipPosition?: {
			x?: "left" | "right" | "center";
			y?: "top" | "bottom" | "center";
		};
	};

	let { weapon, class: CLASS = "", size = "62px", tooltipPosition: position = { x: "left", y: "center" } }: Props = $props();
	let translateX = $derived(
		position.x === "center" ? "translateX(-50%)" : position.x === "right" ? "translateX(-100%)" : "translateX(0%)"
	);
	let translateY = $derived(
		position.y === "bottom" ? "translateY(100%)" : position.y === "top" ? "translateY(-100%)" : "translateY(-25%)"
	);
	let tooltipLeft = $derived(position.x === "center" ? "50%" : "0px");
</script>

{#if weapon}
	<div
		class="weapon-icon border-04 {CLASS}"
		style="--size: {size}; background: url('/images/weapons/{weapon.codename}.png') no-repeat center / cover, 
                        url('/images/backgrounds/item-red.png') no-repeat center / cover;"
	>
		<div
			class="tooltip border-35 max-w-[200px] mobile:max-w-[300px]"
			style="transform: {translateX} {translateY}; --tooltipLeft: {tooltipLeft}"
		>
			<span class="name header-underline">{weapon.name}</span>
			<span class="description">
				{#if weapon && weapon.tooltips}
					{#each weapon.tooltips as tooltip}
						{tooltip.name}<br />
					{/each}
				{/if}
			</span>
		</div>
	</div>
{:else}
	<Skeleton class="w-[{size}] h-[{size}]" />
{/if}

<style>
	.weapon-icon {
		height: var(--size);
		width: var(--size);
		grid-area: itemIcon;
		position: relative;
	}
	.weapon-icon:before:hover {
		display: none !important;
	}
	.weapon-icon {
		box-shadow: inset 0 4px 2px white;
	}
	.weapon-icon.selected {
		border-image: url("/images/borders/border-30.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-width: 1px;
		border-style: solid;
		border-image-repeat: repeat;
	}
	.weapon-icon > .tooltip {
		position: relative;
		top: 0;
		bottom: 0;
		left: var(--tooltipLeft);
		padding: 1.5rem;
		z-index: 1000;
		background: linear-gradient(0deg, #000000cf, #00000030), url("/images/backgrounds/background29.png");
		background-size: cover;
		text-transform: none;
		display: none;
		grid-auto-flow: row;
		grid-row-gap: 5px;
		box-shadow: inset 0 0 10px 5px #000000;
		width: max-content;
		text-align: left;
	}
	.weapon-icon:hover > .tooltip {
		display: grid;
	}
	.tooltip.left {
		left: 0px;
		bottom: calc(100% + 5px);
	}
	.tooltip.right {
		right: 0px;
		bottom: calc(100% + 5px);
	}
	.tooltip.center {
		left: 50%;
		bottom: calc(100% + 5px);
	}

	.weapon-icon .tooltip .description {
		text-transform: capitalize;
	}
</style>
