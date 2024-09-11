<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import DifficultySelect from "./selectlist/DifficultySelect.svelte";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();
</script>

<DifficultySelect bind:selected={build.difficulty}></DifficultySelect>

<!-- <TwitchSelect key='twitchMode' selectedValues={selectedTwitchMode}></TwitchSelect>
          optionsHtml.push(<MissionSelect key='mission' selectedValues={selectedMissions}></MissionSelect>);
          optionsHtml.push(<PotionSelect key='potion' selectedValues={selectedPotions}></PotionSelect>);
          optionsHtml.push(<BookSelect key='book' selectedValues={selectedBooks}></BookSelect>);
          optionsHtml.push(<RoleSelect key='roles' selectedValues={state.roles}></RoleSelect>); -->
