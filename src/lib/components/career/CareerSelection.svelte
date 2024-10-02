<script lang="ts">
	import { type ICareer } from "$lib/entities/career/Career";
	import CareerIcon from "./CareerIcon.svelte";
	import ContainerTitle from "../ContainerTitle.svelte";
	import type { IHero } from "$lib/entities/Hero";
	import { browser } from "$app/environment";
	import { CareersStore } from "$lib/stores/DataStores";
	import { getWindowState } from "$lib/state/WindowState.svelte";

	type Props = {
		selectedCareer: ICareer | null;
		careers?: ICareer[];
		handler?: (career: ICareer) => void;
	};

	let { selectedCareer = $bindable(), careers, handler }: Props = $props();

	let careersData = $state<ICareer[]>(careers ?? []);

	const windowState = getWindowState();

	let selectedHero = $state<IHero | null>(selectedCareer?.hero ?? null);
	let heroes = $derived<IHero[]>([...new Map(careersData?.map((c) => [c.hero.id, c.hero]) ?? []).values()]);

	let careersState = $derived.by<ICareer[]>(() => {
		if (!selectedHero || windowState.isWideScreen) {
			return careersData ?? [];
		}

		return careersData?.filter((c) => c.hero.id === selectedHero?.id) ?? [];
	});

	let iconStyleState = $derived<"portrait-wide" | "portrait" | "icon">(windowState.isWideScreen ? "portrait" : "portrait-wide");

	const handleHeroSelection = (hero: IHero) => {
		if (selectedHero?.id === hero.id) {
			selectedHero = null;
		} else {
			selectedHero = hero;
		}
	};

	const loadCareers = async () => {
		if (!careersData || careersData.length === 0) {
			let { items } = await CareersStore.loadData();
			careersData = items;
		}
	};

	$effect(() => {
		loadCareers();
	});
</script>

<div class="career-selection-container top-left-shadow self-start">
	<ContainerTitle class="w-full">Career Selection</ContainerTitle>
	<div class="relative background-33 grid pt-2 min-[1800px]:hidden">
		<div class="border-01 absolute top-0 left-0 right-0 bottom-0 z-20 pointer-events-none"></div>
		<div class="max-w-[650px] w-full m-auto block z-10 relative">
			<div class="flex gap-2 justify-between mx-[5%] mobile:mx-[7%] mb-[-20px]">
				{#each heroes as hero}
					<button onclick={() => handleHeroSelection(hero)}>
						<img
							class=" brightness-75 hover:brightness-100 {hero.id === selectedHero?.id ? 'brightness-125' : 'grayscale'}"
							src={`/images/careers/hero-0${hero.id}.png`}
							alt={hero.name}
						/>
					</button>
				{/each}
			</div>
			<div class="divider-18-horizontal w-full h-[50px] mb-2 block !bg-bottom z-10"></div>
		</div>
		<div class="divider-18-straight w-[calc(100%-650px)] h-[55px] absolute left-[0px] bottom-[3px]"></div>
		<div class="divider-18-straight w-[calc(100%-650px)] h-[55px] absolute right-[0px] bottom-[3px]"></div>
	</div>
	<div class="careers-icon-container grid auto-rows-[85px] grid-cols-2 tablet:grid-cols-4 gap-2 background-12 border-01 p-5">
		{#each careersState as career}
			<div class="icon-wrapper">
				<button
					class={career.id === selectedCareer?.id ? "selected" : ""}
					onclick={() => {
						selectedCareer = career;
						if (handler) {
							handler(career);
						}
					}}
				>
					<CareerIcon careerId={career.id} style={iconStyleState}></CareerIcon>
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.careers-icon-container {
		grid-auto-columns: 1fr;
	}
	.career-selection-container {
		grid-area: careerSelection;
	}

	.icon-wrapper button {
		display: block;
		width: 100%;
		height: 100%;
		filter: brightness(75%);
	}

	button:hover {
		filter: brightness(100%);
	}

	button.selected {
		filter: brightness(100%);
		box-shadow: 0 0 8px 2px gold;
		outline: 1px solid #fff;
		cursor: pointer;
	}
</style>
