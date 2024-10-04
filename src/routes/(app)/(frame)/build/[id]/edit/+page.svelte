<script lang="ts">
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildEditor from "$lib/components/build/BuildEditor.svelte";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { error } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import { getBuildEditorPageState } from "$lib/state/BuildEditorPageState.svelte.js";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	const { data } = $props();

	const pageState = getBuildEditorPageState();

	if (!data.viewModel || !data.viewModel.build) {
		error(404, "Heroes Page - Invalid ViewModel");
	}

	if (!pageState.selectedCareer) {
		pageState.selectedCareer = data.viewModel.build.career;
	}

	if (!pageState.build || pageState.build.id !== data.viewModel.build.id) {
		if (!data.viewModel.build) {
			error(500, "Build not found");
		}
		pageState.build = data.viewModel.build;
	}

	const saveBuild = async () => {
		if (!pageState.build) {
			error(500, "Build not found");
		}

		let missingFields = BuildHelper.getMissingFields(pageState.build);

		if (missingFields.length > 0) {
			toast(`Build is missing the following fields: ${missingFields.join(", ")}. Please check your build and try again.`, {
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

	$inspect(pageState.build);
</script>

{#if pageState.build}
	<Seo title={pageState.build.name} />

	<Breadcrumb
		links={[
			{ href: `/builds`, text: "Builds" },
			{ href: `/build/${pageState.build.id}`, text: pageState.build.name ?? "Your Build" },
		]}>Edit</Breadcrumb
	>

	<PageButtonContainer>
		<button class="button-02" onclick={saveBuild}>Save</button>
		<a class="button-02" href={`/build/${pageState.build.id}`}>Cancel</a>
	</PageButtonContainer>

	<div class="edit-build-page">
		<BuildEditor bind:build={pageState.build} bind:inventoryTab={pageState.inventoryTab.value} />
	</div>
{/if}
