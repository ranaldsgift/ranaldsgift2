<script lang="ts">
	import CareerTalent from "$lib/components/career/CareerTalent.svelte";
	import CareerTalentIcon from "$lib/components/career/CareerTalentIcon.svelte";
	import CareerTalentLevelIcon from "$lib/components/career/CareerTalentLevelIcon.svelte";
	import TraitIcon from "$lib/components/inventory/TraitIcon.svelte";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import ItemIconTooltip from "../inventory/ItemIconTooltip.svelte";

	type Props = {
		build: ICareerBuild;
		compact?: boolean;
		vertical?: boolean;
	};

	let { build, compact = false, vertical = false }: Props = $props();

	let talents = $derived(BuildHelper.getTalents(build));

	let talentContainerClass = $derived(
		compact
			? vertical
				? "grid grid-cols-1 grid-flow-row grid-rows-6 gap-[2px]"
				: "grid grid-cols-[42px_auto] grid-flow-col grid-rows-1 gap-[2px]"
			: "grid grid-cols-[40px_auto] gap-[2px]"
	);
	let gearIconSize = $derived(compact && vertical ? "40px" : "50px");

	const getTalentString = (build: ICareerBuild) => {
		const talentsString = talents.map((talent) => {
			let talentString = "0";
			if (talent?.talentNumber) {
				let talentModulo = talent.talentNumber % 3;
				talentString = talentModulo === 0 ? "3" : talentModulo.toString();
			}
			return talentString;
		});
		return talentsString.join(" - ");
	};
</script>

{#if build}
	<div class="grid grid-cols-[max-content] {compact ? 'gap-[2px]' : 'gap-2'}">
		{@render talentContainer(build)}
		{@render gearContainer(build)}
	</div>
{/if}

{#snippet talentContainer(build: ICareerBuild)}
	<div>
		{#if build.career?.id}
			{#if !compact}
				{@render talentsHeader(build)}
			{/if}
			<div class={talentContainerClass}>
				{#if compact}
					{#each talents as talent}
						<div class="grid {vertical ? 'grid-flow-col grid-cols-[40px_40px]' : 'grid-flow-row'}">
							<div class="border-01">
								<CareerTalentIcon
									talentNumber={talent?.talentNumber ?? 0}
									careerId={build.career.id}
									size="40px"
									class="relative z-[-1]"
								/>
							</div>
							<div class="border-01 flex items-center justify-center background-13 text-[#f0d9af] text-[1.3rem]">
								{!talent
									? 0
									: talent.talentNumber && talent.talentNumber % 3 === 0
										? 3
										: talent.talentNumber && talent.talentNumber % 3}
							</div>
						</div>
					{/each}
				{:else}
					{#each talents as talent, index}
						<CareerTalentLevelIcon level={(index + 1) * 5} />
						<CareerTalent {talent} state="selected" careerId={build.career.id} />
					{/each}
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet talentsHeader(build: ICareerBuild)}
	<div class="talent-string-container justify-center flex gap-4 px-2 text-center text-[#f0d9af] text-[1.3rem]">
		<span class="skull-2"></span>
		{getTalentString(build)}
		<span class="skull-2"></span>
	</div>
	<div class="divider-21 h-[20px] mb-2"></div>
{/snippet}

{#snippet gearContainer(build: ICareerBuild)}
	{#if vertical && compact}
		<div class="gear-container flex flex-row w-[104px] flex-wrap content-between gap-y-[2px]">
			{@render gear(build)}
		</div>
	{:else}
		<div class="gear-container flex flex-col h-[104px] flex-wrap content-center gap-[2px]" style="--size: {gearIconSize}">
			{@render gear(build)}
		</div>
	{/if}
{/snippet}

{#snippet gear(build: ICareerBuild)}
	{#if build.primaryWeapon.weapon && build.secondaryWeapon.weapon}
		<ItemIconTooltip itemBuild={build.primaryWeapon} itemType={ItemTypeEnum.Weapon} size={gearIconSize}></ItemIconTooltip>
		{#if build.primaryWeapon.trait}
			<TraitIcon trait={build.primaryWeapon.trait} size={gearIconSize}></TraitIcon>
		{:else}
			<span class="lock-icon border-04"></span>
		{/if}
		<ItemIconTooltip itemBuild={build.secondaryWeapon} itemType={ItemTypeEnum.Weapon} size={gearIconSize}></ItemIconTooltip>
		{#if build.secondaryWeapon.trait}
			<TraitIcon trait={build.secondaryWeapon.trait} size={gearIconSize}></TraitIcon>
		{:else}
			<span class="lock-icon border-04"></span>
		{/if}
		<ItemIconTooltip itemBuild={build.necklace} itemType={ItemTypeEnum.Necklace} size={gearIconSize}></ItemIconTooltip>
		{#if build.necklace.trait}
			<TraitIcon trait={build.necklace.trait} size={gearIconSize}></TraitIcon>
		{:else}
			<span class="lock-icon border-04"></span>
		{/if}
		<ItemIconTooltip itemBuild={build.charm} itemType={ItemTypeEnum.Charm} size={gearIconSize}></ItemIconTooltip>
		{#if build.charm.trait}
			<TraitIcon trait={build.charm.trait} size={gearIconSize}></TraitIcon>
		{:else}
			<span class="lock-icon border-04"></span>
		{/if}
		<ItemIconTooltip itemBuild={build.trinket} itemType={ItemTypeEnum.Trinket} size={gearIconSize}></ItemIconTooltip>
		{#if build.trinket.trait}
			<TraitIcon trait={build.trinket.trait} size={gearIconSize}></TraitIcon>
		{:else}
			<span class="lock-icon border-04"></span>
		{/if}
	{/if}
{/snippet}

<style>
	.lock-icon {
		box-shadow: inset 0 4px 2px white;
	}
</style>
