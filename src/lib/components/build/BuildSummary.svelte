<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import TraitIcon from "../inventory/TraitIcon.svelte";
	import WeaponIcon from "../inventory/WeaponIcon.svelte";

	const { build }: { build: ICareerBuild } = $props();
</script>

<div class="build-summary-container">
	<div class="build-melee-summary">
		<div class="item-summary-header">
			<p class="item-name">{build.primaryWeapon.weapon.name}</p>
			<p class="item-trait-name">{build.primaryWeapon.trait.name}</p>
		</div>
		<WeaponIcon weapon={build.primaryWeapon.weapon}></WeaponIcon>
		<TraitIcon trait={build.primaryWeapon.trait}></TraitIcon>
		<div class="property-container">
			<li class="item-property-1">{`+ ${build.primaryWeapon.property1.maximumValue}% ${build.primaryWeapon.property1.name}`}</li>
			<li class="item-property-2">{`+ ${build.primaryWeapon.property2.maximumValue}% ${build.primaryWeapon.property2.name}`}</li>
		</div>
	</div>
	<div class="build-range-summary">
		<div class="item-summary-header">
			<p class="item-name">{build.secondaryWeapon.weapon.name}</p>
			<p class="item-trait-name">{build.secondaryWeapon.trait.name}</p>
		</div>
		<WeaponIcon weapon={build.secondaryWeapon.weapon}></WeaponIcon>
		<TraitIcon trait={build.secondaryWeapon.trait}></TraitIcon>
		<div class="property-container">
			<li class="item-property-1">{`+ ${build.secondaryWeapon.property1.maximumValue}% ${build.secondaryWeapon.property1.name}`}</li>
			<li class="item-property-2">{`+ ${build.secondaryWeapon.property2.maximumValue}% ${build.secondaryWeapon.property2.name}`}</li>
		</div>
	</div>
	<div class="build-jewelry-summary necklace-summary">
		<div class="item-summary-header">
			<p class="item-name">Necklace</p>
			<p class="item-trait-name">{build.necklace.trait.name}</p>
		</div>
		<div class="jewelry-icon necklace-icon border-04"></div>
		<TraitIcon trait={build.necklace.trait}></TraitIcon>
		<div class="necklace-property-container property-container">
			<li class="item-property-1">{`+ ${build.necklace.property1.maximumValue}% ${build.necklace.property1.name}`}</li>
			<li class="item-property-2">{`+ ${build.necklace.property2.maximumValue}% ${build.necklace.property2.name}`}</li>
		</div>
	</div>
	<div class="build-jewelry-summary charm-summary">
		<div class="item-summary-header">
			<p class="item-name">Charm</p>
			<p class="item-trait-name">{build.charm.trait.name}</p>
		</div>
		<div class="jewelry-icon charm-icon border-04"></div>
		<TraitIcon trait={build.charm.trait}></TraitIcon>
		<div class="charm-property-container property-container">
			<li class="item-property-1">{`+ ${build.charm.property1.maximumValue}% ${build.charm.property1.name}`}</li>
			<li class="item-property-2">{`+ ${build.charm.property2.maximumValue}% ${build.charm.property2.name}`}</li>
		</div>
	</div>
	<div class="build-jewelry-summary trinket-summary">
		<div class="item-summary-header">
			<p class="item-name">Trinket</p>
			<p class="item-trait-name">{build.trinket.trait.name}</p>
		</div>
		<div class="jewelry-icon trinket-icon border-04"></div>
		<TraitIcon trait={build.trinket.trait}></TraitIcon>
		<div class="trinket-property-container property-container">
			<li class="item-property-1">{`+ ${build.trinket.property1.maximumValue}% ${build.trinket.property1.name}`}</li>
			<li class="item-property-2">{`+ ${build.trinket.property2.maximumValue}% ${build.trinket.property2.name}`}</li>
		</div>
	</div>
</div>

<style>
	.build-summary-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)) !important;
		grid-area: buildSummary;
		color: #f0f0f0;
		text-align: left;
		grid-gap: 15px;
	}
	.build-summary-container li {
		list-style-type: none;
	}
	.build-summary-container .weapon-background {
		cursor: initial;
	}
	.build-melee-summary,
	.build-range-summary {
		display: grid;
		grid-template-areas: "itemSummaryHeader itemSummaryHeader itemSummaryHeader" "weaponIcon traitIcon empty" "propertyContainer propertyContainer propertyContainer";
		grid-template-columns: 60px 60px auto;
		grid-template-rows: 1fr 60px 1fr;
		grid-row-gap: 10px;
		grid-column-gap: 10px;
	}
	.build-jewelry-summary {
		display: grid;
		grid-template-areas: "itemSummaryHeader itemSummaryHeader itemSummaryHeader" "jewelryIcon traitIcon empty" "propertyContainer propertyContainer propertyContainer";
		grid-template-columns: 60px 60px auto;
		grid-template-rows: 1fr 60px 1fr;
		grid-row-gap: 10px;
		grid-column-gap: 10px;
	}
	.build-melee-summary .trait-icon,
	.build-range-summary .trait-icon {
		grid-area: traitIcon;
	}
	.build-melee-summary .weapon-icon,
	.build-range-summary .weapon-icon {
		grid-area: weaponIcon;
	}
	.property-container {
		grid-area: propertyContainer;
		align-content: start;
		display: grid;
	}
	.item-summary-header {
		grid-area: itemSummaryHeader;
		font-size: 1.4em;
		align-self: end;
	}
	.item-name {
		position: relative;
	}
	.item-name::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0;
		background-image: linear-gradient(90deg, #808080b3 10%, #80808000);
	}
	.build-summary-container .item-trait-name {
		font-size: 0.8em;
	}
	.build-summary-container > div {
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

	.view-build-page .build-summary-container {
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important;
	}
	.build-summary-container .trait-icon > .tooltip {
		width: calc(100% + 20px);
		transform: translateY(calc(-100% - 10px)) translateX(-103px);
		box-sizing: border-box;
	}
	.build-summary-container .weapon-icon > .tooltip {
		width: calc(100% + 20px);
		transform: translateY(calc(-100% - 10px)) translateX(-33px);
		box-sizing: border-box;
	}
</style>
