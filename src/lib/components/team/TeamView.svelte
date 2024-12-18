<script lang="ts">
	import type { ITeam } from "$lib/entities/Team.js";
	import BuildCreationInfo from "../build/BuildCreationInfo.svelte";
	import BuildOverview from "../build/BuildOverview.svelte";
	import CareerBuildPortrait from "../career/CareerBuildPortrait.svelte";
	import TextHeader from "../TextHeader.svelte";
	import Tooltip from "../ui/tooltip/Tooltip.svelte";

	export let team: ITeam;
</script>

<div class="flex flex-col">
	<TextHeader>{team.name}</TextHeader>
	<div class="team-view flex flex-wrap gap-4 justify-center">
		{#each team.builds ?? [] as build}
			<a href={Number(build.id) ? `/build/${build.id}` : `/heroes?build=${build.id}`} class="hover:!no-underline">
				<div class="build-overview-wrapper relative mt-[82px]">
					<div class="absolute top-[-75px] left-[50%] translate-x-[-50%] z-[10]">
						<CareerBuildPortrait {build} size="142px" />
					</div>
					<div>
						<div class="career-background" data-career={build.career?.id}></div>
						<div class="relative border-01 p-5 pt-[75px]">
							<BuildOverview {build} />
						</div>
					</div>
				</div></a
			>
		{/each}
	</div>
</div>

<style>
	.team-view {
		z-index: 1;
	}
	.build-overview-wrapper {
		z-index: 1;
	}
	.career-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.career-background {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-position-y: bottom;
		-webkit-filter: contrast(175%) saturate(200%);
		filter: contrast(175%) saturate(200%);
	}
	.career-background[data-career="1"] {
		background:
			linear-gradient(-16deg, rgba(87, 57, 57, 0.45), rgba(87, 57, 57, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="2"] {
		background:
			linear-gradient(-16deg, rgba(89, 98, 61, 0.45), rgba(89, 98, 61, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="3"] {
		background:
			linear-gradient(-16deg, rgba(9, 20, 41, 0.45), rgba(9, 20, 41, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="4"] {
		background:
			linear-gradient(-16deg, rgba(29, 37, 5, 0.45), rgba(29, 37, 5, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="5"] {
		background:
			linear-gradient(-16deg, rgba(10, 54, 63, 0.45), rgba(10, 54, 63, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="6"] {
		background:
			linear-gradient(-16deg, rgba(52, 0, 0, 0.45), rgba(52, 0, 0, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="7"] {
		background:
			linear-gradient(-16deg, rgba(10, 23, 8, 0.45), rgba(10, 23, 8, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="8"] {
		background:
			linear-gradient(-16deg, rgba(13, 26, 43, 0.45), rgba(13, 26, 43, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="9"] {
		background:
			linear-gradient(-16deg, rgba(31, 20, 40, 0.45), rgba(31, 20, 40, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="10"] {
		background:
			linear-gradient(-16deg, rgba(32, 38, 40, 0.45), rgba(32, 38, 40, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="11"] {
		background:
			linear-gradient(-16deg, rgba(40, 31, 15, 0.45), rgba(40, 31, 15, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="12"] {
		background:
			linear-gradient(-16deg, rgba(35, 35, 30, 0.45), rgba(35, 35, 30, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="13"] {
		background:
			linear-gradient(-16deg, rgba(46, 16, 0, 0.45), rgba(46, 16, 0, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="14"] {
		background:
			linear-gradient(-16deg, rgba(36, 6, 2, 0.45), rgba(36, 6, 2, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="15"] {
		background:
			linear-gradient(-16deg, rgba(89, 98, 61, 0.45), rgba(89, 98, 61, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="16"] {
		background:
			linear-gradient(-16deg, rgb(88 63 24 / 45%), rgb(88 63 24 / 45%)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="17"] {
		background:
			linear-gradient(-16deg, rgb(88 63 24 / 45%), rgb(88 63 24 / 45%)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="18"] {
		background:
			linear-gradient(rgb(98 93 96 / 45%), rgb(49 49 49 / 45%)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="19"] {
		background:
			linear-gradient(-16deg, rgba(30, 10, 20, 0.45), rgba(30, 10, 20, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-background[data-career="20"] {
		background:
			linear-gradient(-16deg, rgba(30, 10, 20, 0.45), rgba(30, 10, 20, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
</style>
