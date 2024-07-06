<script lang="ts">
	import CareerSelection from "$lib/components/career/CareerSelection.svelte";
	import CareerHelper from "$lib/helpers/CareerHelper.js";
	import type { ICareer } from "$lib/entities/career/Career.js";
	import CareerEditor from "$lib/components/career/CareerEditor.svelte";
	const { data } = $props();

	const { viewModel } = data;

	if (!viewModel) {
		throw new Error("HeroesPageViewModel is required");
	}

	/* 	if (!pageState.selectedCareer) {
		pageState.selectedCareer = viewModel.selectedCareer;
	}

	if (!pageState.build) {
		pageState.build = viewModel.build;
	}

	// For debugging to track changes to the build
	$inspect(pageState.build).with((type, value) => {
		type === "update" ? console.trace(value) : null;
	}); */

	const careerSelectionHandler = (career: ICareer) => {
		if (viewModel.build?.career !== career) {
			let build = CareerHelper.getNewCareerBuildForCareer(career);
			let mergedBuildState = Object.assign({}, viewModel.build, build);
			viewModel.build = mergedBuildState;
		}
	};
</script>

<svelte:head>
	<title>{viewModel.build?.career?.name ?? viewModel.pageTitle} - ranalds.gift</title>
</svelte:head>

{#if viewModel.build}
	<div id="page" class="heroes-page">
		<CareerSelection bind:selectedCareer={viewModel.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<CareerEditor bind:build={viewModel.build}></CareerEditor>
	</div>
{:else}
	<div id="page" class="heroes-page">
		<CareerSelection bind:selectedCareer={viewModel.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<span>Initializing...</span>
	</div>
{/if}

<style>
	.heroes-page {
		display: grid;
		align-self: start;
		width: 100%;
		grid-template-columns: 1fr 980px 1fr !important;
		gap: 18px;
		grid-template-areas: "careerSelection careerContainer careerInventory" !important;
	}
	@media (min-width: 1820px) {
		.heroes-page {
			grid-template-columns: 1fr 980px 1fr !important;
			grid-template-areas: "careerSelection careerContainer careerInventory" !important;
		}
	}

	@media (max-width: 1000px) {
		.heroes-page {
			width: auto !important;
			grid-template-columns: 100% !important;
			grid-template-areas: "careerSelection" "careerContainer" "careerInventory" !important;
		}
	}

	@media (min-width: 1000px) and (max-width: 1899px) {
		/*         .heroes-page {
            width: auto !important;
            grid-template-columns: auto !important;
            grid-template-areas: "careerSelection" "careerContainer" "careerInventory" !important;
        } */
	}
</style>
