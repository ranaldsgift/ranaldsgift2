<script lang="ts">
	import ContainerTitle from "$lib/components/ContainerTitle.svelte";
	import ItemSelect from "$lib/components/inventory/ItemSelect.svelte";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { IWeapon } from "$lib/entities/Weapon";
	import InventoryItemDisplay from "../inventory/InventoryItemDisplay.svelte";
	import type { IProperty } from "$lib/entities/Property";
	import type { ITrait } from "$lib/entities/Trait";
	import type { InventoryTab } from "$lib/state/HeroesPageState.svelte";
	import { PropertiesStore, TraitsStore } from "$lib/stores/DataStores";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";

	type Props = {
		build: ICareerBuild;
		inventoryTab: InventoryTab;
	};

	let { build = $bindable(), inventoryTab = $bindable() }: Props = $props();

	const primaryWeaponSelectHandler = (item: IWeapon) => {
		if (build.primaryWeapon.trait && !item.traits.map((item) => item.id).includes(build.primaryWeapon.trait.id)) {
			build.primaryWeapon.trait = item.traits[0];
		}
		if (build.primaryWeapon.property1 && !item.properties.map((item) => item.id).includes(build.primaryWeapon.property1.id)) {
			build.primaryWeapon.property1 = item.properties[0];
		}
		if (build.primaryWeapon.property2 && !item.properties.map((item) => item.id).includes(build.primaryWeapon.property2.id)) {
			build.primaryWeapon.property2 = item.properties[1];
		}

		build.primaryWeapon.weaponId = item.id;
	};

	const secondaryWeaponSelectHandler = (item: IWeapon) => {
		if (build.secondaryWeapon.trait && !item.traits.map((item) => item.id).includes(build.secondaryWeapon.trait.id)) {
			build.secondaryWeapon.trait = item.traits[0];
		}
		if (build.secondaryWeapon.property1 && !item.properties.map((item) => item.id).includes(build.secondaryWeapon.property1.id)) {
			build.secondaryWeapon.property1 = item.properties[0];
		}
		if (build.secondaryWeapon.property2 && !item.properties.map((item) => item.id).includes(build.secondaryWeapon.property2.id)) {
			build.secondaryWeapon.property2 = item.properties[1];
		}

		build.secondaryWeapon.weaponId = item.id;
	};

	let necklaceProperties: IProperty[] = $state([]);
	let charmProperties: IProperty[] = $state([]);
	let trinketProperties: IProperty[] = $state([]);

	let necklaceTraits: ITrait[] = $state([]);
	let charmTraits: ITrait[] = $state([]);
	let trinketTraits: ITrait[] = $state([]);

	// TODO - Probably a good idea to make helper functions to retreive properties and traits by category
	const loadData = async () => {
		const propertyData = await PropertiesStore.loadData();
		const traitsData = await TraitsStore.loadData();

		necklaceProperties = propertyData.items.filter((property) => property.category === "necklace");
		charmProperties = propertyData.items.filter((property) => property.category === "charm");
		trinketProperties = propertyData.items.filter((property) => property.category === "trinket");

		necklaceTraits = traitsData.items.filter((trait) => trait.category === "defence_accessory");
		charmTraits = traitsData.items.filter((trait) => trait.category === "offence_accessory");
		trinketTraits = traitsData.items.filter((trait) => trait.category === "utility_accessory");

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

		return {
			necklaceProperties,
			charmProperties,
			trinketProperties,
			necklaceTraits,
			charmTraits,
			trinketTraits,
		};
	};

	$effect(() => {
		loadData();
	});
</script>

<div class="container-tabs inventory-container top-left-shadow self-start">
	<div class="container-tabs-list grid grid-flow-col grid-cols-3">
		<button
			style={inventoryTab !== "PRIMARY" ? "filter: grayscale(1);" : ""}
			onclick={() => {
				inventoryTab = "PRIMARY";
			}}
		>
			<ContainerTitle>Primary</ContainerTitle>
		</button>
		<button
			style={inventoryTab !== "SECONDARY" ? "filter: grayscale(1);" : ""}
			onclick={() => {
				inventoryTab = "SECONDARY";
			}}
		>
			<ContainerTitle>Secondary</ContainerTitle>
		</button>
		<button
			style={inventoryTab !== "EQUIPMENT" ? "filter: grayscale(1);" : ""}
			onclick={() => {
				inventoryTab = "EQUIPMENT";
			}}
		>
			<ContainerTitle>Equipment</ContainerTitle>
		</button>
	</div>
	<div class={inventoryTab !== "PRIMARY" ? "hidden" : ""}>
		<ItemSelect
			title="primary"
			bind:selectedItem={build.primaryWeapon.weapon}
			items={build.career.primaryWeapons}
			handler={primaryWeaponSelectHandler}
		></ItemSelect>
		<InventoryItemDisplay
			bind:itemBuild={build.primaryWeapon}
			itemType={ItemTypeEnum.Weapon}
			properties={build.primaryWeapon.weapon?.properties ?? []}
			traits={build.primaryWeapon.weapon?.traits ?? []}
		></InventoryItemDisplay>
	</div>
	<div class={inventoryTab !== "SECONDARY" ? "hidden" : ""}>
		<ItemSelect
			title="secondary"
			bind:selectedItem={build.secondaryWeapon.weapon}
			items={build.career.secondaryWeapons}
			handler={secondaryWeaponSelectHandler}
		></ItemSelect>
		<InventoryItemDisplay
			bind:itemBuild={build.secondaryWeapon}
			itemType={ItemTypeEnum.Weapon}
			properties={build.secondaryWeapon.weapon?.properties ?? []}
			traits={build.secondaryWeapon.weapon?.traits ?? []}
		></InventoryItemDisplay>
	</div>
	<div class="jewelry-tab {inventoryTab !== 'EQUIPMENT' ? 'hidden' : ''}">
		<InventoryItemDisplay
			bind:itemBuild={build.necklace}
			itemType={ItemTypeEnum.Necklace}
			properties={necklaceProperties}
			traits={necklaceTraits}
		></InventoryItemDisplay>
		<InventoryItemDisplay bind:itemBuild={build.charm} itemType={ItemTypeEnum.Charm} properties={charmProperties} traits={charmTraits}
		></InventoryItemDisplay>
		<InventoryItemDisplay
			bind:itemBuild={build.trinket}
			itemType={ItemTypeEnum.Trinket}
			properties={trinketProperties}
			traits={trinketTraits}
		></InventoryItemDisplay>
	</div>
</div>

<style>
	.inventory-container {
		grid-area: careerInventory;
	}
</style>
