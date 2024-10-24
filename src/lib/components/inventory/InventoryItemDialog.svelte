<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import type { IItemBuild } from "$lib/entities/builds/CareerBuild";
	import type { IIllusion } from "$lib/entities/ItemIllusion";
	import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	import { EnumHelper } from "$lib/helpers/EnumHelper";
	import { IllusionsStore } from "$lib/stores/DataStores";

	type Props = {
		itemBuild: IItemBuild;
		itemType: ItemTypeEnum;
	};

	let { itemBuild = $bindable(), itemType }: Props = $props();

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
								onclick={() => (itemBuild.rarity = rarity)}
								class="size-[60px] {rarity === buildRarity ? 'border-30' : 'border-04'}"
								style="background: url('/images/backgrounds/item-{rarity.toLowerCase()}.png');"
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
