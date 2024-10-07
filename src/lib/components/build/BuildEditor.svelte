<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { type InventoryTab } from "$lib/state/BuildEditorPageState.svelte";
	import { error } from "@sveltejs/kit";
	import CareerBuildSummaryContainer from "../career/CareerBuildSummaryContainer.svelte";
	import CareerInventory from "../career/CareerInventory.svelte";
	import CareerSelection from "../career/CareerSelection.svelte";
	import CareerTalents from "../career/CareerTalents.svelte";
	import ContainerTitle from "../ContainerTitle.svelte";
	import BuildGuideEditor from "./BuildGuideEditor.svelte";
	import BuildSummary from "./BuildSummary.svelte";
	import BuildTalentSummary from "./BuildTalentSummary.svelte";
	import BuildOptionsEditor from "./BuildOptionsEditor.svelte";

	type Props = {
		build: ICareerBuild;
		inventoryTab: InventoryTab;
	};

	let { build = $bindable(), inventoryTab = $bindable() }: Props = $props();

	if (!build) {
		error(404, "Build not found");
	}
</script>

<div class="build-editor grid grid-cols-2 gap-5">
	<CareerSelection bind:selectedCareer={build!.career}></CareerSelection>
	<div class="career-container top-left-shadow">
		<ContainerTitle>Summary</ContainerTitle>
		<div class="build-overview-container border-01 pb-5">
			<input type="text" bind:value={build.name} placeholder="Build Name" />
			<input class="!text-[1.3rem] !text-[#f0d9af]" type="text" bind:value={build.summary} placeholder="A brief summary for your build" maxlength="120" />
			<div class="summary-container px-5">
				<CareerBuildSummaryContainer {build} career={build.career}></CareerBuildSummaryContainer>
				<div class="hidden desktop:block">
					<BuildTalentSummary {build}></BuildTalentSummary>
				</div>
			</div>
			<div class="divider-03 h-[48px]"></div>
			<div class="hidden desktop:block mb-4">
				<BuildSummary class="px-5" {build}></BuildSummary>
			</div>
			<div class="px-5">
				<BuildOptionsEditor bind:build></BuildOptionsEditor>
			</div>
		</div>
		<BuildGuideEditor bind:guide={build.description}></BuildGuideEditor>
		<div class="build-talents-container">
			<CareerTalents bind:build={build}></CareerTalents>
		</div>
	</div>
	<div class="inventory-container top-left-shadow self-start">
		<CareerInventory bind:build bind:inventoryTab={inventoryTab}></CareerInventory>
	</div>
</div>

<style>
	.career-container {
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
		padding-top: 20px;
	}

	input {
		border-bottom: 1px solid #f0d9af5e;
		background: transparent;
		width: 100%;
		outline: none;
		color: #c15b24;
		font-size: 2rem;
		padding: 0 10px;
	}

	.build-editor {
		display: grid;
		align-self: start;
		gap: 20px;
		grid-template-columns: 100% !important;
		grid-template-areas: "careerSelection" "careerContainer" "careerInventory" !important;
	}
	@media (min-width: 1800px) {
		.build-editor {
			display: grid;
			grid-template-columns: 1fr 980px 1fr !important;
			grid-template-areas: "careerSelection careerContainer careerInventory" !important;
		}
	}
</style>
