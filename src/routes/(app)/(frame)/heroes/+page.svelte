<script lang="ts">
	import { getHeroesPageState } from "$lib/state/HeroesPageState.svelte";
	import CareerEditor from "$lib/components/career/CareerEditor.svelte";
	import CareerSelection from "$lib/components/career/CareerSelection.svelte";
	import CareerHelper from "$lib/helpers/CareerHelper.js";
	import type { ICareer } from "$lib/entities/career/Career.js";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { toast } from "svelte-sonner";
	import { error } from "@sveltejs/kit";
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import hash from "object-hash";
	import Tooltip from "$lib/components/ui/tooltip/Tooltip.svelte";
	import ContainerTitle from "$lib/components/ContainerTitle.svelte";
	import { getUserState } from "$lib/state/UserState.svelte.js";

	const { data } = $props();
	const { viewModel } = data;
	const pageState = getHeroesPageState();
	const userState = getUserState();

	if (!viewModel || !viewModel.build) {
		error(404, "Heroes Page - Invalid ViewModel");
	}

	if (!pageState.selectedCareer) {
		pageState.selectedCareer = viewModel.build.career ?? null;
	}

	if (!pageState.build) {
		pageState.build = viewModel.build;
	}

	const careerSelectionHandler = (career: ICareer) => {
		if (pageState.build?.career !== career) {
			const build = CareerHelper.getNewCareerBuildForCareer(career);
			const mergedBuildState = Object.assign({}, pageState.build, build);
			mergedBuildState.level5Talent = undefined;
			mergedBuildState.level10Talent = undefined;
			mergedBuildState.level15Talent = undefined;
			mergedBuildState.level20Talent = undefined;
			mergedBuildState.level25Talent = undefined;
			mergedBuildState.level30Talent = undefined;
			pageState.build = mergedBuildState;
		}
	};

	const shareButtonHandler = () => {
		navigator.clipboard.writeText(`${window.location.origin}/heroes?build=${hash(pageState.build)}`);

		saveBuildToRedis();

		toast(`Copied ${pageState.build?.career?.name} build to clipboard`, {
			position: "bottom-center",
		});
	};

	const saveBuildToRedis = () => {
		const buildHash = hash(pageState.build);
		if (pageState.hashes.value.find((h) => h === buildHash)) {
			return;
		}

		try {
			fetch("/v2-api/heroes/share", {
				method: "POST",
				body: JSON.stringify({ buildHash, build: pageState.build }),
			});
		} catch (error) {
			console.error(error);
		} finally {
			pageState.hashes.value = [...pageState.hashes.value, buildHash];
		}
	};

	let selectedTeamIndex = $state(0);
	let selectedTeam = $derived(userState.teams.value[selectedTeamIndex]);
	let selectedBuildToReplaceIndex = $state(-1);

	const addToTeamHandler = () => {
		if (pageState.build) {
			const buildHash = hash(pageState.build);
			saveBuildToRedis();

			if (selectedTeam && selectedTeam.builds && selectedBuildToReplaceIndex >= 0) {
				selectedTeam.builds[selectedBuildToReplaceIndex] = { ...pageState.build, id: buildHash };
			} else if (selectedTeam && selectedTeam.builds) {
				selectedTeam.builds.push({ ...pageState.build, id: buildHash });
			} else {
				userState.teams.value.push({
					id: userState.teams.value.length,
					name: pageState.build.career?.name,
					builds: [{ ...pageState.build, id: buildHash }],
				});
			}

			toast(`Build added to ${selectedTeam?.name ?? "team"}`, {
				position: "bottom-center",
			});
		}
	};

	// TODO - Investigate if this is a good idea to enable in terms of UpstashRedis costs and if it has any other usability implications
	/* $effect(() => {
		LogHelper.debug(`Heroes Page - Build state changed.`);
		const redisBuild = hash(pageState.build);
		if (redisBuild) {
			saveBuildToRedis();
		}
	}); */

	let pageTitle = $derived(`${pageState.build?.career?.name} - ${pageState.build?.career?.hero.name}`);
	let pageDescription = $derived(
		`${pageState.build?.career?.name} build for ${pageState.build?.career?.hero.name}. 
		${pageState.build.primaryWeapon.weapon?.name ?? "Primary Weapon"} with ${pageState.build.primaryWeapon.property1?.name}, ${pageState.build.primaryWeapon.property2?.name}, and ${pageState.build.primaryWeapon.trait?.name}.
		${pageState.build.secondaryWeapon.weapon?.name ?? "Secondary Weapon"} with ${pageState.build.secondaryWeapon.property1?.name}, ${pageState.build.secondaryWeapon.property2?.name}, and ${pageState.build.secondaryWeapon.trait?.name}.
		Necklace with ${pageState.build.necklace.property1?.name}, ${pageState.build.necklace.property2?.name}, and ${pageState.build.necklace.trait?.name}.
		Charm with ${pageState.build.charm.property1?.name}, ${pageState.build.charm.property2?.name}, and ${pageState.build.charm.trait?.name}.
		Trinket with ${pageState.build.trinket.property1?.name}, ${pageState.build.trinket.property2?.name}, and ${pageState.build.trinket.trait?.name}.`
	);
