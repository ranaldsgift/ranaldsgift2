<script lang="ts">
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import "tippy.js/animations/shift-away.css";

	type Props = {
		itemType: ItemTypeEnum;
		selected?: boolean;
		size?: string;
	};

	let { itemType, selected = false, size = "60px" }: Props = $props();

	let illusionUrl = $derived.by(() => {
		return `/images/illusions/default/${itemType.toLowerCase()}.png`;
	});

	let backgroundUrl = $derived.by(() => {
		return `/images/backgrounds/item-red.png`;
	});
</script>

<div
	class="relative {selected ? 'border-30' : 'border-04'}"
	style="background: url('{illusionUrl}') center / calc(100% + 8px), url('{backgroundUrl}') center / contain; --size: {size};"
	data-type={itemType}
></div>

<style>
	div {
		box-shadow: inset 0 4px 2px white;
		grid-area: itemIcon;
		height: var(--size);
		width: var(--size);
	}
</style>
