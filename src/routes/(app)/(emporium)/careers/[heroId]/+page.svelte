<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
	import ContentHeader from "$lib/components/ContentHeader.svelte";
	import WeaponIconTooltip from "$lib/components/inventory/WeaponIconTooltip.svelte";
	import EmporiumLayout from "$lib/components/layout/EmporiumLayout.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
	import { getVerminDataState } from "$lib/state/VerminDataState.svelte.js";

	let { data } = $props();
	let showAllWeapons = $state(false);
	let showAllSecondaryWeapons = $state(false);

	let verminData = getVerminDataState();
</script>

<Seo title="Builds and Stats for the Heroes of Ubersreik" />

<Breadcrumb links={[{ href: "/careers", text: "Careers" }]} layout="emporium">{data.viewModel.heroName}</Breadcrumb>

<EmporiumLayout>
	{#snippet pageHeader()}
		{data.viewModel.heroName}
	{/snippet}
	{#snippet leftContent()}
		<div class="careers flex flex-col gap-2 w-full max-w-[500px]">
			{#if data.viewModel.careerStats}
				{#each data.viewModel.careerStats.sort((a, b) => a.careerId - b.careerId) as careerStat}
					{#if careerStat}
						<a
							class="flex w-full h-[60px] relative z-10 career-icon-wrapper"
							href={`/careers/${careerStat.heroId}/${careerStat.careerId}`}
						>
							<div class="career-icon-background"></div>
							<span
								class="career-icon w-full h-full absolute top-0 left-0 hover:opacity-100 opacity-55 hover:cursor-pointer"
								style="background: url('/images/careers/{careerStat.careerId}/portrait-wide.png') no-repeat center right / contain;"
							>
							</span>
							<span class="absolute top-0 left-0 w-full h-full career-name pointer-events-none">
								{careerStat?.careerName}
							</span>
							<div class="border-10 absolute top-0 left-0 w-full h-full pointer-events-none"></div>
						</a>
					{/if}
				{/each}
			{/if}
		</div>
		<div
			class="w-full bottom-0 absolute h-1/2"
			style="background: url('/images/careers/hero-{data.viewModel.heroId}-render.png') no-repeat center center / contain;"
		></div>
	{/snippet}
	{#snippet rightContent()}
		<div class="relative w-full background-28 p-2 mb-5 !bg-cover">
			<TextHeader>Careers</TextHeader>
			<div class="divider-23 w-full h-[30px]"></div>
			<div class="careers-stats-container w-full flex flex-wrap gap-4 content-between p-5 justify-items-start justify-center">
				{#each data.viewModel.careerStats
					?.filter((c) => c.heroId === data.viewModel.heroId)
					.sort((a, b) => b.count - a.count) ?? [] as careerStat}
					<div class="careers-stats-row top-left-shadow relative mt-4">
						<a class="relative" href={`/builds?heroId=${data.viewModel.heroId}&careerId=${careerStat.careerId}`}>
							<img class="career-icon" src="/images/careers/{careerStat.careerId}/portrait.png" alt={careerStat.name} />
							<div class="absolute top-0 left-0 w-full h-full border-10 pointer-events-none"></div>
						</a>
						<span class="absolute top-0 -translate-y-1/2 w-full text-center label-03 p-3"
							>{Math.round((careerStat.count / data.viewModel.totalHeroBuilds) * 100)}%</span
						>
					</div>
				{/each}
			</div>
			<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
		</div>
		<div class="flex flex-wrap background-28 relative p-2 !bg-cover w-full justify-center mb-5">
			<TextHeader>Primary Weapons</TextHeader>
			<div class="divider-23 w-full h-[30px]"></div>
			<div class="weapons-container" class:expanded={showAllWeapons}>
				<div class="weapons-grid">
					{#each data.viewModel.primaryWeaponStats as primaryWeaponStat, index}
						<div
							class="weapon-item relative flex flex-col items-center"
							class:hidden={!showAllWeapons && index >= 5}
							style="transition-delay: {(index % 5) * 100}ms"
						>
							<span class="w-full text-center label-03 h-[48px] grid place-content-center -mb-10 z-10"
								>{Math.round((primaryWeaponStat.count / data.viewModel.totalPrimaryWeapons) * 100)}%</span
							>
							<a href={`/weapons/weapon/${primaryWeaponStat.weaponId}`}>
								<div class="p-[25px] label-10 !bg-contain !bg-no-repeat relative">
									<WeaponIconTooltip weapon={verminData.getWeapon(primaryWeaponStat.weaponId)}></WeaponIconTooltip>
								</div>
							</a>
						</div>
					{/each}
				</div>
			</div>
			{#if data.viewModel.primaryWeaponStats.length > 5}
				<button
					class="view-all-btn text-[#9f9065] hover:text-white transition-colors"
					onclick={() => (showAllWeapons = !showAllWeapons)}
				>
					{showAllWeapons ? "Show Less" : "View All"}
				</button>
			{/if}
			<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
		</div>
		<div class="flex flex-wrap background-28 relative p-2 !bg-cover w-full justify-center mb-5">
			<TextHeader>Secondary Weapons</TextHeader>
			<div class="divider-23 w-full h-[30px]"></div>
			<div class="weapons-container" class:expanded={showAllSecondaryWeapons}>
				<div class="weapons-grid">
					{#each data.viewModel.secondaryWeaponStats as secondaryWeaponStat, index}
						<div
							class="weapon-item relative flex flex-col items-center"
							class:hidden={!showAllSecondaryWeapons && index >= 5}
							style="transition-delay: {(index % 5) * 100}ms"
						>
							<span class="w-full text-center label-03 h-[48px] grid place-content-center -mb-10 z-10"
								>{Math.round((secondaryWeaponStat.count / data.viewModel.totalSecondaryWeapons) * 100)}%</span
							>
							<a href={`/weapons/weapon/${secondaryWeaponStat.weaponId}`}>
								<div class="p-[25px] label-10 !bg-contain !bg-no-repeat relative">
									<WeaponIconTooltip weapon={verminData.getWeapon(secondaryWeaponStat.weaponId)}></WeaponIconTooltip>
								</div>
							</a>
						</div>
					{/each}
				</div>
			</div>
			{#if data.viewModel.secondaryWeaponStats.length > 5}
				<button
					class="view-all-btn text-[#9f9065] hover:text-white transition-colors"
					onclick={() => (showAllSecondaryWeapons = !showAllSecondaryWeapons)}
				>
					{showAllSecondaryWeapons ? "Show Less" : "View All"}
				</button>
			{/if}
			<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
		</div>
		<ContentHeader class="w-full">
			<span class="text-[2rem]">Recently Updated Builds</span>
		</ContentHeader>
		<BuildTable
			rowsOnly={true}
			class="w-full"
			title={`Recently Updated ${data.viewModel.heroName} Builds`}
			filter={{ heroId: data.viewModel.heroId }}
			compact={true}
		/>
	{/snippet}
</EmporiumLayout>

<style>
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
	.weapons-container {
		width: 100%;
		overflow: hidden;
		transition: max-height 0.5s ease-in-out;
		min-height: 146px;
		max-height: 300px;
	}
	.weapons-container.expanded {
		max-height: 1000px;
	}
	.weapons-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}
	.hidden {
		display: none;
	}
	.view-all-btn {
		width: 100%;
		text-align: center;
		font-size: 1.1rem;
	}
	.weapon-item {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.3s ease-out,
			transform 0.3s ease-out;
	}
	.weapons-container:not(.expanded) .weapon-item:nth-child(-n + 5),
	.weapons-container.expanded .weapon-item {
		opacity: 1;
		transform: translateY(0);
	}
</style>
