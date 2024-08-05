<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { error } from "@sveltejs/kit";
	import BuildViewer from "$lib/components/build/BuildViewer.svelte";
	import Seo from "$lib/components/SEO.svelte";

	let { data } = $props();

	if (!data.viewModel || !data.viewModel.build) {
		error(404, "Build Page - No Build Found");
	}

	const build = data.viewModel.build;

	if (!data.viewModel.build.user) {
		error(404, "Build Page - No User Found");
	}

	const author = data.viewModel.build.user;
</script>

<Seo title={data.viewModel.title} description={data.viewModel.description} image={`/images/careers/${build.career.id}/portrait.png`}></Seo>

<PageButtonContainer>
	{#if data.sessionUser?.id === author.id}
		<a class="button-02" href={`/build/${build.id}/edit`}>Edit</a>
	{/if}
</PageButtonContainer>

<div class="build-page">
	<BuildViewer {build}></BuildViewer>
</div>
