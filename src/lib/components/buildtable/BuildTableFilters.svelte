<script lang="ts">
	import type { ICareer } from "$lib/entities/career/Career";
	import type { IHero } from "$lib/entities/Hero";
	import type { IPatch } from "$lib/entities/Patch";
	import type { IWeapon } from "$lib/entities/Weapon";
	import { CareersStore, PatchesStore } from "$lib/stores/DataStores";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";

	import ContainerTitle from "../ContainerTitle.svelte";

	type Props = {
		filter: BuildTableFilter;
	};

	let { filter = $bindable() }: Props = $props();

	let patches = $state<IPatch[]>([]);
	let careers = $state<ICareer[]>([]);
	let selectedCareer = $derived<ICareer | undefined>(careers.find((career) => career.id === filter.careerId));

	let heroes = $derived.by<IHero[]>(() => {
		let heroes: IHero[] = [];
		for (let career of careers) {
			if (!heroes.find((hero) => hero.id === career.hero.id)) {
				heroes.push(career.hero);
			}
		}
		return heroes;
	});
	let selectedHero = $derived<IHero | undefined>(heroes.find((hero) => hero.id === filter.heroId));

	let weapons = $derived.by<IWeapon[]>(() => {
		let careerWeapons = [];
		if (selectedCareer) {
			careerWeapons = selectedCareer.primaryWeapons.concat(selectedCareer.secondaryWeapons);
		} else if (selectedHero) {
			careerWeapons = careers
				.filter((career) => career.hero.id === selectedHero.id)
				.map((career) => career.primaryWeapons.concat(career.secondaryWeapons))
				.flat();
		} else {
			careerWeapons = careers.map((career) => career.primaryWeapons.concat(career.secondaryWeapons)).flat();
		}

		return careerWeapons.filter((weapon, index, self) => self.findIndex((w) => w.id === weapon.id) === index);
	});

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
		<select bind:value={filter.heroId}>
			<option value={null}>All Heroes</option>
			{#each heroes as hero}
				<option value={hero.id}>{hero.name}</option>
			{/each}
		</select>
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
