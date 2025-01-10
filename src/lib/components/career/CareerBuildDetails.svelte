<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICareer } from "$lib/entities/career/Career";
	import CareerPassive from "./CareerPassive.svelte";
	import CareerPerks from "./CareerPerks.svelte";
	import CareerSkill from "./CareerSkill.svelte";
	import CareerBuildSummaryContainer from "./CareerBuildSummaryContainer.svelte";

	type Props = {
		build: ICareerBuild;
		career: ICareer;
		health?: number;
		cooldown?: number;
	};

	let { build, career, health, cooldown }: Props = $props();
</script>

<div class="career-details-container">
	<CareerBuildSummaryContainer {build} {career}></CareerBuildSummaryContainer>
	<CareerSkill {career}></CareerSkill>
	<CareerPassive {career}></CareerPassive>
	<CareerPerks {career}></CareerPerks>
</div>

<style>
	.career-details-container {
		display: grid;
		grid-template-areas: "careerSummary careerPerks" "careerPassive careerSkill" "buildSummary buildSummary";
		grid-area: careerDetails;
		color: #c15b24;
		grid-template-rows: minmax(105px, auto) auto 1fr;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: 1fr 1fr;
	}

	.career-details-container :global(.career-ability-icon) {
		height: 60px;
		width: 60px;
		background-size: contain;
		grid-area: abilityIcon;
		background-repeat: no-repeat;
	}

	.career-details-container {
		grid-area: careerDetails;
	}

	@media (max-width: 768px) {
		.career-details-container {
			grid-template-columns: 1fr !important;
			grid-row-gap: 20px !important;
			grid-template-areas: "careerSummary" "careerPassive" "careerSkill" "careerPerks" !important;
		}
	}
</style>
