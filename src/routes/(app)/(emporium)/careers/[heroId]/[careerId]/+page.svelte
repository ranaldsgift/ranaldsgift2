<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
	import CareerTalentIcon from "$lib/components/career/CareerTalentIcon.svelte";
	import ContentHeader from "$lib/components/ContentHeader.svelte";
	import TraitIcon from "$lib/components/inventory/TraitIcon.svelte";
	import TraitIconTooltip from "$lib/components/inventory/TraitIconTooltip.svelte";
	import WeaponIconTooltip from "$lib/components/inventory/WeaponIconTooltip.svelte";
	import EmporiumLayout from "$lib/components/layout/EmporiumLayout.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import Tooltip from "$lib/components/ui/tooltip/Tooltip.svelte";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import TraitCategoryEnum from "$lib/enums/TraitCategoryEnum";
	import { getVerminDataState } from "$lib/state/VerminDataState.svelte.js";
	import { WeaponsStore } from "$lib/stores/DataStores";
	import { createSingleton } from "tippy.js";

	let { data } = $props();

	let verminData = getVerminDataState();

	const getCareerTalentCount = (talentNumber: number) => {
		return data.viewModel.careerTalentStats.find((t) => t.talentNumber === talentNumber)?.count ?? 0;
	};

	const getCareerTalentTierCount = (talentNumber: number) => {
		const start = Math.floor((talentNumber - 1) / 3) * 3 + 1;
		return data.viewModel.careerTalentStats
			.filter((t) => t.talentNumber >= start && t.talentNumber <= start + 2)
			.reduce((acc, t) => acc + Number(t.count), 0);
	};

	const getCareerTalentPercentage = (talentNumber: number) => {
		return Math.round((getCareerTalentCount(talentNumber) / getCareerTalentTierCount(talentNumber)) * 100);
	};

	const getWeapon = async (weaponId: number) => {
		const weaponData = await WeaponsStore.loadData();
		return weaponData.items.find((w) => w.id === weaponId);
	};

	let primaryWeaponStats = $derived(data.viewModel.primaryWeaponStats);
	let secondaryWeaponStats = $derived(data.viewModel.secondaryWeaponStats);
	let primaryWeaponBuildCount = $derived(primaryWeaponStats.reduce((acc, w) => acc + Number(w.count), 0));
	let secondaryWeaponBuildCount = $derived(secondaryWeaponStats.reduce((acc, w) => acc + Number(w.count), 0));
	let showAllPrimaryWeapons = $state(false);
	let showAllSecondaryWeapons = $state(false);

	const getPrimaryWeaponPickRate = (weaponId: number) => {
		let weaponStat = primaryWeaponStats.find((w) => w.weaponId === weaponId);
		return weaponStat ? Math.round((weaponStat.count / primaryWeaponBuildCount) * 100) : 0;
	};

	const getSecondaryWeaponPickRate = (weaponId: number) => {
		let weaponStat = secondaryWeaponStats.find((w) => w.weaponId === weaponId);
		return weaponStat ? Math.round((weaponStat.count / secondaryWeaponBuildCount) * 100) : 0;
	};

	let trinketStats = $derived.by(() => {
		return data.viewModel.careerTraitStats
			.filter((s) => s.traitCategory === TraitCategoryEnum.Trinket.toString())
			.sort((a, b) => Number(b.count) - Number(a.count));
	});

	let necklaceStats = $derived.by(() => {
		return data.viewModel.careerTraitStats
			.filter((s) => s.traitCategory === TraitCategoryEnum.Necklace.toString())
			.sort((a, b) => Number(b.count) - Number(a.count));
	});

	let charmStats = $derived.by(() => {
		return data.viewModel.careerTraitStats
			.filter((s) => s.traitCategory === TraitCategoryEnum.Charm.toString())
			.sort((a, b) => Number(b.count) - Number(a.count));
	});

	let traitStats = $derived([
		{
			name: "Necklaces",
			stats: necklaceStats,
			type: TraitCategoryEnum.Necklace,
			totalCount: necklaceStats.reduce((acc, t) => acc + Number(t.count), 0),
		},
		{
			name: "Charms",
			stats: charmStats,
			type: TraitCategoryEnum.Charm,
			totalCount: charmStats.reduce((acc, t) => acc + Number(t.count), 0),
		},
		{
			name: "Trinkets",
			stats: trinketStats,
			type: TraitCategoryEnum.Trinket,
			totalCount: trinketStats.reduce((acc, t) => acc + Number(t.count), 0),
		},
	]);

	const tippyInstances: any[] = [];

	const tooltipCallback = (tippyInstance: any) => {
		tippyInstances.push(tippyInstance);
		if (tippyInstances.length === 18) {
			createSingleton(tippyInstances), { delay: 1000, updateDuration: 500 };
		}
	};
