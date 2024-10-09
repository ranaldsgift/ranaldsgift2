<script lang="ts">
	import {
		TWITCH_BLESSINGS,
		TWITCH_VOTE_COOLDOWN,
		TWITCH_VOTE_TIME_TIMER,
		TWITCH_WEEKLY_EVENT_EFFECT_DURATION,
	} from "$lib/data/constants/constants";
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
	import ContentHeader from "../ContentHeader.svelte";

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

	const handleRolesChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		const selectedRoleIds = Array.from(selectElement.selectedOptions).map((option) => parseInt(option.value));
		const selectedRoles = buildRoles.filter((role) => selectedRoleIds.includes(role.id));
		build.roles = selectedRoles.length > 0 ? selectedRoles : null;
	};

	const handleTwitchToggle = () => {
		build.twitchSpawnSize = build.isTwitch ? 100 : undefined;
		build.twitchVoteTimer = null;
		build.twitchVoteCooldown = null;
		build.twitchBlessing = null;
		build.twitchDisableWeeklyEvents = false;
		build.twitchWeeklyEventEffectDuration = null;
	};
</script>

{#await loadBuildOptions()}
	<div class="flex mt-4 gap-2 {CLASS} items-start flex-wrap">
		<div class="flex flex-col gap-2">
			<span>Loading...</span>
		</div>
	</div>
{:then}
	<div class="flex flex-col gap-2 {CLASS}">
		<div>
			<ContentHeader>Build Options</ContentHeader>
			<div
				class="build-options-container grid mt-4 gap-2 items-start grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] w-full max-w-full"
			>
				<select
					class="p-2"
					value={build.difficulty?.id}
					placeholder="Difficulty"
					onchange={handleDifficultyChange}
					data-dirty={build.difficulty?.id}
				>
					<option value={undefined} selected>Difficulty</option>
					{#each difficulties as difficulty}
						<option value={difficulty.id} selected={difficulty.id === build.difficulty?.id}>
							{difficulty.name}
						</option>
					{/each}
				</select>

				<select
					class="p-2"
					value={build.difficultyModifier?.id}
					onchange={handleDifficultyModifierChange}
					data-dirty={build.difficultyModifier?.id}
				>
					<option value={undefined} selected>Difficulty Modifier</option>
					{#each difficultyModifiers as difficultyModifier}
						<option value={difficultyModifier.id} selected={difficultyModifier.id === build.difficultyModifier?.id}>
							{difficultyModifier.name}
						</option>
					{/each}
				</select>

				<div class="styled-input" data-dirty={build.isDeathwish ? true : null}>
					<label for="deathwish">Deathwish {build.isDeathwish ? "✓" : "✗"}</label>
					<input id="deathwish" type="checkbox" bind:checked={build.isDeathwish} />
				</div>

				<select
					class="p-2 col-span-1 row-span-2"
					multiple
					onchange={handleRolesChange}
					data-dirty={build.roles != null && build.roles.length > 0 ? true : null}
					title="Ctrl+click to select/deselect multiple roles"
				>
					{#each buildRoles as role}
						<option value={role.id} selected={build.roles?.some((r) => r.id === role.id)}>
							{role.name}
						</option>
					{/each}
				</select>

				<select class="p-2" value={build.mission?.id} onchange={handleMissionChange} data-dirty={build.mission?.id}>
					<option value={undefined} selected>Mission</option>
					{#each missions as mission}
						<option value={mission.id} selected={mission.id === build.mission?.id}>
							{mission.name}
						</option>
					{/each}
				</select>

				<select class="p-2" value={build.potion?.id} onchange={handlePotionChange} data-dirty={build.potion?.id}>
					<option value={undefined} selected>Potion</option>
					{#each potions as potion}
						<option value={potion.id} selected={potion.id === build.potion?.id}>
							{potion.name}
						</option>
					{/each}
				</select>

				<select class="p-2" value={build.book?.id} onchange={handleBookChange} data-dirty={build.book?.id}>
					<option value={undefined} selected>Book</option>
					{#each bookSettings as book}
						<option value={book.id} selected={book.id === build.book?.id}>
							{book.name}
						</option>
					{/each}
				</select>

				<div class="styled-input" data-dirty={build.isTwitch ? true : null}>
					<label for="isTwitch">Twitch {build.isTwitch ? "✓" : "✗"}</label>
					<input id="isTwitch" type="checkbox" bind:checked={build.isTwitch} onchange={handleTwitchToggle} />
				</div>
			</div>
		</div>
		{#if build.isTwitch}
			<div>
				<ContentHeader>Twitch Settings</ContentHeader>
				<div
					class="build-options-container grid mt-4 gap-2 items-start grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] w-full max-w-full"
				>
					<input
						class="styled-input min-w-[140px]"
						type="number"
						min="100"
						max="300"
						step="1"
						placeholder="Spawn Size"
						bind:value={build.twitchSpawnSize}
						data-dirty={build.twitchSpawnSize}
					/>
					<select bind:value={build.twitchVoteTimer} data-dirty={build.twitchVoteTimer}>
						<option value={null} selected>Vote Timer</option>
						{#each TWITCH_VOTE_TIME_TIMER as timer}
							<option value={timer}>{timer}</option>
						{/each}
					</select>
					<select bind:value={build.twitchVoteCooldown} data-dirty={build.twitchVoteCooldown}>
						<option value={null} selected>Vote Cooldown</option>
						{#each TWITCH_VOTE_COOLDOWN as cooldown}
							<option value={cooldown}>{cooldown}</option>
						{/each}
					</select>
					<select bind:value={build.twitchBlessing} data-dirty={build.twitchBlessing}>
						<option value={null} selected>Blessing</option>
						{#each TWITCH_BLESSINGS as blessing}
							<option value={blessing}>{blessing}</option>
						{/each}
					</select>
					<div class="styled-input" data-dirty={build.twitchDisableWeeklyEvents ? true : null}>
						<label for="twitchDisableWeeklyEvents">Weekly Events {build.twitchDisableWeeklyEvents ? "✗" : "✓"} </label>
						<input id="twitchDisableWeeklyEvents" type="checkbox" bind:checked={build.twitchDisableWeeklyEvents} />
					</div>
					<select bind:value={build.twitchWeeklyEventEffectDuration} data-dirty={build.twitchWeeklyEventEffectDuration}>
						<option value={null} selected>Weekly Event Effect Duration</option>
						{#each TWITCH_WEEKLY_EVENT_EFFECT_DURATION as duration}
							<option value={duration}>{duration}</option>
						{/each}
					</select>
				</div>
			</div>
		{/if}
	</div>
{/await}

<style>
	select,
	.styled-input {
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
		position: relative;
	}

	.styled-input input[type="checkbox"] {
		display: none;
	}

	label {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		display: flex;
		align-content: center;
		flex-wrap: wrap-reverse;
		padding: 10px 20px;
		cursor: pointer;
		color: #838383;
	}
	label:hover {
		color: #30e158;
	}
	.build-options-container > * {
		border-image: url("/images/borders/border-13.png");
		border-image-width: auto;
		border-image-slice: 21;
		border-style: solid;
		border-image-repeat: repeat;
		min-height: 60px;
		align-content: center;
		background: linear-gradient(180deg, #2b1212 35%, #000);
		color: #838383;
		font-size: 1.3rem;
		padding: 10px 20px;
		position: relative;
		transition: color 0.2s ease-in-out;
	}
	.build-options-container > [data-dirty],
	.build-options-container > [data-dirty] > label {
		color: #30e158;
	}

	.build-options-container > *:hover {
		background: linear-gradient(180deg, #3b1818 35%, #111);
		box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
		color: #30e158;
		cursor: pointer;
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
