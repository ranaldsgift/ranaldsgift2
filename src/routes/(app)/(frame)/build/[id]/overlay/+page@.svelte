<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CareerTalent from '$lib/components/career/CareerTalent.svelte';
	import CareerTalentIcon from '$lib/components/career/CareerTalentIcon.svelte';
	import CareerTalentLevelIcon from '$lib/components/career/CareerTalentLevelIcon.svelte';
	import TraitIcon from '$lib/components/inventory/TraitIcon.svelte';
	import WeaponIcon from '$lib/components/inventory/WeaponIcon.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import type { ICareerBuild } from '$lib/entities/builds/CareerBuild';
	import BuildHelper from '$lib/helpers/BuildHelper.js';
	import { error } from '@sveltejs/kit';

	let { data } = $props();

	if (!data.build) {
		throw error(404, 'Build not found');
	}

	let compact = $page.url.searchParams.get('compact') === 'true';
	let vertical = $page.url.searchParams.get('vertical') === 'true';

	let build = $derived(data.build);

	let talents = $derived(BuildHelper.getTalents(build));

	let talentContainerClass = $derived(compact ? vertical ? "grid grid-cols-1 grid-flow-row grid-rows-6 gap-[2px]" : "grid grid-cols-[42px_max-content] grid-flow-col grid-rows-1 gap-[2px]" : "grid grid-cols-[40px_max-content] gap-[2px]");
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
	
	$effect(() => {
		goto(`?compact=${compact}&vertical=${vertical}`, { replaceState: true, keepFocus: true, noScroll: true });
	});
</script>

<Seo title={`Stream Overlay for ${build.name}`} />

{#if build}
	<div class="grid grid-cols-[max-content] {compact ? 'gap-[2px]' : 'gap-2'}">
		{@render talentContainer(build)}
		{@render gearContainer(build)}
	</div>
{/if}

{#snippet talentContainer(build: ICareerBuild)}
<div>
	{#if !compact}
		{@render talentsHeader(build)}
	{/if}
	<div class="{talentContainerClass}">
	{#if compact}
		{#each talents as talent}
			<div class="grid {vertical ? 'grid-flow-col grid-cols-[40px_40px]' : 'grid-flow-row'}">
				<div class="border-01">
					<CareerTalentIcon talentNumber={talent!.talentNumber} careerId={build.career.id} size="40px" class="relative z-[-1]"/>
				</div>
				<div class="border-01 flex items-center justify-center background-13 text-[#f0d9af] text-[1.3rem]">
					{talent!.talentNumber % 3 === 0 ? 3 : talent!.talentNumber % 3}
				</div>
			</div>
		{/each}
	{:else}
		{#each talents as talent}
			<CareerTalentLevelIcon level={Math.ceil(talent!.talentNumber / 3) * 5}/>
			<CareerTalent {talent} careerId={build.career.id}/>
		{/each}
	{/if}
	</div>
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
<div class="gear-container flex flex-col h-[104px] flex-wrap content-center gap-[2px]">
	{@render gear(build)}
</div>
{/if}
{/snippet}

{#snippet gear(build: ICareerBuild)}
	<WeaponIcon weapon={build.primaryWeapon.weapon} size={gearIconSize}></WeaponIcon>
	{#if build.primaryWeapon.trait}
	<TraitIcon trait={build.primaryWeapon.trait} size={gearIconSize}></TraitIcon>
	{:else}	
	<span class="item-trait-icon trait-icon border-04 size-[{gearIconSize}]"></span>
	{/if}
	<WeaponIcon weapon={build.secondaryWeapon.weapon} size={gearIconSize}></WeaponIcon>
	{#if build.secondaryWeapon.trait}
	<TraitIcon trait={build.secondaryWeapon.trait} size={gearIconSize}></TraitIcon>
	{:else}
	<span class="item-trait-icon trait-icon border-04 size-[{gearIconSize}]"></span>
	{/if}
	<div class="jewelry-icon necklace-icon border-04" style="--size: {gearIconSize}"></div>
	{#if build.necklace.trait}
	<TraitIcon trait={build.necklace.trait} size={gearIconSize}></TraitIcon>
	{:else}
	<span class="item-trait-icon trait-icon border-04 size-[{gearIconSize}]"></span>
	{/if}
	<div class="jewelry-icon charm-icon border-04" style="--size: {gearIconSize}"></div>
	{#if build.charm.trait}
	<TraitIcon trait={build.charm.trait} size={gearIconSize}></TraitIcon>
	{:else}
	<span class="item-trait-icon trait-icon border-04 size-[{gearIconSize}]"></span>
	{/if}
	<div class="jewelry-icon trinket-icon border-04" style="--size: {gearIconSize}"></div>
	{#if build.trinket.trait}
	<TraitIcon trait={build.trinket.trait} size={gearIconSize}></TraitIcon>
	{:else}
	<span class="item-trait-icon trait-icon border-04 size-[{gearIconSize}]"></span>
	{/if}
{/snippet}
