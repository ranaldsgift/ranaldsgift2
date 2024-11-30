<script lang="ts">
	import type { IItemBuild } from "$lib/entities/builds/CareerBuild";
	import type { IWeapon } from "$lib/entities/Weapon";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import { getWindowState } from "$lib/state/WindowState.svelte";
	import ItemIconTooltip from "./ItemIconTooltip.svelte";

	type Props = {
		title: string;
		items: IWeapon[];
		selectedItem: IWeapon | undefined;
		itemBuild?: IItemBuild;
		handler?: (item: IWeapon) => void;
	};

	let { title, items, selectedItem = $bindable(), itemBuild = $bindable(), handler }: Props = $props();

	let windowState = getWindowState();

	let tooltipPosition = $derived<{
		x?: "left" | "right" | "center";
		y?: "top" | "bottom" | "center";
	}>(windowState.isMobile ? { x: "center", y: "top" } : { x: "right", y: "center" });

	const selectHandler = (item: IWeapon) => {
		selectedItem = item;
		if (handler) {
			handler(item);
		}
	};

	const keydownHandler = (event: KeyboardEvent) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		if (event.target instanceof HTMLElement) event.target.click();
	};

	const getItemBuild = (item: IWeapon) => {
		return itemBuild ? { ...itemBuild, weapon: item, illusion: undefined } : { weapon: item };
	};
</script>

<div class="inventory-item-container border-01 background-27">
	<p class="inventory-item-container-header uppercase text-center pt-4">{title}</p>
	<div class="divider-06"></div>
	<div class="px-5 pb-5 flex flex-wrap justify-center gap-2">
		{#each items as item, index}
			<div class="inventory-item" onclick={() => selectHandler(item)} tabindex={index} onkeydown={keydownHandler} role="button">
				<ItemIconTooltip itemBuild={getItemBuild(item)} itemType={ItemTypeEnum.Weapon} selected={selectedItem?.id === item.id}
				></ItemIconTooltip>
			</div>
		{/each}
	</div>
</div>

<style>
	.divider-06 {
		grid-area: primaryDivider;
		height: 30px;
		margin-bottom: 10px;
	}
	.inventory-item-container {
		box-shadow: inset 0 40px 50px #000;
	}
</style>
