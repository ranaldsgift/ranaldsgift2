<script lang="ts">
	import BuildSummary from "$lib/components/build/BuildSummary.svelte";
	import CareerBuildDetails from "$lib/components/career/CareerBuildDetails.svelte";
	import CareerInventory from "$lib/components/career/CareerInventory.svelte";
	import CareerTalents from "$lib/components/career/CareerTalents.svelte";
	import ContainerTitle from "$lib/components/ContainerTitle.svelte";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { InventoryTab } from "$lib/state/HeroesPageState.svelte";
	import BuildTalentSummary from "../build/BuildTalentSummary.svelte";

	type Props = {
		build: ICareerBuild;
		inventoryTab: InventoryTab;
	};

	let { build = $bindable(), inventoryTab = $bindable() }: Props = $props();
</script>

<!-- TODO - Add Floating Copy URL Button -->

<div class="career-container top-left-shadow">
	<ContainerTitle class="w-full">Career Overview</ContainerTitle>
	<div class="career-details-container">
		<div class="border-01 p-5">
			<CareerBuildDetails {build} career={build.career}></CareerBuildDetails>
			<div class="divider-03 h-[48px]"></div>
			<BuildSummary {build}></BuildSummary>
		</div>
		<div class="border-01">
			<CareerTalents
				careerId={build.career.id}
				talents={build.career.talents}
				bind:talent1={build.talent1}
				bind:talent2={build.talent2}
				bind:talent3={build.talent3}
				bind:talent4={build.talent4}
				bind:talent5={build.talent5}
				bind:talent6={build.talent6}
			></CareerTalents>
		</div>
	</div>
</div>
<CareerInventory bind:build bind:inventoryTab></CareerInventory>

<style>
	.career-container {
		grid-area: careerContainer;
	}
	.career-details-container {
		background: linear-gradient(
				270deg,
				rgba(0, 0, 0, 0.8313725490196079),
				rgba(0, 0, 0, 0.788235294117647) 20%,
				rgba(42, 42, 42, 0.10980392156862745)
			),
			url("/images/backgrounds/background14.webp");
	}
</style>
