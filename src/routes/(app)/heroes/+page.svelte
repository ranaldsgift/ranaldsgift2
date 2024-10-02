<script lang="ts">
	import { getHeroesPageState } from "$lib/state/HeroesPageState.svelte";
	import CareerEditor from "$lib/components/career/CareerEditor.svelte";
	import CareerSelection from "$lib/components/career/CareerSelection.svelte";
	import CareerHelper from "$lib/helpers/CareerHelper.js";
	import type { ICareer } from "$lib/entities/career/Career.js";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { toast } from "svelte-sonner";
	import { error } from "@sveltejs/kit";
	import { goto, replaceState } from "$app/navigation";
	import { page } from "$app/stores";
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";

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

	let searchParams = $derived.by(() => {
		if (!pageState.build) {
			return "";
		}
		return BuildHelper.getQueryStringFromBuild(pageState.build);
	});

	$effect(() => {
		if ($page.url.search !== searchParams) {
			goto(`${searchParams}`, { replaceState: true, keepFocus: true, noScroll: true });
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

	let pageTitle = $derived(`${pageState.build.career.name} - ${pageState.build.career.hero.name}`);
	let pageDescription = $derived(
		`${pageState.build.career.name} build for ${pageState.build.career.hero.name}. 
		${pageState.build.primaryWeapon.weapon.name} with ${pageState.build.primaryWeapon.property1?.name}, ${pageState.build.primaryWeapon.property2?.name}, and ${pageState.build.primaryWeapon.trait?.name}.
		${pageState.build.secondaryWeapon.weapon.name} with ${pageState.build.secondaryWeapon.property1?.name}, ${pageState.build.secondaryWeapon.property2?.name}, and ${pageState.build.secondaryWeapon.trait?.name}.
		Necklace with ${pageState.build.necklace.property1?.name}, ${pageState.build.necklace.property2?.name}, and ${pageState.build.necklace.trait?.name}.
		Charm with ${pageState.build.charm.property1?.name}, ${pageState.build.charm.property2?.name}, and ${pageState.build.charm.trait?.name}.
		Trinket with ${pageState.build.trinket.property1?.name}, ${pageState.build.trinket.property2?.name}, and ${pageState.build.trinket.trait?.name}.`
	);
</script>

{#if pageState.build}
	<Seo title={pageTitle} description={pageDescription} image={`/images/careers/${pageState.build.career.id}/portrait.png`} />

	<Breadcrumb links={[{ href: "/", text: "Home" }]}>Heroes</Breadcrumb>

	<PageButtonContainer>
		<button class="button-02" onclick={copyButtonHandler}
			>Copy
			<svg class="mt-[-2px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
				><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
					><path
						d="M10.046 14c-1.506-1.512-1.37-4.1.303-5.779l4.848-4.866c1.673-1.68 4.25-1.816 5.757-.305c1.506 1.512 1.37 4.1-.303 5.78l-2.424 2.433"
					/><path
						d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433l-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305c-1.506-1.512-1.37-4.1.303-5.78l2.424-2.433"
					/></g
				></svg
			></button
		>
	</PageButtonContainer>

	<div class="page-layout gap-0 tablet:gap-5">
		<CareerSelection bind:selectedCareer={pageState.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<CareerEditor bind:build={pageState.build} bind:inventoryTab={pageState.inventoryTab.value}></CareerEditor>
	</div>
{:else}
	<div class="page-layout gap-0 tablet:gap-5">
		<CareerSelection bind:selectedCareer={pageState.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<span>Initializing...</span>
	</div>
{/if}

<style>
	.page-layout {
		display: grid;
		align-self: start;
		grid-template-columns: 100% !important;
		grid-template-areas: "careerSelection" "careerContainer" "careerInventory" !important;
	}

	@media (min-width: 1800px) {
		.page-layout {
			grid-template-columns: 1fr 980px 1fr !important;
			grid-template-areas: "careerSelection careerContainer careerInventory" !important;
		}
	}

	@media (min-width: 1000px) and (max-width: 1899px) {
		/*         .page-layout {
            width: auto !important;
            grid-template-columns: auto !important;
            grid-template-areas: "careerSelection" "careerContainer" "careerInventory" !important;
        } */
	}
</style>
