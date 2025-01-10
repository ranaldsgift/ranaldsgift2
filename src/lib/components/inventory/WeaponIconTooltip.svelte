<script lang="ts">
	import type { IWeapon } from "$lib/entities/Weapon";
	import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
	import Skeleton from "../ui/skeleton/skeleton.svelte";
	import Tooltip from "../ui/tooltip/Tooltip.svelte";

	type Props = {
		weapon?: IWeapon;
		rarity?: ItemRarityEnum;
		class?: string;
		size?: string;
	};

	let { weapon, rarity = ItemRarityEnum.Red, class: CLASS = "", size = "62px" }: Props = $props();
</script>

{#if weapon}
	<Tooltip>
		<div
			class="weapon-icon border-04 {CLASS}"
			style="--size: {size}; background: url('/images/weapons/{weapon.codename}.png') no-repeat center / cover, 
                        url('/images/backgrounds/item-{rarity.toLowerCase()}.png') no-repeat center / cover;"
		></div>
		{#snippet content()}
			<div class="tooltip border-35 p-5 background-28">
				<h2 class="name header-underline text-xl">{weapon.name}</h2>
				<span class="description">
					{#each weapon.tooltip?.split(",") ?? [] as tooltip}
						{tooltip}<br />
					{/each}
				</span>
			</div>
		{/snippet}
	</Tooltip>
{:else}
	<Skeleton class="w-[{size}] h-[{size}]" />
{/if}

<style>
	.weapon-icon {
		height: var(--size);
		width: var(--size);
		grid-area: itemIcon;
		position: relative;
	}
	.weapon-icon:before:hover {
		display: none !important;
	}
	.weapon-icon {
		box-shadow: inset 0 1px 2px white;
	}
	.weapon-icon.selected {
		border-image: url("/images/borders/border-30.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-width: 1px;
		border-style: solid;
		border-image-repeat: repeat;
	}

	.weapon-icon .tooltip .description {
		text-transform: capitalize;
	}
</style>
