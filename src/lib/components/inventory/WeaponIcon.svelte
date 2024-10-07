<script lang="ts">
	import type { IWeapon } from "$lib/entities/Weapon";
	import Skeleton from "../ui/skeleton/skeleton.svelte";

	type Props = {
		weapon: IWeapon;
		class?: string;
		size?: string;
		tooltipPosition?: "left" | "right" | "center";
	};

	let { weapon, class: CLASS = "", size = "62px", tooltipPosition = "left" }: Props = $props();
</script>

{#if weapon}
	<div
		class="weapon-icon border-04 {CLASS}"
		style="--size: {size}; background: url('/images/weapons/{weapon.codename}.png') no-repeat center / calc(100% + 8px), 
                        url('/images/backgrounds/icon-background-2.png') no-repeat center / 100% 100%;"
	>
		<div class="tooltip border-35 {tooltipPosition}">
			<span class="name header-underline">{weapon.name}</span>
			<span class="description">
				{weapon && weapon.tooltips ? weapon.tooltips.map((tooltip) => tooltip.name).join(", ") : ""}
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
	.weapon-icon:hover {
		cursor: pointer;
	}
	.weapon-icon > .tooltip {
		padding: 1.5rem;
		z-index: 1000;
		background: linear-gradient(0deg, #000000cf, #00000030), url("/images/backgrounds/background29.png");
		background-size: cover;
		text-transform: none;
		position: absolute;
		display: none;
		grid-auto-flow: row;
		grid-row-gap: 5px;
		box-shadow: inset 0 0 10px 5px #000000;
		width: max-content;
		text-align: left;
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
		transform: translateX(-50%);
		bottom: calc(100% + 5px);
	}

	.weapon-icon:hover > .tooltip {
		display: grid;
	}

	.weapon-icon .tooltip .description {
		text-transform: capitalize;
	}
</style>
