<script lang="ts">
	import type { IBookSetting } from "$lib/entities/BookSetting";
	import type { IBuildRole } from "$lib/entities/BuildRole";
	import type { ICareer } from "$lib/entities/career/Career";
	import type { IDifficulty } from "$lib/entities/Difficulty";
	import type { IDifficultyModifier } from "$lib/entities/DifficultyModifier";
	import type { IHero } from "$lib/entities/Hero";
	import type { IMission } from "$lib/entities/Mission";
	import type { IPatch } from "$lib/entities/Patch";
	import type { IPotion } from "$lib/entities/Potion";
	import type { ITwitchSetting } from "$lib/entities/TwitchSetting";
	import type { IWeapon } from "$lib/entities/Weapon";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";
	import ContainerTitle from "../ContainerTitle.svelte";
	import { slide } from "svelte/transition";
	import {
		BookSettingsStore,
		BuildRolesStore,
		CareersStore,
		DifficultiesStore,
		DifficultyModifiersStore,
		MissionsStore,
		PatchesStore,
		PotionsStore,
		TwitchSettingsStore,
	} from "$lib/stores/DataStores";

	type Props = {
		filter: BuildTableFilter;
		showFilters: boolean;
	};

	let { filter = $bindable(), showFilters = $bindable() }: Props = $props();

	let patches = $state<IPatch[]>([]);
	let missions = $state<IMission[]>([]);
	let difficulties = $state<IDifficulty[]>([]);
	let difficultyModifiers = $state<IDifficultyModifier[]>([]);
	let potions = $state<IPotion[]>([]);
	let buildRoles = $state<IBuildRole[]>([]);
	let bookSettings = $state<IBookSetting[]>([]);

	let careersData = $state<ICareer[]>([]);
	let heroesData = $state<IHero[]>([]);

	let selectedCareer = $derived<ICareer | undefined>(careersData.find((career) => career.id === filter.careerId));
	let selectedHero = $derived<IHero | undefined>(heroesData.find((hero) => hero.id === filter.heroId));

	let heroes = $derived.by<IHero[]>(() => {
		let heroes: IHero[] = [];

		if (selectedCareer) {
			heroes.push(selectedCareer.hero);
			return heroes;
		}

		for (let career of careersData) {
			if (!heroes.find((hero) => hero.id === career.hero.id)) {
				heroes.push(career.hero);
			}
		}
		return heroes;
	});

	let careers = $derived.by<ICareer[]>(() => {
		if (selectedHero) {
			return careersData.filter((career) => career.hero.id === selectedHero.id);
		}

		return careersData;
	});

	let weapons = $derived.by<IWeapon[]>(() => {
		let careerWeapons = [];
		if (selectedCareer) {
			careerWeapons = selectedCareer.primaryWeapons.concat(selectedCareer.secondaryWeapons);
		} else if (selectedHero) {
			careerWeapons = careersData
				.filter((career) => career.hero.id === selectedHero.id)
				.map((career) => career.primaryWeapons.concat(career.secondaryWeapons))
				.flat();
		} else {
			careerWeapons = careersData.map((career) => career.primaryWeapons.concat(career.secondaryWeapons)).flat();
		}

		return careerWeapons.filter((weapon, index, self) => self.findIndex((w) => w.id === weapon.id) === index);
	});

	$effect.pre(() => {
		if (!weapons.map((weapon) => weapon.id).includes(filter.weaponId ?? 0)) {
			filter.weaponId = null;
		}
	});

	const loadFiltersData = async () => {
		if (careersData.length === 0) {
			const { items } = await CareersStore.loadData();
			careersData = items;

			heroesData = careersData
				.map((career) => career.hero)
				.filter((hero, index, self) => self.findIndex((h) => h.id === hero.id) === index);
		}

		if (patches.length === 0) {
			const { items } = await PatchesStore.loadData();
			patches = items;
		}

		if (missions.length === 0) {
			const { items } = await MissionsStore.loadData();
			missions = items;
		}

		if (difficulties.length === 0) {
			const { items } = await DifficultiesStore.loadData();
			difficulties = items;
		}

		if (difficultyModifiers.length === 0) {
			const { items } = await DifficultyModifiersStore.loadData();
			difficultyModifiers = items;
		}

		if (potions.length === 0) {
			const { items } = await PotionsStore.loadData();
			potions = items;
		}

		if (buildRoles.length === 0) {
			const { items } = await BuildRolesStore.loadData();
			buildRoles = items;
		}

		if (bookSettings.length === 0) {
			const { items } = await BookSettingsStore.loadData();
			bookSettings = items;
		}
	};

	let timer: NodeJS.Timeout;
	const handleSearch = (searchString: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			filter.search = searchString;
		}, 750);
	};

	let searchInput: HTMLInputElement;

	function clearSearch() {
		if (searchInput) {
			searchInput.value = "";
			filter.search = null;
		}
	}

	let hasActiveFilters = $derived.by(() => {
		let active =
			filter.userId != null ||
			filter.heroId != null ||
			filter.careerId != null ||
			filter.weaponId != null ||
			filter.primaryWeaponId != null ||
			filter.secondaryWeaponId != null ||
			filter.charmTraitId != null ||
			filter.necklaceTraitId != null ||
			filter.trinketTraitId != null ||
			filter.difficultyId != null ||
			filter.difficultyModifierId != null ||
			filter.potionId != null ||
			filter.bookSettingId != null ||
			filter.buildRoleId != null ||
			filter.missionId != null ||
			(filter.search != null && filter.search.length > 0) ||
			filter.sort != "dateModified" ||
			filter.asc != false;
		return active;
	});

	function clearAllFilters() {
		filter = {
			...filter,
			userId: null,
			heroId: null,
			careerId: null,
			weaponId: null,
			primaryWeaponId: null,
			secondaryWeaponId: null,
			charmTraitId: null,
			necklaceTraitId: null,
			trinketTraitId: null,
			search: null,
			sort: "dateModified",
			asc: false,
			difficultyId: null,
			difficultyModifierId: null,
			potionId: null,
			bookSettingId: null,
			buildRoleId: null,
			missionId: null,
		};
	}

	$effect(() => {
		loadFiltersData();
	});

	const sortOptions = [
		{ value: "dateModified", label: "Updated Recently" },
		{ value: "dateCreated", label: "Date Created" },
		{ value: "name", label: "Name" },
		{ value: "ratingsCount", label: "Rating" },
	];
