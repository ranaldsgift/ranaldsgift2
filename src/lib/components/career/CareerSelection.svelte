<script lang="ts">
	import { type ICareer } from "$lib/entities/career/Career";
	import CareerIcon from "./CareerIcon.svelte";
	import ContainerTitle from "../ContainerTitle.svelte";
	import type { IHero } from "$lib/entities/Hero";
	import { CareersStore, HeroesStore } from "$lib/stores/DataStores";
	import { getWindowState } from "$lib/state/WindowState.svelte";
	import { browser } from "$app/environment";

	type Props = {
		selectedCareer: ICareer | null;
		careers?: ICareer[];
		handler?: (career: ICareer) => void;
	};

	let { selectedCareer = $bindable(), careers, handler }: Props = $props();

	let careersData = $state<ICareer[]>(careers ?? []);
	let heroesData = $state<IHero[]>(careers ? [...new Map(careers?.map((c) => [c.hero.id, c.hero]) ?? []).values()] : []);

	const windowState = getWindowState();

	let selectedHero = $state<IHero | null>(null);
	let heroes = $derived<IHero[]>([...new Map(careersData?.map((c) => [c.hero.id, c.hero]) ?? []).values()]);

	let careersState = $derived.by<ICareer[]>(() => {
		if (!selectedHero || windowState.isWideScreen) {
			return careersData ?? [];
		}

		return careersData?.filter((c) => c.hero.id === selectedHero?.id) ?? [];
	});

	let iconStyleState = $derived<"portrait-wide" | "portrait" | "icon">(
		!browser || windowState.isWideScreen ? "portrait" : "portrait-wide"
	);

	$effect(() => {
		if (!windowState.isWideScreen && !selectedHero) {
			selectedHero = selectedCareer?.hero ?? heroesData[0];
		}
	});

	$inspect(windowState);

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

	let aspectRatio = $derived<number>(windowState.isWideScreen ? 114 / 134 : 203 / 72);
</script>

<div class="career-selection-container top-left-shadow self-start">
	<ContainerTitle class="w-full">Career Selection</ContainerTitle>
	<div class="relative background-33 grid pt-2 min-[1800px]:hidden">
		<div class="border-01 absolute top-0 left-0 right-0 bottom-0 z-20 pointer-events-none"></div>
		<div class="max-w-[650px] w-full m-auto block z-10 relative">
			<div class="flex gap-2 justify-between mx-[5%] mobile:mx-[7%] mb-[10px]">
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
		</div>
	</div>
	<div class="background-12 border-01 p-2 mobile:px-[10%] min-[1800px]:px-5">
		<div
			class="careers-icon-container grid grid-cols-2 grid-rows-[72px_72px] desktop:grid-rows-[72px] min-[1800px]:grid-rows-[96px_96px_96px_96px_96px] desktop:grid-cols-[86px_86px_86px_86px] mx-auto justify-center"
		>
			{#each careersState as career}
				<div class="icon-wrapper p-1">
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
