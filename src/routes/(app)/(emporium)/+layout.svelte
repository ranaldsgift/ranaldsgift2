<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { tick, type Snippet } from "svelte";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	let menuOptions = [
		{ label: "Careers", href: "/careers" },
		{ label: "Weapons", href: "/weapons" },
		{ label: "Enemies", href: "/enemies" },
		{ label: "Breakpoints", href: "/breakpoints" },
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
			marker.style.width = `${rect.width}px`;
			marker.style.transform = `translateX(${rect.left - containerRect.left}px)`;
		}
	}

	$effect(() => {
		// Add resize event listener
		window.addEventListener("resize", updateMarkerPosition);

		// Clean up the event listener when the component is destroyed
		return () => {
			window.removeEventListener("resize", updateMarkerPosition);
		};
	});
</script>

<div class="page-container w-full h-[calc(100vh-45px)] tablet:h-full relative mt-[45px] tablet:mt-0">
	<div class="top-bar flex items-center pl-[20px] max-w-[100vw] tablet:px-[80px] relative" bind:this={menuContainer}>
		<div class="menu-options-container flex items-center gap-5 max-w-[100%] h-[100%] overflow-x-auto pr-[20px] tablet:pr-0">
			{#each menuOptions as option}
				<a
					href={option.href}
					class="text-[#f0d9af] text-[1.2rem] uppercase {selectedMenuOption.href === option.href ? 'selected' : ''}"
				>
					{option.label}
				</a>
			{/each}
		</div>
		<div class="selected-marker pointer-events-none" bind:this={marker}></div>
	</div>
	<div class="page-content">
		{@render children()}
	</div>
	<div class="bottom-bar"></div>
</div>

<style>
	.top-bar {
		-webkit-overflow-scrolling: touch; /* For smoother scrolling on iOS devices */
	}

	.menu-options-container {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.menu-options-container::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}
	.menu-options-container::-webkit-scrollbar {
		height: 1px;
	}
	.page-content {
		max-height: calc(100vh - 100px);
	}
	.page-content,
	.bottom-bar {
		border-image: url(/images/borders/border-11.png);
		border-image-slice: 3 5 0 5;
		border-image-width: 3px 0px;
		border-style: solid;
		border-image-repeat: stretch;
	}
	.page-container {
		display: grid;
		grid-template-rows: 50px 1fr 50px;
		background-image: radial-gradient(at center, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
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
		background: url("/images/dividers/divider-pulse.png") bottom center / 100px auto no-repeat;
		transition:
			transform 0.3s ease,
			width 0.3s ease;
		z-index: 10;
	}
</style>
