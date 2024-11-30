<script lang="ts">
	import type { Snippet } from "svelte";
	import tippy, { animateFill } from "tippy.js";
	import "tippy.js/animations/shift-away.css";

	type Props = {
		children: Snippet;
		content: Snippet;
		callback?: (tippyInstance: any) => void;
		options?: { delay?: [number, number]; animation?: boolean; interactive?: boolean; trigger?: "click" | "focus" | "mouseenter" };
	};

	let {
		children,
		content,
		callback,
		options = { delay: [0, 0], animation: false, interactive: false, trigger: "mouseenter" },
	}: Props = $props();

	let tooltipTrigger: HTMLElement;
	let tooltipContent: HTMLElement;

	$effect(() => {
		const tippyInstance = tippy(tooltipTrigger, {
			content: tooltipContent,
			delay: options.delay,
			animation: options.animation,
			interactive: options.interactive,
			trigger: options.trigger,
		});
		tooltipContent.classList.remove("hidden");
		callback?.(tippyInstance);
	});
</script>

<div bind:this={tooltipTrigger}>
	{@render children()}
</div>

<div bind:this={tooltipContent} class="hidden">
	{@render content()}
</div>
