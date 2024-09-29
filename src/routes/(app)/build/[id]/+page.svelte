<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { error } from "@sveltejs/kit";
	import BuildViewer from "$lib/components/build/BuildViewer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters.js";

	let { data } = $props();

	if (!data.viewModel || !data.viewModel.build) {
		error(404, "Build Page - No Build Found");
	}

	let build = $derived(data.viewModel.build);

	if (!data.viewModel.build.user) {
		error(404, "Build Page - No User Found");
	}

	let author = $derived(data.viewModel.build.user);

	let similarBuildsFilter: BuildTableFilter = $derived({
		userId: author.id,
		careerId: build.careerId,
		limit: 3,
		excludeBuildIds: [build.id],
	});

	let moreBuildsFilter: BuildTableFilter = $derived({
		careerId: build.careerId,
		limit: 3,
		excludeBuildIds: [build.id],
		excludeAuthorIds: [author.id],
	});
</script>

<Seo title={data.viewModel.title} description={data.viewModel.description} image={`/images/careers/${build.career.id}/portrait.png`}></Seo>

<Breadcrumb links={[{ href: `/builds`, text: "Builds" }]}>
	{build.name}
</Breadcrumb>

<PageButtonContainer>
	{#if data.sessionUser?.id === author.id}
		<a class="button-02" href={`/build/${build.id}/edit`}>Edit</a>
	{/if}
</PageButtonContainer>

<div class="view-build-page build-page grid grid-cols-1 desktop:grid-cols-[2fr_1fr]" data-readonly={true}>
	<div class="build-main-container">
		<BuildViewer {build} patchNumber={data.viewModel.patchNumber}></BuildViewer>
	</div>
	<div class="build-side-container">
		<BuildTable filter={similarBuildsFilter} title={`Similar Builds by ${build.user?.name}`} class="!grid-cols-1"></BuildTable>
		<BuildTable filter={moreBuildsFilter} title={`More ${build.career.name} Builds`} class="!grid-cols-1"></BuildTable>
	</div>
</div>

<style>
	.build-main-container {
		grid-area: buildMainContainer;
	}
	.build-side-container {
		grid-area: buildSideContainer;
	}
	.view-build-page {
		display: grid;
		gap: 20px;
		grid-template-areas: "buildMainContainer" "buildSideContainer";
	}
	@media (min-width: 1800px) {
		.view-build-page {
			grid-template-columns: 2fr 1fr;
			grid-template-areas: "buildMainContainer buildSideContainer";
		}
	}
</style>