</script>

<Seo title="Builds and Stats for the Heroes of Ubersreik" />

<Breadcrumb
	links={[
		{ href: "/careers", text: "Careers" },
		{ href: `/careers/${data.viewModel.heroId}`, text: data.viewModel.heroName },
	]}
	layout="emporium">{data.viewModel.careerName}</Breadcrumb
>

<EmporiumLayout>
	{#snippet pageHeader()}
		{data.viewModel.careerName}
	{/snippet}
	{#snippet leftContent()}
		<div class="grid grid-cols-2 grid-rows-2 w-full gap-x-5">
			<div class="w-full h-full relative col-span-1 row-span-1 flex flex-col"></div>
			<div class="w-full relative col-span-1 p-2 row-span-2 background-28 !bg-cover">
				<TextHeader class="w-full">Talents</TextHeader>
				<div class="divider-23 w-full h-[30px]"></div>
				<div class="relative pb-5 px-5 grid grid-cols-[60px_80px_80px_80px] gap-2 talents-grid justify-center">
					{#each Array(18) as _, index}
						{#if index % 3 === 0}
							<span
								class="talent-lock-icon self-center mt-5"
								style="--size: 50px; --fontSize: 0.8rem;
						--talent-tier-level: '{(Math.ceil(index / 3) + 1) * 5}';"
							></span>
						{/if}
						<Tooltip callback={tooltipCallback}>
							<div class="relative flex flex-col items-center justify-center mt-5 max-w-[80px]">
								<CareerTalentIcon class="border-10" size="50px" careerId={data.viewModel.careerId} talentNumber={index + 1}
								></CareerTalentIcon>
								<span
									class="absolute top-0 -translate-y-1/2 w-full text-center label-03 p-2"
									class:text-[#fae031]={getCareerTalentPercentage(index + 1) > 50}
									>{getCareerTalentPercentage(index + 1)}%</span
								>
							</div>
							{#snippet content()}
								<div class="border-02 bg-[#0d0d0d] p-2">
									<h1 class="header-underline">
										{data.viewModel.careerTalentStats.find((t) => t.talentNumber === index + 1)?.talentName}
									</h1>
									<p>{data.viewModel.careerTalentStats.find((t) => t.talentNumber === index + 1)?.talentDescription}</p>
								</div>
							{/snippet}
						</Tooltip>
					{/each}
				</div>
				<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
			</div>
		</div>
		<div
			class="w-1/2 h-full bottom-0 absolute pointer-events-none"
			style="background: url('/images/careers/{data.viewModel.careerId}/render.png') no-repeat center bottom / contain"
		></div>
	{/snippet}
	{#snippet rightContent()}
		<div class="w-full grid gap-5">
			<div class="flex flex-wrap background-28 relative p-2 !bg-cover w-full justify-center">
				<TextHeader>Primary Weapons</TextHeader>
				<div class="divider-23 w-full h-[30px]"></div>
				<div class="weapons-container flex flex-col gap-2" class:expanded={showAllPrimaryWeapons}>
					<div class="weapons-grid flex flex-wrap gap-2 justify-center">
						{#each data.viewModel.primaryWeaponStats as primaryWeaponStat, index}
							{#await getWeapon(primaryWeaponStat.weaponId)}
								<Skeleton class="w-[80px] h-[80px]"></Skeleton>
							{:then weapon}
								{#if weapon}
									<div
										class="weapon-item relative p-2 pt-5 border-10 mt-8"
										class:hidden={!showAllPrimaryWeapons && index >= 5}
										style="transition-delay: {(index % 5) * 100}ms"
									>
										<a href={`/weapons/weapon/${primaryWeaponStat.weaponId}`}>
											<div class="p-[25px] label-10 !bg-contain !bg-no-repeat relative">
												<WeaponIconTooltip {weapon}></WeaponIconTooltip>
											</div>
										</a>
										<span
											class="absolute top-0 -translate-y-1/2 left-0 w-full text-center label-03 h-[48px] grid place-content-center"
											>{getPrimaryWeaponPickRate(primaryWeaponStat.weaponId)}%</span
										>
									</div>
								{/if}
							{/await}
						{/each}
					</div>
					{#if data.viewModel.primaryWeaponStats.length > 5}
						<button
							class="view-all-btn text-[#9f9065] hover:text-white transition-colors"
							onclick={() => (showAllPrimaryWeapons = !showAllPrimaryWeapons)}
						>
							{showAllPrimaryWeapons ? "Show Less" : "View All"}
						</button>
					{/if}
				</div>
				<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
			</div>
			<div class="flex flex-wrap background-28 relative p-2 !bg-cover w-full justify-center">
				<TextHeader>Secondary Weapons</TextHeader>
				<div class="divider-23 w-full h-[30px]"></div>
				<div class="weapons-container flex flex-col gap-2 mb-5" class:expanded={showAllPrimaryWeapons}>
					<div class="weapons-grid flex flex-wrap gap-2 justify-center">
						{#each data.viewModel.secondaryWeaponStats.sort((a, b) => Number(b.count) - Number(a.count)) as secondaryWeaponStat, index}
							{#await getWeapon(secondaryWeaponStat.weaponId)}
								<Skeleton class="w-[80px] h-[80px]"></Skeleton>
							{:then weapon}
								{#if weapon}
									<div
										class="weapon-item relative p-2 pt-5 border-10 mt-8"
										class:hidden={!showAllSecondaryWeapons && index >= 5}
										style="transition-delay: {(index % 5) * 100}ms"
									>
										<div class="p-[25px] label-10 !bg-contain !bg-no-repeat relative">
											<WeaponIconTooltip {weapon}></WeaponIconTooltip>
										</div>
										<span
											class="absolute top-0 -translate-y-1/2 left-0 w-full text-center label-03 h-[48px] grid place-content-center"
											>{getSecondaryWeaponPickRate(secondaryWeaponStat.weaponId)}%</span
										>
									</div>
								{/if}
							{/await}
						{/each}
					</div>
					{#if data.viewModel.secondaryWeaponStats.length > 5}
						<button
							class="view-all-btn text-[#9f9065] hover:text-white transition-colors"
							onclick={() => (showAllSecondaryWeapons = !showAllSecondaryWeapons)}
						>
							{showAllSecondaryWeapons ? "Show Less" : "View All"}
						</button>
					{/if}
				</div>
				<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
			</div>
			{#each traitStats as traitStat}
				<div class="relative background-28 !bg-cover p-2 w-full">
					<TextHeader>{traitStat.name}</TextHeader>
					<div class="divider-23 w-full h-[30px]"></div>
					<div class="relative pb-5 px-5 flex flex-wrap gap-2 justify-center">
						{#each traitStat.stats as stat}
							<div class="label-10 p-6 !bg-contain !bg-no-repeat relative mt-5">
								<TraitIconTooltip trait={verminData.getTrait(stat.traitId)}></TraitIconTooltip>
								<span
									class="absolute top-[-10px] left-0 w-full text-center label-03 h-[48px] grid place-content-center z-10"
									>{Math.round((stat.count / traitStat.totalCount) * 100)}%</span
								>
							</div>
						{/each}
					</div>
					<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
				</div>
			{/each}
			<ContentHeader class="w-full">Recently Updated Builds</ContentHeader>
			<BuildTable
				rowsOnly={true}
				class="w-full"
				title={`Recently Updated ${data.viewModel.heroName} Builds`}
				filter={{ heroId: data.viewModel.heroId, careerId: data.viewModel.careerId }}
				compact={true}
			/>
		</div>
	{/snippet}
</EmporiumLayout>

{#snippet traitStat(trait: ITrait)}
	<div class="relative flex flex-col items-center justify-center mt-5 max-w-[80px]">
		<TraitIcon {trait}></TraitIcon>
	</div>
{/snippet}

<style>
	.talents-grid {
		direction: ltr;
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
	.view-all-btn {
		width: 100%;
		text-align: center;
		font-size: 1.1rem;
	}
</style>
