<script lang="ts">
	import { getHeroesPageState } from "$lib/state/HeroesPageState.svelte";
	import CareerEditor from "../../lib/components/career/CareerEditor.svelte";
	import CareerSelection from "$lib/components/career/CareerSelection.svelte";
	import CareerHelper from "$lib/helpers/CareerHelper.js";
	import type { ICareer } from "$lib/entities/career/Career.js";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { toast } from "svelte-sonner";
	import { error } from "@sveltejs/kit";
	import { goto, replaceState } from "$app/navigation";
	import { page } from "$app/stores";

	const { data } = $props();
	const { viewModel } = data;
	const pageState = getHeroesPageState();

	if (!viewModel || !viewModel.build) {
		error(404, "Heroes Page - Invalid ViewModel");
	}

	if (!pageState.selectedCareer) {
		pageState.selectedCareer = viewModel.build.career;
	}

	if (!pageState.build) {
		pageState.build = viewModel.build;
	}

	// For debugging to track changes to the build
	$inspect(pageState.build).with((type, value) => {
		type === "update" ? console.trace(value) : null;
	});

	let searchParams = $derived.by(() => {
		if (!pageState.build) {
			return "";
		}
		return BuildHelper.getQueryStringFromBuild(pageState.build);
	});

	$effect(() => {
		if ($page.url.search !== searchParams) {
			goto(`${searchParams}`, { replaceState: true, keepFocus: true });
		}
	});

	const careerSelectionHandler = (career: ICareer) => {
		if (pageState.build?.career !== career) {
			const build = CareerHelper.getNewCareerBuildForCareer(career);
			const mergedBuildState = Object.assign({}, pageState.build, build);
			pageState.build = mergedBuildState;
		}
	};

	const copyButtonHandler = () => {
		const url = `${window.location.origin}/heroes/${searchParams}`;
		navigator.clipboard.writeText(url);

		toast(`Copied ${pageState.build?.career.name} build to clipboard`, {
			position: "bottom-center",
		});
	};
</script>

<svelte:head>
	<title>
		{pageState.build?.career ? `${pageState.build.career.name} - ${pageState.build.career.hero.name}` : viewModel.pageTitle} - ranalds.gift
	</title>
</svelte:head>

<PageButtonContainer>
	<button class="button-02" onclick={copyButtonHandler}>Copy <span class="link"></span></button>
</PageButtonContainer>

{#if pageState.build}
	<div id="page" class="heroes-page">
		<CareerSelection bind:selectedCareer={pageState.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<CareerEditor bind:build={pageState.build} bind:inventoryTab={pageState.inventoryTab.value}></CareerEditor>
	</div>
{:else}
	<div id="page" class="heroes-page">
		<CareerSelection bind:selectedCareer={pageState.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<span>Initializing...</span>
	</div>
{/if}

<style>
	#page {
		padding: 20px;
	}
	.heroes-page {
		display: grid;
		align-self: start;
		width: 100%;
		grid-template-columns: 1fr 980px 1fr !important;
		gap: 18px;
		grid-template-areas: "careerSelection careerContainer careerInventory" !important;
	}
	.link {
		display: inline-block;
		width: 28px;
		height: 28px;
		background: url("/images/icons/link.png") no-repeat center / 90%;
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
