<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		icon: Snippet;
		percentage: number;
		class?: string;
	};

	let { icon, percentage, class: className }: Props = $props();
</script>

<div class="label-10 p-6 !bg-contain !bg-no-repeat relative mt-5 {className}">
	{@render icon()}
	<span class="absolute top-[-10px] left-0 w-full text-center label-03 h-[48px] grid place-content-center z-10">{percentage}%</span>
</div>
