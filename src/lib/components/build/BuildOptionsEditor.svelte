<script lang="ts">
	import type { IBookSetting } from "$lib/entities/BookSetting";
	import type { IBuildRole } from "$lib/entities/BuildRole";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { IDifficulty } from "$lib/entities/Difficulty";
	import type { IDifficultyModifier } from "$lib/entities/DifficultyModifier";
	import type { IMission } from "$lib/entities/Mission";
	import type { IPotion } from "$lib/entities/Potion";
	import type { ITwitchSetting } from "$lib/entities/TwitchSetting";
	import {
		BookSettingsStore,
		BuildRolesStore,
		DifficultiesStore,
		DifficultyModifiersStore,
		MissionsStore,
		PotionsStore,
		TwitchSettingsStore,
	} from "$lib/stores/DataStores";

	type Props = {
		build: ICareerBuild;
		class?: string;
	};

	const { build = $bindable(), class: CLASS }: Props = $props();

	let missions: IMission[] = $state([]);
	let difficulties: IDifficulty[] = $state([]);
	let difficultyModifiers: IDifficultyModifier[] = $state([]);
	let potions: IPotion[] = $state([]);
	let buildRoles: IBuildRole[] = $state([]);
	let twitchSettings: ITwitchSetting[] = $state([]);
	let bookSettings: IBookSetting[] = $state([]);

	const loadBuildOptions = async () => {
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

		if (twitchSettings.length === 0) {
			const { items } = await TwitchSettingsStore.loadData();
			twitchSettings = items;
		}

		if (bookSettings.length === 0) {
			const { items } = await BookSettingsStore.loadData();
			bookSettings = items;
		}
	};

	const handleDifficultyChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedDifficultyId = parseInt(selectElement.value);
		const selectedDifficulty = difficulties.find((difficulty) => difficulty.id === selectedDifficultyId);
		build.difficulty = selectedDifficulty ?? null;
	};

	const handleDifficultyModifierChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedDifficultyModifierId = parseInt(selectElement.value);
		const selectedDifficultyModifier = difficultyModifiers.find(
			(difficultyModifier) => difficultyModifier.id === selectedDifficultyModifierId
		);
		build.difficultyModifier = selectedDifficultyModifier ?? null;
	};

	const handleMissionChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedMissionId = parseInt(selectElement.value);
		const selectedMission = missions.find((mission) => mission.id === selectedMissionId);
		build.mission = selectedMission ?? null;
	};

	const handlePotionChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedPotionId = parseInt(selectElement.value);
		const selectedPotion = potions.find((potion) => potion.id === selectedPotionId);
		build.potion = selectedPotion ?? null;
	};

	const handleBookChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedBookId = parseInt(selectElement.value);
		const selectedBook = bookSettings.find((book) => book.id === selectedBookId);
		build.book = selectedBook ?? null;
	};

	const handleTwitchChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedTwitchId = parseInt(selectElement.value);
		const selectedTwitch = twitchSettings.find((twitch) => twitch.id === selectedTwitchId);
		build.twitch = selectedTwitch ?? null;
	};

	const handleRolesChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedRoleIds = Array.from(selectElement.selectedOptions).map((option) => parseInt(option.value));
		const selectedRoles = buildRoles.filter((role) => selectedRoleIds.includes(role.id));
		build.roles = selectedRoles.length > 0 ? selectedRoles : null;
	};
</script>

{#await loadBuildOptions()}
	<div class="flex mt-4 gap-2 {CLASS} items-start flex-wrap">
		<div class="flex flex-col gap-2">
			<span>Loading...</span>
		</div>
	</div>
{:then}
	<div class="flex mt-4 gap-2 {CLASS} items-start flex-wrap">
		<select class="p-2" value={build.difficulty?.id ?? null} onchange={handleDifficultyChange}>
			<option value={null}>None</option>
			{#each difficulties as difficulty}
				<option value={difficulty.id} selected={difficulty.id === build.difficulty?.id}>
					{difficulty.name}
				</option>
			{/each}
		</select>

		<select class="p-2" value={build.difficultyModifier?.id ?? null} onchange={handleDifficultyModifierChange}>
			<option value={null}>None</option>
			{#each difficultyModifiers as difficultyModifier}
				<option value={difficultyModifier.id} selected={difficultyModifier.id === build.difficultyModifier?.id}>
					{difficultyModifier.name}
				</option>
			{/each}
		</select>

		<select class="p-2" value={build.mission?.id ?? null} onchange={handleMissionChange}>
			<option value={null}>None</option>
			{#each missions as mission}
				<option value={mission.id} selected={mission.id === build.mission?.id}>
					{mission.name}
				</option>
			{/each}
		</select>

		<select class="p-2" value={build.potion?.id ?? null} onchange={handlePotionChange}>
			<option value={null}>None</option>
			{#each potions as potion}
				<option value={potion.id} selected={potion.id === build.potion?.id}>
					{potion.name}
				</option>
			{/each}
		</select>

		<select class="p-2" value={build.book?.id ?? null} onchange={handleBookChange}>
			<option value={null}>None</option>
			{#each bookSettings as book}
				<option value={book.id} selected={book.id === build.book?.id}>
					{book.name}
				</option>
			{/each}
		</select>

		<select class="p-2" value={build.twitch?.id ?? null} onchange={handleTwitchChange}>
			<option value={null}>None</option>
			{#each twitchSettings as twitch}
				<option value={twitch.id} selected={twitch.id === build.twitch?.id}>
					{twitch.name}
				</option>
			{/each}
		</select>

		<select class="p-2" multiple onchange={handleRolesChange}>
			{#each buildRoles as role}
				<option value={role.id} selected={build.roles?.some((r) => r.id === role.id)}>
					{role.name}
				</option>
			{/each}
		</select>
	</div>
{/await}

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
		font-size: 1.3rem;
		color: #30e158;
	}
	select option {
		background-color: #080404;
	}

	select[multiple] option {
		background: transparent;
	}

	select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		outline: none;
	}

	select option:checked,
	select option:hover {
		color: #fff !important;
		background-color: #c15b24 !important;
		box-shadow: inset 30px 30px #c15b24;
	}
</style>
