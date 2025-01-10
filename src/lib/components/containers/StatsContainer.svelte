<script lang="ts">
	import type { Snippet } from "svelte";
	import TextHeader from "../TextHeader.svelte";

	type Props = {
		title: string;
		stats: Snippet;
		showAll: boolean;
		hideShowAll: boolean;
	};

	let { title, stats, showAll = $bindable(), hideShowAll = $bindable() }: Props = $props();
</script>

<div class="flex flex-wrap background-28 relative p-2 !bg-cover w-full justify-center">
	<TextHeader>{title}</TextHeader>
	<div class="divider-23 w-full h-[30px]"></div>
	<div class="weapons-container flex flex-col gap-2" class:expanded={showAll}>
		<div class="weapons-grid flex flex-wrap gap-2 justify-center">
			{@render stats()}
		</div>
		{#if !hideShowAll}
			<button class="view-all-btn text-[#9f9065] hover:text-white transition-colors" onclick={() => (showAll = !showAll)}>
				{showAll ? "Show Less" : "View All"}
			</button>
		{/if}
	</div>
	<div class="absolute top-0 left-0 w-full h-full border-31 pointer-events-none"></div>
</div>
