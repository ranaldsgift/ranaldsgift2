<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { getWindowState } from "$lib/state/WindowState.svelte";

	type Props = {
		build: ICareerBuild;
		size?: string;
		class?: string;
	};

	let { build, size = "142px", class: className }: Props = $props();

	let windowState = getWindowState();

	let frameUrl = $derived(build.portraitFrameId ? `url('/images/frames/frame-${build.portraitFrameId}.png')` : "");
	let scale = $derived(Number(size.replace("px", "")) / 142);
</script>

<div
	data-frame={build.portraitFrameId}
	class="career-portrait relative {className}"
	style="--background: url('/images/careers/{build.career
		?.id}/portrait-alt.png'); --frameUrl: {frameUrl}; --size: {size}; --scale: {scale};"
>
	<span class="career-level text-white">{build.level ?? 35}</span>
</div>

<style>
	.career-level {
		position: absolute;
		bottom: 3px;
		left: 50%;
		height: calc(20px * var(--scale));
		transform: translateX(-50%);
		z-index: 1;
	}
	.career-portrait:not([data-frame]) .career-level {
		background: url("/images/backgrounds/level-background.png") center / contain no-repeat;
		width: 28px;
		height: 23px;
		text-align: center;
	}
	.career-portrait {
		width: calc(var(--size) * (130 / 142));
		height: var(--size);
		grid-area: careerPortrait;
	}
	.career-portrait::before {
		position: absolute;
		content: "";
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--background) 50% 75% / 68% no-repeat;
	}
	/* .career-portrait[data-frame]::before {
		mask: radial-gradient(50%, #0000 98%, #000), linear-gradient(#000 0 0);
		mask-composite: exclude;
	} */
	.career-portrait[data-frame]::after {
		position: absolute;
		content: "";
		/* 		top: -40px;
		left: -15px;
		width: calc(100% + 30px);
		height: calc(100% + 50px);
		background: var(--frameUrl) center bottom / 100% auto no-repeat; */
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--frameUrl) center / contain no-repeat;
	}
</style>
