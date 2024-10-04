<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';

	let { children } = $props();
	let menuOptions = [
		{ label: 'Careers', href: '/careers' },
		{ label: 'Weapons', href: '/weapons' },
		{ label: 'Enemies', href: '/enemies' },
		{ label: 'Breakpoints', href: '/breakpoints' },
	];

	let selectedMenuOption = $derived.by(() => {
		let path = $page.url.pathname;
		return menuOptions.find((option) => path.startsWith(option.href)) || menuOptions[0];
	});

	let marker: HTMLElement;
	let menuContainer: HTMLElement;

	$effect(() => {
		if (selectedMenuOption) {
			updateMarkerPosition();
		}
	});

	async function updateMarkerPosition() {
		const selectedElement = menuContainer.querySelector(`a[href="${selectedMenuOption.href}"]`);
		if (selectedElement && marker) {
			const rect = selectedElement.getBoundingClientRect();
			const containerRect = menuContainer.getBoundingClientRect();
			marker.style.width = `${rect.width + 20}px`;
			marker.style.transform = `translateX(${rect.left - containerRect.left - 10}px)`;
		}
	}
</script>

<div class="page-container w-full h-full relative">
	<div class="top-bar flex items-center gap-5 px-[80px] relative" bind:this={menuContainer}>
		{#each menuOptions as option}
			<a
				href={option.href}
				class="text-[#f0d9af] text-[1.2rem] uppercase {selectedMenuOption.href === option.href ? 'selected' : ''}"
			>
				{option.label}
			</a>
		{/each}
		<div class="selected-marker" bind:this={marker}></div>
	</div>
	<div class="page-content">
		{@render children()}
	</div>
	<div class="bottom-bar"></div>
</div>

<style>
	.page-content, .bottom-bar {
		border-image: url(/images/borders/border-11.png);
		border-image-slice: 3 5 0 5;
		border-image-width: 3px 0px;
		border-style: solid;
		border-image-repeat: stretch;
	}
	.page-container {
		display: grid;
		grid-template-rows: 50px 1fr 50px;
		background-image: radial-gradient(at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
	}
	a {
		position: relative;
		z-index: 1;
	}
	a.selected {
		color: #fff;
	}
	.selected-marker {
		position: absolute;
		height: 64px;
		width: 100px;
		left: 0;
		background: url('/images/dividers/divider-pulse.png') bottom center / 100px auto no-repeat;
		transition: transform 0.3s ease, width 0.3s ease;
		z-index: 10;
	}
</style>