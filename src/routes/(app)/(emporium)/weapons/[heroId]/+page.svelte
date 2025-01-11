<script lang="ts">
	import { goto } from "$app/navigation";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import WeaponIconTooltip from "$lib/components/inventory/WeaponIconTooltip.svelte";
	import EmporiumLayout from "$lib/components/layout/EmporiumLayout.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import { getVerminDataState } from "$lib/state/VerminDataState.svelte.js";

	let { data } = $props();

	let verminData = getVerminDataState();
</script>

<Seo title={`${data.heroName} - Weapons`} />

<Breadcrumb links={[{ text: "Weapons", href: "/weapons" }]} layout="emporium">{data.heroName}</Breadcrumb>

<EmporiumLayout>
	{#snippet pageHeader()}
		{data.heroName}
	{/snippet}
	{#snippet leftContent()}
		<div class="careers flex flex-col gap-2 w-full max-w-[500px]">
			{#each data.careers as career}
				<a class="flex w-full h-[60px] relative z-10 career-icon-wrapper" href={`/weapons/${data.heroId}/${career.id}`}>
					<div class="career-icon-background"></div>
					<span
						class="career-icon w-full h-full absolute top-0 left-0 hover:opacity-100 opacity-55 hover:cursor-pointer"
						style="background: url('/images/careers/{career.id}/portrait-wide.png') no-repeat center right / contain;"
					>
					</span>
					<span class="absolute top-0 left-0 w-full h-full career-name pointer-events-none">
						{career?.name}
					</span>
					<div class="border-10 absolute top-0 left-0 w-full h-full pointer-events-none"></div>
				</a>
			{/each}
		</div>
	{/snippet}
	{#snippet rightContent()}
		<div class="grid grid-cols-3 w-full gap-2">
			{#each data.weaponStats as weaponStat}
				{#if verminData.getWeapon(weaponStat.weaponId)}
					<button
						onclick={() => {
							goto(`/weapons/weapon/${weaponStat.weaponId}`);
						}}
						title="View Weapon Builds"
					>
						<div class="relative w-full background-48 !bg-cover flex justify-center pb-5">
							<div class="weapon-item relative w-full flex flex-col justify-center">
								<span class="w-full text-center stat-label h-[48px] mt-2 grid place-content-center">
									<a
										href={`/builds?weaponId=${weaponStat.weaponId}`}
										class="text-[#fae031] hover:text-white"
										title="View Weapon Builds">{weaponStat.count}</a
									>
								</span>
								<div class="p-[28px] label-10 !bg-contain !bg-no-repeat relative self-center">
									<a href={`/weapons/weapon/${weaponStat.weaponId}`} title="View Weapon Page">
										<WeaponIconTooltip weapon={verminData.getWeapon(weaponStat.weaponId)}></WeaponIconTooltip>
									</a>
								</div>
							</div>
							<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
						</div>
					</button>
				{/if}
			{/each}
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
	.left-container .career-icon-wrapper:hover .career-name {
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
