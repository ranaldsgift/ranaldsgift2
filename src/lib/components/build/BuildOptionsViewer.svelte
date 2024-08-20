<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();
</script>

<div class="flex mt-4">
	{#if build.difficulty}
		<span>{build.difficulty.name}</span>
	{/if}
	{#if build.twitch}
		<span>{build.twitch.name}</span>
	{/if}
	{#if build.mission}
		<span>{build.mission.name}</span>
	{/if}
	{#if build.potion}
		<span>{build.potion.name}</span>
	{/if}
	{#if build.book}
		<span>{build.book.name}</span>
	{/if}
	{#if build.roles}
		<ul>
			{#each build.roles as role}
				<li>{role.name}</li>
			{/each}
		</ul>
	{/if}
</div>

<!-- <TwitchSelect key='twitchMode' selectedValues={selectedTwitchMode}></TwitchSelect>
          optionsHtml.push(<MissionSelect key='mission' selectedValues={selectedMissions}></MissionSelect>);
          optionsHtml.push(<PotionSelect key='potion' selectedValues={selectedPotions}></PotionSelect>);
          optionsHtml.push(<BookSelect key='book' selectedValues={selectedBooks}></BookSelect>);
          optionsHtml.push(<RoleSelect key='roles' selectedValues={state.roles}></RoleSelect>); -->

<style>
	span,
	li {
		border-image: url("/images/borders/border-13.png");
		border-image-width: auto;
		border-image-slice: 21;
		border-style: solid;
		border-image-repeat: repeat;
		min-height: 60px;
		align-content: center;
		padding: 10px 20px;
		background: linear-gradient(180deg, #2b1212 35%, #000);
	}
</style>
