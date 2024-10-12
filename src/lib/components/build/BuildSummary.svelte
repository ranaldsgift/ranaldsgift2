<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICharmBuild } from "$lib/entities/builds/CharmBuild";
	import type { INecklaceBuild } from "$lib/entities/builds/NecklaceBuild";
	import type { ITrinketBuild } from "$lib/entities/builds/TrinketBuild";
	import type { IWeaponBuild } from "$lib/entities/builds/WeaponBuild";
	import PropertyHelper from "$lib/helpers/PropertyHelper";
	import { getWindowState } from "$lib/state/WindowState.svelte";
	import TraitIcon from "../inventory/TraitIcon.svelte";
	import WeaponIcon from "../inventory/WeaponIcon.svelte";

	type ItemBuild = IWeaponBuild | INecklaceBuild | ICharmBuild | ITrinketBuild;

	type Props = {
		build: ICareerBuild;
		class?: string;
	};

	const { build, class: CLASS }: Props = $props();
	
	let windowState = getWindowState();
	let tooltipPositionWeapon = $derived<{
		x: "left" | "right" | "center";
		y: "top" | "bottom" | "center";
	}>(!windowState.isWideScreen ? { x: "left", y: "top" } : { x: "center", y: "top" });
	let tooltipPositionTrait = $derived<{
		x: "left" | "right" | "center";
		y: "top" | "bottom" | "center";
	}>(!windowState.isWideScreen ? { x: "center", y: "top" } : { x: "center", y: "top" });
</script>

<div class="build-summary-container {CLASS}">
	<div class="build-melee-summary">
		{@render itemSummary(build.primaryWeapon.weapon?.name || "Primary Weapon", build.primaryWeapon)}
	</div>
	<div class="build-range-summary">
		{@render itemSummary(build.secondaryWeapon.weapon?.name || "Secondary Weapon", build.secondaryWeapon)}
	</div>
	<div class="build-jewelry-summary necklace-summary">
		{@render itemSummary("Necklace", build.necklace, "jewelry-icon necklace-icon border-04")}
	</div>
	<div class="build-jewelry-summary charm-summary">
		{@render itemSummary("Charm", build.charm, "jewelry-icon charm-icon border-04")}
	</div>
	<div class="build-jewelry-summary trinket-summary">
		{@render itemSummary("Trinket", build.trinket, "jewelry-icon trinket-icon border-04")}
	</div>
</div>

{#snippet itemSummary(name: string, item: ItemBuild, itemIcon?: string)}
	<div class="item-summary-header">
		<p class="item-name">{name}</p>
		{#if item.trait}
		<p class="item-trait-name">{item.trait.name}</p>
		{/if}
	</div>
	{#if "weapon" in item && item.weapon}
		<WeaponIcon weapon={item.weapon} tooltipPosition={tooltipPositionWeapon}></WeaponIcon>
	{:else if itemIcon}
	<div class={`relative ${itemIcon}`}></div>
	{/if}
	{#if item.trait}
	<TraitIcon trait={item.trait} tooltipPosition={tooltipPositionTrait}></TraitIcon>
	{/if}
	<div class="property-container">
		{#if item.property1}
		<li class="item-property-1">{`+ ${item.property1.maximumValue.toFixed(1)}${PropertyHelper.getModifier(item.property1)} ${item.property1.name}`}</li>
		{/if}
		{#if item.property2}
		<li class="item-property-2">{`+ ${item.property2.maximumValue.toFixed(1)}${PropertyHelper.getModifier(item.property2)} ${item.property2.name}`}</li>
		{/if}
	</div>
{/snippet}

<style>
	.build-summary-container {
		display: flex;
		flex-wrap: wrap;
		grid-area: buildSummary;
		color: #f0f0f0;
		text-align: left;
		grid-gap: 15px;
	}
	
	.build-summary-container > div {
		flex: 1 1 172px;
	} 

	@media (min-width: 1800px) {
		.build-summary-container {
			display: flex;
			flex-wrap: wrap;
		}
		.build-summary-container > div {
			min-width: 172px;
		}
	}

	.build-melee-summary,
	.build-range-summary,
	.build-jewelry-summary {
		display: grid;
		grid-template-areas: "itemSummaryHeader itemSummaryHeader itemSummaryHeader" "itemIcon traitIcon empty" "propertyContainer propertyContainer propertyContainer";
		grid-template-columns: 60px 60px auto;
		grid-template-rows: 1fr 60px 1fr;
		grid-row-gap: 10px;
		grid-column-gap: 10px;
	}
	.property-container {
		grid-area: propertyContainer;
		align-content: start;
		display: grid;
	}
	.property-container li {
		list-style: none;
	}
	.item-summary-header {
		grid-area: itemSummaryHeader;
		font-size: 1.4em;
		align-self: end;
	}
	.item-name {
		position: relative;
		line-height: 1.5rem;
	}
	.item-name::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0;
		background-image: linear-gradient(90deg, #808080b3 10%, #80808000);
	}
	.item-trait-name {
		font-size: 0.8em;
		color: #30e158;
	}
	.item-summary-header *, .property-container * {
		position: relative;
	}
	.build-summary-container > div {
		position: relative;
		box-sizing: border-box;
		padding: 10px 20px;
		color: #c8c8c8;
	}
	.build-summary-container > div::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(315deg, #ffffff1c, transparent);
		border-image: url("/images/borders/border-05.png");
		border-image-slice: 30;
		border-image-width: 30px;
		border-style: solid;
		border-image-repeat: repeat;
		box-sizing: border-box;
		padding: 10px 20px;
		border-width: 1px;
		backdrop-filter: blur(5px);
		color: #c8c8c8;
	}

	.build-summary-container > div::after {
		content: "";
		position: absolute;
		top: -2px;
		left: -2px;
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		border-image: url("/images/borders/border-12.png");
		border-image-slice: 30;
		border-image-width: 30px;
		border-style: solid;
		border-image-repeat: repeat;
		box-sizing: border-box;
		pointer-events: none;
	}
</style>
