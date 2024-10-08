<script lang="ts">
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildEditor from "$lib/components/build/BuildEditor.svelte";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { error } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import { getBuildEditorPageState } from "$lib/state/BuildEditorPageState.svelte.js";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	import { CareerBuildsStore } from "$lib/stores/DataStores.js";
	import { ROOT_API_URL } from "$lib/data/constants/constants.js";
	const { data } = $props();

	const pageState = getBuildEditorPageState();

	if (!data.viewModel || !data.viewModel.build) {
		error(404, "Build not found");
	}

	if (!pageState.selectedCareer) {
		pageState.selectedCareer = data.viewModel.build.career;
	}

	if (!pageState.build || pageState.build.id !== data.viewModel.build.id) {
		pageState.build = data.viewModel.build;
	}

	let serializedBuild = $state(JSON.stringify(pageState.build));
	let isDirty = $derived.by(() => serializedBuild !== JSON.stringify(pageState.build));

	// TODO - Show the missing fields on hover of the disabled save button
	let missingFieldsMessage = $derived.by(() => {
		if (!pageState.build) {
			return "";
		}
		let missingFields = BuildHelper.getMissingFields(pageState.build).join(", ");
		return `Build is missing the following fields: ${missingFields}. Please check your build and try again.`;
	});

	const saveBuild = async () => {
		if (!pageState.build) {
			error(500, "Build not found");
		}

		let missingFields = BuildHelper.getMissingFields(pageState.build);

		if (missingFields.length > 0) {
			toast.warning(`Build is missing the following fields: ${missingFields.join(", ")}. Please check your build and try again.`, {
				position: "bottom-center",
				duration: 5000,
			});
			return;
		}

		try {
			const response = await fetch(`${ROOT_API_URL}/build/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pageState.build),
			});

			if (response.ok) {
				toast.success("Build saved!", { position: "bottom-center" });
				if (pageState.build.id) {
					CareerBuildsStore.invalidateById(pageState.build.id);
				}
			} else {
				const json = await response.json();
				toast.error(json.error, { position: "bottom-center" });
			}
		} catch (error) {
			console.error("Error saving build:", error);
			toast.error("Failed to save build. Please try again.", { position: "bottom-center" });
		}
	};

	const resetBuildState = () => {
		pageState.build = null;
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
		<a class="button-02" href={`/build/${pageState.build.id}`} onclick={resetBuildState}>Cancel</a>
	</PageButtonContainer>

	<div class="edit-build-page">
		<BuildEditor bind:build={pageState.build} bind:inventoryTab={pageState.inventoryTab.value} />
	</div>
{/if}
