<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import BuildCreationInfo from "./BuildCreationInfo.svelte";
	import BuildRating from "./BuildRating.svelte";
	import BuildFavorite from "./BuildFavorite.svelte";

	type Props = {
		build: ICareerBuild;
		patchNumber?: string;
	};

	let { build, patchNumber }: Props = $props();
</script>

<div class="build-header-details-container">
	<div class="header-layout">
		<span class="build-header heading">{build.name}</span>
		<BuildFavorite {build}></BuildFavorite>
		<div class="ml-auto">
			<BuildRating bind:build></BuildRating>
		</div>
	</div>
	<div class="build-information-container">
		<BuildCreationInfo {build}></BuildCreationInfo>
		<span class="text-divider-02"></span>
		<div><span>Patch&nbsp;&nbsp;</span><span class="patch-number">{patchNumber}</span></div>
	</div>
</div>

<style>
	.header-layout {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		padding: 5px 20px;
	}
	.build-header {
		color: #c15b24;
		font-size: 2rem;
		text-transform: uppercase;
		text-shadow: 1px 1px #000;
	}
	.build-information-container {
		grid-area: buildInformation;
		display: flex;
		flex-wrap: wrap;
		grid-column-gap: 10px;
		background-color: #440c0c3b;
		position: relative;
		padding: 3px 10px;
		border-top: 1px solid #f0d9af5e;
		border-bottom: 1px solid #f0d9af5e;
		align-items: center;
		width: calc(100% - 3px);
		z-index: 0;
		background: linear-gradient(45deg, #000000, #000000e0), url("/images/backgrounds/background19.png");
	}
	.patch-number {
		justify-self: left;
		font-size: 1.4em;
		color: #f0d9af;
		text-decoration: none;
	}
</style>
