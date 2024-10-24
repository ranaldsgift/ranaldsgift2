<script lang="ts">
	import type { IItemBuild } from "$lib/entities/builds/CareerBuild";
	import type { IProperty } from "$lib/entities/Property";
	import type { ITrait } from "$lib/entities/Trait";
	import type { IWeapon } from "$lib/entities/Weapon";
	import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import PropertyHelper from "$lib/helpers/PropertyHelper";
	import { getWindowState } from "$lib/state/WindowState.svelte";
	import InventoryItemDialog from "./InventoryItemDialog.svelte";
	import TraitIcon from "./TraitIcon.svelte";

	type Props = {
		itemBuild: IItemBuild;
		itemType: ItemTypeEnum;
		properties: IProperty[];
		traits: ITrait[];
	};

	let { itemBuild = $bindable(), itemType, properties, traits }: Props = $props();

	let windowState = getWindowState();
	let tooltipPosition = $derived<{
		x: "left" | "right" | "center";
		y: "top" | "bottom" | "center";
	}>(!windowState.isWideScreen ? { x: "left", y: "top" } : { x: "center", y: "top" });

	let gradientColor = $derived.by(() => {
		switch (itemBuild.rarity) {
			case ItemRarityEnum.White:
				return "#7d7d7d";
			case ItemRarityEnum.Green:
				return "#144407";
			case ItemRarityEnum.Blue:
				return "#0f284d";
			case ItemRarityEnum.Orange:
				return "#663505";
			default:
				return "#a81c1c";
		}
	});

	let textColor = $derived.by(() => {
		switch (itemBuild.rarity) {
			case ItemRarityEnum.White:
				return "#ffffff";
			case ItemRarityEnum.Green:
				return "#2e8915";
			case ItemRarityEnum.Blue:
				return "#2759a7";
			case ItemRarityEnum.Orange:
				return "#db7315";
			default:
				return "#b2222b";
		}
	});
</script>

