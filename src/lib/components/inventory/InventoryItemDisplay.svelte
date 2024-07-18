<script lang="ts">
	import type { IProperty } from "$lib/entities/Property";
	import type { ITrait } from "$lib/entities/Trait";
	import type { IWeapon } from "$lib/entities/Weapon";
	import PropertyHelper from "$lib/helpers/PropertyHelper";
	import TraitIcon from "./TraitIcon.svelte";

	type Props = {
		property1?: IProperty;
		property2?: IProperty;
		trait?: ITrait;
		weapon?: IWeapon;
		header?: string;
		powerLevel?: number;
		properties: IProperty[];
		traits: ITrait[];
	};

	let {
		property1 = $bindable(),
		property2 = $bindable(),
		trait = $bindable(),
		weapon = $bindable(),
		header,
		powerLevel = $bindable(300),
		properties,
		traits,
	}: Props = $props();
</script>

<div class="inventory-item-display-container {weapon ? 'weapon' : 'jewelry'}">
	<p class="inventory-item-header border-01">{weapon ? weapon.name : header}</p>
	<div class="inventory-item-summary-container border-01">
		<p class="item-power-level">{powerLevel}</p>
		{#if weapon && weapon.stamina}
			<div class="item-stamina">
				<div class="stamina-angle-background">
					<div class={`stamina-angle stamina-angle-${weapon.blockAngle}`}><div class="stamina-icon"></div></div>
				</div>
				<p class="item-stamina-text">{weapon.stamina}</p>
			</div>
		{/if}
		<div class="item-properties-container">
			<div class="relative">
				<li class="item-property-1">
					{property1 ? `+ ${property1.maximumValue.toFixed(1)}${PropertyHelper.getModifier(property1)} ${property1.name}` : ""}
				</li>
				<select bind:value={property1}>
					{#each properties as property}
						<option value={property}>{property.name}</option>
					{/each}
				</select>
			</div>
			<div class="relative">
				<li class="item-property-2">
					{property2 ? `+ ${property2.maximumValue.toFixed(1)}${PropertyHelper.getModifier(property2)} ${property2.name}` : ""}
				</li>
				<select bind:value={property2}>
					{#each properties as property}
						<option value={property}>{property.name}</option>
					{/each}
				</select>
			</div>
		</div>
		{#if trait}
			<div class="item-trait-container">
				<TraitIcon {trait}></TraitIcon>
				<div class="relative">
					<p class="item-trait-name">{trait.name}</p>
					<select bind:value={trait}>
						{#each traits as trait}
							<option value={trait}>{trait.name}</option>
						{/each}
					</select>
				</div>
				<p class="item-trait-description">{trait.description}</p>
			</div>
		{/if}
	</div>
	{#if weapon && weapon.tooltips}
		<p class="inventory-item-footer border-01">
			{#each weapon.tooltips as tooltip, index}
				{#if index < weapon.tooltips.length - 1}
					{`${tooltip.name}, `}
				{:else}
					{`${tooltip.name}`}
				{/if}
			{/each}
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
		color: #db7e16;
		align-content: center;
		display: grid;
		background: radial-gradient(65% 85% at bottom, #a81c1c, black);
		text-align: center;
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
