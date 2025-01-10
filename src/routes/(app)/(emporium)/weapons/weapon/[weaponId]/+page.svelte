<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import TraitIconTooltip from "$lib/components/inventory/TraitIconTooltip.svelte";
	import WeaponIconTooltip from "$lib/components/inventory/WeaponIconTooltip.svelte";
	import EmporiumLayout from "$lib/components/layout/EmporiumLayout.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
	import { WeaponTooltip } from "$lib/entities/Weapon";
	import { getVerminDataState } from "$lib/state/VerminDataState.svelte.js";

	let { data } = $props();

	let verminData = getVerminDataState();

	$inspect(verminData.heroes);
</script>

<Seo title="Builds and Stats for the Heroes of Ubersreik" />

<Breadcrumb
	links={[
		{ href: "/weapons", text: "Weapons" },
		{ href: `/weapons/${data.hero.id}`, text: data.hero.name },
	]}
	layout="emporium"
>
	{data.weapon.name}
</Breadcrumb>

<EmporiumLayout>
	{#snippet pageHeader()}
		{data.weapon.name}
	{/snippet}
	{#snippet leftContent()}
		<div class="careers flex flex-col gap-2 w-full max-w-[500px]">
			{#each data.careers as career}
				<a class="flex w-full h-[60px] relative z-10 career-icon-wrapper" href={`/weapons/${career.hero.id}/${career.id}`}>
					<div class="career-icon-background"></div>
					<span
						class="career-icon w-full h-full absolute top-0 left-0 hover:opacity-100 opacity-55 hover:cursor-pointer"
						style="background: url('/images/careers/{career.id}/portrait-wide.png') no-repeat center right / contain;"
					>
					</span>
					<span class="absolute top-0 left-0 w-full h-full career-name pointer-events-none">
						{career.name}
					</span>
					<div class="border-10 absolute top-0 left-0 w-full h-full pointer-events-none"></div>
				</a>
			{/each}
		</div>
	{/snippet}
	{#snippet rightContent()}
		<div class="relative w-full background-28 p-2 mb-5 !bg-cover">
			<TextHeader>Trait Preference</TextHeader>
			<div class="divider-23 w-full h-[30px]"></div>
			<div class="relative pb-5 px-5 flex flex-wrap gap-2 justify-center">
				{#each data.weaponTraitStats as traitStat}
					<div class="label-10 p-6 !bg-contain !bg-no-repeat relative mt-5">
						<TraitIconTooltip trait={verminData.getTrait(traitStat.traitId)}></TraitIconTooltip>
						<span class="absolute top-[-10px] left-0 w-full text-center label-03 h-[48px] grid place-content-center z-10"
							>{Math.round((traitStat.count / data.totalBuilds) * 100)}%</span
						>
					</div>
				{/each}
			</div>
			<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
		</div>
		<div class="relative w-full background-28 p-2 mb-5 !bg-cover">
			<TextHeader>Property Preference</TextHeader>
			<div class="divider-23 w-full h-[30px]"></div>
			<div class="relative pb-5 px-5 flex flex-wrap gap-2 justify-center">
				{#each data.weaponPropertyStats as propertyStat}
					<div class="border-10 p-6 background-47 !bg-cover !bg-no-repeat relative mt-5">
						<span>{propertyStat.propertyName}</span>
						<span class="absolute top-[-24px] left-0 w-full text-center label-03 h-[48px] grid place-content-center z-10"
							>{Math.round((propertyStat.count / data.totalBuilds) * 100)}%</span
						>
					</div>
				{/each}
			</div>
			<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
		</div>
		<div class="relative w-full background-28 p-2 mb-5 !bg-cover">
			<TextHeader>Career Preference</TextHeader>
			<div class="divider-23 w-full h-[30px]"></div>
			<div class="careers-stats-container w-full flex flex-wrap gap-4 content-between p-5 justify-items-start justify-center">
				{#each data.weaponCareerStats
					?.filter((c) => c.weaponId === data.weapon.id)
					.sort((a, b) => b.count - a.count) ?? [] as careerStat}
					<div>
						<div class="careers-stats-row top-left-shadow relative mt-4">
							<a class="relative" href={`/careers/${data.hero.id}/${careerStat.careerId}`}>
								<img
									class="career-icon"
									src="/images/careers/{careerStat.careerId}/portrait.png"
									alt={careerStat.careerName}
								/>
							</a>
							<div class="absolute top-0 left-0 w-full h-full border-10 pointer-events-none"></div>
							<span class="absolute top-0 left-0 -translate-y-1/2 w-full text-center label-03 p-3"
								>{Math.round((careerStat.count / data.totalBuilds) * 100)}%</span
							>
						</div>
						<a
							class="relative w-full block text-center"
							href={`/builds?heroId=${data.hero.id}&careerId=${careerStat.careerId}`}
						>
							View Builds</a
						>
					</div>
				{/each}
			</div>
			<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
		</div>
	{/snippet}
</EmporiumLayout>

<style>
	.stat-label {
		background:
			url("/images/labels/label-03.png") no-repeat center / contain,
			url("/images/dividers/divider-line.png") repeat-x center / auto;
		color: #fae031;
	}
	.hero-stats {
		background: linear-gradient(45deg, #000000, #000000e0), url("/images/backgrounds/background19.png");
	}
	.left-container .career-name {
		padding: 0 20px;
	}
	.career-name {
		display: flex;
		align-items: center;
		font-size: 1.5rem;
		color: #9f9065;
	}
	.right-container .career-name {
		justify-content: start;
	}
	.left-container .career-name:hover {
		color: #fff;
		cursor: pointer;
	}
	.career-icon-wrapper:hover,
	.career-icon:hover {
		box-shadow: 0 0 8px 2px gold;
		outline: 1px solid #fff;
	}
	.career-icon::before,
	.career-icon-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background:
			radial-gradient(closest-corner, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.85)),
			url("/images/backgrounds/background39.png") repeat;
		box-shadow:
			inset 0 10px 15px -5px rgba(0, 0, 0, 0.8),
			inset 0 -10px 15px -5px rgba(0, 0, 0, 0.8);
	}
</style>
