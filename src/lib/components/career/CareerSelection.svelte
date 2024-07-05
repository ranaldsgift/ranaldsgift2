<script lang="ts">
	import { type ICareer } from "$lib/entities/career/Career";
	import CareerIcon from "./CareerIcon.svelte";
	import ContainerTitle from "../ContainerTitle.svelte";
	import AspectRatio from "../ui/aspect-ratio/aspect-ratio.svelte";

	type Props = {
		selectedCareer: ICareer | null;
		careers: ICareer[];
		handler?: (career: ICareer) => void;
	};

	let { selectedCareer = $bindable(), careers, handler }: Props = $props();
</script>

<div class="career-selection-container top-left-shadow self-start">
	<ContainerTitle class="w-full">Career Selection</ContainerTitle>
	<div class="grid grid-rows-5 grid-cols-4 gap-2 background-12 border-01 p-5">
		{#each careers as career}
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
					<CareerIcon careerId={career.id}></CareerIcon>
				</button>
			</AspectRatio>
		{/each}
	</div>
</div>

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