</script>

<div class="gap-2 flex flex-wrap border-01 background-15">
	<ContainerTitle class="w-full">Filters</ContainerTitle>
	<div class="px-5 pb-5 w-full">
		<div class="search-bar relative w-full flex">
			<img class="z-10" width="60" src="/images/icons/search.png" alt="Search" />
			<input
				bind:this={searchInput}
				class="w-full border-02 background-33 h-[40px] self-center ml-[-30px] z-0 pl-[35px] pr-[40px] text-[1.3rem]"
				type="text"
				value={filter.search}
				onkeyup={(event) => {
					if (event.target instanceof HTMLInputElement) {
						handleSearch(event.target.value);
					}
				}}
				placeholder="Search"
			/>
			{#if filter.search !== null && filter.search !== ""}
				<button class="clear-search absolute right-2 top-1/2 transform -translate-y-1/2 z-10" onclick={clearSearch}>
					<img width="20" src="/images/icons/x.png" alt="Clear search" />
				</button>
			{/if}
		</div>
		<div class="flex flex-wrap gap-2 w-full justify-center mt-[-10px]">
			<button
				class="show-filters-button flex justify-center items-center gap-2 h-[35px]"
				onclick={() => (showFilters = !showFilters)}
			>
				<span>More Filter Options</span>
				<span class="show-filters-button-icon {showFilters ? 'rotate-[-90deg]' : 'rotate-90'}"></span>
			</button>
			{#if hasActiveFilters}
				<button
					class="clear-filters-button flex justify-center items-center gap-2 py-1 px-4
				text-[1.1rem]"
					onclick={() => clearAllFilters()}
				>
					<span>Reset Filters</span>
					<img width="20" src="/images/icons/x.png" alt="Clear filters" />
				</button>
			{/if}
		</div>
		{#if showFilters}
			<div class="build-filters-container flex flex-wrap gap-2" transition:slide={{ duration: 300 }}>
				<button
					class="sort-toggle flex-1 min-w-[200px] grid grid-cols-[1fr_auto] items-center text-left"
					onclick={() => (filter.asc = !filter.asc)}
				>
					{filter.asc ? "Ascending" : "Descending"}
					<span>{filter.asc ? "↑" : "↓"}</span>
				</button>
				<select bind:value={filter.sort} class="flex-1 min-w-[200px]" placeholder="Sort">
					{#each sortOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
				<select bind:value={filter.careerId} class="flex-1 min-w-[200px]">
					<option value={null}>All Careers</option>
					{#each careers as career}
						<option value={career.id}>{career.name}</option>
					{/each}
				</select>
				<select bind:value={filter.weaponId} class="flex-1 min-w-[200px]">
					<option value={null}>All Weapons</option>
					{#each weapons as weapon}
						<option value={weapon.id}>{weapon.name}</option>
					{/each}
				</select>
				<select bind:value={filter.heroId} class="flex-1 min-w-[200px]">
					<option value={null}>All Heroes</option>
					{#each heroes as hero}
						<option value={hero.id}>{hero.name}</option>
					{/each}
				</select>
				<select bind:value={filter.difficultyId} class="flex-1 min-w-[200px]">
					<option value={null}>All Difficulties</option>
					{#each difficulties as difficulty}
						<option value={difficulty.id}>{difficulty.name}</option>
					{/each}
				</select>
				<select bind:value={filter.difficultyModifierId} class="flex-1 min-w-[200px]">
					<option value={null}>All Difficulty Modifiers</option>
					{#each difficultyModifiers as difficultyModifier}
						<option value={difficultyModifier.id}>{difficultyModifier.name}</option>
					{/each}
				</select>
				<select bind:value={filter.potionId} class="flex-1 min-w-[200px]">
					<option value={null}>All Potions</option>
					{#each potions as potion}
						<option value={potion.id}>{potion.name}</option>
					{/each}
				</select>
				<select bind:value={filter.bookSettingId} class="flex-1 min-w-[200px]">
					<option value={null}>All Book Settings</option>
					{#each bookSettings as bookSetting}
						<option value={bookSetting.id}>{bookSetting.name}</option>
					{/each}
				</select>
				<select bind:value={filter.buildRoleId} class="flex-1 min-w-[200px]">
					<option value={null}>All Build Roles</option>
					{#each buildRoles as buildRole}
						<option value={buildRole.id}>{buildRole.name}</option>
					{/each}
				</select>
				<select bind:value={filter.missionId} class="flex-1 min-w-[200px]">
					<option value={null}>All Missions</option>
					{#each missions as mission}
						<option value={mission.id}>{mission.name}</option>
					{/each}
				</select>
				<!-- <select bind:value={filter.patchId}>
				<option value={null}>All Patches</option>
				{#each patches as patch}
					<option value={patch.id}>{patch.name}</option>
				{/each}
			</select> -->
			</div>
		{/if}
	</div>
</div>

<style>
	.build-filters-container > * {
		border-image: url("/images/borders/border-13.png");
		border-image-width: auto;
		border-image-slice: 21;
		border-style: solid;
		border-image-repeat: repeat;
		min-height: 60px;
		align-content: center;
		background: linear-gradient(180deg, #2b1212 35%, #000);
		color: #30e158;
		font-size: 1.3rem;
		padding: 10px 20px;
	}
	option {
		background-color: #080404;
	}
	.build-filters-container > * > select {
		background: transparent;
	}
	select,
	input {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		outline: none;
	}
	.sort-toggle div {
		background: url("/images/icons/arrow.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 16px;
		width: 20px;
		height: 20px;
		transition: background 0.1s ease-in-out;
	}
	.sort-toggle div:hover {
		background: url("/images/icons/arrow_focus.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 20px;
		width: 20px;
		height: 20px;
	}
	.show-filters-button-icon {
		background: url("/images/icons/arrow.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 16px;
		width: 20px;
		height: 20px;
		transition: background 0.1s ease-in-out;
	}
	.show-filters-button-icon:hover {
		background: url("/images/icons/arrow_focus.png");
		background-size: 20px;
	}
	.clear-search {
		opacity: 0.7;
		transition: opacity 0.2s ease-in-out;
	}
	.clear-search:hover {
		opacity: 1;
	}
</style>
