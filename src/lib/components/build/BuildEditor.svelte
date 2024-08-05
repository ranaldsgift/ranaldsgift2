<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import CareerTalents from "../career/CareerTalents.svelte";
	import BuildSummary from "./BuildSummary.svelte";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();
</script>

<h1>{build.name}</h1>
<p>{build.description}</p>
<BuildSummary {build}></BuildSummary>
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
