<script lang="ts">
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildEditor from "$lib/components/build/BuildEditor.svelte";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { error } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	import { getBuildCreatorPageState } from "$lib/state/BuildCreatorPageState.svelte.js";
	import { goto, invalidate } from "$app/navigation";
	import { CareerBuildsStore } from "$lib/stores/DataStores.js";
	import { getUserState } from "$lib/state/UserState.svelte.js";
	const { data } = $props();

	const pageState = getBuildCreatorPageState();
	const userState = getUserState();

	if (!data.build) {
		error(404, "Heroes Page - Invalid ViewModel");
	}

	if (!pageState.build) {
		pageState.build = data.build;
	}

	let isValid = $derived(BuildHelper.isValid(pageState.build) && userState.user);

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

			const json = await response.json();

			if (response.ok) {
				toast.success("Build created!", { position: "bottom-center" });
				let userId = pageState.build?.user?.id;

				goto(`/build/${json.buildId}`).then(() => {
					if (userId) {
						CareerBuildsStore.invalidateByUserId(userId);
					}
					pageState.build = null;
				});
			} else {
				toast.error(json.error, { position: "bottom-center" });
			}
		} catch (error) {
			console.error("Error saving build:", error);
			toast.error("Failed to save build. Please try again.", { position: "bottom-center" });
		}
	};

	$inspect(pageState.build);
</script>

{#if pageState.build}
	<Seo title={pageState.build.name} />

	<Breadcrumb links={[{ href: `/builds`, text: "Builds" }]}>Create</Breadcrumb>

	<PageButtonContainer>
		<button class="button-02" onclick={saveBuild} disabled={!isValid}>Save</button>
	</PageButtonContainer>

	<div class="create-build-page">
		{#if !userState.user}
			<p class=" m-auto text-center w-fit py-2 px-4 mb-4 border-02 background-22">
				Please <a href="/login">login or create an account</a> to save a build.
			</p>
		{/if}
		<BuildEditor bind:build={pageState.build} bind:inventoryTab={pageState.inventoryTab.value} />
	</div>
{/if}
