<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import ContainerTitle from "$lib/components/ContainerTitle.svelte";
	import EmporiumLayout from "$lib/components/layout/EmporiumLayout.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import Tooltip from "$lib/components/ui/tooltip/Tooltip.svelte";

	let { data } = $props();
</script>

<Seo title="Builds and Stats for the Heroes of Ubersreik" />

<Breadcrumb layout="emporium">Careers</Breadcrumb>

<EmporiumLayout>
	{#snippet pageHeader()}
		Heroes
	{/snippet}
	{#snippet leftContent()}
		<div class="careers flex flex-col gap-2 w-full max-w-[500px]">
			{#if data.heroStats}
				{#each data.heroStats as heroStat}
					{#if heroStat}
						<a class="flex w-full h-[60px] relative z-10 career-icon-wrapper" href={`/careers/${heroStat.heroId}`}>
							<div class="career-icon-background"></div>
							<span
								class="career-icon w-full h-full absolute top-0 left-0 hover:opacity-100 opacity-55 hover:cursor-pointer"
								style="background: url('/images/careers/hero-{heroStat.heroId}-wide.png') no-repeat center right / contain;"
							>
							</span>
							<span class="absolute top-0 left-0 px-5 w-full h-full career-name pointer-events-none">
								{heroStat?.name}
							</span>
							<div class="border-10 absolute top-0 left-0 w-full h-full pointer-events-none"></div>
						</a>
					{/if}
				{/each}
			{/if}
		</div>
	{/snippet}
	{#snippet rightContent()}
		<div class="careers grid grid-cols-2 gap-2 w-full">
			{#if data.heroStats}
				{#each data.heroStats as heroStat}
					<div class="hero-stats-container background-28 !bg-cover relative w-full max-w-[600px]">
						<a class="hero-icon-container relative flex items-center h-[60px]" href={`/careers/${heroStat.heroId}`}>
							<span
								class="w-full h-[60px] absolute top-0 left-0"
								style="background: url('/images/careers/hero-{heroStat.heroId}-wide.png') no-repeat center right / contain;"
							>
							</span>
							<span class="text-2xl text-[#9f9065] pl-5">
								{heroStat.name}
							</span>
							<div class="absolute bottom-0 translate-y-1/2 divider-23 w-full h-[30px]"></div>
						</a>
						<div
							class="hero-stats border-10 border-0 border-b-2 pt-4 pb-2 text-center flex flex-wrap justify-center items-center gap-2"
						>
							<a class="flex items-center gap-2 text-[#f0d9af]" href={`/builds?heroId=${heroStat.heroId}`}>
								<span>View Builds</span>
							</a>
						</div>
						<span class="grid w-full p-2 text-center">{heroStat.count} builds for {heroStat.name}</span>
						<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
					</div>
				{/each}
			{/if}
		</div>
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
</style>
