<script lang="ts">
	import type { IDifficulty } from "$lib/entities/Difficulty";
	import { DifficultiesStore } from "$lib/stores/DataStores";

	type Props = {
		selected: IDifficulty | undefined;
	};

	let { selected = $bindable() }: Props = $props();

	let selectItems: IDifficulty[] = $state([]);

	const loadData = async () => {
		const { items } = await DifficultiesStore.loadData();
		selectItems = items;
	};

	$effect(() => {
		loadData();
	});
</script>

<select class="select-list" bind:value={selected}>
	{#each selectItems as item}
		<option value={item}>{item.name}</option>
	{/each}
</select>
