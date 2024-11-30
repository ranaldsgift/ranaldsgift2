<script>
	import Tooltip from "../ui/tooltip/Tooltip.svelte";
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
		<div class="flex flex-col">
			<ContainerTitle>Team</ContainerTitle>
			<div class="border-01 background-14 p-5">
				<button class="button-02" onclick={addToTeamHandler}>Add to Team</button>
				<div class="flex flex-row gap-2 flex-wrap">
					{#each teamState.builds as build}
						<div class="relative group">
							<CareerBuildPortrait {build} size="100px" />
							<button
								class="absolute top-0 right-0 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
								aria-label="Remove from Team"
								onclick={() => removeFromTeamHandler(build)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
									<path
										fill="white"
										d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
									/>
								</svg>
							</button>
						</div>
					{/each}
				</div>
				<a href={teamUrl} class="button-02">View Team</a>
			</div>
		</div>
	{/snippet}
</Tooltip>
