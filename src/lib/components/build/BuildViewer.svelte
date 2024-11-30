<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import CareerTalents from "$lib/components/career/CareerTalents.svelte";
	import BuildSummary from "./BuildSummary.svelte";
	import ContainerTitle from "../ContainerTitle.svelte";
	import BuildHeader from "./BuildHeader.svelte";
	import BuildOptionsViewer from "./BuildOptionsViewer.svelte";
	import BuildTalentSummary from "./BuildTalentSummary.svelte";
	import CareerBuildSummaryContainer from "../career/CareerBuildSummaryContainer.svelte";
	import BuildGuideView from "./BuildGuideView.svelte";

	type Props = {
		build: ICareerBuild;
		patchNumber?: string;
	};

	let { build, patchNumber }: Props = $props();

	let hasBuildDescription = $derived.by(() => build.description && build.description.trim().length > 0);
</script>

<div class="build-viewer top-left-shadow">
	<ContainerTitle>Summary</ContainerTitle>
	<div class="build-overview-container border-01 pb-5">
		<BuildHeader {build} {patchNumber}></BuildHeader>
		<div class="summary-container px-5 mt-0 mobile:mt-[20px] flex-col desktop:flex-row">
			{#if build.career}
				<CareerBuildSummaryContainer {build} career={build.career}></CareerBuildSummaryContainer>
			{/if}
			<BuildTalentSummary {build}></BuildTalentSummary>
		</div>
		<div class="divider-03 h-[48px]"></div>
		<BuildSummary class="px-5" {build}></BuildSummary>
		<div class="divider-03 h-[48px]"></div>
		<div class="flex justify-center">
			<BuildOptionsViewer class="px-5" {build}></BuildOptionsViewer>
		</div>
	</div>
	{#if hasBuildDescription}
		<BuildGuideView {build}></BuildGuideView>
	{/if}
	<div class="build-talents-container">
		<CareerTalents {build} readOnly={true}></CareerTalents>
	</div>
</div>

<style>
	.build-viewer {
		grid-area: buildViewer;
	}
	.build-overview-container {
		background: linear-gradient(
				270deg,
				rgba(0, 0, 0, 0.8313725490196079),
				rgba(0, 0, 0, 0.788235294117647) 20%,
				rgba(42, 42, 42, 0.10980392156862745)
			),
			url("/images/backgrounds/background14.webp");
	}
	.summary-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
</style>
