<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { error } from "@sveltejs/kit";
	import BuildViewer from "$lib/components/build/BuildViewer.svelte";
	import Seo from "$lib/components/SEO.svelte";

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
	<div class="build-side-container top-left-shadow">
		<!-- <BuildsList name={`Similar Builds by ${state.username}`} 
			careerId={state.careerId}
			user={{id: state.userId, username: state.username}}
			hideFilters={true}
			hidePages={true}
			pageLimit={3}
			filters={[{ field: firebase.firestore.FieldPath.documentId(), comparison: '!=', value: state.buildId }]}
			builds={state.userBuilds}
			firstBuildDoc={state.firstBuildDocUserBuilds}
			lastBuildDoc={state.lastBuildDocUserBuilds}
			currentPage={state.currentPageUserBuilds}
			isLastPage={state.isLastPageUserBuilds}
			isLoadingData={state.isLoadingDataUserBuilds}
			isDataLoaded={state.isDataLoadedUserBuilds}
			updateCommand={'UPDATE_SIMILAR_USER_BUILDS_DATA'}
			hideEmpty={true}></BuildsList>                
	<BuildsList name={`More ${career.name} Builds`}
			careerId={state.careerId}
			hideFilters={true}
			hidePages={true}
			pageLimit={3}
			filters={[{ field: 'userId', comparison: '!=', value: state.userId }]}
			builds={state.similarBuilds}
			firstBuildDoc={state.firstBuildDocSimilarBuilds}
			lastBuildDoc={state.lastBuildDocSimilarBuilds}
			currentPage={state.currentPageSimilarBuilds}
			isLastPage={state.isLastPageSimilarBuilds}
			isLoadingData={state.isLoadingDataSimilarBuilds}
			isDataLoaded={state.isDataLoadedSimilarBuilds}
			updateCommand={'UPDATE_SIMILAR_CAREER_BUILDS_DATA'}></BuildsList> -->
	</div>
	<div class="build-main-container p-5">
		<BuildViewer {build} patchNumber={data.viewModel.patchNumber}></BuildViewer>
		<div class="build-side-container">
			<!--
			Similar Builds by User
			<BuildList></BuildList>
			More builds for career
			<BuildList></BuildList>
			-->
		</div>
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
