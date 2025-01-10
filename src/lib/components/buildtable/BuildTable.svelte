<script lang="ts">
	import BuildTableRowSkeleton from "./BuildTableRowSkeleton.svelte";
	import { CareerBuildsStore, CareersStore, PropertiesStore, TraitsStore, WeaponsStore } from "$lib/stores/DataStores";
	import { DataHandler } from "@vincjo/datatables";
	import ContainerTitle from "../ContainerTitle.svelte";
	import BuildTableRow from "./BuildTableRow.svelte";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { IWeapon } from "$lib/entities/Weapon";
	import type { ICareer } from "$lib/entities/career/Career";
	import type { ITrait } from "$lib/entities/Trait";
	import type { IProperty } from "$lib/entities/Property";
	import type { Snippet } from "svelte";

	type Props = {
		filter: BuildTableFilter;
		class?: string;
		title?: string;
		compact?: boolean;
		rowsOnly?: boolean;
		header?: Snippet;
		hideOnEmpty?: boolean;
	};

	let { filter = $bindable(), class: className, title, compact = false, header, hideOnEmpty = true, rowsOnly = false }: Props = $props();

	let builds: ICareerBuild[] = [];
	let recordCount = $state(0);
	let weapons: IWeapon[] = $state([]);
	let careers: ICareer[] = $state([]);
	let properties: IProperty[] = $state([]);
	let traits: ITrait[] = $state([]);

	const loadData = async () => {
		loadingData = true;

		let { items, count } = await CareerBuildsStore.loadData(getApiQuery());
		recordCount = count;

		if (count > 0) {
			if (weapons.length === 0) {
				let { items: weaponData } = await WeaponsStore.loadData();
				weapons = weaponData;
			}
			if (careers.length === 0) {
				let { items: careerData } = await CareersStore.loadData();
				careers = careerData;
			}
			if (properties.length === 0) {
				let { items: propertyData } = await PropertiesStore.loadData();
				properties = propertyData;
			}
			if (traits.length === 0) {
				let { items: traitData } = await TraitsStore.loadData();
				traits = traitData;
			}

			for (const build of items) {
				build.primaryWeapon.weapon = weapons.find((w) => w.id === build.primaryWeapon.weaponId);
				build.secondaryWeapon.weapon = weapons.find((w) => w.id === build.secondaryWeapon.weaponId);
				let career = careers.find((c) => c.id === build.careerId);
				if (career) {
					build.career = career;
				}

				build.primaryWeapon.property1 = properties.find((p) => p.id === build.primaryWeapon.property1?.id);
				build.primaryWeapon.property2 = properties.find((p) => p.id === build.primaryWeapon.property2?.id);
				build.primaryWeapon.trait = traits.find((t) => t.id === build.primaryWeapon.trait?.id);

				build.secondaryWeapon.property1 = properties.find((p) => p.id === build.secondaryWeapon.property1?.id);
				build.secondaryWeapon.property2 = properties.find((p) => p.id === build.secondaryWeapon.property2?.id);
				build.secondaryWeapon.trait = traits.find((t) => t.id === build.secondaryWeapon.trait?.id);

				build.necklace.property1 = properties.find((p) => p.id === build.necklace.property1?.id);
				build.necklace.property2 = properties.find((p) => p.id === build.necklace.property2?.id);
				build.necklace.trait = traits.find((t) => t.id === build.necklace.trait?.id);

				build.charm.property1 = properties.find((p) => p.id === build.charm.property1?.id);
				build.charm.property2 = properties.find((p) => p.id === build.charm.property2?.id);
				build.charm.trait = traits.find((t) => t.id === build.charm.trait?.id);

				build.trinket.property1 = properties.find((p) => p.id === build.trinket.property1?.id);
				build.trinket.property2 = properties.find((p) => p.id === build.trinket.property2?.id);
				build.trinket.trait = traits.find((t) => t.id === build.trinket.trait?.id);
			}
		}

		if (!items || items.length === 0) {
			builds = [];
		} else {
			builds = [...items];
		}

		handler.setRows(builds);
		loadingData = false;
	};

	const getApiQuery = () => {
		let apiQuery = "";

		for (const [key, value] of Object.entries(filter)) {
			if (value !== null) {
				apiQuery += `&${key}=${value}`;
			}
		}

		return apiQuery;
	};

	let loadingData = false;

	const handler = new DataHandler(builds);
	const rows = handler.getRows();

	$effect(() => {
		if (filter && !loadingData) {
			loadData();
		}
	});
