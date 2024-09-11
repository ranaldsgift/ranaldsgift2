<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { error } from "@sveltejs/kit";
	import BuildViewer from "$lib/components/build/BuildViewer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";

	let { data } = $props();

	if (!data.viewModel || !data.viewModel.build) {
		error(404, "Build Page - No Build Found");
	}

	let build = $derived(data.viewModel.build);

	if (!data.viewModel.build.user) {
		error(404, "Build Page - No User Found");
	}

	let author = $derived(data.viewModel.build.user);
</script>

<Seo title={data.viewModel.title} description={data.viewModel.description} image={`/images/careers/${build.career.id}/portrait.png`}></Seo>

<PageButtonContainer>
	{#if data.sessionUser?.id === author.id}
		<a class="button-02" href={`/build/${build.id}/edit`}>Edit</a>
	{/if}
</PageButtonContainer>

<div class="view-build-page build-page" data-readonly={true}>
	<div class="build-main-container">
		<BuildViewer {build} patchNumber={data.viewModel.patchNumber}></BuildViewer>
	</div>
	<div class="build-side-container">
		<BuildTable filter={{ userId: author.id, careerId: build.careerId, limit: 3 }}></BuildTable>
		<BuildTable filter={{ careerId: build.careerId, limit: 3 }}></BuildTable>
	</div>
</div>

<style>
	.build-main-container {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-areas: "buildViewer buildSideContainer";
	}
	.build-side-container {
		grid-area: buildSideContainer;
	}
</style>
