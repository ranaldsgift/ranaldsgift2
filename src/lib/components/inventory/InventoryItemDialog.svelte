<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import type { IItemBuild } from "$lib/entities/builds/CareerBuild";
	import type { IIllusion } from "$lib/entities/ItemIllusion";
	import type { IProperty } from "$lib/entities/Property";
	import type { ITrait } from "$lib/entities/Trait";
	import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import { EnumHelper } from "$lib/helpers/EnumHelper";
	import { IllusionsStore } from "$lib/stores/DataStores";

	type Props = {
		itemBuild: IItemBuild;
		itemType: ItemTypeEnum;
		properties: IProperty[];
		traits: ITrait[];
	};

	let { itemBuild = $bindable(), itemType, properties, traits }: Props = $props();

	let illusions: IIllusion[] = $state([]);
	let buildRarity = $derived(itemBuild?.rarity ?? ItemRarityEnum.Red);

	const loadIllusions = async () => {
		illusions = [];
		let query = itemType === ItemTypeEnum.Weapon ? `weaponId=${itemBuild.weapon?.id}` : `itemType=${itemType}`;
		const data = await IllusionsStore.loadData(query);
		illusions = data.items;
	};

	let illusionsDirectory = $derived(
		itemType === ItemTypeEnum.Weapon ? `weapons/${itemBuild.weapon?.codename}` : `${itemType.toLowerCase()}`
	);

	const rarityHandler = (rarity: ItemRarityEnum) => {
		itemBuild.rarity = rarity;

		if (itemBuild.rarity === ItemRarityEnum.White) {
			itemBuild.property1 = null;
			itemBuild.property2 = null;
			itemBuild.trait = null;
		} else if (itemBuild.rarity === ItemRarityEnum.Green) {
			if (!itemBuild.property1) {
				itemBuild.property1 = properties[0];
			}
			itemBuild.property2 = null;
			itemBuild.trait = null;
		} else if (itemBuild.rarity === ItemRarityEnum.Blue) {
			if (!itemBuild.property1) {
				itemBuild.property1 = properties[0];
			}
			if (!itemBuild.property2) {
				itemBuild.property2 = properties[1];
			}
			itemBuild.trait = null;
		} else {
			if (!itemBuild.property1) {
				itemBuild.property1 = properties[0];
			}
			if (!itemBuild.property2) {
				itemBuild.property2 = properties[1];
			}
			if (!itemBuild.trait) {
				itemBuild.trait = traits[0];
			}
		}
	};
</script>

<Dialog.Root>
	<Dialog.Trigger onclick={loadIllusions} class="[text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]"
		>{itemBuild?.weapon?.name ?? itemType.toString()}</Dialog.Trigger
	>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Item Rarity</Dialog.Title>
			<Dialog.Description>
				<div class="flex flex-col gap-2">
					<div class="flex flex-row gap-2 justify-center">
						{#each EnumHelper.getValues(ItemRarityEnum) as rarity}
							<button
								onclick={() => rarityHandler(rarity)}
								class="size-[60px] {rarity === buildRarity ? 'border-30' : 'border-04'}"
								style="background: url('/images/backgrounds/item-{rarity.toLowerCase()}.png');"
								aria-label={rarity.toString()}
							></button>
						{/each}
					</div>
					{#if illusions.length > 0}
						<h1 class="text-xl">Illusion</h1>
						<div class="flex flex-row gap-2 justify-center flex-wrap">
							{#each illusions as illusion}
								<button
									onclick={() => (itemBuild.illusion = illusion)}
									class="size-[60px] {illusion.id === itemBuild?.illusion?.id ? 'border-30' : 'border-04'}"
									style="background: url('/images/illusions/{illusionsDirectory}/{illusion.image?.replace(
										"'",
										"\\'"
									)}') center / calc(100% + 8px), url('/images/backgrounds/item-{itemBuild.rarity?.toLowerCase() ??
										'red'}.png');"
									aria-label={illusion.name}
								></button>
							{/each}
						</div>
					{/if}
				</div>
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Close class="flex justify-center relative mb-[-45px]"><div class="button-02 max-w-[100px]">Done</div></Dialog.Close>
	</Dialog.Content>
</Dialog.Root>
