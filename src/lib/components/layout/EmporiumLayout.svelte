<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		leftContent: Snippet;
		rightContent: Snippet;
		pageHeader?: Snippet;
	};
	let { leftContent, rightContent, pageHeader }: Props = $props();

	// Add this function to check if element has scrollbar
	function hasScrollbar(element: HTMLElement) {
		return element.scrollHeight > element.clientHeight;
	}

	// Add these variables
	let leftContentElement: HTMLElement;
	let rightContentElement: HTMLElement;
	let leftHasScrollbar = $state(false);
	let rightHasScrollbar = $state(false);

	// Update scrollbar state on mount and when content changes
	function updateScrollbarState() {
		if (leftContentElement) {
			leftHasScrollbar = hasScrollbar(leftContentElement);
		}
		if (rightContentElement) {
			rightHasScrollbar = hasScrollbar(rightContentElement);
		}
	}
</script>

<div class="relative grid grid-cols-2 gap-10 py-5 px-8 mt-10 h-[calc(100%-110px)]">
	{#if pageHeader}
		<div class="absolute top-[-1.75rem] left-[calc(50%+50px)] w-full h-[110px] z-10 pointer-events-none">
			<h1 class="text-5xl text-[#9f9065]">
				{@render pageHeader()}
			</h1>
		</div>
	{/if}
	<div class="left-container">
		<div
			bind:this={leftContentElement}
			class="left-content flex flex-col pt-12 pl-8 pr-5 items-end"
			class:has-scrollbar={leftHasScrollbar}
			use:updateScrollbarState
		>
			{@render leftContent()}
		</div>
		<div class="skull-divider top"></div>
		<div class="skull-divider bottom"></div>
	</div>
	<div class="right-container">
		<div
			bind:this={rightContentElement}
			class="right-content flex flex-col py-12 pr-8 pl-5 items-start"
			class:has-scrollbar={rightHasScrollbar}
			use:updateScrollbarState
		>
			{@render rightContent()}
		</div>
		<div class="skull-divider right top"></div>
		<div class="skull-divider right bottom"></div>
	</div>
</div>

<style>
	.left-content {
		margin-left: 65px;
	}
	.left-content.has-scrollbar {
		margin-left: 40px;
	}
	.left-content,
	.right-content {
		height: 100%;
		max-height: 100%;
		overflow-y: auto;
	}
	.right-container,
	.left-container {
		height: calc(100vh - 300px);
	}
	.right-container {
		position: relative;
		direction: ltr;
		padding-right: 40px;
	}
	.left-container {
		position: relative;
		direction: rtl;
		/* max-height: 100%;
		overflow-y: auto;
		position: relative; */
	}
	.left-content > :global(*) {
		direction: ltr;
	}
	.skull-divider {
		width: 100%;
		height: 99px;
		width: 100%;
		background: url("/images/dividers/divider-04.png") left center no-repeat;
		position: absolute;
		z-index: 1;
		pointer-events: none;
	}
	.skull-divider.top {
		top: -42px;
	}
	.skull-divider.bottom {
		bottom: -42px;
	}
	.skull-divider::before {
		content: "";
		position: absolute;
		left: 154px;
		background: url("/images/dividers/divider-04-repeat.png") center 37px repeat-x;
		height: 99px;
		width: calc(100% - 178px);
	}
	.skull-divider::after {
		content: "";
		position: absolute;
		background: url("/images/dividers/divider-04-end.png") right center no-repeat;
		height: 99px;
		width: 25px;
		right: 0;
	}

	.skull-divider.bottom {
		transform: scaleY(-1);
	}
	.skull-divider.right {
		transform: scaleX(-1);
	}
	.skull-divider.right.bottom {
		transform: scaleX(-1) scaleY(-1);
	}
</style>
