<script lang="ts">
	import type { IItemBuild } from "$lib/entities/builds/CareerBuild";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import "tippy.js/animations/shift-away.css";

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

<div
	class="relative {selected ? 'border-30' : 'border-04'}"
	style="background: url('{illusionUrl}') center / calc(100% + 8px), url('{backgroundUrl}') center / contain; --size: {size};"
	data-type={itemType}
></div>

<style>
	div {
		box-shadow: inset 0 1px 2px white;
		grid-area: itemIcon;
		height: var(--size);
		width: var(--size);
	}
</style>
