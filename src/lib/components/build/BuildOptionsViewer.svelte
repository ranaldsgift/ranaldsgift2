<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

	type Props = {
		build: ICareerBuild;
		class?: string;
	};

	const { build, class: CLASS }: Props = $props();
</script>

<div class="flex mt-4 gap-2 {CLASS} items-start flex-wrap">
	{#if build.difficulty}
		<span>{build.difficulty.name}</span>
	{/if}
	{#if build.difficultyModifier}
		<span>{build.difficultyModifier.name}</span>
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
		{#each build.roles as role}
			<span class="!text-[#c15b24]">{role.name}</span>
		{/each}
	{/if}
</div>

<style>
	span {
		border-image: url("/images/borders/border-13.png");
		border-image-width: auto;
		border-image-slice: 21;
		border-style: solid;
		border-image-repeat: repeat;
		min-height: 60px;
		align-content: center;
		padding: 10px 20px;
		background: linear-gradient(180deg, #2b1212 35%, #000);
		color: #30e158;
		font-size: 1.3rem;
	}
</style>
