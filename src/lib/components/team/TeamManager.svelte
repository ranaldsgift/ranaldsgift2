<script lang="ts">
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import { getUserState } from "$lib/state/UserState.svelte";
	import { toast } from "svelte-sonner";
	import CareerIcon from "../career/CareerIcon.svelte";
	import ItemIconTooltip from "../inventory/ItemIconTooltip.svelte";
	import { goto } from "$app/navigation";

	let userState = getUserState();
	let expandedTeams: boolean[] = $state([]);
	let editingTeamIndex = $state(-1);

	function handleBlur() {
		editingTeamIndex = -1;
	}

	const addTeam = () => {
		userState.teams.value.push({ name: "New Team", builds: [] });
		expandedTeams.push(false);
	};

	const toggleTeam = (index: number) => {
		if (editingTeamIndex === index) return;
		expandedTeams[index] = !expandedTeams[index];
	};

	const deleteTeam = (index: number) => {
		toast(`Team ${userState.teams.value[index]?.name} deleted`, {
			position: "bottom-center",
		});

		userState.teams.value = userState.teams.value.filter((_, i) => i !== index);
		expandedTeams = expandedTeams.filter((_, i) => i !== index);
	};

	const loadBuild = (teamIndex: number, buildIndex: number) => {
		const build = userState.teams.value[teamIndex]?.builds?.[buildIndex];
		if (build) {
			if (Number(build.id)) {
				goto(`/build/${build.id}`);
			} else {
				goto(`/heroes?build=${build.id}`);
			}
		}
	};

	const removeBuild = (teamIndex: number, buildIndex: number) => {
		if (userState.teams.value[teamIndex]?.builds) {
			userState.teams.value[teamIndex].builds = userState.teams.value[teamIndex].builds.filter((_, i) => i !== buildIndex);
		}

		toast(`Build removed from ${userState.teams.value[teamIndex]?.name ?? "team"}`, {
			position: "bottom-center",
		});
	};

	const getTeamUrl = (teamIndex: number) => {
		let buildIds = userState.teams.value[teamIndex]?.builds?.map((build) => build.id);
		let url = `/teams/${buildIds?.join(";")}`;
		if (userState.teams.value[teamIndex]?.name) {
			url += `?name=${userState.teams.value[teamIndex]?.name}`;
		}
		return url;
	};
</script>

<div class="h-[400px] w-[300px] relative text-xl overflow-y-auto">
	<div class="border-02 p-2"><h2 class="text-primary">Team Manager</h2></div>
	<div class="grid grid-cols-1">
		{#each userState.teams.value as team, i}
			<div class="flex" style="background: url('/images/dividers/divider-border-02.png') bottom center repeat-x">
				<div class="w-full relative group">
					<div
						role="button"
						tabindex={i}
						onkeydown={(e) => {
							if (e.key === "Enter") {
								toggleTeam(i);
							}
						}}
						class="w-full p-2 cursor-pointer"
						onclick={(e) => {
							// Check if click target is a child of the button container
							if ((e.target as HTMLElement)?.closest(".button-container")) {
								return;
							}
							toggleTeam(i);
						}}
					>
						<div class="flex gap-2">
							<div class="flex-1 flex">
								<input
									type="text"
									bind:value={team.name}
									class="text-secondary !bg-transparent"
									class:pointer-events-none={editingTeamIndex !== i}
									onblur={handleBlur}
								/>
							</div>
							<div class="button-container gap-2 items-center hidden group-hover:flex">
								<button
									title="Edit Team Name"
									onclick={(event) => {
										event.stopPropagation();
										editingTeamIndex = i;
										const input = (event.target as HTMLElement).closest(".group")?.querySelector("input");
										if (input) {
											input.focus();
										}
									}}
								>
									<img
										src="/images/icons/edit.svg"
										class="size-[20px] brightness-75 hover:brightness-100"
										alt="Edit Team"
									/>
								</button>
								{#if team.builds && team.builds.length > 0}
									<a href={getTeamUrl(i)}>
										<img
											src="/images/icons/open.svg"
											class="size-[24px] brightness-75 hover:brightness-100"
											alt="View Team"
										/>
									</a>
								{/if}
								<button title="Delete Team" style="--size: 20px;" onclick={(e) => deleteTeam(i)}>
									<img
										src="/images/icons/delete.svg"
										class="size-[18px] brightness-75 hover:brightness-100"
										alt="Delete Team"
									/>
								</button>
							</div>
							<img
								src="/images/icons/arrow-accordion.png"
								class="size-[24px] transition-transform self-center"
								class:-rotate-90={!expandedTeams[i]}
								class:rotate-90={expandedTeams[i]}
								alt="Expand/Collapse"
							/>
						</div>
					</div>
					{#if expandedTeams[i]}
						<div class="team-builds mt-2 p-2">
							{#if team.builds && team.builds.length > 0}
								{#each team.builds as build, buildIndex}
									<div class="flex gap-2">
										<div
											class="size-[40px] overflow-hidden border-04"
											style="background: url('/images/careers/{build.careerId ??
												build.career?.id ??
												0}/portrait.png') no-repeat center / contain, url('/images/backgrounds/background29.png') no-repeat center / cover"
										></div>
										<ItemIconTooltip size={"40px"} itemBuild={build.primaryWeapon} itemType={ItemTypeEnum.Weapon} />
										<ItemIconTooltip size={"40px"} itemBuild={build.secondaryWeapon} itemType={ItemTypeEnum.Weapon} />
										<button onclick={() => loadBuild(i, buildIndex)}>Load</button>
										<button onclick={() => removeBuild(i, buildIndex)}>Remove</button>
									</div>
								{/each}
							{:else}
								<span class="text-tertiary"
									>Click the Add to Team button on a Build Page or in the Hero Editor to add a Build to this Team</span
								>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex justify-end p-2">
		<button onclick={addTeam}>Add Team</button>
	</div>
	<div class="border-02 absolute bottom-0 left-0 right-0 top-0 pointer-events-none"></div>
</div>
