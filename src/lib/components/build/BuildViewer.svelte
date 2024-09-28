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

	const { build, patchNumber }: Props = $props();
</script>

<div class="build-viewer top-left-shadow">
	<ContainerTitle>Summary</ContainerTitle>
	<div class="build-overview-container border-01 pb-5">
		<BuildHeader {build} {patchNumber}></BuildHeader>
		<div class="summary-container px-5">
			<CareerBuildSummaryContainer {build} career={build.career}></CareerBuildSummaryContainer>
			<BuildTalentSummary {build}></BuildTalentSummary>
		</div>
		<div class="divider-03 h-[48px]"></div>
		<BuildSummary class="px-5" {build}></BuildSummary>
		<BuildOptionsViewer class="px-5" {build}></BuildOptionsViewer>
	</div>
	{#if build.description}
		<div class="build-description-container border-09 py-5 px-8">
			<BuildGuideView {build}></BuildGuideView>
		</div>
	{/if}
	<div class="build-talents-container">
		<CareerTalents
			careerId={build.career.id}
			talents={build.career.talents}
			talent1={build.talent1}
			talent2={build.talent2}
			talent3={build.talent3}
			talent4={build.talent4}
			talent5={build.talent5}
			talent6={build.talent6}
			readOnly={true}
		></CareerTalents>
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
	.build-description-container {
		background: linear-gradient(180deg, rgba(43, 18, 18, 0.2784313725490196) 35%, rgba(0, 0, 0, 0.30196078431372547));
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}
	.summary-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-top: 20px;
	}
</style>