</script>

{#if $rows.length > 0 || !hideOnEmpty}
	<div class={className}>
		{#if !rowsOnly}
			<ContainerTitle>
				{#if header}
					{@render header()}
				{:else}
					{title ?? "Builds"}
				{/if}
			</ContainerTitle>
		{/if}
		{#await loadData()}
			<div class="p-5 border-01 background-20 gap-5 grid {!compact ? 'desktop:grid-cols-2' : ''} desktop:grid-flow-row">
				{#each { length: filter.limit ?? 5 } as _}
					<BuildTableRowSkeleton></BuildTableRowSkeleton>
				{/each}
			</div>
		{:then}
			<div
				class="{rowsOnly ? '' : 'p-5 border-01 background-20'} gap-5 grid {!compact
					? 'min-[1400px]:grid-cols-2'
					: ''} desktop:grid-flow-row"
			>
				{#each $rows as row}
					<BuildTableRow build={row} {compact}></BuildTableRow>
				{/each}
			</div>
			<div class="flex justify-between">
				{#if filter.offset != null && filter.offset !== undefined && filter.offset > 0}
					<button
						class="pagination-button flex-1"
						onclick={() => {
							if (filter.limit != null && filter.offset != null) {
								filter.offset = Math.max(0, --filter.offset);
							}
						}}
					>
						<ContainerTitle>Previous</ContainerTitle>
					</button>
				{/if}
				{#if filter.offset != null && filter.limit != null && recordCount >= filter.limit * (filter.offset + 1)}
					<button
						class="pagination-button flex-1"
						onclick={() => {
							if (
								filter.limit != null &&
								filter.limit !== undefined &&
								filter.offset != null &&
								filter.offset !== undefined
							) {
								filter.offset++;
							}
						}}
					>
						<ContainerTitle>Next</ContainerTitle>
					</button>
				{/if}
			</div>
		{/await}
	</div>
{/if}

<style>
	.build-list-item-skeleton {
		display: grid;
		grid-template-columns: auto auto auto 1fr auto;
		position: relative;
		grid-template-rows: auto 45px 40px;
		grid-row-gap: 5px;
		grid-template-areas:
			"heroIcon buildDescription buildDescription buildDescription buildRating"
			"heroIcon buildWeapons buildTraits empty2 empty2"
			"heroIcon buildFooter buildFooter buildFooter buildFooter";
		text-transform: uppercase;
		cursor: pointer;
		grid-column-gap: 10px;
		pointer-events: none;
		background-image: linear-gradient(rgba(87, 57, 57, 0.3), rgba(87, 57, 57, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.career-portrait {
		grid-area: heroIcon;
		align-self: center;
		margin-left: 15px;
	}

	.build-description-container {
		grid-area: buildDescription;
		justify-items: start;
		text-align: left;
		display: grid;
		margin-top: 10px;
	}

	.weapons {
		grid-area: buildWeapons;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 5px;
	}

	.weapon-container {
		display: grid;
		grid-template-areas: "itemIcon traitIcon";
		grid-column-gap: 5px;
	}

	.traits {
		grid-area: buildTraits;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 5px;
	}

	.build-footer {
		grid-area: buildFooter;
	}

	.build-rating {
		grid-area: buildRating;
		background: url("/images/icons/rating-icon.png");
		background-size: contain;
		background-repeat: no-repeat;
		width: 62px;
		height: 64px;
		display: block;
	}

	.build-footer {
		grid-area: buildFooter;
		background: linear-gradient(to right, #0000, #ffffff14);
		padding-right: 10px;
		justify-self: right;
		display: grid;
		grid-template-columns: auto auto;
		grid-column-gap: 10px;
		align-content: center;
		font-size: 0.8em;
		width: calc(100% - 10px);
		justify-content: right;
		padding-bottom: 5px;
		margin: 0 4px 2px 0;
	}
</style>
