<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICharmBuild } from "$lib/entities/builds/CharmBuild";
	import type { INecklaceBuild } from "$lib/entities/builds/NecklaceBuild";
	import type { ITrinketBuild } from "$lib/entities/builds/TrinketBuild";
	import type { IWeaponBuild } from "$lib/entities/builds/WeaponBuild";
	import type { IProperty } from "$lib/entities/Property";
	import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import PropertyHelper from "$lib/helpers/PropertyHelper";
	import InventoryItemView from "../inventory/InventoryItemView.svelte";
	import ItemIcon from "../inventory/ItemIcon.svelte";
	import TraitIcon from "../inventory/TraitIcon.svelte";
	import Tooltip from "../ui/tooltip/Tooltip.svelte";

	type ItemBuild = IWeaponBuild | INecklaceBuild | ICharmBuild | ITrinketBuild;

	type Props = {
		build: ICareerBuild;
		class?: string;
	};

	const { build, class: CLASS }: Props = $props();
</script>

<div class="build-summary-container flex flex-wrap gap-5 justify-center {CLASS}">
	<div class="flex flex-wrap gap-5 justify-center">
		{@render itemSummary(build.primaryWeapon.weapon?.name || "Primary Weapon", build.primaryWeapon, ItemTypeEnum.Weapon)}
		{@render itemSummary(build.secondaryWeapon.weapon?.name || "Secondary Weapon", build.secondaryWeapon, ItemTypeEnum.Weapon)}
	</div>
	<div class="flex flex-wrap gap-5 justify-center">
		{@render itemSummary("Necklace", build.necklace, ItemTypeEnum.Necklace)}
		{@render itemSummary("Charm", build.charm, ItemTypeEnum.Charm)}
		{@render itemSummary("Trinket", build.trinket, ItemTypeEnum.Trinket)}
	</div>
</div>

{#snippet itemSummary(name: string, item: ItemBuild, itemType: ItemTypeEnum)}
		<div class="item-summary-container relative mt-10">
			<div class="h-full">
				<div class="absolute top-[0px] z-[1] mt-[-40px] left-[50%] translate-x-[-50%]">
				<Tooltip>
					<div class="flex items-center justify-center w-full gap-1">
						<ItemIcon itemBuild={item} {itemType}></ItemIcon>
						{#if item.trait}
						<TraitIcon trait={item.trait}></TraitIcon>
						{/if}	
					</div>
					{#snippet content()}
						<InventoryItemView itemBuild={item} itemType={itemType}></InventoryItemView>
					{/snippet}
				</Tooltip>				
			</div>
				<div class="item-info-container pt-[1.5rem] pb-[0px] px-[1rem]">
					{#if item.rarity === ItemRarityEnum.White}
					<div class="grid min-h-[5rem] items-center">
						<span class="text-center text-2xl">{item.weapon?.name || itemType.toString()}</span>
					</div>
					{/if}
					{#if item.trait}
					<div class="header-underline grid">
						<span class="item-trait-name text-center">{item.trait.name}</span>
					</div>
					{/if}
					{#if item.property1 || item.property2}
					<div class="grid grid-cols-[min-content_max-content] gap-x-2 items-center justify-self-center">
						{#if item.property1}
						{@render itemProperty(item.property1, item.property1Value)}
						{/if}
						{#if item.property2}
						{@render itemProperty(item.property2, item.property2Value)}
						{/if}
					</div>
					{/if}
				</div>
			</div>
		</div>
{/snippet}

{#snippet itemProperty(property: IProperty, value: number | undefined)}
		<span class="modifier text-right">
			{value ? value.toFixed(1) : property.maximumValue?.toFixed(1)}{PropertyHelper.getModifier(property)}
			{#if value && value !== property.maximumValue}
			<span class="max-value">({property.maximumValue}{PropertyHelper.getModifier(property)})</span>
			{/if}
		</span>
		<span class="property-name justify-self-start">{property.name}</span>
{/snippet}

<style>
	.build-summary-container {
		grid-area: buildSummary;
		color: #f0f0f0;
		text-align: left;
	}

	.build-melee-summary,
	.build-range-summary,
	.build-jewelry-summary {
		display: grid;
		grid-template-areas: "itemIcon itemSummaryHeader" "traitIcon propertyContainer";
		grid-template-columns: 60px auto;
		grid-template-rows: 60px auto;
		grid-row-gap: 10px;
		grid-column-gap: 10px;
	}
	.item-info-container {
		grid-area: propertyContainer;
		align-content: start;
		display: grid;
	}
	.item-property {
		list-style: none;
		display: grid;
		grid-template-columns: min-content 1fr;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
	}
	.property-name {
		color: #79b2f7;
		font-size: 1.2rem;
		font-weight: 500;
	}
	.modifier {
		color: #9f9065;
		font-size: 0.9rem;
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
		font-size: 1.2rem;
		color: #30e158;
	}
	.item-summary-header *, .item-info-container * {
		position: relative;
	}
	.build-summary-container > div {
		position: relative;
		box-sizing: border-box;
		flex: auto;
	}
	.item-summary-container {
		//flex: 1;
		min-width: 170px;
	}
	.item-summary-container::before {
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

	.item-summary-container::after {
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
	.max-value {
		color: #808080;
		margin-left: 0.25rem;
	}
</style>
