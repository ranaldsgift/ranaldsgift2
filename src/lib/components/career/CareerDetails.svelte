<script lang="ts">
	import type { ICareer } from "$lib/entities/career/Career";
	import CareerPassive from "./CareerPassive.svelte";
	import CareerPerks from "./CareerPerks.svelte";
	import CareerSkill from "./CareerSkill.svelte";
	import CareerSummaryContainer from "./CareerSummaryContainer.svelte";
	import CooldownBar from "./CooldownBar.svelte";
	import HealthBar from "./HealthBar.svelte";

	type Props = {
		career: ICareer;
	};

	let { career }: Props = $props();
</script>

<div class="career-details-container">
	<CareerSummaryContainer {career}></CareerSummaryContainer>
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

	.career-left-container {
		grid-area: careerLeftContainer;
		align-self: start;
	}

	.career-details-container {
		grid-area: careerDetails;
	}

	.career-page > * {
		width: 100%;
	}

	.career-attributes {
		display: grid;
		grid-template-rows: 1fr 1fr;
		text-align: left;
		justify-content: left;
		justify-items: left;
		grid-template-columns: 1fr;
		grid-area: careerAttributes;
		position: relative;
		grid-row-gap: 10px;
	}

	.career-summary > p {
		width: 100%;
		text-align: left;
		position: relative;
	}
</style>
