<script lang="ts">
	import ContainerTitle from "$lib/components/ContainerTitle.svelte";
	import ItemSelect from "$lib/components/inventory/ItemSelect.svelte";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { IWeapon } from "$lib/entities/Weapon";
	import InventoryItemDisplay from "../inventory/InventoryItemDisplay.svelte";
	import { PropertiesStore, TraitsStore } from "$lib/stores/DataStores.ts";
	import type { IProperty } from "$lib/entities/Property";
	import type { ITrait } from "$lib/entities/Trait";

	enum InventoryTabState {
		Primary = "primary",
		Secondary = "secondary",
		Equipment = "equipment",
	}

	let { build = $bindable() }: { build: ICareerBuild } = $props();

	let inventoryTabState = $state<InventoryTabState>(InventoryTabState.Primary);

	const primaryWeaponSelectHandler = (item: IWeapon) => {
		if (!item.traits.map((item) => item.id).includes(build.primaryWeapon.trait.id)) {
			build.primaryWeapon.trait = item.traits[0];
		}
		if (!item.properties.map((item) => item.id).includes(build.primaryWeapon.property1.id)) {
			build.primaryWeapon.property1 = item.properties[0];
		}
		if (!item.properties.map((item) => item.id).includes(build.primaryWeapon.property2.id)) {
			build.primaryWeapon.property2 = item.properties[1];
		}
	};

	const secondaryWeaponSelectHandler = (item: IWeapon) => {
		if (!item.traits.map((item) => item.id).includes(build.secondaryWeapon.trait.id)) {
			build.secondaryWeapon.trait = item.traits[0];
		}
		if (!item.properties.map((item) => item.id).includes(build.secondaryWeapon.property1.id)) {
			build.secondaryWeapon.property1 = item.properties[0];
		}
		if (!item.properties.map((item) => item.id).includes(build.secondaryWeapon.property2.id)) {
			build.secondaryWeapon.property2 = item.properties[1];
		}
	};

	let necklaceProperties: IProperty[] = $state([]);
	let charmProperties: IProperty[] = $state([]);
	let trinketProperties: IProperty[] = $state([]);

	let necklaceTraits: ITrait[] = $state([]);
	let charmTraits: ITrait[] = $state([]);
	let trinketTraits: ITrait[] = $state([]);

	let loadPropertiesAndTraits = async () => {
		const { items: propertiesData } = await PropertiesStore.loadData();
		necklaceProperties = propertiesData.filter((property) => property.category.name === "necklace");
		charmProperties = propertiesData.filter((property) => property.category.name === "charm");
		trinketProperties = propertiesData.filter((property) => property.category.name === "trinket");

		const { items: traitsData } = await TraitsStore.loadData();
		necklaceTraits = traitsData.filter((trait) => trait.category.name === "defence_accessory");
		charmTraits = traitsData.filter((trait) => trait.category.name === "offence_accessory");
		trinketTraits = traitsData.filter((trait) => trait.category.name === "utility_accessory");

		if (!build.necklace) {
			build.necklace = {
				trait: necklaceTraits[0],
				property1: necklaceProperties[0],
				property2: necklaceProperties[1],
			};
		}

		if (!build.charm) {
			build.charm = {
				trait: charmTraits[0],
				property1: charmProperties[0],
				property2: charmProperties[1],
			};
		}

		if (!build.trinket) {
			build.trinket = {
				trait: trinketTraits[0],
				property1: trinketProperties[0],
				property2: trinketProperties[1],
			};
		}
	};
</script>