<div class="inventory-item-display-container {itemBuild.weapon ? 'weapon' : 'jewelry'}">
	<div class="inventory-item-header border-01" style="--gradientColor: {gradientColor}; --textColor: {textColor};">
		<InventoryItemDialog bind:itemBuild {itemType} />
	</div>
	<div class="inventory-item-summary-container border-01">
		<div class="item-power-level"><input type="number" bind:value={itemBuild.powerLevel} min="0" max="300" /></div>
		{#if itemBuild.weapon?.stamina}
			<div class="item-stamina">
				<div class="stamina-angle-background">
					<div class={`stamina-angle stamina-angle-${itemBuild.weapon.blockAngle}`}><div class="stamina-icon"></div></div>
				</div>
				<p class="item-stamina-text">{itemBuild.weapon.stamina}</p>
			</div>
		{/if}
		<div class="item-properties-container">
			<div class="relative">
				<li class="item-property-1">
					{itemBuild.property1
						? `+ ${itemBuild.property1.maximumValue.toFixed(1)}${PropertyHelper.getModifier(itemBuild.property1)} ${itemBuild.property1.name}`
						: ""}
				</li>
				<select bind:value={itemBuild.property1}>
					{#each properties as property}
						<option value={property}>{property.name}</option>
					{/each}
				</select>
			</div>
			<div class="relative">
				<li class="item-property-2">
					{itemBuild.property2
						? `+ ${itemBuild.property2.maximumValue.toFixed(1)}${PropertyHelper.getModifier(itemBuild.property2)} ${itemBuild.property2.name}`
						: ""}
				</li>
				<select bind:value={itemBuild.property2}>
					{#each properties as property}
						<option value={property}>{property.name}</option>
					{/each}
				</select>
			</div>
		</div>
		{#if itemBuild.trait}
			<div class="item-trait-container">
				<TraitIcon trait={itemBuild.trait} {tooltipPosition}></TraitIcon>
				<div class="relative">
					<p class="item-trait-name">{itemBuild.trait?.name}</p>
					<select bind:value={itemBuild.trait}>
						{#each traits as trait}
							<option value={trait}>{trait.name}</option>
						{/each}
					</select>
				</div>
				<p class="item-trait-description">{itemBuild.trait?.description}</p>
			</div>
		{/if}
	</div>
	{#if itemBuild.weapon?.tooltip}
		<p class="inventory-item-footer border-01">
			{itemBuild.weapon.tooltip}
		</p>
	{/if}
</div>

<style>
	.inventory-item-display-container {
		display: grid;
		grid-template-rows: 60px 1fr 35px;
		grid-template-columns: 1fr;
		grid-template-areas: "itemHeader" "itemSummary" "itemFooter";
	}
	.inventory-item-header {
		grid-area: itemHeader;
		font-size: 170%;
		color: var(--textColor);
		text-shadow: 0 0 10px black;
		align-content: center;
		display: grid;
		background: radial-gradient(65% 85% at bottom, var(--gradientColor), black);
		text-align: center;
		position: relative;
		cursor: pointer;
	}
	.inventory-item-header::before {
		content: "";
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("/images/icons/settings.png") no-repeat right / auto;
		transition: background 0.2s ease-in-out;
	}
	.inventory-item-header:hover::before {
		background: url("/images/icons/settings-hover.png") no-repeat right / auto;
	}
	.inventory-item-footer {
		grid-area: itemFooter;
		color: #30e158;
		align-content: center;
		display: grid;
		background: black;
		text-transform: capitalize;
		text-align: center;
	}
	.inventory-item-summary-container {
		grid-area: itemSummary;
		border-image: url("/images/borders/border-01.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		display: grid;
		grid-template-rows: 1fr 1fr auto;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: "itemPower itemStamina" "itemProperties itemProperties" "itemTrait itemTrait";
		background: url("/images/backgrounds/background22.png");
	}
	.inventory-item-display-container.jewelry {
		grid-template-areas: "itemHeader" "itemSummary";
		grid-template-rows: 60px 1fr;
	}
	.inventory-item-display-container.jewelry .inventory-item-footer {
		display: none;
	}
	.item-power-level::before {
		content: "Power";
		font-size: 20px;
		position: absolute;
		margin-top: -16px;
	}
	.item-power-level {
		grid-area: itemPower;
		font-size: 42px;
		justify-self: left;
		margin-left: 10px;
		margin-top: 24px;
		position: relative;
	}
	.item-power-level input {
		background: none;
		border: none;
		font-size: 42px;
	}
	.item-power-level input:focus {
		outline: none;
	}
	.item-stamina::before {
		content: "Stamina";
		font-size: 20px;
		position: absolute;
		margin-top: -16px;
		right: 0;
	}
	.item-stamina {
		grid-area: itemStamina;
		font-size: 28px;
		justify-self: right;
		margin-right: 10px;
		margin-top: 24px;
		position: relative;
		display: grid;
		grid-auto-flow: column;
		grid-column-gap: 8px;
	}
	.item-properties-container::before {
		content: "Properties:";
		font-size: 16px;
	}
	.item-properties-container {
		grid-area: itemProperties;
		text-align: left;
		margin-left: 10px;
		position: relative;
	}
	.item-properties-container li {
		color: #79b2f7;
		margin-left: 15px;
		list-style-type: square;
	}
	.item-properties-container li::marker {
		margin-top: -2px;
	}
	.item-trait-container {
		grid-area: itemTrait;
		display: grid;
		grid-template-columns: 60px 1fr;
		grid-template-rows: 18px 1fr;
		grid-template-areas: "traitIcon traitName" "traitIcon traitDescription";
		text-align: left;
		padding: 0 10px;
		grid-column-gap: 10px;
	}
	.item-trait-name {
		grid-area: traitName;
		align-self: end;
		color: #30e158;
	}
	.item-trait-description {
		grid-area: traitDescription;
		margin-bottom: 16px;
		min-height: 40px;
		max-width: calc(100% - 50px);
	}
	.inventory-item-display-container.jewelry .item-properties-container {
		margin-top: 10px;
	}
	select {
		position: absolute;
		top: 0px;
		left: 17px;
		border: 0;
		background: none;
		color: #0000;
		margin: 0;
		padding: 0;
		width: 200px;
		-webkit-appearance: none;
		-moz-appearance: none;
		-ms-appearance: none;
		appearance: none;
		outline: 0;
		box-shadow: none;
	}
	select::-ms-expand {
		display: none;
	}
	select > * {
		color: #30e158;
		background: black;
		font-family: "caslon-antique";
	}
	.item-trait-container select {
		grid-area: traitName;
		border: none;
		background: none;
		color: #0000;
		margin: 0;
		padding: 0;
		width: 50%;
	}
	.inventory-item-display-container .item-properties-container li::after,
	.inventory-item-display-container .item-trait-name::after {
		content: "\25BE";
		margin-left: 3px;
	}
	.inventory-item-container-header {
		text-align: center;
	}
</style>