</script>

{#if pageState.build}
	<Seo title={pageTitle} description={pageDescription} image={`/images/careers/${pageState.build.career?.id}/portrait.png`} />

	<Breadcrumb links={[{ href: "/", text: "Home" }]}>Heroes</Breadcrumb>

	<PageButtonContainer>
		<button class="button-02" onclick={shareButtonHandler}
			>Share
			<svg class="mt-[-2px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
				><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
					><path
						d="M10.046 14c-1.506-1.512-1.37-4.1.303-5.779l4.848-4.866c1.673-1.68 4.25-1.816 5.757-.305c1.506 1.512 1.37 4.1-.303 5.78l-2.424 2.433"
					/><path
						d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433l-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305c-1.506-1.512-1.37-4.1.303-5.78l2.424-2.433"
					/></g
				></svg
			></button
		>
		<Tooltip options={{ delay: [0, 0], animation: false, interactive: true, trigger: "click" }}>
			<button class="button-02"
				>Team
				<svg class="mt-[-2px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
					><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
						<circle cx="12" cy="12" r="10" />
						<path d="M12 7v10m-5-5h10" />
					</g></svg
				></button
			>
			{#snippet content()}
				<div class="flex flex-col gap-4">
					<ContainerTitle>Add to Team</ContainerTitle>
					<div class="border-01 background-14 p-5 flex flex-col gap-4 justify-center items-center">
						<div class="w-full">
							<span class="block mb-2 text-sm font-medium">Select Team</span>
							<select class="w-full p-2 border rounded bg-background text-foreground" bind:value={selectedTeamIndex}>
								{#each userState.teams.value as team, index}
									<option selected={index === 0} value={index}>
										{team.name ?? team.id}
									</option>
								{/each}
							</select>
						</div>

						{#if selectedTeam}
							<div class="w-full">
								<span class="block mb-2 text-sm font-medium">Overwrite Build (Optional)</span>
								<select
									class="w-full p-2 border rounded bg-background text-foreground"
									bind:value={selectedBuildToReplaceIndex}
								>
									<option value={-1}>Add as new build</option>
									{#each selectedTeam?.builds ?? [] as build, index}
										<option value={index}>{build.name}</option>
									{/each}
								</select>
							</div>
						{/if}

						<button class="button-02" onclick={addToTeamHandler} disabled={!selectedTeam}>
							{selectedBuildToReplaceIndex >= 0 ? "Overwrite Build" : "Add Build"}
						</button>
					</div>
				</div>
			{/snippet}
		</Tooltip>
	</PageButtonContainer>

	<div class="page-layout gap-0 min-[1800px]:gap-5">
		<CareerSelection bind:selectedCareer={pageState.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<CareerEditor bind:build={pageState.build} bind:inventoryTab={pageState.inventoryTab.value}></CareerEditor>
	</div>
{:else}
	<div class="page-layout gap-0 tablet:gap-5">
		<CareerSelection bind:selectedCareer={pageState.selectedCareer} careers={viewModel.careers} handler={careerSelectionHandler}
		></CareerSelection>
		<span>Initializing...</span>
	</div>
{/if}

<style>
	.page-layout {
		display: grid;
		align-self: start;
		grid-template-columns: 100% !important;
		grid-template-areas: "careerSelection" "careerContainer" "careerInventory" !important;
	}

	@media (min-width: 1800px) {
		.page-layout {
			grid-template-columns: 1fr 980px 1fr !important;
			grid-template-areas: "careerSelection careerContainer careerInventory" !important;
		}
	}

	@media (min-width: 1000px) and (max-width: 1899px) {
		/*         .page-layout {
            width: auto !important;
            grid-template-columns: auto !important;
            grid-template-areas: "careerSelection" "careerContainer" "careerInventory" !important;
        } */
	}
</style>