<div class="container-tabs inventory-container top-left-shadow self-start">
	<div class="container-tabs-list grid grid-flow-col grid-cols-3">
		<button
			style={inventoryTabState !== InventoryTabState.Primary ? "filter: grayscale(1);" : ""}
			onclick={() => {
				inventoryTabState = InventoryTabState.Primary;
			}}
		>
			<ContainerTitle>Primary</ContainerTitle>
		</button>
		<button
			style={inventoryTabState !== InventoryTabState.Secondary ? "filter: grayscale(1);" : ""}
			onclick={() => {
				inventoryTabState = InventoryTabState.Secondary;
			}}
		>
			<ContainerTitle>Secondary</ContainerTitle>
		</button>
		<button
			style={inventoryTabState !== InventoryTabState.Equipment ? "filter: grayscale(1);" : ""}
			onclick={() => {
				inventoryTabState = InventoryTabState.Equipment;
			}}
		>
			<ContainerTitle>Equipment</ContainerTitle>
		</button>
	</div>
	<div class={inventoryTabState !== InventoryTabState.Primary ? "hidden" : ""}>
		<ItemSelect
			title="primary"
			bind:selectedItem={build.primaryWeapon.weapon}
			items={build.career.primaryWeapons}
			handler={primaryWeaponSelectHandler}
		></ItemSelect>
		<InventoryItemDisplay
			bind:trait={build.primaryWeapon.trait}
			bind:property1={build.primaryWeapon.property1}
			bind:property2={build.primaryWeapon.property2}
			weapon={build.primaryWeapon.weapon}
			properties={build.primaryWeapon.weapon.properties}
			traits={build.primaryWeapon.weapon.traits}
		></InventoryItemDisplay>
	</div>
	<div class={inventoryTabState !== InventoryTabState.Secondary ? "hidden" : ""}>
		<ItemSelect
			title="secondary"
			bind:selectedItem={build.secondaryWeapon.weapon}
			items={build.career.secondaryWeapons}
			handler={secondaryWeaponSelectHandler}
		></ItemSelect>
		<InventoryItemDisplay
			bind:trait={build.secondaryWeapon.trait}
			bind:property1={build.secondaryWeapon.property1}
			bind:property2={build.secondaryWeapon.property2}
			weapon={build.secondaryWeapon.weapon}
			properties={build.secondaryWeapon.weapon.properties}
			traits={build.secondaryWeapon.weapon.traits}
		></InventoryItemDisplay>
	</div>
	<div class="jewelry-tab {inventoryTabState !== InventoryTabState.Equipment ? 'hidden' : ''}">
		{#await loadPropertiesAndTraits()}
			<span>Loading Necklaces, Charms and Trinkets...</span>
		{:then}
			<InventoryItemDisplay
				bind:trait={build.necklace.trait}
				bind:property1={build.necklace.property1}
				bind:property2={build.necklace.property2}
				properties={necklaceProperties}
				traits={necklaceTraits}
				header="Necklace"
			></InventoryItemDisplay>
			<InventoryItemDisplay
				bind:trait={build.charm.trait}
				bind:property1={build.charm.property1}
				bind:property2={build.charm.property2}
				properties={charmProperties}
				traits={charmTraits}
				header="Charm"
			></InventoryItemDisplay>
			<InventoryItemDisplay
				bind:trait={build.trinket.trait}
				bind:property1={build.trinket.property1}
				bind:property2={build.trinket.property2}
				properties={trinketProperties}
				traits={trinketTraits}
				header="Trinket"
			></InventoryItemDisplay>
		{/await}
		<!-- <InventoryItemDisplay trait={state.traits[2]} properties={[state.properties[4], state.properties[5]]} item={{name: 'Necklace', propertyCategory: 'necklace', traitCategory: 'necklace'}}></InventoryItemDisplay>
		<InventoryItemDisplay trait={state.traits[3]} properties={[state.properties[6], state.properties[7]]} item={{name: 'Charm', propertyCategory: 'charm', traitCategory: 'charm'}}></InventoryItemDisplay>
		<InventoryItemDisplay trait={state.traits[4]} properties={[state.properties[8], state.properties[9]]} item={{name: 'Trinket', propertyCategory: 'trinket', traitCategory: 'trinket'}}></InventoryItemDisplay> -->
	</div>
</div>

<style>
	.inventory-container {
		grid-area: careerInventory;
	}
</style>
