<script lang="ts">
	import type { IWeapon } from "$lib/entities/Weapon";
	import WeaponIcon from "./WeaponIcon.svelte";

	type Props = {
		title: string;
		items: IWeapon[];
		selectedItem: IWeapon;
		handler?: (item: IWeapon) => void;
	};

	let { title, items, selectedItem = $bindable(), handler }: Props = $props();

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
</script>

<div class="inventory-item-container border-01 background-27">
	<p class="inventory-item-container-header uppercase text-center pt-4">{title}</p>
	<div class="divider-06"></div>
	<div class="px-5 pb-5 flex flex-wrap justify-center gap-2">
		{#each items as item, index}
			<span class="inventory-item" onclick={() => selectHandler(item)} role="button" tabindex={index} onkeydown={keydownHandler}>
				<WeaponIcon weapon={item} class={selectedItem.id === item.id ? "selected" : ""}></WeaponIcon>
			</span>
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
