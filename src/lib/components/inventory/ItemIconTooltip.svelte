<script lang="ts">
	import type { IItemBuild } from "$lib/entities/builds/CareerBuild";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import tippy, { animateFill } from "tippy.js";
	import "tippy.js/animations/shift-away.css";
	import InventoryItemView from "./InventoryItemView.svelte";
	import Tooltip from "../ui/tooltip/Tooltip.svelte";

	type Props = {
		itemBuild: IItemBuild;
		itemType: ItemTypeEnum;
		selected?: boolean;
		size?: string;
	};

	let { itemBuild, itemType, selected = false, size = "60px" }: Props = $props();

	let illusionsDirectory = $derived(
		itemType === ItemTypeEnum.Weapon ? `weapons/${itemBuild.weapon?.codename}` : `${itemType.toLowerCase()}`
	);

	let illusionUrl = $derived.by(() => {
		let url = itemBuild.illusion ? `/images/illusions/${illusionsDirectory}/${itemBuild.illusion?.image?.replace("'", "\\'")}` : "";

		if (url === "") {
			if (itemType === ItemTypeEnum.Weapon) {
				url = `/images/weapons/${itemBuild.weapon?.codename}.png`;
			} else {
				url = `/images/illusions/default/${itemType.toLowerCase()}.png`;
			}
		}

		return url;
	});

	let backgroundUrl = $derived.by(() => {
		return `/images/backgrounds/item-${itemBuild.rarity?.toLowerCase() ?? "red"}.png`;
	});
</script>

<Tooltip>
	<div
		class="item-icon relative {selected ? 'border-30' : 'border-04'}"
		style="background: url('{illusionUrl}') center / calc(100% + 8px), url('{backgroundUrl}') center / contain; --size: {size};"
		data-type={itemType}
	></div>
	{#snippet content()}
	<div class="top-left-shadow">
		<InventoryItemView {itemBuild} {itemType}></InventoryItemView>
	</div>
	{/snippet}
</Tooltip>

<!-- <div
	bind:this={tooltipTrigger}
	class="relative {selected ? 'border-30' : 'border-04'}"
	style="background: url('{illusionUrl}') center / calc(100% + 8px), url('{backgroundUrl}') center / contain; --size: {size};"
	data-type={itemType}
></div>

<div bind:this={tooltipContent} class="hidden">
	<InventoryItemView {itemBuild} {itemType}></InventoryItemView>
</div> -->

<style>
	.item-icon {
		box-shadow: inset 0 4px 2px white;
		grid-area: itemIcon;
		height: var(--size);
		width: var(--size);
	}
</style>
