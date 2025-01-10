<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { NUMBER_OF_FRAMES } from "$lib/data/constants/constants";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import StyledInput from "../input/StyledInput.svelte";

	type Props = {
		build: ICareerBuild;
		open: boolean;
	};

	let { build = $bindable(), open = $bindable() }: Props = $props();
	//let frames = $state<{ id: number; image: string }[]>([])

	const FRAMES_PER_PAGE = 15;
	let currentPage = $state(1);
	let totalPages = $derived(Math.ceil(NUMBER_OF_FRAMES / FRAMES_PER_PAGE));

	let frames = $derived.by(() => {
		const startIndex = (currentPage - 1) * FRAMES_PER_PAGE + 1;
		const endIndex = Math.min(currentPage * FRAMES_PER_PAGE, NUMBER_OF_FRAMES);
		const frames: { id: number; image: string }[] = [];
		for (let i = startIndex; i <= endIndex; i++) {
			frames.push({ id: i, image: `url('/images/frames/frame-${i}.png')` });
		}
		return frames;
	});

	const handleFrameSelect = (frameId: number) => {
		if (build.portraitFrameId !== frameId) {
			build.portraitFrameId = frameId;
		} else {
			build.portraitFrameId = undefined;
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Set your Hero Level and Portrait Frame</Dialog.Title>
		</Dialog.Header>
		<div class="flex flex-col">
			<StyledInput class="m-auto">
				<label for="level">Hero Level</label>
				<input type="number" bind:value={build.level} min="1" max="35" />
			</StyledInput>
			<div class="divider-03 h-[48px]"></div>
			<div class="max-h-[300px] overflow-y-auto flex flex-wrap justify-center">
				{#each frames as frame}
					<button
						class="size-[80px] {frame.id === build.portraitFrameId ? 'border-30' : ''}"
						style="background: {frame.image} center / contain no-repeat; --frameId: {frame.id}"
						onclick={() => handleFrameSelect(frame.id)}
						title="Select Portrait Frame"
						aria-label="Select Portrait Frame"
					></button>
				{/each}
			</div>
			<div class="flex flex-col items-center mt-4">
				<div class="flex justify-between items-center w-full">
					<button class="arrow-button" onclick={() => (currentPage = Math.max(1, currentPage - 1))}>
						<img src="/images/icons/arrow-right.png" alt="Previous" class="transform rotate-180" />
					</button>
					<select bind:value={currentPage} class="select select-bordered w-full max-w-xs">
						{#each Array(totalPages) as _, i}
							<option value={i + 1}>Page {i + 1}</option>
						{/each}
					</select>
					<button class="arrow-button" onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}>
						<img src="/images/icons/arrow-right.png" alt="Next" />
					</button>
				</div>
				<span class="mt-2">
					Showing {(currentPage - 1) * FRAMES_PER_PAGE + 1} - {Math.min(currentPage * FRAMES_PER_PAGE, NUMBER_OF_FRAMES)} of {NUMBER_OF_FRAMES}
				</span>
			</div>
		</div>
		<Dialog.Close class="flex justify-center relative mb-[-45px]"><div class="button-02 max-w-[100px]">Done</div></Dialog.Close>
	</Dialog.Content>
</Dialog.Root>

<style>
	select {
		border-image: url("/images/borders/border-13.png");
		border-image-width: auto;
		border-image-slice: 21;
		border-style: solid;
		border-image-repeat: repeat;
		min-height: 60px;
		align-content: center;
		background: linear-gradient(180deg, #2b1212 35%, #000);
		color: #30e158;
		font-size: 1.3rem;
		padding: 10px 20px;
		position: relative;
		transition: color 0.2s ease-in-out;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		outline: none;
	}
	option {
		color: #838383;
	}
	select option {
		background-color: #080404;
	}
	.arrow-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}
</style>
