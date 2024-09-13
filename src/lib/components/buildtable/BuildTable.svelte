<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { CareerBuildsStore, CareersStore, PatchesStore } from "$lib/stores/DataStores";
	import { DataHandler } from "@vincjo/datatables";
	import type { IPatch } from "$lib/entities/Patch";
	import ContainerTitle from "../ContainerTitle.svelte";
	import Skeleton from "../ui/skeleton/skeleton.svelte";
	import type { ICareer } from "$lib/entities/career/Career";
	import Button from "../Button.svelte";
	import type { IWeapon } from "$lib/entities/Weapon";
	import BuildTableRow from "./BuildTableRow.svelte";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";

	type Props = {
		filter: BuildTableFilter;
	};

	const { filter = $bindable() }: Props = $props();

	let builds: ICareerBuild[] = [];
	let patches = $state<IPatch[]>([]);
	let careers = $state<ICareer[]>([]);
	let selectedCareer = $derived<ICareer | undefined>(careers.find((career) => career.id === filter.careerId));

	let weapons = $derived.by<IWeapon[]>(() => {
		if (selectedCareer) {
			let careerWeapons = selectedCareer.primaryWeapons.concat(selectedCareer.secondaryWeapons);
			if (!careerWeapons.find((weapon) => weapon.id === filter.weaponId)) {
				filter.weaponId = null;
			}
			return careerWeapons;
		}
		return careers.map((career) => career.primaryWeapons.concat(career.secondaryWeapons)).flat();
	});

	const loadData = async () => {
		loadingData = true;
		let { items } = await CareerBuildsStore.loadData(getApiQuery());

		builds = [...items];
		handler.setRows(builds);
		loadingData = false;
	};

	const getApiQuery = () => {
		let apiQuery = `limit=${filter.limit ?? 10}&offset=${filter.offset ?? 0}`;

		if (filter.careerId) {
			apiQuery += `&careerId=${filter.careerId}`;
		}

		if (filter.weaponId) {
			apiQuery += `&weaponId=${filter.weaponId}`;
		}

		if (filter.userId) {
			apiQuery += `&userId=${filter.userId}`;
		}

		if (filter.sort) {
			apiQuery += `&sort=${filter.sort}`;
		}

		if (filter.favorite) {
			apiQuery += `&favorite=${filter.favorite}`;
		}

		if (filter.favoriteByUser) {
			apiQuery += `&favoriteByUser=${filter.favoriteByUser}`;
		}

		if (filter.rated) {
			apiQuery += `&rated=${filter.rated}`;
		}

		if (filter.ratedByUser) {
			apiQuery += `&ratedByUser=${filter.ratedByUser}`;
		}

		return apiQuery;
	};

	let loadingData = false;

	const handler = new DataHandler(builds);
	const rows = handler.getRows();

	const loadMoreHandler = () => {
		if (loadingData) return;
		if (!filter.offset) filter.offset = 0;
		filter.offset++;
		loadData();
	};

	const loadFiltersData = async () => {
		if (careers.length === 0) {
			const { items: careersData } = await CareersStore.loadData();
			careers = careersData;
		}

		if (patches.length === 0) {
			const { items } = await PatchesStore.loadData();
			patches = items;
		}
	};

	$effect(() => {
		loadFiltersData();
	});
</script>

<div class="build-table-filters border-01 top-left-shadow mb-5">
	<ContainerTitle>Filters</ContainerTitle>
	<div class="p-5 gap-5 flex background-36 border-01">
		<select bind:value={filter.careerId}>
			<option value={null}>All Careers</option>
			{#each careers as career}
				<option value={career.id}>{career.name}</option>
			{/each}
		</select>
		<select bind:value={filter.weaponId}>
			<option value={null}>All Weapons</option>
			{#each weapons as weapon}
				<option value={weapon.id}>{weapon.name}</option>
			{/each}
		</select>
	</div>
</div>
<div class="top-left-shadow">
	<ContainerTitle>Builds</ContainerTitle>
	<div class="p-5 border-01 background-20 gap-5 grid">
		{#await loadData()}
			{#each { length: 10 } as _}
				<Skeleton class="h-[177px] w-full border-31 bg-stone-950"></Skeleton>
			{/each}
		{:then}
			{#each $rows as row}
				<BuildTableRow build={row} {patches}></BuildTableRow>
			{/each}
		{/await}
		<Button handler={loadMoreHandler}>Load More</Button>
	</div>
</div>

<style>
	select {
		border-image: url("/images/borders/border-13.png");
		border-image-width: auto;
		border-image-slice: 21;
		border-style: solid;
		border-image-repeat: repeat;
		min-height: 60px;
		align-content: center;
		padding: 10px 20px;
		background: linear-gradient(180deg, #2b1212 35%, #000);
		color: #30e158;
		font-size: 1.3rem;
	}
</style>
