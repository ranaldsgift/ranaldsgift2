<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildEditor from "$lib/components/build/BuildEditor.svelte";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
	import type { ICareer } from "$lib/entities/career/Career.js";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	import CareerHelper from "$lib/helpers/CareerHelper.js";
	import { getBuildCreatorPageState } from "$lib/state/BuildCreatorPageState.svelte.js";
	import { getBuildEditorPageState } from "$lib/state/BuildEditorPageState.svelte.js";
	import { error } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";

	let { data } = $props();

	let pageState = getBuildCreatorPageState();

	if (!pageState.build) {
		pageState.build = data.build as ICareerBuild;
	}

	const careerSelectionHandler = (career: ICareer) => {
		if (pageState.build?.career !== career) {
			const build = CareerHelper.getNewCareerBuildForCareer(career);
			const mergedBuildState = Object.assign({}, pageState.build, build);
			pageState.build = mergedBuildState;
		}
	};

	const saveBuild = async () => {
		if (!pageState.build) {
			error(500, "Build not found");
		}

		let missingFields = BuildHelper.getMissingFields(pageState.build);

		if (missingFields.length > 0) {
			toast(`Build is missing the following fields: ${missingFields.join(", ")}.`, {
				position: "bottom-center",
			});
			return;
		}

		try {
			const response = await fetch("/api/build/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pageState.build),
			});

			if (response.ok) {
				toast("Build saved successfully!", { position: "bottom-center" });
			} else {
				const json = await response.json();
				toast(json.error, { position: "bottom-center" });
			}
		} catch (error) {
			console.error("Error saving build:", error);
			toast("Failed to save build. Please try again.", { position: "bottom-center" });
		}
	};
</script>

<Seo title="Build Creator" />

<Breadcrumb links={[{ href: `/builds`, text: "Builds" }]}>Create</Breadcrumb>

<PageButtonContainer>
	<button class="button-02" onclick={saveBuild}>Save</button>
	<a class="button-02" href={`/builds`}>Cancel</a>
</PageButtonContainer>

{#if pageState.build}
	<div class="edit-build-page">
		<BuildEditor bind:build={pageState.build} bind:inventoryTab={pageState.inventoryTab.value} />
	</div>
{/if}
