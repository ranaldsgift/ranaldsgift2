<script lang="ts">
	import { type ICareer } from "$lib/entities/career/Career";
	import CareerIcon from "./CareerIcon.svelte";
	import ContainerTitle from "../ContainerTitle.svelte";
	import AspectRatio from "../ui/aspect-ratio/aspect-ratio.svelte";
	import { CareersStore } from "$lib/stores/DataStores";

	type Props = {
		selectedCareer: ICareer | null;
		careers?: ICareer[];
		iconStyle?: "portrait-wide" | "portrait";
		handler?: (career: ICareer) => void;
	};

	let { selectedCareer = $bindable(), iconStyle = "portrait", careers, handler }: Props = $props();

	let careersState = $state<ICareer[] | undefined>(careers);
	let iconStyleState = $derived<"portrait-wide" | "portrait">(iconStyle);

	const loadCareers = async () => {
		const { items } = await CareersStore.loadData();
		careersState = items;
	};

	$effect(() => {
		if (!careersState || careersState.length === 0) {
			loadCareers();
		}
	});
</script>

{#if careersState && careersState.length === 20}
	<div class="career-selection-container top-left-shadow self-start">
		<ContainerTitle class="w-full">Career Selection</ContainerTitle>
		<div class="grid grid-rows-5 grid-cols-4 gap-2 background-12 border-01 p-5 max-w-[400px]">
			{#each careersState as career}
				<div class="icon-wrapper">
					<AspectRatio ratio={57 / 67}>
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
					</AspectRatio>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.career-selection-container {
		grid-area: careerSelection;
	}

	button {
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
