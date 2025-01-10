<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { getUserState } from "$lib/state/UserState.svelte";
	import { toast } from "svelte-sonner";
	import ContainerTitle from "../ContainerTitle.svelte";
	import Tooltip from "../ui/tooltip/Tooltip.svelte";
	import hash from "object-hash";

	type Props = {
		build: ICareerBuild;
	};

	let { build }: Props = $props();

	let userState = getUserState();

	let selectedTeamIndex = $state(userState.teams.value.length === 0 ? -1 : 0);
	let selectedTeam = $derived(selectedTeamIndex >= 0 ? userState.teams.value[selectedTeamIndex] : null);
	let replacingBuild = $state(false);
	let selectedBuildToReplaceIndex = $state(-1);

	const addToTeamHandler = () => {
		if (build.id) {
			if (typeof build.id === "number") {
				// Handle numerical ID case
				if (selectedTeam && selectedTeam.builds && selectedBuildToReplaceIndex >= 0) {
					selectedTeam.builds[selectedBuildToReplaceIndex] = { ...build };
				} else if (selectedTeam && selectedTeam.builds) {
					selectedTeam.builds.push({ ...build });
				} else {
					userState.teams.value.push({
						id: userState.teams.value.length,
						name: `Untitled Team ${userState.teams.value.length + 1}`,
						builds: [{ ...build }],
					});
				}
			}
		} else {
			const buildHash = hash(build);
			saveBuildToRedis(buildHash);

			if (selectedTeam && selectedTeam.builds && selectedBuildToReplaceIndex >= 0) {
				selectedTeam.builds[selectedBuildToReplaceIndex] = { ...build, id: buildHash };
			} else if (selectedTeam && selectedTeam.builds) {
				selectedTeam.builds.push({ ...build, id: buildHash });
			} else {
				userState.teams.value.push({
					id: userState.teams.value.length,
					name: build.career?.name,
					builds: [{ ...build, id: buildHash }],
				});
			}
		}

		toast(`Build added to ${selectedTeam?.name ?? "team"}`, {
			position: "bottom-center",
		});
	};

	const saveBuildToRedis = (buildHash: string) => {
		if (userState.hashes.value.find((h) => h === buildHash)) {
			return;
		}

		try {
			fetch("/v2-api/heroes/share", {
				method: "POST",
				body: JSON.stringify({ buildHash, build: build }),
			});
		} catch (error) {
			console.error(error);
		} finally {
			userState.hashes.value = [...userState.hashes.value, buildHash];
		}
	};

	$effect(() => {
		if (!replacingBuild) {
			selectedBuildToReplaceIndex = -1;
		}
	});
</script>

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
		<div class="flex flex-col min-w-[200px]">
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
						<option selected={userState.teams.value.length === 0 || selectedTeamIndex === -1} value={-1}>New Team...</option>
					</select>
				</div>

				{#if selectedTeam}
					<div class="w-full text-center">
						<input id="replacingBuild" type="checkbox" bind:checked={replacingBuild} />
						<label for="replacingBuild">Overwrite Build</label>
						{#if replacingBuild}
							<select
								class="w-full p-2 border rounded bg-background text-foreground"
								bind:value={selectedBuildToReplaceIndex}
							>
								{#each selectedTeam?.builds ?? [] as build, index}
									<option value={index}>{build.name ?? `${build.career?.name} (${index + 1})`}</option>
								{/each}
							</select>
						{/if}
					</div>
				{/if}

				<button class="button-02" onclick={addToTeamHandler}>
					{selectedBuildToReplaceIndex >= 0 ? "Overwrite" : "Add"}
				</button>
			</div>
		</div>
	{/snippet}
</Tooltip>
