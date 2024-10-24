<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { type InventoryTab } from "$lib/state/BuildEditorPageState.svelte";
	import { error } from "@sveltejs/kit";
	import CareerInventory from "../career/CareerInventory.svelte";
	import CareerSelection from "../career/CareerSelection.svelte";
	import CareerTalents from "../career/CareerTalents.svelte";
	import ContainerTitle from "../ContainerTitle.svelte";
	import BuildSummary from "./BuildSummary.svelte";
	import BuildTalentSummary from "./BuildTalentSummary.svelte";
	import BuildOptionsEditor from "./BuildOptionsEditor.svelte";
	import TextEditor from "../quill/TextEditor.svelte";
	import type { ICareer } from "$lib/entities/career/Career";
	import CareerBuildSummaryEditor from "../career/CareerBuildSummaryEditor.svelte";

	type Props = {
		build: ICareerBuild;
		inventoryTab: InventoryTab;
	};

	let { build = $bindable(), inventoryTab = $bindable() }: Props = $props();

	if (!build) {
		error(404, "Build not found");
	}

	const handleCareerChange = (career: ICareer) => {
		build.level5Talent = career.talents.find((t) => t.talentNumber === build.level5Talent?.talentNumber);
		build.level10Talent = career.talents.find((t) => t.talentNumber === build.level10Talent?.talentNumber);
		build.level15Talent = career.talents.find((t) => t.talentNumber === build.level15Talent?.talentNumber);
		build.level20Talent = career.talents.find((t) => t.talentNumber === build.level20Talent?.talentNumber);
		build.level25Talent = career.talents.find((t) => t.talentNumber === build.level25Talent?.talentNumber);
		build.level30Talent = career.talents.find((t) => t.talentNumber === build.level30Talent?.talentNumber);

		if (!career.primaryWeapons.find((w) => w.id === build.primaryWeapon?.id)) {
			build.primaryWeapon.weapon = career.primaryWeapons[0];
		}

		if (!career.secondaryWeapons.find((w) => w.id === build.secondaryWeapon?.id)) {
			build.secondaryWeapon.weapon =
				career.secondaryWeapons[0].id !== build.primaryWeapon.weapon?.id ? career.secondaryWeapons[0] : career.secondaryWeapons[1];
		}
	};
</script>

<div class="build-editor grid grid-cols-2 tablet:gap-5">
	<CareerSelection bind:selectedCareer={build.career} handler={handleCareerChange}></CareerSelection>
	<div class="career-container top-left-shadow">
		<ContainerTitle>Summary</ContainerTitle>
		<div class="build-overview-container border-01 pb-5">
			<input type="text" bind:value={build.name} placeholder="Build Name" />
			<input
				class="!text-[1.3rem] !text-[#f0d9af]"
				type="text"
				bind:value={build.summary}
				placeholder="A brief summary for your build"
				maxlength="120"
			/>
			<div class="summary-container px-5">
				<CareerBuildSummaryEditor bind:build career={build.career}></CareerBuildSummaryEditor>
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
		<TextEditor bind:content={build.description}></TextEditor>
		<div class="build-talents-container">
			<CareerTalents bind:build></CareerTalents>
		</div>
	</div>
	<div class="inventory-container top-left-shadow self-start">
		<CareerInventory bind:build bind:inventoryTab></CareerInventory>
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
