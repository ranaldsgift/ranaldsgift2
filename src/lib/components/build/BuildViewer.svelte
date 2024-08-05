<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import CareerDetails from "$lib/components/career/CareerDetails.svelte";
	import CareerTalents from "$lib/components/career/CareerTalents.svelte";
	import BuildSummary from "./BuildSummary.svelte";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();
</script>

<h1>{build.name}</h1>
<p>{build.description}</p>

<div class="build-summary-container border-01 p-5">
	<CareerDetails career={build.career}></CareerDetails>
	<div class="divider-03 h-[48px]"></div>
	<BuildSummary {build}></BuildSummary>
</div>
<CareerTalents
	careerId={build.career.id}
	talents={build.career.talents}
	talent1={build.talent1}
	talent2={build.talent2}
	talent3={build.talent3}
	talent4={build.talent4}
	talent5={build.talent5}
	talent6={build.talent6}
></CareerTalents>

<style>
	.build-summary-container {
		background: linear-gradient(
				270deg,
				rgba(0, 0, 0, 0.8313725490196079),
				rgba(0, 0, 0, 0.788235294117647) 20%,
				rgba(42, 42, 42, 0.10980392156862745)
			),
			url("/images/backgrounds/background14.webp");
	}
</style>
