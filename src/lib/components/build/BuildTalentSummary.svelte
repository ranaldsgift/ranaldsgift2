<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import CareerTalentIcon from "../career/CareerTalentIcon.svelte";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();

	const getSelectedTalents = (build: ICareerBuild) => {
		const talents = [build.talent1, build.talent2, build.talent3, build.talent4, build.talent5, build.talent6];
		return talents.map((talent) => talent?.talentNumber);
	};
</script>

<div class="build-talent-summary">
	{#each build.career.talents as talent, index}
		<CareerTalentIcon
			careerId={build.career.id}
			talentNumber={talent.talentNumber}
			class={getSelectedTalents(build).includes(talent.talentNumber) ? "border-16" : "grayscale border-04"}
			size="30px"
		></CareerTalentIcon>
	{/each}
</div>

<style>
	.build-talent-summary {
		grid-area: buildTalentSummary;
		grid-template-columns: repeat(3, 30px);
		grid-template-rows: repeat(6, 30px);
		display: grid;
	}
</style>
